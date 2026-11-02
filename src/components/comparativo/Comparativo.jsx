import { Typography, Empty } from "antd";

const { Title, Paragraph } = Typography;

export default function Comparativo() {
  return (
    <div>
      <Title level={2}>Comparativo entre unidades</Title>
      <Paragraph type="secondary">
         Espaço reservado para o ranking, gráficos e tabelas comparativas.
      </Paragraph>
      
      <Empty 
        description="Conteúdo de Comparativo será implementado aqui" 
        style={{ marginTop: 50 }} 
      />
    </div>
  );
}