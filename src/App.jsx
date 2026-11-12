import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import TesteDAO from "./components/TesteDAO.jsx";

export default function App() {
  return (
    <Router>
      <TesteDAO /> 
      <AppRoutes />
    </Router>
  );
}