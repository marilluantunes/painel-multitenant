import { Layout, Menu, Typography } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import { DashboardOutlined, BarChartOutlined, HistoryOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function MainLayout() {
  // hook para saber em qual página o usuário está
  const location = useLocation();

  // itens do menu de navegação
  const items = [
    { key: "/visao-geral", icon: <DashboardOutlined />, label: <Link to="/visao-geral">Visão Geral</Link> },
    { key: "/comparativo", icon: <BarChartOutlined />, label: <Link to="/comparativo">Comparativo</Link> },
    { key: "/historico", icon: <HistoryOutlined />, label: <Link to="/historico">Histórico</Link> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Title level={3} style={{ color: "white", margin: 0, marginRight: 40 }}>
          Distribuidora Vetor
        </Title>
        
        {/* menu horizontal do Ant Design */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]} // destaca a aba ativa
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      <Content style={{ padding: "24px", background: "#f0f2f5" }}>
        {/* o Outlet é onde as telas (Visão Geral, etc.) vão aparecer */}
        <Outlet />
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Protótipo com Dados Fictícios - Desafio 2 (Primora)
      </Footer>
    </Layout>
  );
}