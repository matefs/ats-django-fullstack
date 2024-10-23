'use client';
import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Button, Modal, Form, Input, Select, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const Vagas = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingVaga, setEditingVaga] = useState(null);  // Estado para controlar a vaga que está sendo editada
  const [isModalVisible, setIsModalVisible] = useState(false);  // Estado do modal de edição

  const [form] = Form.useForm();

  // Colunas da tabela
  const columns = [
    {
      title: 'Nome da Vaga',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Empresa',
      dataIndex: 'empresa_nome',
      key: 'empresa_nome',
    },
    {
      title: 'Faixa Salarial',
      dataIndex: 'faixa_salarial',
      key: 'faixa_salarial',
    },
    {
      title: 'Requisitos',
      dataIndex: 'requisitos',
      key: 'requisitos',
    },
    {
      title: 'Escolaridade Mínima',
      dataIndex: 'escolaridade_minima',
      key: 'escolaridade_minima',
    },
    {
      title: 'Data de Criação',
      dataIndex: 'data_criacao',
      key: 'data_criacao',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => openEditModal(record)}>Editar</Button>
      ),
    },
  ];

  // Função para buscar as vagas da API usando fetch
  const fetchVagas = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/vagas/');
      if (!response.ok) {
        throw new Error('Erro ao buscar vagas');
      }
      const data = await response.json();
      setVagas(data); // Define os dados no estado
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Abre o modal de edição e preenche o formulário com os dados da vaga selecionada
  const openEditModal = (vaga) => {
    setEditingVaga(vaga);  // Define a vaga que está sendo editada
    setIsModalVisible(true);
    form.setFieldsValue(vaga);  // Preenche o formulário com os dados da vaga
  };

  // Fecha o modal de edição
  const closeModal = () => {
    setIsModalVisible(false);
    setEditingVaga(null);
    form.resetFields();
  };

  // Função para salvar as mudanças na vaga
  const saveChanges = async (values) => {
    if (!editingVaga) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/vagas/${editingVaga.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar as mudanças');
      }

      message.success('Vaga atualizada com sucesso');
      closeModal();
      fetchVagas();  // Atualiza a tabela com os novos dados
    } catch (error) {
      message.error(error.message);
    }
  };

  // Chama a função quando o componente for montado
  useEffect(() => {
    fetchVagas();
  }, []);

  return (
    <div>
      <Title level={1}>Lista de Vagas</Title>
      {loading ? (
        <Spin tip="Carregando vagas..." />
      ) : (
        <Table
          dataSource={vagas}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}

      {/* Modal de edição */}
      <Modal
        title="Editar Vaga"
        visible={isModalVisible}
        onCancel={closeModal}
        onOk={() => form.submit()}  // Submete o formulário
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={saveChanges}  // Chama a função de salvar ao submeter o formulário
        >
          <Form.Item
            name="nome"
            label="Nome da Vaga"
            rules={[{ required: true, message: 'Por favor, insira o nome da vaga' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="faixa_salarial"
            label="Faixa Salarial"
            rules={[{ required: true, message: 'Por favor, selecione a faixa salarial' }]}
          >
            <Select>
              <Option value="A">Até 1.000</Option>
              <Option value="B">De 1.000 a 2.000</Option>
              <Option value="C">De 2.000 a 3.000</Option>
              <Option value="D">Acima de 3.000</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="requisitos"
            label="Requisitos"
            rules={[{ required: true, message: 'Por favor, insira os requisitos da vaga' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="escolaridade_minima"
            label="Escolaridade Mínima"
            rules={[{ required: true, message: 'Por favor, selecione a escolaridade mínima' }]}
          >
            <Select>
              <Option value="EF">Ensino Fundamental</Option>
              <Option value="EM">Ensino Médio</Option>
              <Option value="T">Tecnólogo</Option>
              <Option value="ES">Ensino Superior</Option>
              <Option value="MBA">Pós / MBA / Mestrado</Option>
              <Option value="D">Doutorado</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vagas;
