from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path("register/", views.register, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),

    # Posts
    path("posts/", views.get_posts, name="get-posts"),
    path("posts/create/", views.create_post, name="create-post"),
    path("posts/<int:pk>/", views.get_post_detail, name="post-detail"),

    # 👇 ADD THESE TWO LINES HERE
    path("posts/<int:pk>/update/", views.update_post, name="update-post"),
    path("posts/<int:pk>/delete/", views.delete_post, name="delete-post"),

    # Comments
    path("posts/<int:post_id>/comments/", views.get_comments, name="get-comments"),
    path("posts/<int:post_id>/comments/create/", views.create_comment, name="create-comment"),
]