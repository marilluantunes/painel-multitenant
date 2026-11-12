import { useEffect } from "react";
import UnidadeDAO from "../objetos/dao/UnidadeDAO.mjs";
import ClienteDAO from "../objetos/dao/ClienteDAO.mjs";

export default function TesteDAO() {
  useEffect(() => {
    async function rodarTeste() {
      console.clear(); // Limpa o console para ficar mais fácil de ver
      console.log("=== INICIANDO TESTE DOS DAOs (SPRINT 5) ===");
      
      const unidadeDAO = new UnidadeDAO();
      const clienteDAO = new ClienteDAO();

      // Testando o UnidadeDAO
      const unidades = await unidadeDAO.listar();
      console.log("1. Listar Unidades:", unidades);
      
      const unidadeBuscada = await unidadeDAO.buscarPorId("vetor-sul");
      console.log("2. Buscar Unidade por ID (vetor-sul):", unidadeBuscada);

      // Testando o ClienteDAO
      const clientes = await clienteDAO.listar();
      console.log("3. Listar Clientes:", clientes);
      
      const clientesSul = await clienteDAO.listarPorUnidade("vetor-sul");
      console.log("4. Listar Clientes da Unidade vetor-sul:", clientesSul);

      console.log("=== FIM DO TESTE ===");
    }
    rodarTeste();
  }, []);

  return null; // Componente invisível
}