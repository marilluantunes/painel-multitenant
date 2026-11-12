import { Card, Tag, Typography, Space, Progress, Divider, Row, Col, Tooltip } from "antd";
import { ShopOutlined, RiseOutlined, InfoCircleOutlined, WarningOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function CardUnidade({ unidade }) {
  // Formatação de Moeda e Números
  const formatMoeda = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  const formatNum = (val) => new Intl.NumberFormat('pt-BR').format(val);

  // Cálculo da conversão do funil
  const conversao = Math.round(((unidade.funnel90d?.sucesso || 0) / (unidade.funnel90d?.gerada || 1)) * 100);

  // Variável para alertar se o risco for alto (mais de 30 contas)
  const isRiscoAlto = unidade.riscoAbsoluto > 30;

  return (
    <Card 
      hoverable 
      style={{ 
        height: "100%", 
        borderRadius: "12px", 
        borderTop: `4px solid ${isRiscoAlto ? "#ef4444" : "#1677ff"}`, // Borda vermelha se risco for alto
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)" 
      }}
      bodyStyle={{ padding: "20px" }}
    >
      {/* CABEÇALHO: Nome, ID, Porte */}
      <div style={{ marginBottom: 16 }}>
        <Space align="center" style={{ marginBottom: 8 }}>
          <div style={{ background: "#f1f5f9", padding: "8px", borderRadius: "8px" }}>
            <ShopOutlined style={{ fontSize: 18, color: "#1677ff" }} />
          </div>
          <div>
            <Text strong style={{ fontSize: 18, color: "#0f172a", display: "block", lineHeight: 1.2 }}>
              {unidade.nome}
            </Text>
            <Text style={{ fontSize: 12, color: "#94a3b8" }}>ID: {unidade.id}</Text>
          </div>
        </Space>
        <Tag color="blue" style={{ borderRadius: "4px", fontWeight: 600 }}>
          Porte: {unidade.porte}
        </Tag>
      </div>

      <Divider style={{ margin: "12px 0", borderColor: "#f1f5f9" }} />

      {/* FINANCEIRO E CARTEIRA */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Text style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block" }}>RECEITA (90d)</Text>
          <Text strong style={{ fontSize: 16, color: "#0f172a" }}>{formatMoeda(unidade.receitaCarteira90d)}</Text>
        </Col>
        <Col span={12}>
          <Text style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block" }}>CARTEIRA</Text>
          <Text strong style={{ fontSize: 16, color: "#0f172a" }}>
            {formatNum(unidade.carteiraTotalClientes)} <span style={{ fontSize: 12, fontWeight: 400, color: "#64748b" }}>clientes</span>
          </Text>
        </Col>
      </Row>

      {/* ENGAJAMENTO (7 DIAS) */}
      <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "8px", marginBottom: 16 }}>
        <Text style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block", marginBottom: 8 }}>ENGAJAMENTO (ÚLTIMOS 7 DIAS)</Text>
        <Row justify="space-between">
          <Col>
            <Text style={{ fontSize: 12, color: "#475569" }}>Usuários Ativos:</Text>
            <br />
            <Text strong style={{ fontSize: 14, color: "#0f172a" }}>{formatNum(unidade.activeUsers7d)}</Text>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Text style={{ fontSize: 12, color: "#475569" }}>Eventos:</Text>
            <br />
            <Text strong style={{ fontSize: 14, color: "#0f172a" }}>{formatNum(unidade.engagementEvents7d)}</Text>
          </Col>
        </Row>
      </div>

      {/* FUNIL COMERCIAL (90 DIAS) */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <Text style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>FUNIL (90d)</Text>
          <Text strong style={{ color: "#1677ff", fontSize: 13 }}>Conversão: {conversao}%</Text>
        </div>
        <Progress percent={conversao} showInfo={false} strokeColor="#1677ff" size={["100%", 6]} />
        
        <Row justify="space-between" style={{ marginTop: 8 }}>
          <Col><Text style={{ fontSize: 11, color: "#94a3b8" }}>Geradas: <strong style={{color: "#334155"}}>{unidade.funnel90d?.gerada}</strong></Text></Col>
          <Col><Text style={{ fontSize: 11, color: "#94a3b8" }}>Vistas: <strong style={{color: "#334155"}}>{unidade.funnel90d?.vista}</strong></Text></Col>
          <Col><Text style={{ fontSize: 11, color: "#94a3b8" }}>Sucesso: <strong style={{color: "#10b981"}}>{unidade.funnel90d?.sucesso}</strong></Text></Col>
          <Col><Text style={{ fontSize: 11, color: "#94a3b8" }}>Falha: <strong style={{color: "#ef4444"}}>{unidade.funnel90d?.falha}</strong></Text></Col>
        </Row>
      </div>

      <Divider style={{ margin: "12px 0", borderColor: "#f1f5f9" }} />

      {/* SAÚDE DA CARTEIRA */}
      <div style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block", marginBottom: 8 }}>SAÚDE DA CARTEIRA</Text>
        <Space size="small" wrap>
          <Tag color="success">Saudável: {unidade.healthDistribution?.saudavel}</Tag>
          <Tag color="warning">Atenção: {unidade.healthDistribution?.atencao}</Tag>
          <Tag color="error">Risco: {unidade.healthDistribution?.risco}</Tag>
          <Tag color="magenta">Crítico: {unidade.healthDistribution?.critico}</Tag>
        </Space>
      </div>

      {/* RISCO E MOTIVOS */}
      <div style={{ 
        background: isRiscoAlto ? "#fef2f2" : "#f8fafc", 
        padding: "12px", 
        borderRadius: "8px", 
        border: `1px solid ${isRiscoAlto ? "#fecaca" : "#e2e8f0"}` 
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <Text style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Risco Absoluto</Text>
          <Text strong style={{ fontSize: 16, color: isRiscoAlto ? "#ef4444" : "#0f172a" }}>
            {unidade.riscoAbsoluto} contas
          </Text>
        </div>
        
        {/* Tooltip mostrando o motivo do risco */}
        {unidade.riscoDrivers && unidade.riscoDrivers.length > 0 && (
          <Tooltip title={unidade.riscoDrivers.join(" | ")}>
            <Text style={{ fontSize: 11, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
              <InfoCircleOutlined /> Motivo do risco (passe o mouse)
            </Text>
          </Tooltip>
        )}
      </div>

    </Card>
  );
}