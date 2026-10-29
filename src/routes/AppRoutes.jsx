import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import VisaoGeral from "../components/visaogeral/VisaoGeral.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Redireciona a página inicial para a visão geral */}
        <Route index element={<Navigate to="/visao-geral" replace />} />

        <Route path="visao-geral" element={<VisaoGeral />} />
      </Route>
    </Routes>
  );
}