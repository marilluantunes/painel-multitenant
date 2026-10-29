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
- Vite 8
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
├── App.jsx                 # Configura o roteador da aplicação
├── main.jsx                # Ponto de entrada do React
├── index.css               # Estilos globais e regras responsivas
├── App.css                 # Estilos adicionais
├── layout/
│   └── MainLayout.jsx       # Cabeçalho, menu e área de conteúdo
└── routes/
	└── AppRoutes.jsx       # Rotas, telas e dados demonstrativos
```

## Equipe

- Maria Luiza (@marilluantunes)
- Atila Kenoly (@Hirahoshi)
- Augusto
