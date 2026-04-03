from django.contrib import admin
from django.urls import path
from notes.views import notes_list, health

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/notes/', notes_list),
    path('health/', health),
]