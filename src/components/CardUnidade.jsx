
import { Card, Statistic, Tag } from "antd";

export default function CardUnidade({ unidade }) {
  return (
    <Card hoverable>
      <h3>{unidade.nome}</h3>
      <Tag color="blue">{unidade.porte}</Tag>
      <Statistic
        title="Carteira de clientes"
        value={unidade.clientes}
      />
      <Statistic
        title="Indicador"
        value={unidade.indicador}
        suffix="%"
      />
      <Tag color="green">{unidade.status}</Tag>
    </Card>
  );
}
