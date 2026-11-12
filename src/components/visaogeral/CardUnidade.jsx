import { Card, Statistic, Tag, Typography, Space, Progress, Divider, Row, Col } from "antd";
import { ShopOutlined, RiseOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function CardUnidade({ unidade }) {
  // Define cores dinâmicas baseadas no porte da unidade
  const temaCores = {
    grande: { borda: "#722ed1", tag: "purple", fundoIcone: "#f9f0ff" },
    media: { borda: "#1677ff", tag: "blue", fundoIcone: "#e6f4ff" },
    "media-pequena": { borda: "#13c2c2", tag: "cyan", fundoIcone: "#e6fffb" },
    pequena: { borda: "#13c2c2", tag: "cyan", fundoIcone: "#e6fffb" },
  };
  
  const corPadrao = temaCores["media"];
  const cores = temaCores[unidade.porte?.toLowerCase()] || corPadrao;
  
  // Calcula a conversão do funil baseada nos dados do JSON
  const totalGeradas = unidade.funnel90d?.gerada || 1;
  const conversao = Math.round(((unidade.funnel90d?.sucesso || 0) / totalGeradas) * 100);

  return (
    <Card hoverable style={{ height: "100%", borderRadius: "16px", borderTop: `5px solid ${cores.borda}` }}>
      <Space align="center" style={{ marginBottom: 20 }}>
        <div style={{ background: cores.fundoIcone, padding: "10px", borderRadius: "50%" }}>
          <ShopOutlined style={{ fontSize: 22, color: cores.borda }} />
        </div>
        <div>
          <Text strong style={{ fontSize: 18 }}>{unidade.nome}</Text>
          <br />
          <Tag color={cores.tag} style={{ marginTop: 4 }}>Porte {unidade.porte}</Tag>
        </div>
      </Space>

      <Statistic 
        title="Total de Clientes" 
        value={unidade.carteiraTotalClientes} 
        prefix={<RiseOutlined style={{ color: "#52c41a" }} />}
        formatter={(value) => new Intl.NumberFormat('pt-BR').format(value)}
      />

      <Divider style={{ margin: "16px 0" }} />

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <Text type="secondary" style={{ fontSize: 13 }}>Conversão do Funil</Text>
          <Text strong>{conversao}%</Text>
        </div>
        <Progress percent={conversao} showInfo={false} strokeColor={cores.borda} size="small" />
      </div>

      <div style={{ background: "#fafafa", padding: "12px", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
        <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 8, fontWeight: 600 }}>FUNIL (90 DIAS)</Text>
        <Row align="middle" justify="space-between">
          <Col span={10}>
            <Text style={{ fontSize: 12 }}>Geradas</Text>
            <br /><Text strong>{unidade.funnel90d?.gerada}</Text>
          </Col>
          <Col span={4}><ArrowRightOutlined style={{ color: "#bfbfbf" }} /></Col>
          <Col span={10} style={{ textAlign: "right" }}>
            <Text style={{ fontSize: 12 }}>Sucesso</Text>
            <br /><Text strong style={{ color: "#52c41a" }}>{unidade.funnel90d?.sucesso}</Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
}