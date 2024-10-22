
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from ats_manager.views import UserViewSet
from ats_manager.views import UserViewSet, EmpresaViewSet, VagaViewSet, CandidatoViewSet, ExperienciaViewSet, login_user, verificar_tipo_usuario


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'empresas', EmpresaViewSet)
router.register(r'vagas', VagaViewSet)
router.register(r'candidatos', CandidatoViewSet)
router.register(r'experiencias', ExperienciaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('verificar-tipo-usuario/<int:user_id>/', verificar_tipo_usuario),
    path('login/', login_user, name='login'),

]
