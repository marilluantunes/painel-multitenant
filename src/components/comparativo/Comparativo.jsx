import React, { useEffect, useState } from "react";
import { Alert, Card, Spin, Table, Typography, Tag, Divider, Row, Col, Statistic } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, LabelList, CartesianGrid } from "recharts";
import { BankOutlined, TeamOutlined, DollarOutlined, WarningOutlined } from "@ant-design/icons";
import UnidadeDAO from "../../objetos/dao/UnidadeDAO.mjs";

const { Title, Text, Paragraph } = Typography;

const getField = (obj, getterName, fieldName, fallback = "") => {
  if (typeof obj?.[getterName] === "function") return obj[getterName]();
  return obj?.[fieldName] ?? fallback;
};

const portesCores = { grande: "#722ed1", media: "#1677ff", "media-pequena": "#fa8c16", pequena: "#13c2c2" };

export default function Comparativo() {
  const [unidades, setUnidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;
    const dao = new UnidadeDAO();
    async function carregar() {
      try {
        const dados = await dao.listar();
        if (ativo) setUnidades(dados);
      } catch (error) {
        if (ativo) setErro(error.message);
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    carregar();
    return () => { ativo = false; };
  }, []);

  // CORRIGIDO: 'tip' virou 'description'
  if (carregando) return <Spin description="Carregando comparação..." style={{ display: "block", marginTop: 50 }} />;
  if (erro) return <Alert type="error" showIcon message="Erro ao consultar unidades" description={erro} />;

  const dadosGrafico = unidades.map(u => {
    const porte = String(getField(u, "getPorte", "porte")).toLowerCase();
    return {
      nome: getField(u, "getNome", "nome").replace("Vetor ", ""),
      clientes: Number(getField(u, "getCarteiraTotalClientes", "carteiraTotalClientes", 0)),
      cor: portesCores[porte] || "#1677ff"
    };
  });

  const totalClientes = unidades.reduce((acc, u) => acc + Number(getField(u, "getCarteiraTotalClientes", "carteiraTotalClientes", 0)), 0);
  const totalReceita = unidades.reduce((acc, u) => acc + Number(getField(u, "getReceitaCarteira90d", "receitaCarteira90d", 0)), 0);
  const totalRisco = unidades.reduce((acc, u) => acc + Number(getField(u, "getRiscoAbsoluto", "riscoAbsoluto", 0)), 0);

  const colunas = [
    { 
      title: "Unidade", 
      key: "nome", 
      render: (_, registro) => <Text strong className="text-claro" style={{ fontSize: 15 }}>{getField(registro, "getNome", "nome")}</Text>,
      sorter: (a, b) => getField(a, "getNome", "nome").localeCompare(getField(b, "getNome", "nome"))
    },
    { 
      title: "Porte", 
      key: "porte", 
      render: (_, registro) => {
        const porteTexto = String(getField(registro, "getPorte", "porte")).toLowerCase();
        const cor = portesCores[porteTexto] || "#1677ff";
        return (
          <Tag style={{ borderRadius: "6px", border: `1px solid ${cor}30`, background: `${cor}15`, color: cor, fontWeight: 700, textTransform: "capitalize", padding: "2px 10px" }}>
            {porteTexto.replace("-", " ")}
          </Tag>
        );
      },
    },
    { 
      title: "Carteira", 
      key: "carteiraTotalClientes", 
      render: (_, registro) => <Text className="text-muted" style={{ fontWeight: 500 }}>{Number(getField(registro, "getCarteiraTotalClientes", "carteiraTotalClientes", 0)).toLocaleString("pt-BR")}</Text>,
      sorter: (a, b) => Number(getField(a, "getCarteiraTotalClientes", "carteiraTotalClientes", 0)) - Number(getField(b, "getCarteiraTotalClientes", "carteiraTotalClientes", 0))
    },
    { 
      title: "Receita (90d)", 
      key: "receitaCarteira90d", 
      render: (_, registro) => <Text className="text-muted" style={{ fontWeight: 500 }}>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(getField(registro, "getReceitaCarteira90d", "receitaCarteira90d", 0)))}</Text>,
      sorter: (a, b) => Number(getField(a, "getReceitaCarteira90d", "receitaCarteira90d", 0)) - Number(getField(b, "getReceitaCarteira90d", "receitaCarteira90d", 0))
    },
    { 
      title: "Risco", 
      key: "riscoAbsoluto", 
      render: (_, registro) => {
        const risco = Number(getField(registro, "getRiscoAbsoluto", "riscoAbsoluto", 0));
        const isAlto = risco > 30;
        return (
          <Tag style={{ 
            borderRadius: "6px", 
            border: `1px solid ${isAlto ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.1)"}`, 
            background: isAlto ? "rgba(239, 68, 68, 0.1)" : "rgba(255,255,255,0.05)", 
            color: isAlto ? "#ef4444" : "#94A3B8", 
            fontWeight: 700,
            padding: "2px 10px"
          }}>
            {risco}
          </Tag>
        );
      },
      sorter: (a, b) => Number(getField(a, "getRiscoAbsoluto", "riscoAbsoluto", 0)) - Number(getField(b, "getRiscoAbsoluto", "riscoAbsoluto", 0))
    },
  ];

  return (
    <div>
      <div className="glass-panel hero-banner">
        <div className="hero-glow"></div>
        <Title level={2} className="text-claro" style={{ margin: 0, fontWeight: 800 }}>
          Comparativo <span style={{ color: "#38BDF8" }}>Global</span>
        </Title>
        <Paragraph className="text-muted" style={{ fontSize: "16px", marginTop: "8px", maxWidth: "600px", margin: 0 }}>
          Analise o desempenho consolidado e compare os indicadores de todas as unidades regionais da Distribuidora Vetor.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} lg={6}>
          {/* CORRIGIDO: bordered={false} virou variant="borderless" */}
          <Card variant="borderless" className="glass-panel kpi-card">
            {/* CORRIGIDO: valueStyle virou styles={{ content: ... }} */}
            <Statistic title={<span className="text-muted">Total de Unidades</span>} value={unidades.length} styles={{ content: { color: "#F8FAFC", fontWeight: 700 } }} prefix={<BankOutlined style={{ color: "#38BDF8", marginRight: 8 }} />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="glass-panel kpi-card">
            <Statistic title={<span className="text-muted">Total de Clientes</span>} value={totalClientes} styles={{ content: { color: "#F8FAFC", fontWeight: 700 } }} prefix={<TeamOutlined style={{ color: "#1677ff", marginRight: 8 }} />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="glass-panel kpi-card">
            <Statistic title={<span className="text-muted">Receita Consolidada (90d)</span>} value={totalReceita} styles={{ content: { color: "#F8FAFC", fontWeight: 700 } }} prefix={<DollarOutlined style={{ color: "#10b981", marginRight: 8 }} />} formatter={(val) => `R$ ${(val / 1000000).toFixed(2)} Mi`} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="glass-panel kpi-card">
            <Statistic title={<span className="text-muted">Risco Total</span>} value={totalRisco} styles={{ content: { color: "#ef4444", fontWeight: 700 } }} prefix={<WarningOutlined style={{ color: "#ef4444", marginRight: 8 }} />} />
          </Card>
        </Col>
      </Row>

      {/* CORRIGIDO: bodyStyle virou styles={{ body: ... }} */}
      <Card className="glass-panel main-card" styles={{ body: { padding: "32px 24px" } }}>
        <div style={{ marginBottom: 24 }}>
          <Text className="section-title">Volume de Clientes por Unidade</Text>
          <Text className="section-subtitle">Comparação direta do tamanho das carteiras.</Text>
          
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart 
                data={dadosGrafico} 
                layout="vertical" 
                margin={{ top: 0, right: 45, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="rgba(255,255,255,0.05)" />
                
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="nome" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }} 
                  width={85} 
                />
                
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', color: '#fff', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ color: '#38BDF8', fontWeight: 'bold' }}
                  formatter={(value) => [`${value} clientes`, 'Total']}
                />
                
                <Bar dataKey="clientes" radius={[0, 8, 8, 0]} barSize={24}>
                  {dadosGrafico.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                  <LabelList 
                    dataKey="clientes" 
                    position="right" 
                    fill="#F8FAFC" 
                    fontSize={12} 
                    fontWeight={700}
                    offset={8}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Divider style={{ margin: "16px 0 32px 0", borderColor: "rgba(255,255,255,0.08)" }} />

        <div>
          <div className="flex-between" style={{ marginBottom: 16 }}>
            <Text className="section-title">Tabela Comparativa</Text>
            <Text className="text-muted" style={{ fontSize: 12 }}>Clique nos cabeçalhos para ordenar</Text>
          </div>
          
          <Table 
            columns={colunas} 
            dataSource={unidades} 
            rowKey={(u) => getField(u, "getId", "id")} 
            pagination={false} 
            scroll={{ x: true }} 
            variant="borderless"
            className="custom-table" 
          />
        </div>
      </Card>
    </div>
  );
}