# Aplicação Fullstack ATS Django
# Instruções para Rodar o Backend (Django)

Este projeto utiliza Django como backend. Siga as instruções abaixo para configurar e executar o servidor.

## Pré-requisitos

- Python 3.8 ou superior
- Node.js 20.x ou superior
- pip (gerenciador de pacotes do Python)
- Virtualenv (opcional, mas recomendado)

## Passos para Configuração

1. **Clone o repositório**

   ```bash
   git clone https://github.com/matefs/ats-django-fullstack.git
   cd ats-django-fullstack
   ```

2. **Crie um ambiente virtual (opcional)**

   ```bash
   python -m venv venv
   source venv/bin/activate  # Para Linux/Mac
   venv\Scripts\activate  # Para Windows
   ```

3. **Instale as dependências**

   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Realize as migrações do banco de dados**

   ```bash
   python backend/manage.py migrate
   ```

5. **Crie um superusuário (opcional, para acessar o admin)**

   ```bash
   python backend/manage.py createsuperuser
   ```

6. **Inicie o servidor**

   ```bash
   python backend/manage.py runserver
   ```

7. **Acesse a aplicação**

   Abra seu navegador e vá para [http://127.0.0.1:8000](http://127.0.0.1:8000) para acessar a API.

## Rodar o Frontend (Next.js)

1. **Navegue até a pasta do frontend**

   ```bash
   cd frontend
   ```

2. **Instale as dependências do frontend**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento do Next.js**

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação frontend**

   Abra seu navegador e vá para [http://localhost:3000](http://localhost:3000) para acessar a interface do usuário.

