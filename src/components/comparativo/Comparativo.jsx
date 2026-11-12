import React from "react";
import { Alert, Card, Table, Typography, Tag } from "antd";
import dataset from "../../data/dataset_painel_multitenant.json";

const { Title } = Typography;

// Definição das colunas usando os nomes das chaves do JSON
const colunas = [
  { title: "Unidade", dataIndex: "nome", key: "nome", render: (text) => <strong>{text}</strong> },
  { title: "Porte", dataIndex: "porte", key: "porte", render: (porte) => <Tag color="blue">{porte}</Tag> },
  { title: "Clientes", dataIndex: "carteiraTotalClientes", key: "carteiraTotalClientes", render: (val) => val.toLocaleString('pt-BR') },
  { title: "Receita (90d)", dataIndex: "receitaCarteira90d", key: "receitaCarteira90d", render: (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val) },
  { title: "Risco Absoluto", dataIndex: "riscoAbsoluto", key: "riscoAbsoluto", render: (val) => <Tag color="red">{val}</Tag> },
];

export default function Comparativo() {
  return (
    <div>
      <Title level={3}>Comparativo entre Unidades</Title>
      <Alert message="Aviso de Protótipo" description="Dados lidos do arquivo JSON local." type="warning" showIcon style={{ marginBottom: 24 }} />
      <Card title="Desempenho Geral das Unidades">
        {/* Passando os dados do JSON para a tabela */}
        <Table columns={colunas} dataSource={dataset.tenants} rowKey="id" pagination={false} scroll={{ x: true }} />
      </Card>
    </div>
  );
}