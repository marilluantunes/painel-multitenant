import { obterArray } from '../../config/api.js';
import Unidade from '../dominio/Unidade.mjs';

export default class UnidadeDAO {
  async listar() {
    const registros = await obterArray('/unidades');
    return registros.map((registro) => new Unidade(registro));
  }

  async buscarPorId(id) {
    const unidades = await this.listar();
    return unidades.find((unidade) => unidade.getId() === id) ?? null;
  }
}