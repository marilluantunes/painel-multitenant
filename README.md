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
git clone [https://github.com/marilluantunes/painel-multitenant.git](https://github.com/marilluantunes/painel-multitenant.git)
cd painel-multitenant
