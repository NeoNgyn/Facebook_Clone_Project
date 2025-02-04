from django.urls import path
from userauths import views

app_name = "userauths"

urlpatterns = [
    path("sign-up/", views.RegisterView, name="sign-up"),
    path("login/", views.LoginView, name="login"),
    path("logout/", views.LogoutView, name="logout"),
    
    path("my-profile/", views.my_profile, name="my-profile"),
    path("profile/<username>/", views.friend_profile, name="profile"),
    
    
]