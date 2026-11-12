import { Typography, Row, Col } from "antd";
import CardUnidade from "./CardUnidade.jsx";
import dataset from "../../data/dataset_painel_multitenant.json"; // Importando o JSON

const { Title, Paragraph } = Typography;

export default function VisaoGeral() {
  return (
    <div>
      <Title level={3}>Visão Geral</Title>
      <Paragraph type="secondary">Resumo das unidades regionais (Dados Fictícios).</Paragraph>
      
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {/* Mapeando os dados do JSON para renderizar os cartões */}
        {dataset.tenants.map((unidade) => (
          <Col xs={24} sm={12} lg={6} key={unidade.id}>
            <CardUnidade unidade={unidade} />
          </Col>
        ))}
      </Row>
    </div>
  );
}