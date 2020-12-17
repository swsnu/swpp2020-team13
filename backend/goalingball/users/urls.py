from django.urls import include, path

from users import views
# from users.views import signup, login, logout, check_email, check_username, check_password, session

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('check_email/', views.check_email, name='check_email'),
    path('check_username/', views.check_username, name='check_username'),
    path('check_password/', views.check_password, name='check_password'),
    path('session/', views.session, name='session'),
    # path('<pk>/', detail, name='detail'),
]