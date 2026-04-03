from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.shortcuts import get_object_or_404
from .models import Note
from .serializers import NoteSerializer

@api_view(['GET', 'POST'])
def notes_list(request):
    if request.method == 'GET':
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def note_detail(request, note_id):
    note = get_object_or_404(Note, pk=note_id)
    note.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def about(request):
    return Response({
        'ho_ten_sinh_vien': settings.STUDENT_NAME,
        'ma_so_sinh_vien': settings.STUDENT_ID,
        'lop': settings.STUDENT_CLASS,
    })

@api_view(['GET'])
def health(request):
    return Response({"status": "ok"})