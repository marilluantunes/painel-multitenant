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

  if (carregando) return <Spin tip="Carregando unidades..." style={{ display: "block", marginTop: 50 }} />;
  if (erro) return <Alert type="error" showIcon message="Erro ao carregar unidades" description={erro} />;

  const unidadesParaExibir = selectedUnidadeId === "all"
    ? unidades
    : unidades.filter((u) => getId(u) === selectedUnidadeId);

  return (
    <div>
      {/* BANNER HERO - Totalmente estilizado pelo index.css */}
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

      {/* Área de Filtros */}
      <div className="flex-between" style={{ marginBottom: 24 }}>
        <Title level={4} className="title-gradient" style={{ fontSize: 22 }}>
          Desempenho das Unidades
        </Title>
        
        <Select
          size="large"
          style={{ width: 300 }}
          value={selectedUnidadeId}
          onChange={(value) => setSelectedUnidadeId(value)}
          className="custom-select-dark" // Usa o estilo escuro do index.css
        >
          <Option value="all">Todas as Unidades</Option>
          {unidades.map((unidade) => (
            <Option key={getId(unidade)} value={getId(unidade)}>{getNome(unidade)}</Option>
          ))}
        </Select>
      </div>

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