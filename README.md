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
├── index.css               # Estilos globais (reset de margens e configuração da tela cheia)
├── App.css                 # Estilos adicionais (mantido vazio para padrão do Vite)
│
├── layout/
│   └── MainLayout.jsx       # Cabeçalho, menu de navegação e área de conteúdo (Outlet)
│
├── routes/
│   └── AppRoutes.jsx       # Apenas as definições de rotas (conecta URL aos componentes)
│
└── components/             # Telas do sistema separadas por pastas 
    ├── visaogeral/
    │   └── VisaoGeral.jsx   # Tela de Visão Geral
    │   └── UnidadeCard.jsx  # Cartão com os indicadores de cada unidade
    ├── comparativo/
    │   └── Comparativo.jsx  # Tela de Comparativo
    └── historico/
        └── Historico.jsx    # Tela de Histórico


## 🚀 Sprint 2 - Componentização e Integração de Dados Estáticos

Nesta segunda sprint, o foco principal foi a evolução do protótipo, substituindo áreas vazias por componentes visuais organizados, reutilizáveis e preenchidos com o dataset fictício fornecido, respeitando a limitação de não utilizar lógicas de backend ou bibliotecas de gráficos externas.

**Entregas e Implementações Técnicas:**

* **Componentização React:** Refatoração do código para separar cartões e blocos de conteúdo em componentes próprios (ex: `<UnidadeCard />` e `<HistoricoTimeline />`), utilizando passagem de dados via *props* para evitar duplicação de código.
* **Tela de Visão Geral:** Implementação de cartões para as quatro unidades do dataset (Centro-Oeste, Sul, Norte e Litoral). Utilização dos componentes `Card`, `Statistic` e `Tag` do Ant Design para exibir nome, porte e exemplos estáticos de carteira e funil.
* **Tela de Comparativo:** Construção de uma tabela de comparação utilizando o componente `Table` do Ant Design. Para suprir a restrição de não utilizar bibliotecas como *Recharts* nesta etapa, desenvolvemos um mock visual de gráfico de barras utilizando o componente `Progress` nativo do Ant Design, acompanhado de alertas (`Alert`) reforçando o caráter acadêmico e fictício dos dados.
* **Tela de Histórico:** Criação de uma linha do tempo detalhada para o cliente "João Silva" utilizando o componente `Timeline` do Ant Design. Os eventos (compras, suporte, entrega) foram diferenciados visualmente por cores e ícones (`@ant-design/icons`), mantendo a apresentação dos dados diretamente no código, conforme exigido pelos limites da sprint.


## Equipe

- Maria Luiza (@marilluantunes)
- Atila Kenoly (@Hirahoshi)
- Augusto
