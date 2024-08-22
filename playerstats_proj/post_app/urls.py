from django.urls import path
from .views import My_Posts, A_Post, Comments, All_Posts

urlpatterns = [
    path("", My_Posts.as_view(), name='my_posts'),
    path("<int:post_id>", A_Post.as_view(), name='a_post'),
    path("<int:post_id>/comments", Comments.as_view(), name='comments'),
    path("all/", All_Posts.as_view(), name='all_posts')
]