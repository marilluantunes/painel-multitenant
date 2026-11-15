import { Card, Tag, Typography, Space, Progress, Divider, Row, Col, Tooltip } from "antd";
import { ShopOutlined, RiseOutlined, InfoCircleOutlined, WarningOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function CardUnidade({ unidade }) {
  const getField = (getterName, fieldName, fallback = 0) => {
    if (typeof unidade?.[getterName] === "function") {
      return unidade[getterName]();
    }
    return unidade?.[fieldName] ?? fallback;
  };

  const formatMoeda = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val || 0);
  const formatNum = (val) => new Intl.NumberFormat('pt-BR').format(val || 0);

  const funnel = getField("getFunnel90d", "funnel90d", {});
  const health = getField("getHealthDistribution", "healthDistribution", {});
  const drivers = getField("getRiscoDrivers", "riscoDrivers", []);

  const conversao = Math.round(((funnel?.sucesso || 0) / (funnel?.gerada || 1)) * 100);
  const isRiscoAlto = Number(getField("getRiscoAbsoluto", "riscoAbsoluto", 0)) > 30;

  const unidadeNome = getField("getNome", "nome", "Unidade");
  const unidadeId = getField("getId", "id", "");
  const unidadePorte = getField("getPorte", "porte", "");
  const receita = Number(getField("getReceitaCarteira90d", "receitaCarteira90d", 0));
  const carteira = Number(getField("getCarteiraTotalClientes", "carteiraTotalClientes", 0));
  const ativos = Number(getField("getActiveUsers7d", "activeUsers7d", 0));
  const eventos7d = Number(getField("getEngagementEvents7d", "engagementEvents7d", 0));
  const risco = Number(getField("getRiscoAbsoluto", "riscoAbsoluto", 0));

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
              {unidadeNome}
            </Text>
            <Text style={{ fontSize: 12, color: "#94a3b8" }}>ID: {unidadeId}</Text>
          </div>
        </Space>
        <Tag color="blue" style={{ borderRadius: "4px", fontWeight: 600 }}>
          Porte: {unidadePorte}
        </Tag>
      </div>

      <Divider style={{ margin: "12px 0", borderColor: "#f1f5f9" }} />

      {/* FINANCEIRO E CARTEIRA */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Text style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block" }}>RECEITA (90d)</Text>
          <Text strong style={{ fontSize: 16, color: "#0f172a" }}>{formatMoeda(receita)}</Text>
        </Col>
        <Col span={12}>
          <Text style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block" }}>CARTEIRA</Text>
          <Text strong style={{ fontSize: 16, color: "#0f172a" }}>
            {formatNum(carteira)} <span style={{ fontSize: 12, fontWeight: 400, color: "#64748b" }}>clientes</span>
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
            <Text strong style={{ fontSize: 14, color: "#0f172a" }}>{formatNum(ativos)}</Text>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Text style={{ fontSize: 12, color: "#475569" }}>Eventos:</Text>
            <br />
            <Text strong style={{ fontSize: 14, color: "#0f172a" }}>{formatNum(eventos7d)}</Text>
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
          <Col><Text style={{ fontSize: 11, color: "#94a3b8" }}>Geradas: <strong style={{color: "#334155"}}>{funnel?.gerada ?? 0}</strong></Text></Col>
          <Col><Text style={{ fontSize: 11, color: "#94a3b8" }}>Vistas: <strong style={{color: "#334155"}}>{funnel?.vista ?? 0}</strong></Text></Col>
          <Col><Text style={{ fontSize: 11, color: "#94a3b8" }}>Sucesso: <strong style={{color: "#10b981"}}>{funnel?.sucesso ?? 0}</strong></Text></Col>
          <Col><Text style={{ fontSize: 11, color: "#94a3b8" }}>Falha: <strong style={{color: "#ef4444"}}>{funnel?.falha ?? 0}</strong></Text></Col>
        </Row>
      </div>

      <Divider style={{ margin: "12px 0", borderColor: "#f1f5f9" }} />

      {/* SAÚDE DA CARTEIRA */}
      <div style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 11, color: "#64748b", fontWeight: 600, display: "block", marginBottom: 8 }}>SAÚDE DA CARTEIRA</Text>
        <Space size="small" wrap>
          <Tag color="success">Saudável: {health?.saudavel ?? 0}</Tag>
          <Tag color="warning">Atenção: {health?.atencao ?? 0}</Tag>
          <Tag color="error">Risco: {health?.risco ?? 0}</Tag>
          <Tag color="magenta">Crítico: {health?.critico ?? 0}</Tag>
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
            {risco} contas
          </Text>
        </div>
        
        {/* Tooltip mostrando o motivo do risco */}
        {Array.isArray(drivers) && drivers.length > 0 && (
          <Tooltip title={drivers.join(" | ")}>
            <Text style={{ fontSize: 11, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
              <InfoCircleOutlined /> Motivo do risco (passe o mouse)
            </Text>
          </Tooltip>
        )}
      </div>

    </Card>
  );
}