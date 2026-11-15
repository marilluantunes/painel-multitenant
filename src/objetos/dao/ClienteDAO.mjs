import { obterArray } from '../../config/api.js';
import Cliente from '../dominio/Cliente.mjs';

export default class ClienteDAO {
  async listar() {
    const registros = await obterArray('/clientes');
    return registros.map((registro) => new Cliente(registro));
  }

  async buscarPorId(id) {
    const clientes = await this.listar();
    return clientes.find((cliente) => cliente.getId() === id) ?? null;
  }

  async listarPorUnidade(tenantId) {
    const clientes = await this.listar();
    return clientes.filter((cliente) => cliente.getTenantId() === tenantId);
  }
}