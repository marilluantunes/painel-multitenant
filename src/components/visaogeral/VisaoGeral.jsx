import { Typography, Empty } from "antd";

const { Title, Paragraph } = Typography;

export default function VisaoGeral() {
  return (
    <div>
      <Title level={2}>Visão Geral</Title>
      <Paragraph type="secondary">
        Espaço reservado para os cartões das unidades, indicadores e funil.
      </Paragraph>
      
      <Empty 
        description="Conteúdo de Visão Geral será implementado aqui" 
        style={{ marginTop: 50 }} 
      />
    </div>
  );
}