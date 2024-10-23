# Aplicação Fullstack ATS Django
# Instruções para Rodar o Backend (Django)
![image](https://github.com/user-attachments/assets/77d9c5ca-cb8f-45cc-b4a5-a0f5768fbd49)

- Backend 
  - [x] CRUD de usuários 
  - [x] CRUD de empresas
  - [x] CRUD de candidatos
  - [x] CRUD de experiências do candidato 
  - [x] CRUD de vagas

- Frontend 
  - [x] Tela de login
  - [x] Tela de cadastro
  - [x] Listagem e edição de vagas
  - [ ] Cadastro e edição de empresas
  - [ ] Cadastro e edição de candidatos
  - [ ] Dashboard Chart.js de candidatos e vagas
  - [ ] Dashboard relação entre candidatos e suas pontuações. 

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

### Diagramas de telas: 
[![](https://mermaid.ink/img/pako:eNpt0s1ugkAQB_BX2cxZjQiIcmiiYG2beumHh4KHCay4KbBkgLRqfJhee-0j-GJdsFVI5AQ7P_7Z2dk9BDLkYMM6lh_BBqlgL66fMvVMvEcZiZSFnL3m5fGLhFyxbveGTb1ZkhHPkXXZUuQlxmKHxBxMQxFiIfPVX0CtHe9cqDwntsQI_820Nm4j0SGBJ9MiswaZhaK4Zm4bxuUxv4rmDTTnpMgTj7E4_lT9naBTw7vWxidZLAKFMyRshs5re-9dQqouqw5ZJoktjt95Sz605eXQmhw6kHBKUIRqMvvqdx-KDU-4D7Z6DZHeffDTg3JYFvJ5mwZgrzHOeQdIltHm_FVmKpy7AiPC5LyaYQr2Hj7Btga9sd43R7qumYZpDc0ObMHWhkbPGA50yxgbmmFp1qEDOylVQL83svqaqZkjzarK-rhOe6uLBZUqnKvpSFqcrlV9uw6_rfXAJg?type=png)](https://mermaid.live/edit#pako:eNpt0s1ugkAQB_BX2cxZjQiIcmiiYG2beumHh4KHCay4KbBkgLRqfJhee-0j-GJdsFVI5AQ7P_7Z2dk9BDLkYMM6lh_BBqlgL66fMvVMvEcZiZSFnL3m5fGLhFyxbveGTb1ZkhHPkXXZUuQlxmKHxBxMQxFiIfPVX0CtHe9cqDwntsQI_820Nm4j0SGBJ9MiswaZhaK4Zm4bxuUxv4rmDTTnpMgTj7E4_lT9naBTw7vWxidZLAKFMyRshs5re-9dQqouqw5ZJoktjt95Sz605eXQmhw6kHBKUIRqMvvqdx-KDU-4D7Z6DZHeffDTg3JYFvJ5mwZgrzHOeQdIltHm_FVmKpy7AiPC5LyaYQr2Hj7Btga9sd43R7qumYZpDc0ObMHWhkbPGA50yxgbmmFp1qEDOylVQL83svqaqZkjzarK-rhOe6uLBZUqnKvpSFqcrlV9uw6_rfXAJg)

### Diagrama de classe para o banco de dados: 
[![](https://mermaid.ink/img/pako:eNqVVM1u2zAMfhVDp7WNDf81boxhl7a79RRsh8HAQFiMK9SWXEnG0mZ5ob3GXmy0Ui9u7A6rDrL08eMnkhK9Y6XiyHJW1mDMjYBKQ1NIj4ZDvC8Gtbc7IP24WFstZOVhA6Kewi35_FCaHyz7Qo61bptWo4E5Oaka_OchJ1JfoXqHzgbEFtZQgxYwE7TGx04YYZWZCcGUqvfjwPFOSNHAiHMDFj0OFq5JuAQ1Mg254uH7ffMwm8c1SE7aVv1HMp9rBdYjOYvSgHo7n3HMI6u7yo6mt4K53baoBcpSwPyVu1SmhhJ0paYwpzi0eF0WVzEqYykm6EY0I-hYmHJYTcN2GX386ft_n1buFSwKgqhgp4yj4Cln8CW0YJ7vf6JVGATntHHPrOdTIjDwHThDfn2CxeYYuhl8j5wZgXH9Bwl02O9fPfjBnPU6bMEa1NQanPrW3RNR75HeCuu9OOiHnrYnHnRWrZ9kyXKrO1wwrbrqnuUbqA3tupYiwZemHygtSJbv2JblaRoH4SrMrjKaktVquVywJ5b7SRYFURheZWkSx8tVvF-wZ6VIIAqSMI3SOIuSy3SZXSZO7ZuzHcSRU5fpu5dfTv_Z_wF9zVol?type=png)](https://mermaid.live/edit#pako:eNqVVM1u2zAMfhVDp7WNDf81boxhl7a79RRsh8HAQFiMK9SWXEnG0mZ5ob3GXmy0Ui9u7A6rDrL08eMnkhK9Y6XiyHJW1mDMjYBKQ1NIj4ZDvC8Gtbc7IP24WFstZOVhA6Kewi35_FCaHyz7Qo61bptWo4E5Oaka_OchJ1JfoXqHzgbEFtZQgxYwE7TGx04YYZWZCcGUqvfjwPFOSNHAiHMDFj0OFq5JuAQ1Mg254uH7ffMwm8c1SE7aVv1HMp9rBdYjOYvSgHo7n3HMI6u7yo6mt4K53baoBcpSwPyVu1SmhhJ0paYwpzi0eF0WVzEqYykm6EY0I-hYmHJYTcN2GX386ft_n1buFSwKgqhgp4yj4Cln8CW0YJ7vf6JVGATntHHPrOdTIjDwHThDfn2CxeYYuhl8j5wZgXH9Bwl02O9fPfjBnPU6bMEa1NQanPrW3RNR75HeCuu9OOiHnrYnHnRWrZ9kyXKrO1wwrbrqnuUbqA3tupYiwZemHygtSJbv2JblaRoH4SrMrjKaktVquVywJ5b7SRYFURheZWkSx8tVvF-wZ6VIIAqSMI3SOIuSy3SZXSZO7ZuzHcSRU5fpu5dfTv_Z_wF9zVol)
