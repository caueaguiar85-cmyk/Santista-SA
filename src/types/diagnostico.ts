import type { PillarType } from './interview';

export const CMMI_LEVELS: Record<number, string> = {
  1: 'Inicial',
  2: 'Gerenciado',
  3: 'Definido',
  4: 'Quantitativamente Gerenciado',
  5: 'Otimizado',
};

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: 'Operacional' | 'Estrategico' | 'Tecnologico' | 'Regulatorio' | 'Financeiro';
  probability: number;
  impact: number;
  riskScore: number;
  estimatedCost: string;
  source: string;
  mitigation: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'Alta' | 'Media' | 'Baixa';
  effort: 'P' | 'M' | 'G';
  impact: number;
  pillar: PillarType;
  type: 'quick_win' | 'strategic' | 'structural';
}

export interface GainEstimate {
  totalEstimatedGain: string;
  byInitiative: { name: string; gain: string; confidence: 'Alta' | 'Media' | 'Baixa' }[];
  paybackMonths: number;
}

export interface KPI {
  id: string;
  pillar: PillarType;
  name: string;
  description: string;
  currentBaseline: string;
  target: string;
  unit: string;
  timeframe: string;
}

export interface RACIItem {
  initiative: string;
  responsible: string;
  accountable: string;
  consulted: string;
  informed: string;
  tools: string[];
  resources: string;
}

export interface BenchmarkData {
  companyScore: number;
  sectorAverage: number;
  topQuartile: number;
  byPillar: { pillar: PillarType; company: number; sector: number; topQuartile: number }[];
  references: string[];
}

export interface Initiative {
  id: string;
  name: string;
  description: string;
  pillar: PillarType;
  wave: 'stabilize' | 'optimize' | 'transform';
  effort: 'P' | 'M' | 'G';
  impact: number;
  responsible: string;
  dependencies: string[];
  status: 'proposed' | 'approved' | 'in_progress' | 'completed';
  startMonth: number;
  durationMonths: number;
}

export interface PillarScore {
  pillar: PillarType;
  score: number;
  level: string;
  asIs: string;
  keyFindings: string[];
  criticalGaps: string[];
  risks: Risk[];
  recommendations: Recommendation[];
  estimatedGains: GainEstimate | null;
  status: 'draft' | 'reviewed' | 'approved';
}

export interface DiagnosticReport {
  projectId: string;
  generatedAt: string;
  overallScore: number;
  pillarScores: PillarScore[];
  executiveSummary: string;
  kpis: KPI[];
  raciMatrix: RACIItem[];
  marketBenchmark: BenchmarkData | null;
  initiatives: Initiative[];
}

export type AgentStatus = 'waiting' | 'running' | 'completed' | 'error';

export interface AgentRun {
  id: string;
  name: string;
  status: AgentStatus;
  startedAt?: string;
  completedAt?: string;
  error?: string;
  preview?: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  impact: 'Alto' | 'Medio' | 'Baixo';
  estimatedValue?: string;
  origin: string;
  benchmarkSource?: string;
  suggestedAction: string;
  status: 'new' | 'analyzing' | 'validated' | 'discarded';
  type: 'risk' | 'opportunity' | 'quick_win' | 'strategic';
  pillar: PillarType;
}
