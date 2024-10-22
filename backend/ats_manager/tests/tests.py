import pytest
from django.urls import reverse
from rest_framework import status
from ats_manager.models import User, Empresa, Candidato

@pytest.mark.django_db
class TestUser:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.user = User(email="user@example.com", password="password")
        self.user.set_password("password")   
        self.user.save()

    def test_list_users(self, client):
        response = client.get(reverse('user-list'))
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

