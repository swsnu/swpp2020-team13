from django.urls import include, path

from users.views import signup, login, logout, check_email, check_username, check_password, session

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('check_email/', check_email, name='check_email'),
    path('check_username/', check_username, name='check_username'),
    path('check_password/', check_password, name='check_password'),
    path('session/', session, name='session'),
    # path('<pk>/', detail, name='detail'),
]