import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  DiagnosticReport,
  PillarScore,
  AgentRun,
  AgentStatus,
  Insight,
} from '../types/diagnostico';
import type { PillarType } from '../types/interview';

const AGENT_NAMES = [
  'AS-IS Analyst',
  'Risk Assessor',
  'Recommender',
  'Value Estimator',
  'Roadmap Builder',
  'KPI Definer',
  'RACI Builder',
  'Market Benchmarker',
  'Executive Synthesizer',
] as const;

function createInitialAgentRuns(): AgentRun[] {
  return AGENT_NAMES.map((name, index) => ({
    id: `agent-${index + 1}`,
    name,
    status: 'waiting' as AgentStatus,
  }));
}

interface DiagnosticoState {
  report: DiagnosticReport | null;
  agentRuns: AgentRun[];
  insights: Insight[];
  isRunning: boolean;

  // Actions
  setReport: (report: DiagnosticReport) => void;
  updatePillarScore: (pillar: PillarType, partial: Partial<PillarScore>) => void;
  updatePillarStatus: (pillar: PillarType, status: PillarScore['status']) => void;
  setAgentRuns: (agentRuns: AgentRun[]) => void;
  updateAgentRun: (id: string, partial: Partial<AgentRun>) => void;
  setInsights: (insights: Insight[]) => void;
  addInsight: (insight: Insight) => void;
  updateInsightStatus: (id: string, status: Insight['status']) => void;
  setIsRunning: (isRunning: boolean) => void;
  initializeAgentRuns: () => void;
}

export const useDiagnosticoStore = create<DiagnosticoState>()(
  persist(
    (set) => ({
      report: null,
      agentRuns: [],
      insights: [],
      isRunning: false,

      setReport: (report) =>
        set({ report }),

      updatePillarScore: (pillar, partial) =>
        set((state) => {
          if (!state.report) return state;
          return {
            report: {
              ...state.report,
              pillarScores: state.report.pillarScores.map((ps) =>
                ps.pillar === pillar ? { ...ps, ...partial } : ps
              ),
            },
          };
        }),

      updatePillarStatus: (pillar, status) =>
        set((state) => {
          if (!state.report) return state;
          return {
            report: {
              ...state.report,
              pillarScores: state.report.pillarScores.map((ps) =>
                ps.pillar === pillar ? { ...ps, status } : ps
              ),
            },
          };
        }),

      setAgentRuns: (agentRuns) =>
        set({ agentRuns }),

      updateAgentRun: (id, partial) =>
        set((state) => ({
          agentRuns: state.agentRuns.map((run) =>
            run.id === id ? { ...run, ...partial } : run
          ),
        })),

      setInsights: (insights) =>
        set({ insights }),

      addInsight: (insight) =>
        set((state) => ({
          insights: [...state.insights, insight],
        })),

      updateInsightStatus: (id, status) =>
        set((state) => ({
          insights: state.insights.map((insight) =>
            insight.id === id ? { ...insight, status } : insight
          ),
        })),

      setIsRunning: (isRunning) =>
        set({ isRunning }),

      initializeAgentRuns: () =>
        set({ agentRuns: createInitialAgentRuns() }),
    }),
    {
      name: 'stoken-diagnostico',
      storage: {
        getItem: (key) => {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);
