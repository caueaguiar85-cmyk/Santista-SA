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
