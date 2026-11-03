import { Card, Statistic, Tag, Typography, Space, Progress, Divider, Row, Col } from "antd";
import { ShopOutlined, RiseOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function UnidadeCard({ nome, porte, carteira, engajamento, funil }) {
  // Define as cores baseadas no porte
  const temaCores = {
    Grande: { borda: "#722ed1", tag: "purple", fundoIcone: "#f9f0ff" },
    Médio: { borda: "#1677ff", tag: "blue", fundoIcone: "#e6f4ff" },
    Pequeno: { borda: "#13c2c2", tag: "cyan", fundoIcone: "#e6fffb" },
  };
  
  const cores = temaCores[porte] || temaCores["Médio"];
  const numeroEngajamento = parseInt(engajamento.replace("%", "")) || 0;

  // Quebra a string do funil para separar as informações
  // Ex: "1500 geradas / 800 sucesso" vira ["1500 geradas", "800 sucesso"]
  const partesFunil = funil.split("/");
  const geradas = partesFunil[0] ? partesFunil[0].replace("geradas", "").trim() : "0";
  const sucesso = partesFunil[1] ? partesFunil[1].replace("sucesso", "").trim() : "0";

  return (
    <Card 
      hoverable 
      style={{ 
        height: "100%", 
        borderRadius: "16px", 
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        borderTop: `5px solid ${cores.borda}`,
        overflow: "hidden"
      }}
      bodyStyle={{ padding: "24px" }}
    >
      {/* Cabeçalho com Ícone e Nome */}
      <Space align="center" style={{ marginBottom: 20 }}>
        <div style={{ 
          background: cores.fundoIcone, 
          padding: "10px", 
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <ShopOutlined style={{ fontSize: 22, color: cores.borda }} />
        </div>
        <div>
          <Text strong style={{ fontSize: 20, display: "block", lineHeight: 1.2 }}>{nome}</Text>
          <Tag color={cores.tag} style={{ borderRadius: "12px", marginTop: 4 }}>
            Porte {porte}
          </Tag>
        </div>
      </Space>

      {/* Número Principal de Carteira */}
      <Statistic 
        title={<Text type="secondary">Total de Clientes</Text>} 
        value={carteira} 
        valueStyle={{ color: "#1f1f1f", fontWeight: "800", fontSize: 32 }}
        prefix={<RiseOutlined style={{ color: "#52c41a", fontSize: 24 }} />}
        formatter={(value) => new Intl.NumberFormat('pt-BR').format(value)}
      />

      <Divider style={{ margin: "16px 0" }} />

      {/* Engajamento visual com Barra */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <Text type="secondary" style={{ fontSize: 13 }}>Engajamento</Text>
          <Text strong>{engajamento}</Text>
        </div>
        <Progress 
          percent={numeroEngajamento} 
          showInfo={false} 
          strokeColor={cores.borda} 
          trailColor="#f0f0f0"
          size="small"
        />
      </div>

      {/* Funil Formatado com Colunas */}
      <div style={{ 
        background: "#fafafa", 
        padding: "12px 16px", 
        borderRadius: "8px",
        border: "1px solid #f0f0f0"
      }}>
        <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 12, fontWeight: 600, letterSpacing: "0.5px" }}>
          FUNIL (90 DIAS)
        </Text>
        
        {/* Usando Row e Col para alinhar perfeitamente */}
        <Row align="middle" justify="space-between">
          
          <Col span={10}>
            <Text type="secondary" style={{ fontSize: 12, display: "block" }}>Geradas</Text>
            <Text strong style={{ fontSize: 16 }}>{geradas}</Text>
          </Col>
          
          <Col span={4} style={{ textAlign: "center" }}>
            <ArrowRightOutlined style={{ color: "#bfbfbf", fontSize: 14 }} />
          </Col>
          
          <Col span={10} style={{ textAlign: "right" }}>
            <Text type="secondary" style={{ fontSize: 12, display: "block" }}>Sucesso</Text>
            <Text strong style={{ fontSize: 16, color: "#52c41a" }}>{sucesso}</Text>
          </Col>
          
        </Row>
      </div>

    </Card>
  );
}