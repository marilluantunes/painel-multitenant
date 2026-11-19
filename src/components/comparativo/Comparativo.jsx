import React, { useEffect, useState } from "react";
import { Alert, Card, Spin, Table, Typography, Tag } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import UnidadeDAO from "../../objetos/dao/UnidadeDAO.mjs";

const { Title } = Typography;

const getField = (obj, getterName, fieldName, fallback = "") => {
  if (typeof obj?.[getterName] === "function") return obj[getterName]();
  return obj?.[fieldName] ?? fallback;
};

export default function Comparativo() {
  const [unidades, setUnidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;
    const dao = new UnidadeDAO();
    async function carregar() {
      try {
        const dados = await dao.listar();
        if (ativo) setUnidades(dados);
      } catch (error) {
        if (ativo) setErro(error.message);
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    carregar();
    return () => { ativo = false; };
  }, []);

  // Preparando dados para o Gráfico (RF09)
  const dadosGrafico = unidades.map(u => ({
    nome: getField(u, "getNome", "nome").replace("Vetor ", ""), // Encurtando o nome para caber no gráfico
    clientes: Number(getField(u, "getCarteiraTotalClientes", "carteiraTotalClientes", 0))
  }));

  const colunas = [
    { 
      title: "Unidade", 
      key: "nome", 
      render: (_, registro) => <strong>{getField(registro, "getNome", "nome")}</strong>,
      // RF12: Ordenação alfabética
      sorter: (a, b) => getField(a, "getNome", "nome").localeCompare(getField(b, "getNome", "nome"))
    },
    { 
      title: "Porte", 
      key: "porte", 
      render: (_, registro) => <Tag color="blue">{getField(registro, "getPorte", "porte")}</Tag>,
      // RF12: Filtro de tabela por Porte
      filters: [
        { text: 'Grande', value: 'grande' },
        { text: 'Média', value: 'media' },
        { text: 'Pequena', value: 'pequena' },
      ],
      onFilter: (value, record) => getField(record, "getPorte", "porte") === value,
    },
    { 
      title: "Clientes", 
      key: "carteiraTotalClientes", 
      render: (_, registro) => Number(getField(registro, "getCarteiraTotalClientes", "carteiraTotalClientes", 0)).toLocaleString("pt-BR"),
      // RF06: Ranking/Ordenação por Clientes
      sorter: (a, b) => Number(getField(a, "getCarteiraTotalClientes", "carteiraTotalClientes", 0)) - Number(getField(b, "getCarteiraTotalClientes", "carteiraTotalClientes", 0))
    },
    { 
      title: "Receita (90d)", 
      key: "receitaCarteira90d", 
      render: (_, registro) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(getField(registro, "getReceitaCarteira90d", "receitaCarteira90d", 0))),
      // RF06: Ranking/Ordenação por Receita
      sorter: (a, b) => Number(getField(a, "getReceitaCarteira90d", "receitaCarteira90d", 0)) - Number(getField(b, "getReceitaCarteira90d", "receitaCarteira90d", 0))
    },
    { 
      title: "Risco Absoluto", 
      key: "riscoAbsoluto", 
      render: (_, registro) => <Tag color="red">{getField(registro, "getRiscoAbsoluto", "riscoAbsoluto")}</Tag>,
      // RF06: Ranking/Ordenação por Risco
      sorter: (a, b) => Number(getField(a, "getRiscoAbsoluto", "riscoAbsoluto", 0)) - Number(getField(b, "getRiscoAbsoluto", "riscoAbsoluto", 0))
    },
  ];

  if (carregando) return <Spin tip="Carregando comparação..." style={{ display: "block", marginTop: 32 }} />;
  if (erro) return <Alert type="error" showIcon message="Erro ao consultar unidades" description={erro} />;

  return (
    <div>
      <Title level={3}>Comparativo entre Unidades</Title>
      
      {/* Gráfico de Barras (RF09) */}
      <Card title="Gráfico Comparativo: Total de Clientes" style={{ marginBottom: 24 }}>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={dadosGrafico} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="nome" />
              <YAxis />
              <RechartsTooltip formatter={(value) => `${value} clientes`} />
              <Bar dataKey="clientes" fill="#1677ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Tabela com Ordenação e Filtros (RF06 e RF12) */}
      <Card title="Tabela Detalhada (Clique nos cabeçalhos para ordenar ou filtrar)">
        <Table 
          columns={colunas} 
          dataSource={unidades} 
          rowKey={(u) => getField(u, "getId", "id")} 
          pagination={false} 
          scroll={{ x: true }} 
        />
      </Card>
    </div>
  );
}