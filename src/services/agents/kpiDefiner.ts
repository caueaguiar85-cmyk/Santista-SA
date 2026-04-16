import { callClaude } from '../anthropic';
import type { KPI, PillarScore } from '../../types/diagnostico';
import { PILLAR_LABELS } from '../../types/interview';

export async function runKPIDefiner(
  pillarScores: PillarScore[],
  projectContext: string
): Promise<KPI[]> {
  const pillarSummary = pillarScores
    .map((p) => {
      const label = PILLAR_LABELS[p.pillar];
      return `PILAR: ${label} (Score: ${p.score}/5 — ${p.level})
  AS-IS: ${p.asIs}
  Achados-chave: ${p.keyFindings.slice(0, 3).join('; ')}
  Lacunas: ${p.criticalGaps.join('; ')}`;
    })
    .join('\n\n');

  const systemPrompt = `Voce e um especialista em Performance Management e KPIs da Stoken Advisory, com experiencia em definir sistemas de indicadores para industrias manufatureiras de medio e grande porte. Sua responsabilidade e garantir que cada KPI seja SMART (Especifico, Mensuravel, Atingivel, Relevante, Temporal) e diretamente vinculado aos objetivos estrategicos da empresa.

CONTEXTO DO PROJETO:
${projectContext}

CONTEXTO SETORIAL — SANTISTA TEXTIL:
- Receita projetada: R$ 900 milhoes/ano
- Meta de produtividade: 34 km/func/ano → 40 km/func/ano (+17,6% em 36 meses)
- Estrutura tipica de indicadores em industrias texteis: OEE, produtividade por linha, custo/metro, fill rate, lead time, taxa de retrabalho, NPS interno, indice de capacitacao
- Benchmarks de referencia: ABIT, IEMI, benchmarks WCM, Lean Manufacturing Institute

INSTRUCOES PARA DEFINICAO DE KPIs:
- Defina 3 a 5 KPIs por pilar — total de ${pillarScores.length * 3} a ${pillarScores.length * 5} KPIs
- Cada KPI deve ter baseline atual realista (com base no diagnostico AS-IS) e meta desafiadora porem atingivel
- O timeframe deve indicar quando a meta deve ser alcancada (ex: "12 meses", "36 meses", "Trimestral")
- Prefira KPIs leading (preditivos) combinados com KPIs lagging (resultado)
- Evite KPIs redundantes ou dificeis de mensurar sem investimento em infraestrutura de dados
- Priorize KPIs que a empresa possa comecar a medir imediatamente ou com baixo esforco
- Use linguagem de consultoria estrategica de alto padrao. Seja assertivo, especifico e quantitativo.

TIPOS DE KPIs POR PILAR (referencia):
- Processos: % processos documentados, OTIF (On-Time-In-Full), taxa de desvios de processo
- Sistemas: % dados integrados, disponibilidade de sistemas criticos, tempo medio de acesso a dado
- Operacoes: OEE, produtividade por linha (km/turno), taxa de retrabalho, custo/metro produzido
- Organizacao: indice de capacitacao, turnover voluntario, % metas individuais atingidas
- Roadmap: % iniciativas no prazo, ROI realizado vs planejado, % milestones entregues

Retorne APENAS JSON valido, sem markdown, sem explicacoes adicionais, exatamente neste formato:
[
  {
    "id": "KPI-<PILAR_ABREV>-001",
    "pillar": "<processos|sistemas|operacoes|organizacao|roadmap>",
    "name": "<nome do KPI>",
    "description": "<descricao de 1-2 frases explicando o que mede e por que importa>",
    "currentBaseline": "<valor atual baseado no diagnostico AS-IS>",
    "target": "<meta a ser atingida>",
    "unit": "<unidade de medida>",
    "timeframe": "<prazo para atingir a meta>"
  }
]`;

  const userMessage = `Defina os KPIs estrategicos e operacionais para cada pilar do diagnostico:

${pillarSummary}

Crie um conjunto de KPIs SMART que permita acompanhar a evolucao da transformacao ao longo de 36 meses.`;

  const raw = await callClaude(systemPrompt, userMessage);

  try {
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    const parsed = JSON.parse(cleaned) as KPI[];
    return parsed;
  } catch {
    throw new Error(
      `Agente KPI Definer retornou resposta invalida. Resposta bruta: ${raw.slice(0, 300)}`
    );
  }
}
