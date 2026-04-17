export type PillarType = 'processos' | 'sistemas' | 'operacoes' | 'organizacao' | 'roadmap';
export type HierarchyLevel = 'c-level' | 'gerencia' | 'operacional';
export type InterviewStatus = 'scheduled' | 'completed' | 'analyzed';

export const PILLAR_LABELS: Record<PillarType, string> = {
  processos: 'Processos & Governanca',
  sistemas: 'Sistemas & Dados',
  operacoes: 'Operacoes & Eficiencia',
  organizacao: 'Organizacao & Capacidade',
  roadmap: 'Roadmap de Transformacao',
};

export const PILLAR_COLORS: Record<PillarType, string> = {
  processos: 'var(--color-pilar-1)',
  sistemas: 'var(--color-pilar-2)',
  operacoes: 'var(--color-pilar-3)',
  organizacao: 'var(--color-pilar-4)',
  roadmap: 'var(--color-pilar-5)',
};

export const HIERARCHY_LABELS: Record<HierarchyLevel, string> = {
  'c-level': 'C-Level',
  'gerencia': 'Gerencia',
  'operacional': 'Operacional',
};

export interface AIInsights {
  summary: string;
  keyFindings: string[];
  tags: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  maturityIndicators: string[];
}

export interface Interview {
  id: string;
  interviewerName?: string;
  intervieweeName: string;
  role: string;
  area: string;
  level: HierarchyLevel;
  pillar: PillarType;
  date: string;
  status: InterviewStatus;
  transcript: string;
  aiInsights: AIInsights | null;
  tags: string[];
  readyForAI: boolean;
}

/** Suggested questions per pillar — based on Deloitte/Stoken assessment framework */
export const SUGGESTED_QUESTIONS: Record<PillarType, string[]> = {
  processos: [
    'Como funciona o processo de S&OP atualmente? Existe validacao estrategica de demanda?',
    'Qual o nivel de integracao entre as areas (Comercial, PCP, Financeiro)?',
    'Como sao definidos, acompanhados e revisados os KPIs da area?',
    'Existe governanca de dados estruturada? Quem e o dono dos dados?',
    'O planejamento de producao e feito em sistema ou em Excel? Por que?',
    'Como funciona o custeio de produtos? Qual a granularidade disponivel (SKU, cliente, pedido)?',
    'Quantas fichas tecnicas diferentes existem? Elas estao sincronizadas entre sistemas?',
    'Como e feita a previsao de demanda? Qual o erro medio (MAPE)?',
    'Existe controle de acuracia do cronograma de producao? Como o desvio e comunicado?',
    'Como o Comercial recebe a devolutiva de mix negado pelo PCP?',
  ],
  sistemas: [
    'Quantos sistemas diferentes sao utilizados no dia a dia da sua area?',
    'Como os dados sao transferidos entre sistemas? Existe integracao automatica ou manual?',
    'Qual a disponibilidade dos sistemas criticos? Ocorrem paradas frequentes?',
    'Existe Data Warehouse, Data Lake ou fonte unica de verdade para analytics?',
    'O ERP atual (PeopleSoft) atende as necessidades? Quais gaps existem?',
    'Como e o sistema Intex para sua area? Quais funcionalidades sao usadas/subutilizadas?',
    'Existe politica de cyberseguranca para os sistemas industriais (OT)?',
    'Como e feita a transferencia de dados do chao de fabrica para os sistemas corporativos?',
    'Existe catálogo de dados ou documentacao dos sistemas e integracoes?',
    'Qual o nivel de padronizacao tecnologica entre as plantas (Americana vs Tatui)?',
  ],
  operacoes: [
    'Como e feita a coleta de dados de producao? Automatica ou manual (papel/formularios)?',
    'Qual o OEE atual das linhas? Como e calculado e com que frequencia?',
    'Como funciona a deteccao de defeitos de qualidade? Qual o tempo entre defeito e deteccao?',
    'Existe manutencao preditiva ou apenas corretiva/preventiva?',
    'Quais maquinas tem conectividade (PLC, sensores)? Quais nao tem?',
    'Como e o controle de paradas? O BMS cobre todas as linhas?',
    'Existe controle estatistico de processo (SPC)? Como e monitorada a variabilidade?',
    'Como funciona a climatizacao das areas produtivas? Impacta a qualidade?',
    'Qual o consumo energetico da area? Existe medicao digital ou analogica?',
    'Como e o processo de apontamento de producao? Intex, BMS, papel?',
  ],
  organizacao: [
    'Qual a taxa de turnover atual? Quais os principais motivos de saida?',
    'Como e feita a capacitacao de novos funcionarios? Existe trilha estruturada?',
    'Existe programa de desenvolvimento de competencias digitais/analiticas?',
    'Como e a gestao de mudanca para novas tecnologias e processos?',
    'A equipe tem perfil analitico ou predominantemente operacional?',
    'Existe resistencia a adocao de novos sistemas? O que funciona para engajar?',
    'Como e a comunicacao entre turnos? Informacoes criticas sao passadas adequadamente?',
    'Existe documentacao de processos e procedimentos? Sao seguidos na pratica?',
    'Como funciona a avaliacao de desempenho? E digital ou manual?',
    'O Projeto Polux de trazer profissionais de fora do textil esta funcionando?',
  ],
  roadmap: [
    'Quais sao as prioridades de transformacao digital para a sua area?',
    'Existe escritorio de transformacao ou similar coordenando as iniciativas?',
    'Como sao priorizadas as iniciativas de melhoria? Existe framework formal?',
    'Qual a visao de futuro para a area nos proximos 2-3 anos?',
    'Quais projetos de melhoria ja foram tentados? O que funcionou e o que nao?',
    'Qual o maior risco se nada mudar nos proximos 12 meses?',
    'Existem quick wins que poderiam ser implementados imediatamente?',
    'Como voce imagina o chao de fabrica ideal com tecnologia?',
    'Qual tecnologia voce gostaria de ter que nao tem hoje (MES, IA, IoT, etc)?',
    'O que e mais urgente: reduzir custo, aumentar produtividade ou melhorar qualidade?',
  ],
};
