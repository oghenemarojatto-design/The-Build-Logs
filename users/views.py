from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm
from .serializers import RegisterSerializer


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)

        if form.is_valid():
            form.save()
            messages.success(
                request,
                'Account created successfully! You can now log in.'
            )
            return redirect('login')
    else:
        form = UserRegisterForm()

    return render(request, 'users/register.html', {'form': form})


@login_required
def profile(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(
            request.POST,
            request.FILES,
            instance=request.user.profile
        )

        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, 'Your account has been updated!')
            return redirect('profile')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)

    return render(request, 'users/profile.html', {
        'u_form': u_form,
        'p_form': p_form,
    })


class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        })

    def patch(self, request):
        user = request.user
        allowed_fields = ['username', 'first_name', 'last_name', 'email']
        errors = {}

        for field in allowed_fields:
            if field not in request.data:
                continue

            value = request.data[field]

            if not isinstance(value, str):
                errors[field] = ['This field must be text.']
                continue

            value = value.strip()

            if field == 'username':
                if not value:
                    errors[field] = ['Username cannot be empty.']
                elif User.objects.filter(
                    username=value
                ).exclude(pk=user.pk).exists():
                    errors[field] = ['This username is already taken.']
                else:
                    user.username = value

            elif field == 'email':
                if value and User.objects.filter(
                    email=value
                ).exclude(pk=user.pk).exists():
                    errors[field] = ['This email is already in use.']
                else:
                    user.email = value

            else:
                setattr(user, field, value)

        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        user.save()

        return Response({
            'message': 'Profile updated successfully.',
            'user': {
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
            }
        })

