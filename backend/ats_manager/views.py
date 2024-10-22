from django.shortcuts import render

from rest_framework import viewsets
from .models import User, Empresa, Vaga, Candidato, Experiencia
from .serializers import UserSerializer, EmpresaSerializer, VagaSerializer, CandidatoSerializer, ExperienciaSerializer
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
import logging


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class VagaViewSet(viewsets.ModelViewSet):
    queryset = Vaga.objects.filter(ativa=True)
    serializer_class = VagaSerializer

class CandidatoViewSet(viewsets.ModelViewSet):
    queryset = Candidato.objects.all()
    serializer_class = CandidatoSerializer

class ExperienciaViewSet(viewsets.ModelViewSet):
    queryset = Experiencia.objects.all()
    serializer_class = ExperienciaSerializer


@api_view(['GET'])
def verificar_tipo_usuario(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "Usuário não encontrado."}, status=404)

    if Empresa.objects.filter(user=user).exists():
        return Response({"tipo": "empresa", "email": user.email})

    if Candidato.objects.filter(user=user).exists():
        return Response({"tipo": "candidato", "email": user.email})

    return Response({"tipo": "desconhecido", "email": user.email})


@api_view(['POST'])
def login_user(request):
    email = request.data.get('email').strip()
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email e senha são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(email__iexact=email).first()

    if user:
        if user.check_password(password):
            return Response({"message": "Login realizado com sucesso.", "user_id": user.id}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Credenciais inválidas."}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"error": "Usuário não existe"}, status=status.HTTP_401_UNAUTHORIZED)