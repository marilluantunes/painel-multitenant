import { Typography, Empty } from "antd";

const { Title, Paragraph } = Typography;

export default function Historico() {
  return (
    <div>
      <Title level={2}>Histótico de clientes</Title>
      <Paragraph type="secondary">
        Espaço reservado para a seleção de clientes e a linha do tempo.
      </Paragraph>
      
      <Empty 
        description="Conteúdo do histórico será implementado aqui" 
        style={{ marginTop: 50 }} 
      />
    </div>
  );
}