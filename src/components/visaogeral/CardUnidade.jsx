import { Card, Tag, Typography, Space, Progress, Divider, Row, Col, Tooltip } from "antd";
import { ShopOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { LineChart, Line, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

const { Text } = Typography;

export default function CardUnidade({ unidade }) {
  const formatMoeda = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val || 0);
  const formatNum = (val) => new Intl.NumberFormat('pt-BR').format(val || 0);

  const getField = (getterName, fieldName, fallback = 0) => {
    if (typeof unidade?.[getterName] === "function") return unidade[getterName]();
    return unidade?.[fieldName] ?? fallback;
  };

  const funnel = getField("getFunnel90d", "funnel90d", {});
  const health = getField("getHealthDistribution", "healthDistribution", {});
  const drivers = getField("getRiscoDrivers", "riscoDrivers", []);
  const trend = getField("getEngagementTrend30d", "engagementTrend30d", []);
  
  const conversao = Math.round(((funnel?.sucesso || 0) / (funnel?.gerada || 1)) * 100);
  
  const unidadeNome = getField("getNome", "nome", "Unidade");
  const unidadeId = getField("getId", "id", "");
  const unidadePorte = getField("getPorte", "porte", "");
  const receita = Number(getField("getReceitaCarteira90d", "receitaCarteira90d", 0));
  const carteira = Number(getField("getCarteiraTotalClientes", "carteiraTotalClientes", 0));
  const ativos = Number(getField("getActiveUsers7d", "activeUsers7d", 0));
  const eventos7d = Number(getField("getEngagementEvents7d", "engagementEvents7d", 0));
  const riscoAbsoluto = Number(getField("getRiscoAbsoluto", "riscoAbsoluto", 0));

  // === LÓGICA DE RISCO RELATIVO ===
  // Calcula a porcentagem de clientes em risco na carteira
  const taxaRisco = carteira > 0 ? (riscoAbsoluto / carteira) * 100 : 0;
  
  // Define o limiar (Threshold) de alerta: 15% da carteira em risco
  const isRiscoAlto = taxaRisco >= 15; 

  const dadosTrend = trend.map((val, i) => ({ dia: i + 1, valor: val }));

  // Cores baseadas no Porte
  const temaPorte = {
    grande: { cor: "#722ed1" },           // Roxo
    media: { cor: "#1677ff" },            // Azul
    "media-pequena": { cor: "#fa8c16" },  // Laranja
    pequena: { cor: "#13c2c2" },          // Ciano/Verde-água
  };
  
  const corPorte = (temaPorte[unidadePorte?.toLowerCase()] || temaPorte["media"]).cor;

  // Cores utilitárias do tema escuro
  const textClaro = "#F8FAFC";
  const textMuted = "#94A3B8";
  const bgGlass = "rgba(15, 23, 42, 0.6)";
  const borderGlass = "rgba(255, 255, 255, 0.08)";

  return (
    <Card 
      style={{ 
        height: "100%", 
        borderRadius: "20px", 
        background: bgGlass, 
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${borderGlass}`,
        borderTop: `4px solid ${corPorte}`, 
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)", 
        transition: "all 0.3s ease" 
      }} 
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 20px 40px -10px rgba(0,0,0,0.6), 0 0 20px ${corPorte}30`;
        e.currentTarget.style.borderColor = `rgba(255,255,255,0.15)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.5)";
        e.currentTarget.style.borderColor = borderGlass;
      }}
      styles={{ body: { padding: "24px" } }} // <--- CORRIGIDO: bodyStyle virou styles={{ body: ... }}
    >
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <Space align="center">
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <ShopOutlined style={{ fontSize: 20, color: "#38BDF8" }} />
          </div>
          <div>
            <Text strong style={{ fontSize: 18, color: textClaro, display: "block", lineHeight: 1.2 }}>{unidadeNome}</Text>
            <Text style={{ fontSize: 12, color: textMuted }}>ID: {unidadeId}</Text>
          </div>
        </Space>
        
        <Tag style={{ 
          borderRadius: "6px", 
          border: "none", 
          background: `${corPorte}20`, 
          color: corPorte, 
          fontWeight: 700,
          textTransform: "capitalize",
          padding: "2px 12px"
        }}>
          Porte: {unidadePorte}
        </Tag>
      </div>

      <Divider style={{ margin: "0 0 16px 0", borderColor: "rgba(255,255,255,0.08)" }} />

      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Text style={{ fontSize: 11, color: textMuted, fontWeight: 600, display: "block", marginBottom: 4, letterSpacing: "0.5px" }}>RECEITA (90d)</Text>
          <Text strong style={{ fontSize: 18, color: textClaro }}>{formatMoeda(receita)}</Text>
        </Col>
        <Col span={12}>
          <Text style={{ fontSize: 11, color: textMuted, fontWeight: 600, display: "block", marginBottom: 4, letterSpacing: "0.5px" }}>CARTEIRA</Text>
          <Text strong style={{ fontSize: 18, color: textClaro }}>{formatNum(carteira)} <span style={{ fontSize: 12, fontWeight: 400, color: textMuted }}>clientes</span></Text>
        </Col>
      </Row>

      {/* Gráfico */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <Text style={{ fontSize: 12, color: textMuted, display: "block" }}>Ativos (7d)</Text>
            <Text strong style={{ fontSize: 16, color: textClaro }}>{formatNum(ativos)}</Text>
          </div>
          <div style={{ textAlign: "right" }}>
            <Text style={{ fontSize: 12, color: textMuted, display: "block" }}>Eventos (7d)</Text>
            <Text strong style={{ fontSize: 16, color: textClaro }}>{formatNum(eventos7d)}</Text>
          </div>
        </div>

        <Text style={{ fontSize: 11, color: textMuted, fontWeight: 600, display: "block", marginBottom: 8, letterSpacing: "0.5px" }}>
          ENGAJAMENTO DOS ÚLTIMOS 30 DIAS
        </Text>

        {dadosTrend.length > 0 && (
          <div style={{ height: 60, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosTrend}>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', color: '#ffffff', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', fontSize: '12px', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: '#38BDF8', fontWeight: 'bold', padding: 0 }}
                  labelStyle={{ color: '#94A3B8', marginBottom: '4px', fontSize: '11px' }}
                  cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '3 3' }}
                  labelFormatter={(label) => `Dia ${label}`}
                  formatter={(value) => [`${value}`, 'Eventos']}
                />
                <Line type="monotone" dataKey="valor" stroke="#38BDF8" strokeWidth={3} dot={false} activeDot={{ r: 4, fill: "#38BDF8", stroke: "#ffffff", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <Text style={{ fontSize: 13, color: textMuted, fontWeight: 600 }}>FUNIL (90d)</Text>
          <Text strong style={{ color: "#38BDF8", fontSize: 13 }}>Conversão: {conversao}%</Text>
        </div>
        {/* CORRIGIDO: trailColor virou railColor */}
        <Progress percent={conversao} showInfo={false} strokeColor="#38BDF8" railColor="rgba(255,255,255,0.1)" size={["100%", 8]} strokeLinecap="round" />
        
        <Row justify="space-between" style={{ marginTop: 12 }}>
          <Col><Text style={{ fontSize: 11, color: textMuted, display: "block" }}>Geradas</Text><strong style={{color: textClaro}}>{funnel?.gerada ?? 0}</strong></Col>
          <Col><Text style={{ fontSize: 11, color: textMuted, display: "block" }}>Vistas</Text><strong style={{color: textClaro}}>{funnel?.vista ?? 0}</strong></Col>
          <Col><Text style={{ fontSize: 11, color: textMuted, display: "block" }}>Sucesso</Text><strong style={{color: "#10b981"}}>{funnel?.sucesso ?? 0}</strong></Col>
          <Col><Text style={{ fontSize: 11, color: textMuted, display: "block" }}>Falha</Text><strong style={{color: "#ef4444"}}>{funnel?.falha ?? 0}</strong></Col>
        </Row>
      </div>

      <Divider style={{ margin: "0 0 16px 0", borderColor: "rgba(255,255,255,0.08)" }} />

      <div style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 11, color: textMuted, fontWeight: 600, display: "block", marginBottom: 8, letterSpacing: "0.5px" }}>SAÚDE DA CARTEIRA</Text>
        <Space size="small" wrap>
          <Tag style={{ borderRadius: "6px", border: "1px solid rgba(16, 185, 129, 0.2)", background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>Saudável: {health?.saudavel ?? 0}</Tag>
          <Tag style={{ borderRadius: "6px", border: "1px solid rgba(245, 158, 11, 0.2)", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>Atenção: {health?.atencao ?? 0}</Tag>
          <Tag style={{ borderRadius: "6px", border: "1px solid rgba(239, 68, 68, 0.2)", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}>Risco: {health?.risco ?? 0}</Tag>
          <Tag style={{ borderRadius: "6px", border: "1px solid rgba(217, 70, 239, 0.2)", background: "rgba(217, 70, 239, 0.1)", color: "#d946ef" }}>Crítico: {health?.critico ?? 0}</Tag>
        </Space>
      </div>

      {/* RISCO RELATIVO (Nova Métrica) */}
      <div style={{ 
        background: isRiscoAlto ? "rgba(239, 68, 68, 0.08)" : "rgba(255,255,255,0.03)", 
        padding: "16px", 
        borderRadius: "12px", 
        border: `1px solid ${isRiscoAlto ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.08)"}` 
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 13, color: isRiscoAlto ? "#fca5a5" : textMuted, fontWeight: 600 }}>
            Risco na Carteira
          </Text>
          <Text strong style={{ fontSize: 18, color: isRiscoAlto ? "#ef4444" : textClaro }}>
            {taxaRisco.toFixed(1)}%
            <span style={{ fontSize: 12, fontWeight: 400, color: isRiscoAlto ? "#fca5a5" : textMuted, marginLeft: 4 }}>
              ({riscoAbsoluto} contas)
            </span>
          </Text>
        </div>
        {Array.isArray(drivers) && drivers.length > 0 && (
          <Tooltip title={drivers.join(" | ")} color="rgba(15, 23, 42, 0.95)">
            <Text style={{ fontSize: 12, color: textMuted, display: "flex", alignItems: "center", gap: 6, cursor: "help", marginTop: 6 }}>
              <InfoCircleOutlined /> Motivo do risco
            </Text>
          </Tooltip>
        )}
      </div>

    </Card>
  );
}