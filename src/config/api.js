const runtimeEnv = typeof import.meta !== "undefined" && import.meta.env
  ? import.meta.env
  : (typeof process !== "undefined" ? process.env : {});

export const API_BASE_URL =
  runtimeEnv.VITE_API_BASE_URL || "https://n8n.incluc0de.com.br/webhook/primora/v1";

export async function obterArray(caminho) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL não configurada");
  }

  const url = `${API_BASE_URL.replace(/\/$/, "")}${caminho.startsWith("/") ? caminho : `/${caminho}`}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Falha ao consultar ${caminho}: HTTP ${response.status}`);
  }

  const dados = await response.json();

  if (!Array.isArray(dados)) {
    throw new Error(`Resposta inválida em ${caminho}`);
  }

  return dados;
}
