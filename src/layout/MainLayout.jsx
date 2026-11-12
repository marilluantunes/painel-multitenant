import { Layout, Menu, Typography } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import { DashboardOutlined, ApartmentOutlined, TeamOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function MainLayout() {
  // Pega a URL atual para destacar a aba ativa no menu
  const location = useLocation();

  // Configuração dos itens do menu com links do React Router
  const items = [
    { key: "/visao-geral", icon: <DashboardOutlined />, label: <Link to="/visao-geral">Visão Geral</Link> },
    { key: "/comparativo", icon: <ApartmentOutlined />, label: <Link to="/comparativo">Comparativo entre Unidades</Link> },
    { key: "/historico", icon: <TeamOutlined />, label: <Link to="/historico">Histórico de Clientes</Link> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Barra lateral mantida */}
      <Sider breakpoint="md" collapsedWidth="0" theme="dark">
        <div style={{ color: "white", padding: 20, fontSize: 20, fontWeight: "bold" }}>
          PRIMORA
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]} 
          items={items}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: "0 24px", display: "flex", alignItems: "center" }}>
          <Title level={4} style={{ margin: 0 }}>
            Painel de Inteligência Multi-tenant - Distribuidora Vetor
          </Title>
        </Header>

        <Content style={{ margin: 24 }}>
          {/* O Outlet renderiza as telas filhas (Visão Geral, Comparativo, Histórico) */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}