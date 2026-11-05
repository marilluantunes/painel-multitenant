import React from "react";
import { Card, Divider, Tag, Timeline, Typography, Alert, Space } from "antd";
import { 
  ShoppingCartOutlined, 
  CustomerServiceOutlined, 
  TruckOutlined, 
  CheckCircleOutlined 
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

// 1. Componente reutilizável recebendo dados por props
const HistoricoTimeline = ({ eventos }) => {
  return (
    <Timeline
      style={{ marginTop: 24 }}
      items={eventos.map((evento) => ({
        color: evento.cor,
        dot: evento.icone,
        children: (
          <div style={{ paddingBottom: 16 }}>
            <Text strong style={{ fontSize: 16 }}>{evento.titulo}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 13 }}>{evento.data}</Text>
            <Paragraph style={{ marginTop: 8, margin: 0 }}>
              {evento.descricao}
            </Paragraph>
          </div>
        ),
      }))}
    />
  );
};

// 2. Dados estáticos digitados direto no código (Foco em 1 cliente, conforme regra da Pessoa 3)
const clienteExemplo = {
  nome: "João Silva",
  email: "joao.silva@email.com",
  id: "CLI-001",
  eventos: [
    {
      id: 1,
      titulo: "Compra realizada",
      data: "12/10/2026 - 14:30",
      descricao: "Pedido #0001 (Valor: R$ 1.280,00) recebido pelo sistema.",
      cor: "green",
      icone: <ShoppingCartOutlined style={{ fontSize: '16px' }} />,
    },
    {
      id: 2,
      titulo: "Contato com suporte",
      data: "13/10/2026 - 09:15",
      descricao: "Cliente solicitou alteração no endereço de entrega via chat. Endereço atualizado com sucesso.",
      cor: "blue",
      icone: <CustomerServiceOutlined style={{ fontSize: '16px' }} />,
    },
    {
      id: 3,
      titulo: "Em transporte",
      data: "14/10/2026 - 08:00",
      descricao: "Pedido enviado para entrega no novo endereço.",
      cor: "orange",
      icone: <TruckOutlined style={{ fontSize: '16px' }} />,
    },
    {
      id: 4,
      titulo: "Pedido entregue",
      data: "16/10/2026 - 16:45",
      descricao: "Entrega concluída e recebida pelo cliente.",
      cor: "green",
      icone: <CheckCircleOutlined style={{ fontSize: '16px' }} />,
    },
  ],
};

export default function Historico() {
  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      {/* Aviso obrigatório da Sprint 2 identificando como protótipo acadêmico */}
      <Alert
        message="Protótipo Acadêmico: Projeto Integrador 2 - Sprint 2"
        description="Os dados apresentados nesta tela são fictícios e estáticos, utilizados apenas para fins de demonstração visual."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Title level={2}>Histórico de Cliente</Title>
      <Paragraph type="secondary">
        Consulte a linha do tempo de eventos, pedidos e interações de suporte do cliente.
      </Paragraph>

      <Card
        style={{ marginTop: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        title={
          <Space align="center">
            <Title level={4} style={{ margin: 0 }}>{clienteExemplo.nome}</Title>
            <Tag color="blue">{clienteExemplo.id}</Tag>
          </Space>
        }
        extra={<Text type="secondary">{clienteExemplo.email}</Text>}
      >
        <Title level={5}>Interações Recentes</Title>
        <Divider style={{ marginTop: 12, marginBottom: 0 }} />
        
        {/* Chamada do componente reutilizável */}
        <HistoricoTimeline eventos={clienteExemplo.eventos} />
      </Card>
    </div>
  );
}