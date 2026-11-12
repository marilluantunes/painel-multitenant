import React from "react";
import { Card, Tag, Timeline, Typography, Alert, Space } from "antd";
import dataset from "../../data/dataset_painel_multitenant.json";

const { Title, Text } = Typography;

export default function Historico() {
  return (
    <div>
      <Title level={3}>Histórico de Clientes</Title>
      <Alert message="Protótipo Acadêmico" description="Dados carregados dinamicamente do JSON." type="info" showIcon style={{ marginBottom: 24 }} />
      
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Mapeando cada cliente do JSON */}
        {dataset.clientes.map((cliente) => (
          <Card 
            key={cliente.id} 
            title={<Space><Title level={4} style={{ margin: 0 }}>{cliente.nome}</Title><Tag color="blue">{cliente.tenantNome}</Tag></Space>}
          >
            {/* Mapeando os eventos de cada cliente */}
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
        ))}
      </Space>
    </div>
  );
}