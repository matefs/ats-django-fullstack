'use client';
import React, { useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import { useLocalStorage } from '../context/LocalStorageContext';

export default function HomeEmpresa() {
  const { storedValue } = useLocalStorage();  // Pega o valor armazenado
  const parsedValue = typeof storedValue === 'string' ? JSON.parse(storedValue) : storedValue;
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(false);

  // Função para buscar a empresa pelo user id
  const fetchEmpresa = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/empresa/${userId}/`);  // Faz uma requisição para buscar a empresa pelo userId
      if (!response.ok) {
        throw new Error('Erro ao buscar a empresa');
      }
      const data = await response.json();
      setEmpresa(data);  // Define os dados da empresa no estado
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Quando o componente é montado, busca a empresa associada ao user id
  useEffect(() => {
    if (parsedValue && parsedValue.user_id) {
      fetchEmpresa(parsedValue.user_id);  // Chama a função para buscar a empresa com base no user_id
    }
  }, [parsedValue]);

  return (
    <div>
      <h1>Empresa Dashboard</h1>
      {loading ? (
        <Spin tip="Carregando dados da empresa..." />
      ) : empresa ? (
        <div>
          <h2>Nome da Empresa: {empresa.nome}</h2>
          <p>Email: {empresa.email}</p>
        </div>
      ) : (
        <p>Nenhuma empresa encontrada.</p>
      )}
    </div>
  );
}
