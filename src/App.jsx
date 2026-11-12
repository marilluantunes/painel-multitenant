
import { useState } from "react";

import {
  Layout,
  Menu,
  Table,
  Timeline,
  Card,
  Row,
  Col,
  Typography,
  Space
} from "antd";

import {
  DashboardOutlined,
  ApartmentOutlined,
  TeamOutlined
} from "@ant-design/icons";

import dados from "./data/dataset_painel_multitenant.json";
import CardUnidade from "./components/CardUnidade";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function App() {
  const [tela, setTela] = useState("visao");

  const colunas = [
    {
      title: "Unidade",
      dataIndex: "nome",
      key: "nome"
    },
    {
      title: "Porte",
      dataIndex: "porte",
      key: "porte"
    },
    {
      title: "Total de Clientes",
      dataIndex: "clientes",
      key: "clientes"
    },
    {
      title: "Engajamento",
      dataIndex: "engajamento",
      key: "engajamento",
      render: (valor) => `${valor}%`
    },
    {
      title: "Geradas",
      dataIndex: "geradas",
      key: "geradas"
    },
    {
      title: "Sucesso",
      dataIndex: "sucesso",
      key: "sucesso"
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="md" collapsedWidth="0">
        <div style={{
          color: "white",
          padding: 20,
          fontSize: 20,
          fontWeight: "bold"
        }}>
          PRIMORA
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[tela]}
          onClick={({ key }) => setTela(key)}
          items={[
            {
              key: "visao",
              icon: <DashboardOutlined />,
              label: "Visão Geral"
            },
            {
              key: "comparativo",
              icon: <ApartmentOutlined />,
              label: "Comparativo entre Unidades"
            },
            {
              key: "historico",
              icon: <TeamOutlined />,
              label: "Histórico de Clientes"
            }
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{
          background: "#fff",
          padding: "0 24px",
          display: "flex",
          alignItems: "center"
        }}>
          <Title level={4} style={{ margin: 0 }}>
            Painel de Inteligência Multi-tenant
          </Title>
        </Header>

        <Content style={{ margin: 24 }}>

          {tela === "visao" && (
            <>
              <Title level={3}>Visão Geral</Title>

              <p>
                Resumo das unidades regionais da Distribuidora Vetor
                (Dados Fictícios).
              </p>

              <Row gutter={[16, 16]}>
                {dados.unidades.map((unidade) => (
                  <Col
                    xs={24}
                    sm={12}
                    lg={12}
                    xl={6}
                    key={unidade.id}
                  >
                    <CardUnidade unidade={unidade} />
                  </Col>
                ))}
              </Row>
            </>
          )}

          {tela === "comparativo" && (
            <>
              <Title level={3}>
                Comparativo entre Unidades
              </Title>

              <Card>
                <Table
                  columns={colunas}
                  dataSource={dados.unidades}
                  rowKey="id"
                  pagination={false}
                  scroll={{ x: true }}
                />
              </Card>
            </>
          )}

          {tela === "historico" && (
            <>
              <Title level={3}>
                Histórico de Clientes
              </Title>

              <Row gutter={[16, 16]}>
                {dados.clientes.map((cliente) => (
                  <Col xs={24} lg={12} key={cliente.id}>
                    <Card title={cliente.nome}>
                      <Space direction="vertical">
                        <p>
                          <strong>Identificação:</strong>{" "}
                          {cliente.documento}
                        </p>

                        <p>
                          <strong>Unidade:</strong>{" "}
                          {cliente.unidade}
                        </p>

                        <Title level={5}>Eventos</Title>

                        <Timeline
                          items={cliente.eventos.map((evento) => ({
                            key: evento.id,
                            children: (
                              <div>
                                <strong>{evento.data}</strong>
                                <p>{evento.descricao}</p>
                              </div>
                            )
                          }))}
                        />
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

        </Content>
      </Layout>
    </Layout>
  );
}

