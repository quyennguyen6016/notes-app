from django.contrib import admin
from django.urls import path
from notes.views import notes_list, health, about

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/notes/', notes_list),
    path('about', about),
    path('health', health),
    path('health/', health),
]