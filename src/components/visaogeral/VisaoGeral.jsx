import { useEffect, useState } from "react";
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

    async function carregarUnidades() {
      try {
        const dados = await dao.listar();
        if (ativo) {
          setUnidades(dados);
        }
      } catch (error) {
        if (ativo) {
          setErro(error.message);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarUnidades();
    return () => {
      ativo = false;
    };
  }, []);

  const unidadesParaExibir = selectedUnidadeId === "all"
    ? unidades
    : unidades.filter((unidade) => getId(unidade) === selectedUnidadeId);

  if (carregando) {
    return <Spin tip="Carregando unidades..." style={{ display: "block", marginTop: 32 }} />;
  }

  if (erro) {
    return (
      <Alert
        type="error"
        showIcon
        message="Erro ao carregar unidades"
        description={erro}
      />
    );
  }

  return (
    <div>
      <Title level={3}>Visão Geral</Title>
      <Paragraph type="secondary">
        Selecione uma unidade para visualizar os indicadores ou veja todas de uma vez.
      </Paragraph>

      <Select
        style={{ width: 300, marginBottom: 24 }}
        value={selectedUnidadeId}
        onChange={(value) => setSelectedUnidadeId(value)}
      >
        <Option value="all">Todas as Unidades</Option>
        {unidades.map((unidade) => (
          <Option key={getId(unidade)} value={getId(unidade)}>
            {getNome(unidade)}
          </Option>
        ))}
      </Select>

      {unidadesParaExibir.length === 0 ? (
        <Alert
          type="info"
          showIcon
          message="Nenhuma unidade encontrada"
          description="A API não retornou registros para o filtro atual."
        />
      ) : (
        <Row justify="center" gutter={[16, 16]}>
          {unidadesParaExibir.map((unidade) => (
            <Col
              xs={24}
              md={selectedUnidadeId === "all" ? 12 : 16}
              lg={selectedUnidadeId === "all" ? 6 : 12}
              key={getId(unidade)}
            >
              <CardUnidade unidade={unidade} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}