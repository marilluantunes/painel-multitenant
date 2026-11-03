import { Typography, Row, Col } from "antd";
import UnidadeCard from "./UnidadeCard.jsx";

const { Title, Paragraph } = Typography;

// Dados estáticos copiados do "JSON"
const dadosUnidades = [
  { id: 1, nome: "Centro-Oeste", porte: "Grande", carteira: 12500, engajamento: "85%", funil: "1500 geradas / 800 sucesso" },
  { id: 2, nome: "Sul", porte: "Médio", carteira: 8400, engajamento: "70%", funil: "900 geradas / 400 sucesso" },
  { id: 3, nome: "Norte", porte: "Pequeno", carteira: 3100, engajamento: "50%", funil: "300 geradas / 50 sucesso" },
  { id: 4, nome: "Litoral", porte: "Médio", carteira: 6500, engajamento: "90%", funil: "1100 geradas / 700 sucesso" }
];

export default function VisaoGeral() {
  return (
    <div>
      <Title level={2}>Visão Geral</Title>
      <Paragraph type="secondary">
        Resumo das unidades regionais da Distribuidora Vetor (Dados Fictícios).
      </Paragraph>
      
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {dadosUnidades.map((unidade) => (
          <Col xs={24} sm={12} lg={6} key={unidade.id}>
            {/* Passando os dados via props para o componente UnidadeCard */}
            <UnidadeCard 
              nome={unidade.nome}
              porte={unidade.porte}
              carteira={unidade.carteira}
              engajamento={unidade.engajamento}
              funil={unidade.funil}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}