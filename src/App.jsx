import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider, theme } from "antd"; // Importação do 'theme'
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        // Ativa o algoritmo de modo escuro nativo do Ant Design
        algorithm: theme.darkAlgorithm,
        
        token: {
          // Cores da Identidade Vetor 
          colorPrimary: "#38BDF8", 
          colorInfo: "#38BDF8",
          
          // Cores de Fundo e Texto Globais
          colorBgBase: "#050510", 
          colorTextBase: "#F8FAFC",
          
          // Tipografia e Bordas
          fontFamily: "'Inter', system-ui, sans-serif",
          borderRadius: 8, 
        },
      }}
    >
      <Router>
        <AppRoutes />
      </Router>
    </ConfigProvider>
  );
}