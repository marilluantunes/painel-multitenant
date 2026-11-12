import { useEffect, useState } from "react";
import { Alert, Card, Spin, Table, Typography, Tag } from "antd";
import UnidadeDAO from "../../objetos/dao/UnidadeDAO.mjs";

const { Title } = Typography;

const getField = (obj, getterName, fieldName, fallback = "") => {
  if (typeof obj?.[getterName] === "function") {
    return obj[getterName]();
  }
  return obj?.[fieldName] ?? fallback;
};

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

  const colunas = [
    { title: "Unidade", dataIndex: "nome", key: "nome", render: (_, registro) => <strong>{getField(registro, "getNome", "nome")}</strong> },
    { title: "Porte", dataIndex: "porte", key: "porte", render: (_, registro) => <Tag color="blue">{getField(registro, "getPorte", "porte")}</Tag> },
    { title: "Clientes", dataIndex: "carteiraTotalClientes", key: "carteiraTotalClientes", render: (_, registro) => Number(getField(registro, "getCarteiraTotalClientes", "carteiraTotalClientes", 0)).toLocaleString("pt-BR") },
    { title: "Receita (90d)", dataIndex: "receitaCarteira90d", key: "receitaCarteira90d", render: (_, registro) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(getField(registro, "getReceitaCarteira90d", "receitaCarteira90d", 0))) },
    { title: "Risco Absoluto", dataIndex: "riscoAbsoluto", key: "riscoAbsoluto", render: (_, registro) => <Tag color="red">{getField(registro, "getRiscoAbsoluto", "riscoAbsoluto")}</Tag> },
  ];

  if (carregando) {
    return <Spin tip="Carregando comparação..." style={{ display: "block", marginTop: 32 }} />;
  }

  if (erro) {
    return (
      <Alert
        type="error"
        showIcon
        message="Erro ao consultar unidades"
        description={erro}
      />
    );
  }

  return (
    <div>
      <Title level={3}>Comparativo entre Unidades</Title>
      <Alert message="Aviso de Protótipo" description="Dados obtidos da API do n8n em tempo real." type="warning" showIcon style={{ marginBottom: 24 }} />
      <Card title="Desempenho Geral das Unidades">
        {unidades.length === 0 ? (
          <Alert
            type="info"
            showIcon
            message="Nenhuma unidade disponível"
            description="A consulta da API não retornou registros para comparação."
          />
        ) : (
          <Table columns={colunas} dataSource={unidades} rowKey={(registro) => getField(registro, "getId", "id")} pagination={false} scroll={{ x: true }} />
        )}
      </Card>
    </div>
  );
}