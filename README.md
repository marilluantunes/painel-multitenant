# Painel Primora

Painel web de inteligência multi-tenant desenvolvido como parte da Sprint 1 do projeto integrador **Bolsa Futuro Digital**, em parceria com a Primora. A aplicação apresenta indicadores e atividades de diferentes unidades em uma interface única, com navegação entre visão geral, comparação de desempenho e histórico.

> Esta versão é um protótipo de interface. Os indicadores e registros são demonstrativos, definidos no código, e ainda não são carregados de uma API ou banco de dados.

## Funcionalidades

- **Visão Geral:** apresenta faturamento, quantidade de pedidos, unidades ativas e desempenho por unidade.
- **Comparativo:** permite consultar lado a lado o faturamento, os pedidos e a variação das unidades.
- **Histórico:** exibe uma lista demonstrativa de atualizações recentes.
- **Navegação:** o endereço inicial redireciona para a Visão Geral; caminhos desconhecidos também retornam para essa tela.
- **Layout responsivo:** adapta o cabeçalho, a navegação e o conteúdo para diferentes larguras de tela. Tabelas extensas podem ser roladas horizontalmente em dispositivos menores.

## Tecnologias

- React 19
- Vite 7
- Ant Design 6 e Ant Design Icons
- React Router 7
- Oxlint

## Pré-requisitos

- Node.js em uma versão compatível com o Vite 8.
- npm, incluído na instalação do Node.js.

## Configuração da API (Sprint 6)

O frontend agora consome a API REST do workflow n8n em vez do arquivo JSON local durante a execução das telas.

Crie um arquivo `.env.local` na raiz do projeto com:

```env
VITE_API_BASE_URL=https://n8n.incluc0de.com.br/webhook/primora/v1
```

Endpoints utilizados:

- `GET /unidades` → retorna as unidades
- `GET /clientes` → retorna os clientes e seus eventos/healthSeries

Se a API não responder ou houver CORS, a interface exibirá mensagem de erro visualmente sem quebrar a aplicação.

## Executar localmente

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/marilluantunes/painel-multitenant.git
cd painel-multitenant
```

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abra no navegador o endereço informado pelo Vite no terminal. Por padrão, é `http://localhost:5173/`.

Se o projeto já estiver baixado, execute os comandos a partir da pasta que contém o `package.json`:

```bash
npm install
npm run dev
```

## Rotas

| Caminho | Tela |
| --- | --- |
| `/` | Redireciona para Visão Geral |
| `/visao-geral` | Indicadores e desempenho das unidades |
| `/comparativo` | Comparação entre unidades |
| `/historico` | Atividades recentes |

## Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Gera a versão de produção em `dist/`. |
| `npm run preview` | Serve localmente a versão de produção já compilada. Execute `npm run build` antes. |
| `npm run lint` | Analisa o código com Oxlint. |

## Estrutura principal

```text
src/
├── App.jsx                 # Configura o BrowserRouter da aplicação
├── main.jsx                # Ponto de entrada do React e importação do Ant Design
├── index.css               # Estilos globais (reset de margens)
├── App.css                 # Estilos adicionais (mantido vazio)
│
├── data/
│   └── dataset_painel_multitenant.json  # Fonte de dados oficial (JSON)
│
├── layout/
│   └── MainLayout.jsx      # Cabeçalho, menu lateral (Sidebar) e área de conteúdo (Outlet)
│
├── routes/
│   └── AppRoutes.jsx       # Definição das rotas conectando URLs aos componentes
│
├── components/             # Telas e componentes visuais
│   ├── visaogeral/
│   │   ├── VisaoGeral.jsx  # Tela principal com filtro e mapeamento dos cartões
│   │   └── CardUnidade.jsx # Componente reutilizável (Props) com métricas da unidade
│   ├── comparativo/
│   │   └── Comparativo.jsx # Tela com a tabela comparativa
│   └── historico/
│       └── Historico.jsx   # Tela com a timeline de eventos dos clientes
│
└── objetos/                # Camada de modelagem e persistência (OOP)
    ├── dominio/            # Classes de representação de dados
    │   ├── Unidade.mjs
    │   ├── Cliente.mjs
    │   ├── Evento.mjs
    │   └── RegistroSaude.mjs
    └── dao/                # Data Access Objects (Leitura e abstração dos dados)
        ├── UnidadeDAO.mjs
        └── ClienteDAO.mjs

```

## 🚀 Sprint 2 - Componentização e Integração de Dados Estáticos

Nesta segunda sprint, o foco principal foi a evolução do protótipo, substituindo áreas vazias por componentes visuais organizados, reutilizáveis e preenchidos com o dataset fictício fornecido, respeitando a limitação de não utilizar lógicas de backend ou bibliotecas de gráficos externas.

**Entregas e Implementações Técnicas:**

* **Componentização React:** Refatoração do código para separar cartões e blocos de conteúdo em componentes próprios (ex: `<UnidadeCard />` e `<HistoricoTimeline />`), utilizando passagem de dados via *props* para evitar duplicação de código.
* **Tela de Visão Geral:** Implementação de cartões para as quatro unidades do dataset (Centro-Oeste, Sul, Norte e Litoral). Utilização dos componentes `Card`, `Statistic` e `Tag` do Ant Design para exibir nome, porte e exemplos estáticos de carteira e funil.
* **Tela de Comparativo:** Construção de uma tabela de comparação utilizando o componente `Table` do Ant Design. Para suprir a restrição de não utilizar bibliotecas como *Recharts* nesta etapa, desenvolvemos um mock visual de gráfico de barras utilizando o componente `Progress` nativo do Ant Design, acompanhado de alertas (`Alert`) reforçando o caráter acadêmico e fictício dos dados.
* **Tela de Histórico:** Criação de uma linha do tempo detalhada para o cliente "João Silva" utilizando o componente `Timeline` do Ant Design. Os eventos (compras, suporte, entrega) foram diferenciados visualmente por cores e ícones (`@ant-design/icons`), mantendo a apresentação dos dados diretamente no código, conforme exigido pelos limites da sprint.
  
