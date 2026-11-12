
import dataset from '../../data/dataset_painel_multitenant.json'; // Ajuste o caminho conforme o seu projeto
import Unidade from '../dominio/Unidade.mjs';

export default class UnidadeDAO {
  async listar() {
    return new Promise((resolve) => {
      // Como seu construtor recebe um 'obj', basta passar o objeto 't' direto
      const unidades = dataset.tenants.map(t => new Unidade(t));
      resolve(unidades);
    });
  }

  async buscarPorId(id) {
    return new Promise((resolve) => {
      const tenant = dataset.tenants.find(t => t.id === id);
      resolve(tenant ? new Unidade(tenant) : null);
    });
  }
}