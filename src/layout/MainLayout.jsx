import { Layout, Menu, Typography } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import { DashboardOutlined, BarChartOutlined, HistoryOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;
const { Text } = Typography;

export default function MainLayout() {
  const location = useLocation();
  const items = [
    { key: "/visao-geral", icon: <DashboardOutlined />, label: <Link to="/visao-geral">Visão Geral</Link> },
    { key: "/comparativo", icon: <BarChartOutlined />, label: <Link to="/comparativo">Comparativo</Link> },
    { key: "/historico", icon: <HistoryOutlined />, label: <Link to="/historico">Histórico</Link> },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "transparent", fontFamily: "'Inter', system-ui, sans-serif", overflow: "hidden" }}>
      
      {/* FUNDO: CYBER GRID */}
      <div style={{ 
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        zIndex: 0, pointerEvents: "none" 
      }} />
      <div style={{ 
        position: "fixed", top: "-10%", left: "50%", transform: "translateX(-50%)",
        width: "60vw", height: "40vh", 
        background: "radial-gradient(ellipse at top, rgba(56, 189, 248, 0.15) 0%, transparent 70%)", 
        filter: "blur(60px)", zIndex: 0, pointerEvents: "none" 
      }} />

      {/* TOP BAR */}
      <div className="top-bar-contacts" style={{ padding: "16px 48px", display: "flex", justifyContent: "flex-end", gap: "32px", position: "relative", zIndex: 10 }}>
        <Text style={{ color: "#94A3B8", fontSize: 12 }}><PhoneOutlined style={{ marginRight: 6 }}/> 061 3221-1035</Text>
        <Text style={{ color: "#94A3B8", fontSize: 12 }}><MailOutlined style={{ marginRight: 6 }}/> comercial@primora.com.br</Text>
      </div>

      {/* CABEÇALHO FLUTUANTE (Glassmorphism) */}
      <div className="main-header" style={{ 
        margin: "0 48px", padding: "0 32px", height: "80px", display: "flex", alignItems: "center", 
        background: "rgba(255, 255, 255, 0.03)", 
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.1)", 
        borderRadius: "24px", 
        position: "sticky", top: 16, zIndex: 50,
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
      }}>
        
        {/* Logo */}
        <div className="logo-container" style={{ display: "flex", alignItems: "center", marginRight: 80 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="logo-text-primora" style={{ color: "#FFFFFF", fontSize: "1.6rem", fontWeight: "900", letterSpacing: "-1px", textShadow: "0 0 20px rgba(255, 255, 255, 0.2)" }}>
              PRIMORA
            </div>
            
            <div className="logo-divider" style={{ width: "3px", height: "26px", background: "linear-gradient(to bottom, #38BDF8, #3B82F6)", margin: "0 16px", borderRadius: "2px", boxShadow: "0 0 12px rgba(56, 189, 248, 0.6)" }} />

            <div className="logo-text-vetor" style={{ color: "#38BDF8", fontSize: "1.2rem", fontWeight: "400", letterSpacing: "4px", textTransform: "uppercase" }}>
              Vetor
            </div>
          </div>
        </div>

        {/* Menu */}
        <Menu
          mode="horizontal"
          theme="dark" 
          selectedKeys={[location.pathname]}
          items={items}
          className="menu-aurora"
          // O overflowedIndicator é o "..." que aparece quando não cabe tudo
          overflowedIndicator={<span style={{ color: '#38BDF8', fontSize: 20 }}>...</span>}
          style={{ flex: 1, minWidth: 0, borderBottom: "none", background: "transparent", fontSize: "14px", fontWeight: 500 }}
        />
      </div>

      {/* CONTEÚDO */}
      <Content className="main-content" style={{ padding: "40px 48px", position: "relative", zIndex: 1 }}>
        <Outlet />
      </Content>

      <Footer style={{ background: "transparent", color: "#64748B", textAlign: "center", padding: "32px", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Protótipo Fictício - Distribuidora Vetor © 2026</div>
      </Footer>

    </Layout>
  );
}