import { useState } from "react";
import { Typography, Row, Col, Select } from "antd";
import CardUnidade from "./CardUnidade.jsx";
import dataset from "../../data/dataset_painel_multitenant.json";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function VisaoGeral() {
  // O estado inicial agora é "all" para mostrar todas as unidades de cara
  const [selectedUnidadeId, setSelectedUnidadeId] = useState("all");

  // Lógica para filtrar as unidades:
  // Se "all", pega todas. Se não, pega apenas a unidade com o ID correspondente
  const unidadesParaExibir = selectedUnidadeId === "all"
    ? dataset.tenants
    : dataset.tenants.filter(u => u.id === selectedUnidadeId);

  return (
    <div>
      <Title level={3}>Visão Geral</Title>
      <Paragraph type="secondary">
        Selecione uma unidade para visualizar os indicadores ou veja todas de uma vez.
      </Paragraph>

      {/* Select com a opção extra de "Todas" */}
      <Select
        style={{ width: 300, marginBottom: 24 }}
        value={selectedUnidadeId}
        onChange={(value) => setSelectedUnidadeId(value)}
      >
        <Option value="all">Todas as Unidades</Option>
        {dataset.tenants.map((unidade) => (
          <Option key={unidade.id} value={unidade.id}>
            {unidade.nome}
          </Option>
        ))}
      </Select>

      {/* Grid Responsivo Inteligente */}
      <Row justify="center" gutter={[16, 16]}>
        {unidadesParaExibir.map((unidade) => (
          <Col 
            // O tamanho da coluna muda: se for "all", são 4 colunas (lg=6). Se for 1 só, fica maior (lg=12).
            xs={24} 
            md={selectedUnidadeId === "all" ? 12 : 16} 
            lg={selectedUnidadeId === "all" ? 6 : 12} 
            key={unidade.id}
          >
            <CardUnidade unidade={unidade} />
          </Col>
        ))}
      </Row>
    </div>
  );
}