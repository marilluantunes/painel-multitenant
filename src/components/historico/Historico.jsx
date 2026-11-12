import { useState } from "react"; // Importando o useState
import { Card, Tag, Timeline, Typography, Alert, Select } from "antd";
import dataset from "../../data/dataset_painel_multitenant.json";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Historico() {
  // Estado para guardar o ID do cliente selecionado
  const [selectedClienteId, setSelectedClienteId] = useState(dataset.clientes[0].id);

  // Busca os dados do cliente selecionado
  const clienteSelecionado = dataset.clientes.find(c => c.id === selectedClienteId);

  return (
    <div>
      <Title level={3}>Histórico de Clientes</Title>
      <Alert message="Selecione um cliente para visualizar os eventos." type="info" showIcon style={{ marginBottom: 24 }} />

      {/* Select de Clientes */}
      <Select
        style={{ width: 300, marginBottom: 24 }}
        value={selectedClienteId}
        onChange={(value) => setSelectedClienteId(value)}
      >
        {dataset.clientes.map((cliente) => (
          <Option key={cliente.id} value={cliente.id}>
            {cliente.nome}
          </Option>
        ))}
      </Select>

      {/* Renderiza apenas a Timeline do cliente selecionado */}
      {clienteSelecionado && (
        <Card 
          title={<Title level={4} style={{ margin: 0 }}>{clienteSelecionado.nome}</Title>} 
          extra={<Tag color="blue">{clienteSelecionado.tenantNome}</Tag>}
        >
          <Timeline
            items={clienteSelecionado.eventos.map((evento, index) => ({
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
      )}
    </div>
  );
}