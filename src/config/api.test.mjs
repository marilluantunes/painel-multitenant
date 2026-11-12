import test from 'node:test';
import assert from 'node:assert/strict';

import { obterArray, API_BASE_URL } from './api.js';

test('API_BASE_URL deve apontar para a URL do n8n', () => {
  assert.match(API_BASE_URL, /n8n\.incluc0de\.com\.br\/webhook\/primora\/v1/);
});

test('obterArray deve rejeitar respostas que não sejam arrays', async () => {
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ mensagem: 'erro' }),
  });

  await assert.rejects(
    () => obterArray('/unidades'),
    /Resposta inválida/,
  );
});
