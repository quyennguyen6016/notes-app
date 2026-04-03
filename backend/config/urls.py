from django.contrib import admin
from django.urls import path
from notes.views import notes_list, note_detail, health, about

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/notes/', notes_list),
    path('api/notes/<int:note_id>/', note_detail),
    path('about', about),
    path('health', health),
    path('health/', health),
]