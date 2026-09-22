from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response(
            {'error': 'Please provide username, email, and password'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        },
        'token': token.key
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(
        request,
        username=username,
        password=password
    )

    if user:
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            },
            'token': token.key
        })

    return Response(
        {'error': 'Invalid credentials'},
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        request.user.auth_token.delete()
    except:
        pass

    return Response(
        {'message': 'Successfully logged out'},
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
@permission_classes([AllowAny])
def get_posts(request):
    posts = Post.objects.all().select_related('author')

    serializer = PostSerializer(posts, many=True)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer = PostSerializer(
        data=request.data,
        context={'request': request}
    )

    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
@permission_classes([AllowAny])
def get_post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)

        serializer = PostSerializer(post)

        return Response(serializer.data)

    except Post.DoesNotExist:
        return Response(
            {'error': 'Post not found'},
            status=status.HTTP_404_NOT_FOUND
        )


# ==========================
# UPDATE POST
# ==========================

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_post(request, pk):
    try:
        post = Post.objects.get(pk=pk)

        if post.author != request.user:
            return Response(
                {'error': 'You can only edit your own posts.'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = PostSerializer(
            post,
            data=request.data,
            partial=True,
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    except Post.DoesNotExist:
        return Response(
            {'error': 'Post not found'},
            status=status.HTTP_404_NOT_FOUND
        )


# ==========================
# DELETE POST
# ==========================

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post(request, pk):
    try:
        post = Post.objects.get(pk=pk)

        if post.author != request.user:
            return Response(
                {'error': 'You can only delete your own posts.'},
                status=status.HTTP_403_FORBIDDEN
            )

        post.delete()

        return Response(
            {'message': 'Post deleted successfully.'},
            status=status.HTTP_204_NO_CONTENT
        )

    except Post.DoesNotExist:
        return Response(
            {'error': 'Post not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def get_comments(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)

        comments = post.comments.all().select_related('author')

        serializer = CommentSerializer(
            comments,
            many=True
        )

        return Response(serializer.data)

    except Post.DoesNotExist:
        return Response(
            {'error': 'Post not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)

        data = request.data.copy()
        data['post'] = post.id

        if data.get('parent'):
            try:
                parent = Comment.objects.get(pk=data['parent'])

                if parent.post != post:
                    return Response(
                        {'error': 'Invalid parent comment'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            except Comment.DoesNotExist:
                return Response(
                    {'error': 'Parent comment not found'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        serializer = CommentSerializer(
            data=data,
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save(author=request.user)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    except Post.DoesNotExist:
        return Response(
            {'error': 'Post not found'},
            status=status.HTTP_404_NOT_FOUND
        )