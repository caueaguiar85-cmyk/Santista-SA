import { callClaude } from '../anthropic';
import type { BenchmarkData, PillarScore } from '../../types/diagnostico';
import { PILLAR_LABELS } from '../../types/interview';

export async function runMarketBenchmarker(
  pillarScores: PillarScore[],
  projectContext: string
): Promise<BenchmarkData> {
  const pillarSummary = pillarScores
    .map((p) => {
      const label = PILLAR_LABELS[p.pillar];
      return `- ${label}: Score ${p.score}/5 (${p.level})`;
    })
    .join('\n');

  const overallScore =
    pillarScores.length > 0
      ? pillarScores.reduce((sum, p) => sum + p.score, 0) / pillarScores.length
      : 0;

  const systemPrompt = `Voce e um especialista em Competitive Intelligence e Benchmarking da Stoken Advisory, com acesso a dados de performance de industrias manufatureiras brasileiras e globais. Sua analise posiciona a empresa no contexto competitivo setorial, identificando gaps e oportunidades de melhoria.

CONTEXTO DO PROJETO:
${projectContext}

BASE DE DADOS DE BENCHMARKS — INDUSTRIA TEXTIL:
Fontes de referencia autorizadas:
- ABIT (Associacao Brasileira da Industria Textil e de Confeccao): dados setoriais brasileiros
- IEMI (Instituto de Estudos e Marketing Industrial): pesquisas de produtividade textil
- McKinsey Global Institute: "The Future of Work in Manufacturing" (2023)
- Gartner Manufacturing Industry Survey (2023-2024)
- BCG "Industry 4.0 in Textiles" (2022)
- ABRAFAS: dados de fibras artificiais e sinteticas
- World Bank Enterprise Survey: benchmarks de empresas industriais brasileiras

REFERENCIAS DE MATURIDADE SETORIAL (escala CMMI 1-5):
Industria textil brasileira — media setorial por pilar:
- Processos & Governanca: media = 2.3 | top quartil = 3.8
- Sistemas & Dados: media = 2.1 | top quartil = 3.9
- Operacoes & Eficiencia: media = 2.6 | top quartil = 3.7
- Organizacao & Capacidade: media = 2.4 | top quartil = 3.6
- Roadmap de Transformacao: media = 1.8 | top quartil = 3.5

Score geral da industria textil brasileira: media = 2.3 | top quartil = 3.7
Score de lideres globais (empresas texteis avancadas - Europa/Asia): media = 3.8 | top quartil = 4.5

INSTRUCOES:
- Use os scores do diagnostico da empresa como "companyScore" (media dos pilares) e "byPillar[].company"
- Popule "sectorAverage" e "topQuartile" com base nos benchmarks setoriais acima
- Preencha "byPillar" para cada pilar avaliado com os valores de comparacao
- As "references" devem listar as 4-6 fontes mais relevantes utilizadas na analise
- Seja preciso: use os valores de benchmark setorial fornecidos como base, ajustando com pequenas variacoes contextuais se necessario
- Use linguagem de consultoria estrategica de alto padrao. Seja assertivo, especifico e quantitativo.

Retorne APENAS JSON valido, sem markdown, sem explicacoes adicionais, exatamente neste formato:
{
  "companyScore": <media dos scores dos pilares com 1 casa decimal>,
  "sectorAverage": <media setorial com 1 casa decimal>,
  "topQuartile": <top quartil setorial com 1 casa decimal>,
  "byPillar": [
    {
      "pillar": "<processos|sistemas|operacoes|organizacao|roadmap>",
      "company": <score da empresa com 1 casa decimal>,
      "sector": <media setorial para este pilar com 1 casa decimal>,
      "topQuartile": <top quartil setorial para este pilar com 1 casa decimal>
    }
  ],
  "references": [
    "<referencia 1>",
    "<referencia 2>",
    "<referencia 3>",
    "<referencia 4>"
  ]
}`;

  const userMessage = `Posicione a empresa no benchmarking competitivo setorial com base nos scores do diagnostico:

SCORES DA EMPRESA (CMMI 1-5):
${pillarSummary}
Score geral da empresa: ${overallScore.toFixed(1)}/5

Compare o desempenho da empresa com a media setorial da industria textil brasileira e com o top quartil do setor, pilar a pilar.`;

  const raw = await callClaude(systemPrompt, userMessage);

  try {
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    const parsed = JSON.parse(cleaned) as BenchmarkData;
    return parsed;
  } catch {
    throw new Error(
      `Agente Market Benchmarker retornou resposta invalida. Resposta bruta: ${raw.slice(0, 300)}`
    );
  }
}
