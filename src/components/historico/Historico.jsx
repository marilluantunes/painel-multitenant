import { useEffect, useState } from "react";
import { Card, Tag, Timeline, Typography, Alert, Select, Row, Col, Spin } from "antd";
import { 
  ShoppingCartOutlined, 
  LineChartOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  SyncOutlined, 
  InfoCircleOutlined 
} from "@ant-design/icons";
import ClienteDAO from "../../objetos/dao/ClienteDAO.mjs";


const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// --- FUNÇÕES DE LEITURA DE DADOS ---
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

// mapeamento de estilos por tipo de evento
const getEventStyle = (tipo) => {
  const t = String(tipo).toLowerCase();
  
  if (t.includes('compra') || t.includes('pedido')) {
    return { color: '#10b981', icon: <ShoppingCartOutlined /> };
  }
  if (t.includes('score')) {
    return { color: '#38BDF8', icon: <LineChartOutlined /> };
  }
  if (t.includes('sucesso')) {
    return { color: '#10b981', icon: <CheckCircleOutlined /> };
  }
  if (t.includes('tarefa')) {
    return { color: '#fa8c16', icon: <ClockCircleOutlined /> };
  }
  if (t.includes('cluster')) {
    return { color: '#D946EF', icon: <SyncOutlined /> };
  }
  
  return { color: '#94A3B8', icon: <InfoCircleOutlined /> };
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
    // CORRIGIDO: 'tip' virou 'description'
    return <Spin description="Carregando histórico..." style={{ display: "block", marginTop: 50 }} />;
  }

  if (erro) {
    return (
      <Alert
        type="error"
        showIcon
        message="Erro ao consultar clientes"
        description={erro}
        style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#fca5a5" }}
      />
    );
  }

  return (
    <div>
      {/* BANNER HERO */}
      <div className="glass-panel hero-banner">
        <div className="hero-glow"></div>
        <Title level={2} className="text-claro" style={{ margin: 0, fontWeight: 800 }}>
          Timeline de <span style={{ color: "#38BDF8" }}>Cliente</span>
        </Title>
        <Paragraph className="text-muted" style={{ fontSize: "16px", marginTop: "8px", maxWidth: "600px", margin: 0 }}>
          Acompanhe a jornada completa de compras, tarefas e mudanças de status de cada cliente da Distribuidora Vetor.
        </Paragraph>
      </div>

      {/* Área de Filtros */}
      <div className="flex-between" style={{ marginBottom: 24 }}>
        <Title level={4} className="title-gradient" style={{ fontSize: 22 }}>
          Histórico de Eventos
        </Title>

        <Select
          size="large"
          style={{ width: 300 }}
          value={selectedClienteId}
          onChange={(value) => setSelectedClienteId(value)}
          className="custom-select-dark"
        >
          <Option value="all">Todos os Clientes</Option>
          {clientes.map((cliente) => (
            <Option key={getField(cliente, "getId", "id")} value={getField(cliente, "getId", "id")}>
              {getField(cliente, "getNome", "nome")}
            </Option>
          ))}
        </Select>
      </div>

      {clientesParaExibir.length === 0 ? (
        <Alert
          type="info"
          showIcon
          message="Nenhum cliente encontrado"
          description="Não há registros para o filtro selecionado no momento."
          style={{ background: "rgba(56, 189, 248, 0.1)", border: "1px solid rgba(56, 189, 248, 0.3)", color: "#bae6fd" }}
        />
      ) : (
        <Row justify={selectedClienteId === "all" ? "start" : "center"} gutter={[24, 24]}>
          {clientesParaExibir.map((cliente) => {
            //  lógica de extração de eventos
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
                  title={<Text strong className="text-claro" style={{ fontSize: 18 }}>{getField(cliente, "getNome", "nome")}</Text>}
                  extra={
                    <Tag className="tenant-tag">
                      {getField(cliente, "getTenantNome", "tenantNome")}
                    </Tag>
                  }
                  className="client-card"
                >
                  <Timeline
                    items={eventos.map((evento, index) => {
                      const tipo = getEventoField(evento, "getTipo", "tipo");
                      const { color, icon } = getEventStyle(tipo);
                      
                      return {
                        key: `${clienteId}-${index}`,
                        // Visual: A classe base fica no CSS, as cores dinâmicas ficam no JS
                        // CORRIGIDO: 'dot' virou 'icon'
                        icon: (
                          <div 
                            className="timeline-dot"
                            style={{ 
                              background: `${color}20`, 
                              border: `2px solid ${color}`, 
                              color: color,
                              boxShadow: `0 0 10px ${color}40`
                            }}
                          >
                            {icon}
                          </div>
                        ),
                        // CORRIGIDO: 'children' virou 'content'
                        content: (
                          <div style={{ marginTop: 2, marginBottom: 16 }}>
                            <Text className="text-claro" style={{ fontSize: 14, fontWeight: 500, display: "block" }}>
                              {getEventoField(evento, "getTitulo", "titulo")}
                            </Text>
                            <Text className="text-muted" style={{ fontSize: 12, display: "flex", alignItems: "center", marginTop: 4 }}>
                              {new Date(getEventoField(evento, "getData", "data")).toLocaleString("pt-BR", {
                                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                              })}
                            </Text>
                          </div>
                        ),
                      };
                    })}
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