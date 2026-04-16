import { callClaude } from '../anthropic';
import type { Recommendation, GainEstimate } from '../../types/diagnostico';
import type { PillarType } from '../../types/interview';
import { PILLAR_LABELS } from '../../types/interview';

export async function runValueEstimator(
  recommendations: Recommendation[],
  pillar: PillarType,
  projectContext: string
): Promise<GainEstimate> {
  const pillarLabel = PILLAR_LABELS[pillar];

  const recommendationsBlock = recommendations
    .map(
      (r, idx) =>
        `${idx + 1}. [${r.priority} | Esforco: ${r.effort} | Impacto: ${r.impact}/10] ${r.title}\n   ${r.description}`
    )
    .join('\n\n');

  const systemPrompt = `Voce e um especialista em Value Engineering e Business Case da Stoken Advisory, responsavel por quantificar o valor economico gerado por iniciativas de transformacao operacional. Sua analise fundamenta decisoes de investimento da alta lideranca.

CONTEXTO DO PROJETO:
${projectContext}

CONTEXTO SETORIAL E FINANCEIRO — SANTISTA TEXTIL:
- Receita projetada: R$ 900 milhoes/ano
- Producao atual: ~34 km tecido/funcionario/ano
- Meta de produtividade: 40 km/funcionario/ano (crescimento de +17,6%)
- Margem EBITDA tipica do setor textil brasileiro: 8-14%
- Quadro de funcionarios: estimativa de 3.000-5.000 colaboradores (industria de escala)
- Custo medio de hora parada de linha: R$ 15.000-50.000/hora dependendo do ativo
- Benchmarks setoriais: WCM (World Class Manufacturing), Lean Textil, ABIT (Associacao Brasileira da Industria Textil)

REFERENCIAS DE BENCHMARKS PARA CALCULO DE GANHOS:
- Reducao de desperdicio por Lean: 15-30% de reducao de custos operacionais
- Ganho de OEE por manutencao preditiva: 8-15% de aumento de disponibilidade de ativos
- Reducao de retrabalho por padronizacao de processos: 10-25%
- Ganho de receita por melhoria de prazo de entrega: 3-8% em retencao/expansao de clientes
- ROI tipico de projetos de transformacao digital em manufatura: 150-300% em 3 anos (McKinsey, 2023)
- Reducao de custo de nao conformidade: R$ 500k-2M/ano para empresas de medio porte

INSTRUCOES DE CALCULO:
- Estime os ganhos financeiros totais gerados pelas recomendacoes do pilar em analise
- Detalhe o ganho por iniciativa/recomendacao principal
- O payback deve ser calculado considerando o custo estimado de implementacao vs ganho anual projetado
- Use ranges conservadores (pessimista-otimista) e justifique a estimativa com benchmark
- Seja quantitativo e especifico — valores em R$ com contextualizacao clara
- Confianca Alta: ganho direto e mensuravel com benchmark setorial consolidado
- Confianca Media: ganho inferido com premissas razoaveis e benchmark analogico
- Confianca Baixa: ganho estimado com alta incerteza ou dependente de fatores externos
- Use linguagem de consultoria estrategica de alto padrao. Seja assertivo, especifico e quantitativo.

Retorne APENAS JSON valido, sem markdown, sem explicacoes adicionais, exatamente neste formato:
{
  "totalEstimatedGain": "<valor total em R$ com range, ex: R$ 12-18M em 3 anos>",
  "byInitiative": [
    {
      "name": "<nome da iniciativa/recomendacao>",
      "gain": "<ganho estimado em R$ com contextualizacao e prazo>",
      "confidence": "<Alta|Media|Baixa>"
    }
  ],
  "paybackMonths": <numero inteiro de meses para recuperar o investimento>
}`;

  const userMessage = `Estime os ganhos financeiros para as recomendacoes do pilar "${pillarLabel}":

RECOMENDACOES:
${recommendationsBlock}

Calcule o valor economico total gerado por este conjunto de recomendacoes, detalhando por iniciativa e estimando o payback do investimento.`;

  const raw = await callClaude(systemPrompt, userMessage);

  try {
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    const parsed = JSON.parse(cleaned) as GainEstimate;
    return parsed;
  } catch {
    throw new Error(
      `Agente Value Estimator retornou resposta invalida para o pilar "${pillarLabel}". Resposta bruta: ${raw.slice(0, 300)}`
    );
  }
}
