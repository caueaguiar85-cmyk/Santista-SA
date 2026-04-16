import { callClaude } from '../anthropic';
import type { RACIItem, Initiative } from '../../types/diagnostico';

export async function runRACIBuilder(
  initiatives: Initiative[],
  projectContext: string
): Promise<RACIItem[]> {
  const initiativesBlock = initiatives
    .map(
      (i, idx) =>
        `${idx + 1}. [${i.wave.toUpperCase()} | Esforco: ${i.effort} | Pilar: ${i.pillar}] ${i.name}
   Descricao: ${i.description}
   Responsavel sugerido: ${i.responsible}`
    )
    .join('\n\n');

  const systemPrompt = `Voce e um especialista em Governanca Organizacional e Program Management da Stoken Advisory, responsavel por estruturar matrizes RACI para programas de transformacao industrial. Uma matriz RACI bem definida e fundamental para garantir clareza de papeis, eliminacao de ambiguidades e eficiencia na execucao.

CONTEXTO DO PROJETO:
${projectContext}

CONTEXTO ORGANIZACIONAL — SANTISTA TEXTIL:
- Estrutura tipica de industria textil de grande porte: funcoes de Operacoes, Manutencao, Qualidade, Supply Chain, TI, RH, Financas, Presidencia/Diretoria
- Papeis funcionais comuns: COO, Diretor Industrial, Gerente de Producao, Gerente de TI, Gerente de Qualidade, Analista de Processos, Tecnico de Manutencao, HRBP
- Ferramentas tipicas de gestao de programas: MS Project, Jira, Monday.com, Power BI, SAP/ERP

DEFINICAO DOS PAPEIS RACI:
- R (Responsible): quem executa o trabalho — especifico, nao multiplos quando possivel
- A (Accountable): quem responde pelo resultado perante a lideranca — sempre 1 pessoa
- C (Consulted): quem deve ser consultado antes de decisoes — especialistas e stakeholders chave
- I (Informed): quem deve ser notificado sobre progresso e resultados

INSTRUCOES:
- Gere 1 item RACI por iniciativa fornecida
- Os papeis devem ser funcionais (cargo/funcao), nao nomes de pessoas
- O campo "tools" deve listar 2-3 ferramentas especificas para suporte a iniciativa
- O campo "resources" deve descrever os recursos necessarios (equipe, orcamento, infraestrutura)
- Seja preciso e realista — evite atribuir responsabilidade a todos ou deixar lacunas criticas
- Use linguagem de consultoria estrategica de alto padrao. Seja assertivo, especifico e quantitativo.

Retorne APENAS JSON valido, sem markdown, sem explicacoes adicionais, exatamente neste formato:
[
  {
    "initiative": "<nome da iniciativa>",
    "responsible": "<cargo/funcao responsavel pela execucao>",
    "accountable": "<cargo/funcao accountable pelo resultado>",
    "consulted": "<cargos/funcoes a serem consultados, separados por virgula>",
    "informed": "<cargos/funcoes a serem informados, separados por virgula>",
    "tools": ["<ferramenta 1>", "<ferramenta 2>", "<ferramenta 3>"],
    "resources": "<descricao dos recursos necessarios: equipe, orcamento e infraestrutura>"
  }
]`;

  const userMessage = `Construa a matriz RACI para as seguintes iniciativas do programa de transformacao:

${initiativesBlock}

Defina papeis claros e especificos para cada iniciativa, garantindo governanca efetiva durante a execucao.`;

  const raw = await callClaude(systemPrompt, userMessage);

  try {
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    const parsed = JSON.parse(cleaned) as RACIItem[];
    return parsed;
  } catch {
    throw new Error(
      `Agente RACI Builder retornou resposta invalida. Resposta bruta: ${raw.slice(0, 300)}`
    );
  }
}
