'use client';

import { Form, Input, Button, message, Typography } from 'antd';
import { useLocalStorage } from '../../context/LocalStorageContext';
import { useState } from 'react';
import Link from 'next/link';
const { Title } = Typography;
import { useRouter } from 'next/navigation';



export default function Login() {
  const { storedValue, updateStoredValue } = useLocalStorage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
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
        await updateStoredValue(JSON.stringify(data));  
        await message.success("Login realizado com sucesso!");
        console.log(storedValue)
        router.push('/usuario/empresaOuCandidato'); 

      } else {
        message.error(data.message || "Credenciais inválidas, tente novamente!");
      }
    } catch (error) {
      message.error('Ocorreu um erro, por favor tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto', padding: '50px 0' }}>
      <Title level={1}>Faça o Login:</Title>
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
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

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>

          <div style={{ marginTop: '16px' }}>
            Não tem cadastro? <Link href="/usuario/register">Clique aqui para se inscrever</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
