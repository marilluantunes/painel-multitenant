import { useState } from "react"; // Importando o useState
import { Typography, Row, Col, Select } from "antd";
import CardUnidade from "./CardUnidade.jsx";
import dataset from "../../data/dataset_painel_multitenant.json";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function VisaoGeral() {
  // Estado para guardar o ID da unidade selecionada (inicia com a primeira do JSON)
  const [selectedUnidadeId, setSelectedUnidadeId] = useState(dataset.tenants[0].id);

  // Busca os dados da unidade que foi selecionada
  const unidadeSelecionada = dataset.tenants.find(u => u.id === selectedUnidadeId);

  return (
    <div>
      <Title level={3}>Visão Geral</Title>
      <Paragraph type="secondary">Selecione uma unidade para visualizar os indicadores.</Paragraph>

      {/*  Select do Ant Design com o onChange atualizando o estado */}
      <Select
        style={{ width: 300, marginBottom: 24 }}
        value={selectedUnidadeId}
        onChange={(value) => setSelectedUnidadeId(value)}
      >
        {dataset.tenants.map((unidade) => (
          <Option key={unidade.id} value={unidade.id}>
            {unidade.nome}
          </Option>
        ))}
      </Select>

      {/* Renderiza apenas o cartão da unidade selecionada */}
      <Row gutter={[16, 16]}>
        {unidadeSelecionada && (
          <Col xs={24} md={12} lg={10}>
            <CardUnidade unidade={unidadeSelecionada} />
          </Col>
        )}
      </Row>
    </div>
  );
}