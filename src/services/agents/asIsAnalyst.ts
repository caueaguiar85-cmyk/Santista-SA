import { callClaude } from '../anthropic';
import type { Interview, PillarType, } from '../../types/interview';
import { PILLAR_LABELS } from '../../types/interview';

export interface AsIsResult {
  score: number;
  level: string;
  description: string;
  keyFindings: string[];
  criticalGaps: string[];
}

export async function runAsIsAnalyst(
  interviews: Interview[],
  pillar: PillarType,
  projectContext: string
): Promise<AsIsResult> {
  const pillarLabel = PILLAR_LABELS[pillar];

  const relevantInterviews = interviews.filter((i) => i.pillar === pillar && i.transcript?.trim());

  const transcriptBlock =
    relevantInterviews.length > 0
      ? relevantInterviews
          .map(
            (i, idx) =>
              `--- Entrevista ${idx + 1}: ${i.intervieweeName} (${i.role} | ${i.area} | ${i.level}) ---\n${i.transcript}`
          )
          .join('\n\n')
      : 'Nenhuma entrevista disponivel para este pilar.';

  const systemPrompt = `Voce e um Senior Analyst da Stoken Advisory, firma de consultoria estrategica especializada em transformacao operacional para industrias manufatureiras. Sua funcao e conduzir diagnosticos AS-IS com rigor metodologico, baseando-se em evidencias extraidas de transcricoes de entrevistas.

CONTEXTO DO PROJETO:
${projectContext}

CONTEXTO SETORIAL:
- Industria textil brasileira, segmento de tecidos tecnicos e vestuario profissional
- Empresa de referencia: Santista Textil, com receita projetada de R$ 900 milhoes
- Benchmark de produtividade operacional: meta de evolucao de 34 km/func/ano para 40 km/func/ano
- Pressao de mercado: competicao com importados asiaticos, necessidade de diferencacao por qualidade e servico
- Contexto macroeconomico: dolar elevado, custo energetico crescente, escassez de mao de obra especializada

METODOLOGIA DE AVALIACAO:
Utilize a escala CMMI adaptada para operacoes industriais (1 a 5):
1 - Inicial: Processos ad hoc, dependencia de individuos, sem padronizacao
2 - Gerenciado: Processos basicos definidos, controle reativo, documentacao parcial
3 - Definido: Processos padronizados e documentados, gestao proativa, metricas basicas
4 - Quantitativamente Gerenciado: Metricas avancadas, melhoria continua estruturada, decisoes baseadas em dados
5 - Otimizado: Inovacao sistematica, benchmarking externo, cultura de excelencia operacional

INSTRUCOES DE ANALISE:
- Analise criticamente as transcricoes buscando evidencias concretas, nao apenas afirmacoes genericas
- Identifique padroes de maturidade, lacunas operacionais e riscos implicitos
- Seja assertivo e especifico: cite evidencias das entrevistas nas suas conclusoes
- Calibre o score com base em evidencias — evite tanto otimismo quanto pessimismo injustificados
- Use linguagem de consultoria estrategica de alto padrao. Seja assertivo, especifico e quantitativo.

Retorne APENAS JSON valido, sem markdown, sem explicacoes adicionais, exatamente neste formato:
{
  "score": <numero de 1.0 a 5.0 com uma casa decimal>,
  "level": "<nome do nivel CMMI correspondente>",
  "description": "<paragráfo de 3-5 frases descrevendo o estado atual do pilar com base nas evidencias, linguagem executiva>",
  "keyFindings": ["<achado 1>", "<achado 2>", "<achado 3>", "<achado 4>", "<achado 5>"],
  "criticalGaps": ["<gap critico 1>", "<gap critico 2>", "<gap critico 3>"]
}`;

  const userMessage = `Analise o pilar "${pillarLabel}" com base nas seguintes transcricoes de entrevistas:

${transcriptBlock}

Gere o diagnostico AS-IS completo para este pilar conforme instrucoes do sistema.`;

  const raw = await callClaude(systemPrompt, userMessage);

  try {
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    const parsed = JSON.parse(cleaned) as AsIsResult;
    return parsed;
  } catch {
    throw new Error(
      `Agente AS-IS Analyst retornou resposta invalida para o pilar "${pillarLabel}". Resposta bruta: ${raw.slice(0, 300)}`
    );
  }
}