### Sprint 3 - Integração de dados JSON locais
- Importação e leitura do arquivo `dataset_painel_multitenant.json`.
- Substituição dos dados estáticos (hardcoded) por renderização dinâmica.
- Utilização de arrays, funções de alta ordem (`.map()`) e passagem de dados via *props* para os componentes.
- Mapeamento completo das métricas do JSON (receita, carteira, engajamento, funil, saúde e riscos) nos cartões da Visão Geral.

### Sprint 4 - Estados e interatividade
- Implementação de estados (`useState`) para gerenciar as seleções do usuário sem recarregar a página.
- **Visão Geral:** Adição de um componente `Select` (Ant Design) para alternar entre as 4 unidades do dataset ou visualizar todas simultaneamente. O layout dos cartões se adapta dinamicamente à escolha.
- **Histórico:** Adição de um `Select` para filtrar os clientes. A linha do tempo (`Timeline`) e a identificação do cliente são atualizadas dinamicamente com base na escolha, com layout responsivo que centraliza a visualização de um único cliente.

## 🚀 Sprint 5 - Camada de Dados, Encapsulamento e DAOs

Nesta sprint, organizamos a camada de dados do protótipo implementando classes de domínio orientadas a objetos e o padrão DAO, preparando a estrutura para futura integração com backend.

**Entregas e Decisões de Arquitetura:**
* **Modelagem de Domínio:** Criamos as classes `Unidade`, `Cliente`, `Evento` e `RegistroSaude` com atributos estritamente privados (`#`) e métodos de acesso (getters) padronizados.
* **Encapsulamento Seguro:** Arrays aninhados (`eventos` e `healthSeries`) são convertidos para instâncias de classe no construtor de `Cliente`. Os métodos `getEventos()` e `getHistoricoSaude()` retornam cópias rasas (`[...this.#eventos]`) para impedir mutações externas indesejadas.
* **Contrato de Consultas (DAOs):** Implementamos `UnidadeDAO` e `ClienteDAO` com métodos assíncronos (`async/Promise`). Como não há servidor nesta etapa, os DAOs consultam estaticamente o arquivo `dataset_painel_multitenant.json` e convertem o resultado em instâncias ricas de domínio.

**Exemplo de Uso do DAO (Demonstração):**
```javascript
import ClienteDAO from './dao/ClienteDAO.mjs';

async function testarConsultas() {
  const clienteDAO = new ClienteDAO();
  
  // Busca todos os clientes de uma unidade específica
  const clientes = await clienteDAO.listarPorUnidade("tenant-centro-oeste");
  
  if (clientes.length > 0) {
    console.log("Cliente:", clientes[0].getNome());
    console.log("Eventos encapsulados:", clientes[0].getEventos());
  }
}
```

## 🚀 Sprint 6 - Integração do Frontend com o Backend REST

Nesta sprint, o foco foi substituir a leitura direta do arquivo JSON local pela comunicação real com a API REST publicada no n8n. O objetivo foi manter a estrutura visual e a arquitetura do frontend, mas trocar a origem dos dados para endpoints HTTP assíncronos com `fetch()` e `async/await`.

**Entregas e Implementações Técnicas:**
* **Configuração da API:** Criação do arquivo `.env.local` com a variável `VITE_API_BASE_URL`, apontando para o endpoint base do workflow Primora.
* **Cliente HTTP:** Implementação do módulo de configuração e utilitário `obterArray()`, validando `response.ok`, tratando respostas inválidas e encapsulando a base da URL da API.
* **Atualização dos DAOs:** `UnidadeDAO.listar()`, `UnidadeDAO.buscarPorId(id)`, `ClienteDAO.listar()`, `ClienteDAO.buscarPorId(id)` e `ClienteDAO.listarPorUnidade(tenantId)` passaram a consultar a API REST em vez do JSON local.
* **Preservação do Modelo de Domínio:** As classes `Unidade`, `Cliente`, `Evento` e `RegistroSaude` continuam encapsulando os dados com getters, mantendo a estrutura da Sprint 5 intacta.
* **Integração nas telas:** As telas de Visão Geral, Comparativo e Histórico agora carregam os registros de forma assíncrona, com feedback visual de carregamento e tratamento de erro.
* **Estados vazios e robustez:** Adição de mensagens para cenários em que a API não retorna registros ou em que o filtro selecionado não encontra dados.

**Exemplo de Fluxo da Sprint 6:**
```javascript
const response = await fetch(`${API_BASE_URL}/unidades`);
if (!response.ok) {
  throw new Error(`Falha ao consultar unidades: HTTP ${response.status}`);
}
const unidades = await response.json();
return unidades;
```

**Benefícios da Implementação:**
- O frontend deixa de depender do JSON local em tempo de execução.
- A aplicação passa a consumir dados reais do workflow n8n.
- A arquitetura continua organizada e pronta para evolução futura com autenticação, filtros e integrações reais.

## Equipe

- Maria Luiza (@marilluantunes)
- Atila Kenoly (@Hirahoshi)
- Augusto
