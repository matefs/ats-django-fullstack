from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import viewsets
from .models import User
from .serializer import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
