from django.urls import include, path

from users.views import signup, login, logout, clean_email, clean_username, check_password, session

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('clean_email/', clean_email, name='clean_email'),
    path('clean_username/', clean_username, name='clean_username'),
    path('clean_password/', check_password, name='clean_password'),
    path('session/', session, name='session'),
    # path('<pk>/', detail, name='detail'),
]