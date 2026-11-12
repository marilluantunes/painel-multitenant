import Evento from "./Evento.mjs";
import RegistroSaude from "./RegistroSaude.mjs";

export default class Cliente {
  #id;
  #nome;
  #tenantId;
  #tenantNome;
  #eventos;
  #healthSeries;

  constructor(obj) {
    this.#id = obj.id;
    this.#nome = obj.nome;
    this.#tenantId = obj.tenantId;
    this.#tenantNome = obj.tenantNome;
    
    // Transforma os arrays em instâncias de classes
    this.#eventos = (obj.eventos || []).map(e => new Evento(e));
    this.#healthSeries = (obj.healthSeries || []).map(h => new RegistroSaude(h));
  }

  getId() { return this.#id; }
  getNome() { return this.#nome; }
  getTenantId() { return this.#tenantId; }
  getTenantNome() { return this.#tenantNome; }
  
  // Cópias para não expor referência mutável
  getEventos() { return [...this.#eventos]; }
  getHistoricoSaude() { return [...this.#healthSeries]; }
}