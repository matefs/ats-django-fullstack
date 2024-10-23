'use client';

import { useRouter } from 'next/navigation';
import { Form, Input, Button, message, Typography } from 'antd';
import { useState } from 'react';
const { Title } = Typography;

export default function Register() {
  const router = useRouter(); 
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Cadastro realizado com sucesso!');
        await router.push('/usuario/login');             

      } else if (response.status === 400) {
        message.error('Usuário com este email já existe!');
      } else {
        message.error(data.message || 'Erro ao tentar cadastrar, tente novamente!');
      }
    } catch (error) {
      message.error('Ocorreu um erro, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto', padding: '50px 0' }}>
      <Title level={1}>Cadastre-se</Title>
      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
      >

        <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Por favor, insira seu email!' },
          { type: 'email', message: 'Por favor, insira um email válido!' }
        ]}
      >
        <Input placeholder="Digite seu email" />
      </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password placeholder="Digite sua senha" />
        </Form.Item>

        <Form.Item
          label="Confirmar Senha"
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Por favor, confirme sua senha!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('As senhas não coincidem!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirme sua senha" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
