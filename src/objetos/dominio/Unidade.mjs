export default class Unidade {
  #id;
  #nome;
  #porte;
  #carteiraTotalClientes;
  #receitaCarteira90d;
  #riscoAbsoluto;
  #funnel90d;

  constructor(obj) {
    this.#id = obj.id;
    this.#nome = obj.nome;
    this.#porte = obj.porte;
    this.#carteiraTotalClientes = obj.carteiraTotalClientes;
    this.#receitaCarteira90d = obj.receitaCarteira90d;
    this.#riscoAbsoluto = obj.riscoAbsoluto;
    this.#funnel90d = obj.funnel90d;
  }
  getId() { return this.#id; }
  getNome() { return this.#nome; }
  getPorte() { return this.#porte; }
  getCarteiraTotalClientes() { return this.#carteiraTotalClientes; }
  getReceitaCarteira90d() { return this.#receitaCarteira90d; }
  getRiscoAbsoluto() { return this.#riscoAbsoluto; }
  getFunnel90d() { return this.#funnel90d; }
}