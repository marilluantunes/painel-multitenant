import dataset from '../data/dataset_painel_multitenant.json'; // Ajuste o caminho conforme o seu projeto
import Cliente from '../models/Cliente.mjs';

export default class ClienteDAO {
  async listar() {
    return new Promise((resolve) => {
      const clientes = dataset.clientes.map(c => new Cliente(c));
      resolve(clientes);
    });
  }

  async buscarPorId(id) {
    return new Promise((resolve) => {
      const cliente = dataset.clientes.find(c => c.id === id);
      resolve(cliente ? new Cliente(cliente) : null);
    });
  }

  async listarPorUnidade(tenantId) {
    return new Promise((resolve) => {
      const clientesFiltrados = dataset.clientes
        .filter(c => c.tenantId === tenantId)
        .map(c => new Cliente(c));
      
      resolve(clientesFiltrados);
    });
  }
}