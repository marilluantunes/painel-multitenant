export default class Evento {
  #data;
  #tipo;
  #titulo;
  #valor;

  constructor(obj) {
    this.#data = obj.data;
    this.#tipo = obj.tipo;
    this.#titulo = obj.titulo;
    this.#valor = obj.valor || null;
  }
  getData() { return this.#data; }
  getTipo() { return this.#tipo; }
  getTitulo() { return this.#titulo; }
  getValor() { return this.#valor; }
}