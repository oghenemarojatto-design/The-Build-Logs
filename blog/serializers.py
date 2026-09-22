from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = (
            "id",
            "post",
            "author",
            "parent",
            "content",
            "created_at",
            "replies",
        )
        read_only_fields = ("author",)

    def get_replies(self, obj):
        replies = obj.replies.all()
        return CommentSerializer(replies, many=True).data


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id",
            "title",
            "content",
            "author",
            "created_at",
            "updated_at",
            "comments",
        )
        read_only_fields = (
            "author",
            "created_at",
            "updated_at",
        )

    def get_comments(self, obj):
        comments = obj.comments.filter(parent=None)
        return CommentSerializer(comments, many=True).data