export default class Unidade {
  #id;
  #nome;
  #porte;
  #carteiraTotalClientes;
  #receitaCarteira90d;
  #engagementEvents7d;
  #activeUsers7d;
  #engagementTrend30d;
  #funnel90d;
  #funnelTrend30d;
  #healthDistribution;
  #riscoAbsoluto;
  #riscoDrivers;

  constructor(obj) {
    this.#id = obj.id;
    this.#nome = obj.nome;
    this.#porte = obj.porte;
    this.#carteiraTotalClientes = obj.carteiraTotalClientes;
    this.#receitaCarteira90d = obj.receitaCarteira90d;
    this.#engagementEvents7d = obj.engagementEvents7d ?? 0;
    this.#activeUsers7d = obj.activeUsers7d ?? 0;
    this.#engagementTrend30d = obj.engagementTrend30d ?? [];
    this.#funnel90d = obj.funnel90d ?? {};
    this.#funnelTrend30d = obj.funnelTrend30d ?? [];
    this.#healthDistribution = obj.healthDistribution ?? {};
    this.#riscoAbsoluto = obj.riscoAbsoluto ?? 0;
    this.#riscoDrivers = obj.riscoDrivers ?? [];
  }

  getId() { return this.#id; }
  getNome() { return this.#nome; }
  getPorte() { return this.#porte; }
  getCarteiraTotalClientes() { return this.#carteiraTotalClientes; }
  getReceitaCarteira90d() { return this.#receitaCarteira90d; }
  getEngagementEvents7d() { return this.#engagementEvents7d; }
  getActiveUsers7d() { return this.#activeUsers7d; }
  getEngagementTrend30d() { return [...this.#engagementTrend30d]; }
  getFunnel90d() { return { ...this.#funnel90d }; }
  getFunnelTrend30d() { return [...this.#funnelTrend30d]; }
  getHealthDistribution() { return { ...this.#healthDistribution }; }
  getRiscoAbsoluto() { return this.#riscoAbsoluto; }
  getRiscoDrivers() { return [...this.#riscoDrivers]; }
}