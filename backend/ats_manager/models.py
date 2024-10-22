# models.py

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.exceptions import ValidationError

ESCOLARIDADE_CHOICES = [
    ('EF', 'Ensino fundamental'),
    ('EM', 'Ensino médio'),
    ('TE', 'Tecnólogo'),
    ('ES', 'Ensino Superior'),
    ('PO', 'Pós / MBA / Mestrado'),
    ('DO', 'Doutorado')
]



class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("O usuário deve ter um email")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    USERNAME_FIELD = 'email'  

    def __str__(self):
        return self.email


class Empresa(models.Model):
    nome = models.CharField(max_length=255)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

    @property
    def email(self):
        return self.user_fk.email



class Vaga(models.Model):
    FAIXA_SALARIAL_CHOICES = [
        ('A', 'Até 1.000'),
        ('B', 'De 1.000 a 2.000'),
        ('C', 'De 2.000 a 3.000'),
        ('D', 'Acima de 3.000')
    ]

    nome = models.CharField(max_length=255)
    faixa_salarial = models.CharField(max_length=1, choices=FAIXA_SALARIAL_CHOICES)
    requisitos = models.TextField()
    escolaridade_minima = models.CharField(max_length=2, choices=ESCOLARIDADE_CHOICES)
    data_criacao = models.DateField(auto_now_add=True)
    empresa_fk = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    candidatos = models.ManyToManyField('Candidato', related_name='vagas', blank=True)  
    ativa = models.BooleanField(default=True)
    
    def __str__(self):
        return self.nome

class Candidato(models.Model):

    nome = models.CharField(max_length=255)
    pretensao_salarial = models.FloatField()
    escolaridade = models.CharField(max_length=2, choices=ESCOLARIDADE_CHOICES)
    user_fk = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome
    
    @property
    def email(self):
        return self.user_fk.email

    def save(self, *args, **kwargs):
        if Empresa.objects.filter(user__email=self.user_fk.email).exists():
            raise ValidationError({"email": "O email já está em uso por uma empresa."})
        super().save(*args, **kwargs)

class Experiencia(models.Model):
    empresa = models.CharField(max_length=255)
    cargo = models.CharField(max_length=255)
    descricao = models.TextField()
    inicio = models.DateField()
    fim = models.DateField(null=True, blank=True)
    candidato_fk = models.ForeignKey(Candidato, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.empresa} - {self.cargo}"
