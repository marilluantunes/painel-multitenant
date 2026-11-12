export default class RegistroSaude {
  #data;
  #score;

  constructor(obj) {
    this.#data = obj.data;
    this.#score = obj.score;
  }
  getData() { return this.#data; }
  getScore() { return this.#score; }
}