from django.urls import include, path

from .views import signup, login, logout, clean_email, clean_username, session

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('clean_email/', clean_email, name='clean_email'),
    path('clean_username/', clean_username, name='clean_username'),
    path('session/', session, name='session')
    # path('<pk>/', detail, name='detail'),
]