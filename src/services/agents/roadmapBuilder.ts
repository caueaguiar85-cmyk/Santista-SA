import { callClaude } from '../anthropic';
import type { Initiative, PillarScore } from '../../types/diagnostico';
import { PILLAR_LABELS } from '../../types/interview';

export async function runRoadmapBuilder(
  allPillarData: PillarScore[],
  projectContext: string
): Promise<Initiative[]> {
  const pillarSummary = allPillarData
    .map((p) => {
      const label = PILLAR_LABELS[p.pillar];
      const recs = p.recommendations
        .map((r) => `    - [${r.priority}|${r.effort}|${r.type}] ${r.title}`)
        .join('\n');
      return `PILAR: ${label} (Score CMMI: ${p.score}/5 — ${p.level})
  Lacunas criticas: ${p.criticalGaps.join('; ')}
  Recomendacoes:
${recs}`;
    })
    .join('\n\n');

  const systemPrompt = `Voce e um especialista em Transformacao Organizacional e Program Management da Stoken Advisory, responsavel por desenhar roadmaps de implementacao realistas, sequenciados e orientados a valor para industrias manufatureiras.

CONTEXTO DO PROJETO:
${projectContext}

CONTEXTO SETORIAL — SANTISTA TEXTIL:
- Receita projetada: R$ 900 milhoes/ano | Meta de produtividade: 34→40 km/func/ano
- Capacidade de absorcao de mudancas tipica de industria textil: media-baixa (cultura conservadora, alta dependencia operacional)
- Restricoes tipicas: orcamento anual de TI e operacoes limitado, periodos de parada programada restritos
- Horizonte de transformacao: 36 meses em 3 ondas

METODOLOGIA DE ROADMAP — 3 ONDAS:
Onda 1 — Estabilizar (0-6 meses):
- Foco: quick wins, reducao de riscos criticos, fundacao para mudancas maiores
- Criterio: esforco P, impacto alto/medio, sem dependencias complexas
- wave = "stabilize"

Onda 2 — Otimizar (6-18 meses):
- Foco: melhoria estrutural de processos, implementacao de sistemas e ferramentas
- Criterio: esforco M, mudancas que requerem capacitacao e adaptacao cultural
- wave = "optimize"

Onda 3 — Transformar (18-36 meses):
- Foco: inovacao, diferenciacao competitiva, modelos operacionais de nova geracao
- Criterio: esforco G, transformacoes estruturais e habilitadores tecnologicos avancados
- wave = "transform"

CRITERIOS DE PRIORIDADE ENTRE INICIATIVAS:
- Sequenciar considerando dependencias tecnicas e organizacionais
- Priorizar iniciativas que desbloqueiam outras (enablers)
- Balancear carga entre areas e pilaressela (evitar sobrecarga simultanea)
- Garantir pelo menos 2 quick wins por pilar na Onda 1

INSTRUCOES:
- Gere de 12 a 18 iniciativas distribuidas entre os 3 pilares e 3 ondas
- Cada iniciativa deve ter nome claro, descricao executiva, responsavel funcional sugerido e dependencias explicitadas
- startMonth indica o mes de inicio (0 = imediato, 6 = inicio da onda 2, 18 = inicio da onda 3)
- durationMonths indica duracao em meses
- status sempre "proposed" para iniciativas novas
- Use linguagem de consultoria estrategica de alto padrao. Seja assertivo, especifico e quantitativo.

Retorne APENAS JSON valido, sem markdown, sem explicacoes adicionais, exatamente neste formato:
[
  {
    "id": "INI-001",
    "name": "<nome da iniciativa>",
    "description": "<descricao executiva de 2-3 frases: o que, como e resultado esperado>",
    "pillar": "<processos|sistemas|operacoes|organizacao|roadmap>",
    "wave": "<stabilize|optimize|transform>",
    "effort": "<P|M|G>",
    "impact": <1-10>,
    "responsible": "<area ou funcao responsavel sugerida>",
    "dependencies": ["<id de iniciativa dependente ou descricao>"],
    "status": "proposed",
    "startMonth": <numero inteiro>,
    "durationMonths": <numero inteiro>
  }
]`;

  const userMessage = `Com base nos dados dos ${allPillarData.length} pilares diagnosticados abaixo, gere o roadmap integrado de transformacao em 3 ondas:

${pillarSummary}

Sequencie as iniciativas de forma logica, considerando dependencias, capacidade organizacional e maximizacao de valor ao longo do tempo.`;

  const raw = await callClaude(systemPrompt, userMessage);

  try {
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    const parsed = JSON.parse(cleaned) as Initiative[];
    return parsed;
  } catch {
    throw new Error(
      `Agente Roadmap Builder retornou resposta invalida. Resposta bruta: ${raw.slice(0, 300)}`
    );
  }
}
