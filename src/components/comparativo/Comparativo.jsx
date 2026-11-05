import React from "react";
import { Alert, Card, Table, Typography, Tag, Progress, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

// Colunas da tabela mantidas com o design anterior
const colunas = [
  { 
    title: "Unidade", 
    dataIndex: "nome", 
    key: "nome",
    render: (text) => <strong>{text}</strong>
  },
  { 
    title: "Porte", 
    dataIndex: "porte", 
    key: "porte",
    render: (porte) => {
      let color = porte === "Grande" ? "blue" : porte === "Médio" ? "cyan" : "default";
      return <Tag color={color}>{porte}</Tag>;
    }
  },
  {
    title: "Carteira de clientes",
    dataIndex: "carteira",
    key: "carteira",
    render: (carteira) => carteira.toLocaleString("pt-BR"),
  },
  { 
    title: "Engajamento", 
    dataIndex: "engajamentoNum", 
    key: "engajamento",
    render: (engajamentoNum) => <Progress percent={engajamentoNum} size="small" status="active" />
  },
  { 
    title: "Funil (90 dias)", 
    dataIndex: "funil", 
    key: "funil" 
  },
];

// Dados estáticos mantidos rigorosamente conforme o dataset fornecido
const unidades = [
  { key: 1, nome: "Centro-Oeste", porte: "Grande", carteira: 12500, engajamentoNum: 85, funil: "1500 geradas / 800 sucesso" },
  { key: 2, nome: "Sul", porte: "Médio", carteira: 8400, engajamentoNum: 70, funil: "900 geradas / 400 sucesso" },
  { key: 3, nome: "Norte", porte: "Pequeno", carteira: 3100, engajamentoNum: 50, funil: "300 geradas / 50 sucesso" },
  { key: 4, nome: "Litoral", porte: "Médio", carteira: 6500, engajamentoNum: 90, funil: "1100 geradas / 700 sucesso" },
];

export default function Comparativo() {
  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <Title level={2}>Comparativo entre unidades</Title>
      <Paragraph type="secondary">
        Consulte os indicadores de cada unidade lado a lado.
      </Paragraph>

      <Alert
        message="Aviso de Protótipo"
        description="Os dados apresentados nesta tela são estáticos e totalmente fictícios."
        type="warning"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* Tabela mantida exatamente como você aprovou */}
      <Card title="Desempenho Geral das Unidades" style={{ marginBottom: 24, borderRadius: 8 }}>
        <Table 
          columns={colunas} 
          dataSource={unidades} 
          pagination={false} 
          scroll={{ x: true }} 
        />
      </Card>

      {/* Novo: Gráfico Geral Simulado construído apenas com Ant Design (sem Recharts) */}
      <Card title="Gráfico Geral: Conversão do Funil (Mock Visual)" style={{ borderRadius: 8 }}>
        <Paragraph type="secondary" style={{ marginBottom: 24 }}>
          Visualização estática da taxa de sucesso de oportunidades nos últimos 90 dias por unidade.
        </Paragraph>

        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <Text strong>Centro-Oeste</Text>
              <Text type="secondary">53% (800 de 1500)</Text>
            </div>
            <Progress percent={53} showInfo={false} strokeColor="#1677ff" size={['100%', 16]} />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <Text strong>Sul</Text>
              <Text type="secondary">44% (400 de 900)</Text>
            </div>
            <Progress percent={44} showInfo={false} strokeColor="#52c41a" size={['100%', 16]} />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <Text strong>Norte</Text>
              <Text type="secondary">16% (50 de 300)</Text>
            </div>
            <Progress percent={16} showInfo={false} strokeColor="#ff4d4f" size={['100%', 16]} />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <Text strong>Litoral</Text>
              <Text type="secondary">63% (700 de 1100)</Text>
            </div>
            <Progress percent={63} showInfo={false} strokeColor="#722ed1" size={['100%', 16]} />
          </div>
        </Space>
      </Card>
    </div>
  );
}