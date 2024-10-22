# serializers.py
from rest_framework import serializers
from .models import User, Empresa, Vaga, Candidato, Experiencia
from datetime import date

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(email=validated_data['email'])
        user.set_password(validated_data['password'])  # Hashing the password
        user.save()
        return user

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = ['id', 'nome', 'email', 'user']

class VagaSerializer(serializers.ModelSerializer):
    candidatos = serializers.PrimaryKeyRelatedField(many=True, queryset=Candidato.objects.all(), required=False)

    class Meta:
        model = Vaga
        fields = ['id', 'nome', 'faixa_salarial', 'requisitos', 'escolaridade_minima', 'data_criacao', 'empresa_fk', 'candidatos','ativa']



class CandidatoSerializer(serializers.ModelSerializer):
    vagas = serializers.PrimaryKeyRelatedField(many=True, queryset=Vaga.objects.all(), required=False)

    class Meta:
        model = Candidato
        fields = ['id', 'nome', 'pretensao_salarial', 'escolaridade', 'user_fk', 'vagas']

class ExperienciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiencia
        fields = ['id', 'empresa', 'cargo', 'descricao', 'inicio', 'fim', 'candidato_fk']

    def validate_inicio(self, value):
        if value > date.today():
            raise serializers.ValidationError("A data de início não pode estar no futuro.")
        return value

    def validate_fim(self, value):
        if value and value > date.today():
            raise serializers.ValidationError("A data de fim não pode estar no futuro.")
        return value