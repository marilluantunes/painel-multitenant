import { useEffect, useState } from "react";
import { Card, Tag, Timeline, Typography, Alert, Select, Row, Col, Spin } from "antd";
import ClienteDAO from "../../objetos/dao/ClienteDAO.mjs";

const { Title, Text } = Typography;
const { Option } = Select;

const getField = (obj, getterName, fieldName, fallback = "") => {
  if (typeof obj?.[getterName] === "function") {
    return obj[getterName]();
  }
  return obj?.[fieldName] ?? fallback;
};

const getEventoField = (evento, getterName, fieldName, fallback = "") => {
  if (typeof evento?.[getterName] === "function") {
    return evento[getterName]();
  }
  return evento?.[fieldName] ?? fallback;
};

export default function Historico() {
  const [selectedClienteId, setSelectedClienteId] = useState("all");
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;
    const dao = new ClienteDAO();

    async function carregar() {
      try {
        const dados = await dao.listar();
        if (ativo) setClientes(dados);
      } catch (error) {
        if (ativo) setErro(error.message);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();
    return () => { ativo = false; };
  }, []);

  const clientesParaExibir = selectedClienteId === "all"
    ? clientes
    : clientes.filter((cliente) => getField(cliente, "getId", "id") === selectedClienteId);

  if (carregando) {
    return <Spin tip="Carregando histórico..." style={{ display: "block", marginTop: 32 }} />;
  }

  if (erro) {
    return (
      <Alert
        type="error"
        showIcon
        message="Erro ao consultar clientes"
        description={erro}
      />
    );
  }

  return (
    <div>
      <Title level={3}>Histórico de Clientes</Title>
      <Alert
        message="Selecione um cliente para visualizar os eventos ou veja todos de uma vez."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Select
        style={{ width: 300, marginBottom: 24 }}
        value={selectedClienteId}
        onChange={(value) => setSelectedClienteId(value)}
      >
        <Option value="all">Todos os Clientes</Option>
        {clientes.map((cliente) => (
          <Option key={getField(cliente, "getId", "id")} value={getField(cliente, "getId", "id")}>
            {getField(cliente, "getNome", "nome")}
          </Option>
        ))}
      </Select>

      {clientesParaExibir.length === 0 ? (
        <Alert
          type="info"
          showIcon
          message="Nenhum cliente encontrado"
          description="Não há registros para o filtro selecionado no momento."
        />
      ) : (
        <Row justify={selectedClienteId === "all" ? "start" : "center"} gutter={[16, 16]}>
          {clientesParaExibir.map((cliente) => {
            const eventos = typeof cliente?.getEventos === "function" ? cliente.getEventos() : (cliente?.eventos ?? []);
            const clienteId = getField(cliente, "getId", "id");

            return (
              <Col
                xs={24}
                md={selectedClienteId === "all" ? 12 : 16}
                lg={selectedClienteId === "all" ? 12 : 12}
                key={clienteId}
              >
                <Card
                  title={<Title level={4} style={{ margin: 0 }}>{getField(cliente, "getNome", "nome")}</Title>}
                  extra={<Tag color="blue">{getField(cliente, "getTenantNome", "tenantNome")}</Tag>}
                  style={{ height: "100%", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                >
                  <Timeline
                    items={eventos.map((evento, index) => ({
                      key: `${clienteId}-${index}`,
                      color: getEventoField(evento, "getTipo", "tipo") === "compra" ? "green" : getEventoField(evento, "getTipo", "tipo") === "health_score" ? "blue" : "gray",
                      children: (
                        <div>
                          <Text strong>{getEventoField(evento, "getTitulo", "titulo")}</Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {new Date(getEventoField(evento, "getData", "data")).toLocaleString("pt-BR")}
                          </Text>
                        </div>
                      ),
                    }))}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}