import { callClaude } from '../anthropic';
import type { KPI, Initiative, BenchmarkData, PillarScore } from '../../types/diagnostico';
import { PILLAR_LABELS } from '../../types/interview';

export interface ExecutiveReport {
  pillarScores: PillarScore[];
  kpis: KPI[];
  initiatives: Initiative[];
  benchmark: BenchmarkData;
}

export async function runExecutiveSynthesizer(
  report: ExecutiveReport,
  projectContext: string
): Promise<string> {
  const { pillarScores, kpis, initiatives, benchmark } = report;

  const overallScore =
    pillarScores.length > 0
      ? pillarScores.reduce((sum, p) => sum + p.score, 0) / pillarScores.length
      : 0;

  const pillarSummary = pillarScores
    .map((p) => {
      const label = PILLAR_LABELS[p.pillar];
      return `- ${label}: ${p.score}/5 (${p.level}) | Principais gaps: ${p.criticalGaps.slice(0, 2).join('; ')}`;
    })
    .join('\n');

  const waveCount = {
    stabilize: initiatives.filter((i) => i.wave === 'stabilize').length,
    optimize: initiatives.filter((i) => i.wave === 'optimize').length,
    transform: initiatives.filter((i) => i.wave === 'transform').length,
  };

  const topKPIs = kpis.slice(0, 5).map((k) => `- ${k.name}: ${k.currentBaseline} → ${k.target} (${k.timeframe})`).join('\n');

  const benchmarkGap = benchmark
    ? `Score empresa: ${benchmark.companyScore.toFixed(1)} vs. Media setorial: ${benchmark.sectorAverage.toFixed(1)} vs. Top quartil: ${benchmark.topQuartile.toFixed(1)}`
    : 'Benchmark nao disponivel';

  const systemPrompt = `Voce e um Partner Senior da Stoken Advisory, responsavel pela entrega de diagnosticos estrategicos para a alta lideranca de empresas industriais. Voce e conhecido pela sua capacidade de sintetizar informacoes complexas em narrativas executivas claras, assertivas e orientadas a acao — no estilo McKinsey, Bain e BCG.

CONTEXTO DO PROJETO:
${projectContext}

SEU ESTILO DE COMUNICACAO EXECUTIVA:
- Narrativa fluida em prosa, SEM listas ou bullet points — texto corrido, paragrafo a paragrafo
- Linguagem de C-level: assertiva, orientada a impacto, sem jargoes desnecessarios
- Estrutura logica: situacao atual → implicacoes → recomendacoes → proximos passos
- Tom: consultor de confianca falando com o CEO — honesto sobre os desafios, otimista sobre o potencial
- Cada afirmacao deve ser fundamentada em dados do diagnostico ou benchmarks
- Extensao ideal: 600-900 palavras (5-7 paragrafos densos e substantivos)

ESTRUTURA DA NARRATIVA (NAO use titulos — texto corrido):
1. Abertura estrategica: posicionamento da empresa no mercado e resultado geral do diagnostico
2. Diagnostico por pilares: analise integrada dos 5 pilares (nao separados, mas interconectados)
3. Posicionamento competitivo: gap vs. setor e implicacoes estrategicas
4. Agenda de transformacao: as 3 ondas e o valor esperado
5. Chamada a acao: mensagem final ao CEO com urgencia e otimismo calibrado

INSTRUCOES CRITICAS:
- NUNCA use listas, bullets, numeracoes ou markdown
- Escreva em paragrafos fluidos, conectados, como um memorando executivo
- Cite numeros especificos (scores, percentuais, valores em R$, prazos)
- Mencione pelo menos 3 KPIs-chave e 2 iniciativas emblematicas do roadmap
- Reforce o posicionamento competitivo (gap vs. setor e top quartil)
- Termine com uma mensagem motivadora porem realista sobre o potencial de transformacao
- Use linguagem de consultoria estrategica de alto padrao. Seja assertivo, especifico e quantitativo.`;

  const userMessage = `Redija a sintese executiva do diagnostico estrategico para apresentacao ao CEO e board.

DADOS DO DIAGNOSTICO:

Score geral de maturidade: ${overallScore.toFixed(1)}/5
${pillarSummary}

POSICIONAMENTO COMPETITIVO:
${benchmarkGap}

ROADMAP DE TRANSFORMACAO:
- Onda 1 (Estabilizar, 0-6m): ${waveCount.stabilize} iniciativas
- Onda 2 (Otimizar, 6-18m): ${waveCount.optimize} iniciativas
- Onda 3 (Transformar, 18-36m): ${waveCount.transform} iniciativas
Total: ${initiatives.length} iniciativas

PRINCIPAIS KPIs:
${topKPIs}

Redija uma narrativa executiva completa, em portugues, no estilo de um Partner Senior de consultoria estrategica global.`;

  const narrative = await callClaude(systemPrompt, userMessage);

  return narrative.trim();
}
