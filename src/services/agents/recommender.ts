import { callClaude } from '../anthropic';
import type { Risk, Recommendation } from '../../types/diagnostico';
import type { PillarType } from '../../types/interview';
import { PILLAR_LABELS } from '../../types/interview';

export interface RecommenderResult {
  specific: Recommendation[];
  strategic: string[];
}

export async function runRecommender(
  asIs: string,
  risks: Risk[],
  pillar: PillarType,
  projectContext: string
): Promise<RecommenderResult> {
  const pillarLabel = PILLAR_LABELS[pillar];

  const risksBlock = risks
    .map(
      (r) =>
        `- [${r.category} | Score: ${r.riskScore}] ${r.title}: ${r.description}`
    )
    .join('\n');

  const systemPrompt = `Voce e um consultor senior de transformacao operacional da Stoken Advisory, especializado em gerar recomendacoes de alto impacto para industrias manufatureiras. Seu trabalho e traduzir diagnosticos e riscos em acoes concretas e priorizadas que criem valor mensuravel.

CONTEXTO DO PROJETO:
${projectContext}

CONTEXTO SETORIAL — INDUSTRIA TEXTIL:
- Empresa de referencia: Santista Textil, receita projetada de R$ 900 milhoes
- Objetivo de produtividade: evoluir de 34 km/func/ano para 40 km/func/ano (+17,6%)
- Restrições tipicas: orcamento limitado, resistencia cultural a mudancas, legado de sistemas
- Perfil de implementacao: priorizacao de quick wins nos primeiros 90 dias, seguido de mudancas estruturais
- Referências de boas praticas: World Class Manufacturing (WCM), Lean Manufacturing, Industry 4.0

CRITERIOS DE CLASSIFICACAO:
Prioridade:
- Alta: impacto imediato em resultado ou risco critico, payback < 12 meses
- Media: melhoria estrutural relevante, payback 12-24 meses
- Baixa: otimizacao incremental ou enabler de longo prazo

Esforco:
- P (Pequeno): < 3 meses, custo < R$ 500k, equipe interna
- M (Medio): 3-9 meses, custo R$ 500k-2M, apoio externo pontual
- G (Grande): > 9 meses, custo > R$ 2M, programa estruturado

Tipo:
- quick_win: resultado rapido, baixo esforco, alta visibilidade
- strategic: mudanca estrutural de medio/longo prazo
- structural: redesenho fundamental de processos, sistemas ou modelo operacional

Impacto: score de 1 a 10 representando o valor estrategico e operacional esperado

INSTRUCOES:
- Gere 4 a 6 recomendacoes especificas (campo "specific"), diretamente vinculadas aos achados e riscos identificados
- Gere 3 a 4 recomendacoes estrategicas consolidadas (campo "strategic") como diretrizes de alto nivel para a lideranca
- As recomendacoes especificas devem ser acionaveis, com descricao clara do que fazer e por que
- Evite recomendacoes genericas como "melhorar processos" — seja especifico sobre o que, como e qual o impacto esperado
- Use linguagem de consultoria estrategica de alto padrao. Seja assertivo, especifico e quantitativo.

Retorne APENAS JSON valido, sem markdown, sem explicacoes adicionais, exatamente neste formato:
{
  "specific": [
    {
      "id": "REC-<PILAR_ABREV>-001",
      "title": "<titulo da recomendacao>",
      "description": "<descricao de 2-4 frases: o que fazer, como implementar, impacto esperado>",
      "priority": "<Alta|Media|Baixa>",
      "effort": "<P|M|G>",
      "impact": <1-10>,
      "pillar": "${pillar}",
      "type": "<quick_win|strategic|structural>"
    }
  ],
  "strategic": [
    "<diretriz estrategica 1>",
    "<diretriz estrategica 2>",
    "<diretriz estrategica 3>"
  ]
}`;

  const userMessage = `Gere recomendacoes para o pilar "${pillarLabel}" com base no diagnostico AS-IS e nos riscos identificados.

DIAGNOSTICO AS-IS:
${asIs}

RISCOS IDENTIFICADOS:
${risksBlock}

Estruture recomendacoes especificas e diretrizes estrategicas para enderecar as lacunas e riscos deste pilar.`;

  const raw = await callClaude(systemPrompt, userMessage);

  try {
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    const parsed = JSON.parse(cleaned) as RecommenderResult;
    return parsed;
  } catch {
    throw new Error(
      `Agente Recommender retornou resposta invalida para o pilar "${pillarLabel}". Resposta bruta: ${raw.slice(0, 300)}`
    );
  }
}
