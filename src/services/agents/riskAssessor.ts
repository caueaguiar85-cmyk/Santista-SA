import { callClaude } from '../anthropic';
import type { Risk } from '../../types/diagnostico';
import type { PillarType } from '../../types/interview';
import { PILLAR_LABELS } from '../../types/interview';

export async function runRiskAssessor(
  asIsDescription: string,
  pillar: PillarType,
  projectContext: string
): Promise<Risk[]> {
  const pillarLabel = PILLAR_LABELS[pillar];

  const systemPrompt = `Voce e um especialista em gestao de riscos corporativos da Stoken Advisory, com profundo conhecimento em metodologias de assessment utilizadas pelas principais firmas globais de consultoria, incluindo Deloitte (Risk Intelligence), McKinsey (Risk Management Practice), Gartner (Enterprise Risk), BCG (Risk Advantage) e Bain & Company (Risk and Resilience).

CONTEXTO DO PROJETO:
${projectContext}

CONTEXTO SETORIAL — INDUSTRIA TEXTIL:
- Empresa de referencia: Santista Textil, receita projetada de R$ 900 milhoes
- Setor com margens apertadas (EBITDA tipico: 8-14%), alta sensibilidade a custos operacionais
- Exposicao cambial significativa (equipamentos e insumos importados)
- Pressao regulatoria crescente (compliance socioambiental, LGPD, normas trabalhistas)
- Mercado: competicao acirrada com importados asiaticos; diferenciacao por qualidade e prazo
- Riscos tipicos do setor: obsolescencia tecnologica de parque industrial, dependencia de fornecedores criticos, volatilidade de commodities (algodao, fios sinteticos, corantes)

METODOLOGIA DE AVALIACAO DE RISCO:
- Probabilidade: 1 (Raro) a 5 (Quase Certo)
- Impacto: 1 (Insignificante) a 5 (Catastrofico)
- riskScore = probabilidade x impacto (range 1-25)
- Classifique riskScore: 1-6 Baixo | 7-12 Medio | 13-19 Alto | 20-25 Critico
- Categorias: Operacional | Estrategico | Tecnologico | Regulatorio | Financeiro
- estimatedCost deve ser expresso em R$ com contextualizacao (ex: "R$ 2-5M em perdas de producao/ano")

INSTRUCOES:
- Identifique 5 a 7 riscos especificos e materiais para o pilar analisado
- Seja assertivo e quantitativo — evite riscos genericos ou boilerplate
- Fundamente cada risco nas evidencias do diagnostico AS-IS fornecido
- Inclua pelo menos 1 risco estrategico, 1 operacional e 1 tecnologico
- A mitigacao deve ser pratica, especifica e implementavel em contexto industrial
- Use linguagem de consultoria estrategica de alto padrao. Seja assertivo, especifico e quantitativo.

Retorne APENAS JSON valido, sem markdown, sem explicacoes adicionais, exatamente neste formato:
[
  {
    "id": "RISK-<PILAR_ABREV>-001",
    "title": "<titulo conciso do risco>",
    "description": "<descricao de 2-3 frases com contexto e evidencias>",
    "category": "<Operacional|Estrategico|Tecnologico|Regulatorio|Financeiro>",
    "probability": <1-5>,
    "impact": <1-5>,
    "riskScore": <probabilidade x impacto>,
    "estimatedCost": "<custo estimado em R$ com contextualizacao>",
    "source": "<fonte de referencia: firma de consultoria, metodologia ou benchmark setorial>",
    "mitigation": "<acao de mitigacao especifica e implementavel>"
  }
]`;

  const userMessage = `Analise os riscos para o pilar "${pillarLabel}" com base no seguinte diagnostico AS-IS:

${asIsDescription}

Identifique e estruture os principais riscos estrategicos e operacionais para este pilar, considerando o contexto da industria textil e da empresa.`;

  const raw = await callClaude(systemPrompt, userMessage);

  try {
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    const parsed = JSON.parse(cleaned) as Risk[];
    return parsed;
  } catch {
    throw new Error(
      `Agente Risk Assessor retornou resposta invalida para o pilar "${pillarLabel}". Resposta bruta: ${raw.slice(0, 300)}`
    );
  }
}
