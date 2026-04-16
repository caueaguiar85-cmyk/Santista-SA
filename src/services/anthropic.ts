export async function callClaude(systemPrompt: string, userMessage: string): Promise<string> {
  const apiKey = localStorage.getItem('stoken-api-key');

  if (!apiKey) {
    throw new Error(
      'Chave de API da Anthropic nao encontrada. Configure a chave em Configuracoes antes de executar os agentes.'
    );
  }

  let response: Response;
  try {
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      }),
    });
  } catch (networkError) {
    throw new Error(
      `Falha na conexao com a API da Anthropic. Verifique sua conexao com a internet. Detalhe: ${
        networkError instanceof Error ? networkError.message : String(networkError)
      }`
    );
  }

  if (!response.ok) {
    let errorDetail = `Status HTTP ${response.status}`;
    try {
      const errorBody = await response.json();
      if (errorBody?.error?.message) {
        errorDetail = errorBody.error.message;
      }
    } catch {
      // ignore JSON parse errors on error body
    }

    if (response.status === 401) {
      throw new Error(
        `Chave de API invalida ou sem permissao. Verifique a chave configurada. Detalhe: ${errorDetail}`
      );
    }
    if (response.status === 429) {
      throw new Error(
        `Limite de requisicoes atingido (rate limit). Aguarde alguns instantes e tente novamente. Detalhe: ${errorDetail}`
      );
    }
    if (response.status === 529) {
      throw new Error(
        `API da Anthropic sobrecarregada. Tente novamente em alguns minutos. Detalhe: ${errorDetail}`
      );
    }
    throw new Error(`Erro na API da Anthropic: ${errorDetail}`);
  }

  const data = await response.json();

  const textBlock = data?.content?.find(
    (block: { type: string; text?: string }) => block.type === 'text'
  );

  if (!textBlock || typeof textBlock.text !== 'string') {
    throw new Error(
      'Resposta da API da Anthropic nao contem conteudo de texto valido.'
    );
  }

  return textBlock.text;
}
