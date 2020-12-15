from django.urls import include, path

from .views import signup, login, logout

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    # path('<pk>/', detail, name='detail'),
]