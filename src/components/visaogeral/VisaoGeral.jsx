import { useState, useEffect } from "react";
import { Typography, Row, Col, Select, Spin, Alert } from "antd";
import CardUnidade from "./CardUnidade.jsx";
import UnidadeDAO from "../../objetos/dao/UnidadeDAO.mjs";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const getId = (unidade) => (typeof unidade?.getId === "function" ? unidade.getId() : unidade?.id);
const getNome = (unidade) => (typeof unidade?.getNome === "function" ? unidade.getNome() : unidade?.nome);

export default function VisaoGeral() { 
  const [selectedUnidadeId, setSelectedUnidadeId] = useState("all");
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

  // Correção: 'tip' foi substituído por 'description' para remover o aviso do console
  if (carregando) return <Spin description="Carregando unidades..." style={{ display: "block", marginTop: 50 }} />;
  if (erro) return <Alert type="error" showIcon message="Erro ao carregar unidades" description={erro} />;

  const unidadesParaExibir = selectedUnidadeId === "all"
    ? unidades
    : unidades.filter((u) => getId(u) === selectedUnidadeId);

  return (
    <div>
      {/* BANNER HERO */}
      <div className="glass-panel hero-banner">
        <div className="hero-glow"></div>
        <Row align="middle" justify="space-between">
          <Col xs={24}>
            <Title level={2} className="text-claro" style={{ margin: 0, fontWeight: 800 }}>
              Painel de Inteligência <span style={{ color: "#38BDF8" }}>Multi-tenant</span>
            </Title>
            <Paragraph className="text-muted" style={{ fontSize: "16px", marginTop: "12px", maxWidth: "600px" }}>
              Monitore o desempenho, a saúde da carteira e o funil de vendas de todas as unidades da Distribuidora Vetor em tempo real.
            </Paragraph>
          </Col>
        </Row>
      </div>

      {/* ÁREA DE FILTROS */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }} gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Title 
            level={4} 
            className="title-gradient" 
            style={{ 
              fontSize: 22, 
              margin: 0,
              display: "block"
            }}
          >
            Desempenho das Unidades
          </Title>
        </Col>
        
        <Col xs={24} md={12} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Select
            size="large"
            style={{ width: 300, maxWidth: "100%" }}
            value={selectedUnidadeId}
            onChange={(value) => setSelectedUnidadeId(value)}
            className="custom-select-dark"
          >
            <Option value="all">Todas as Unidades</Option>
            {unidades.map((unidade) => (
              <Option key={getId(unidade)} value={getId(unidade)}>{getNome(unidade)}</Option>
            ))}
          </Select>
        </Col>
      </Row>

      {/* Grid de Cards */}
      <Row justify={selectedUnidadeId === "all" ? "start" : "center"} gutter={[24, 24]}>
        {unidadesParaExibir.map((unidade) => (
          <Col xs={24} md={selectedUnidadeId === "all" ? 12 : 16} lg={selectedUnidadeId === "all" ? 6 : 12} key={getId(unidade)}>
            <CardUnidade unidade={unidade} />
          </Col>
        ))}
      </Row>
    </div>
  );
}