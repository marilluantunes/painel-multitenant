import { useState } from "react";
import { Card, Tag, Timeline, Typography, Alert, Select, Row, Col } from "antd";
import dataset from "../../data/dataset_painel_multitenant.json";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Historico() {
  // Estado inicia em "all" para mostrar a lista completa
  const [selectedClienteId, setSelectedClienteId] = useState("all");

  // Filtra os clientes (todos ou apenas um específico)
  const clientesParaExibir = selectedClienteId === "all"
    ? dataset.clientes
    : dataset.clientes.filter(c => c.id === selectedClienteId);

  return (
    <div>
      <Title level={3}>Histórico de Clientes</Title>
      <Alert 
        message="Selecione um cliente para visualizar os eventos ou veja todos de uma vez." 
        type="info" 
        showIcon 
        style={{ marginBottom: 24 }} 
      />

      {/* Select com a opção "Todos" */}
      <Select
        style={{ width: 300, marginBottom: 24 }}
        value={selectedClienteId}
        onChange={(value) => setSelectedClienteId(value)}
      >
        <Option value="all">Todos os Clientes</Option>
        {dataset.clientes.map((cliente) => (
          <Option key={cliente.id} value={cliente.id}>
            {cliente.nome}
          </Option>
        ))}
      </Select>

      {/* 
        Se "all", os itens alinham à esquerda (start) em 2 colunas (md=12).
        Se for um específico, o item centraliza (center) e fica maior (md=16).
      */}
      <Row 
        justify={selectedClienteId === "all" ? "start" : "center"} 
        gutter={[16, 16]}
      >
        {clientesParaExibir.map((cliente) => (
          <Col 
            xs={24} 
            md={selectedClienteId === "all" ? 12 : 16} 
            lg={selectedClienteId === "all" ? 12 : 12} 
            key={cliente.id}
          >
            <Card 
              title={<Title level={4} style={{ margin: 0 }}>{cliente.nome}</Title>} 
              extra={<Tag color="blue">{cliente.tenantNome}</Tag>}
              style={{ height: "100%", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            >
              <Timeline
                items={cliente.eventos.map((evento, index) => ({
                  key: index,
                  color: evento.tipo === "compra" ? "green" : evento.tipo === "health_score" ? "blue" : "gray",
                  children: (
                    <div>
                      <Text strong>{evento.titulo}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {new Date(evento.data).toLocaleString('pt-BR')}
                      </Text>
                    </div>
                  ),
                }))}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}