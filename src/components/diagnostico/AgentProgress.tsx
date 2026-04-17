import React from 'react';
import clsx from 'clsx';
import {
  Search,
  ShieldAlert,
  Lightbulb,
  DollarSign,
  Map,
  BarChart2,
  Users,
  TrendingUp,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
} from 'lucide-react';
import type { AgentRun, AgentStatus } from '../../types/diagnostico';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

interface AgentProgressProps {
  agentRuns: AgentRun[];
}

const AGENT_ICONS: React.ReactNode[] = [
  <Search size={18} />,
  <ShieldAlert size={18} />,
  <Lightbulb size={18} />,
  <DollarSign size={18} />,
  <Map size={18} />,
  <BarChart2 size={18} />,
  <Users size={18} />,
  <TrendingUp size={18} />,
  <FileText size={18} />,
];

const AGENT_DESCRIPTIONS: string[] = [
  'Analisa o estado atual de cada pilar da cadeia de suprimentos',
  'Identifica e quantifica riscos operacionais e estrategicos',
  'Gera recomendacoes priorizadas por impacto e esforco',
  'Estima ganhos financeiros e payback das iniciativas',
  'Estrutura o roadmap de transformacao em ondas',
  'Define KPIs e metricas de acompanhamento',
  'Constroi a matriz RACI das iniciativas',
  'Compara resultados com benchmarks do setor',
  'Sintetiza o relatorio executivo consolidado',
];

function StatusBadge({ status }: { status: AgentStatus }) {
  if (status === 'waiting') {
    return (
      <Badge variant="default" size="sm">
        <Clock size={11} />
        Aguardando
      </Badge>
    );
  }
  if (status === 'running') {
    return (
      <Badge variant="info" size="sm">
        <Loader2 size={11} className="animate-spin" />
        Executando
      </Badge>
    );
  }
  if (status === 'completed') {
    return (
      <Badge variant="success" size="sm">
        <CheckCircle2 size={11} />
        Concluido
      </Badge>
    );
  }
  return (
    <Badge variant="danger" size="sm">
      <XCircle size={11} />
      Erro
    </Badge>
  );
}

function formatDuration(startedAt?: string, completedAt?: string): string {
  if (!startedAt || !completedAt) return '';
  const diff = new Date(completedAt).getTime() - new Date(startedAt).getTime();
  const seconds = (diff / 1000).toFixed(1);
  return `${seconds}s`;
}

// ----------------------------
// Card / Icon / Name class maps
// ----------------------------
const CARD_CLASSES: Record<string, string> = {
  running: 'border border-info/[0.15] bg-info/[0.05]',
  completed: 'border border-success/[0.15] bg-success/[0.05]',
  error: 'border border-danger/[0.15] bg-danger/[0.05]',
  waiting: 'border border-border bg-surface-2',
};

const ICON_CLASSES: Record<string, string> = {
  running: 'bg-info/[0.12] text-blue-400',
  completed: 'bg-success/[0.12] text-emerald-400',
  error: 'bg-danger/[0.12] text-red-400',
  waiting: 'bg-surface-3 text-text-tertiary',
};

const NAME_CLASSES: Record<string, string> = {
  running: 'text-blue-400',
  completed: 'text-emerald-400',
  error: 'text-red-400',
  waiting: 'text-text-tertiary',
};

const AgentProgress: React.FC<AgentProgressProps> = ({ agentRuns }) => {
  const completed = agentRuns.filter((r) => r.status === 'completed').length;
  const total = agentRuns.length || 9;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (agentRuns.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-surface-3">
          <FileText size={24} className="text-text-tertiary" />
        </div>
        <p className="font-body text-sm text-text-secondary">
          Nenhuma execucao iniciada ainda
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overall progress */}
      <div className="flex items-center justify-between mb-1">
        <span className="font-body text-sm font-medium text-text-secondary">
          Progresso geral
        </span>
        <span className="font-body text-sm font-semibold text-text">
          {completed}/{total} agentes
        </span>
      </div>
      <ProgressBar
        value={progressPercent}
        variant={completed === total ? 'success' : 'accent'}
        size="md"
        showLabel
      />

      {/* Agent list */}
      <div className="space-y-2 mt-4">
        {agentRuns.map((run, index) => {
          const isRunning = run.status === 'running';
          const isCompleted = run.status === 'completed';
          const isError = run.status === 'error';
          const duration = formatDuration(run.startedAt, run.completedAt);

          const statusKey = isRunning
            ? 'running'
            : isCompleted
            ? 'completed'
            : isError
            ? 'error'
            : 'waiting';

          return (
            <div
              key={run.id}
              className={clsx(
                'flex gap-3 p-3 rounded-lg transition-all duration-300',
                CARD_CLASSES[statusKey],
              )}
            >
              {/* Icon */}
              <div
                className={clsx(
                  'flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center',
                  ICON_CLASSES[statusKey],
                )}
              >
                {isRunning ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  AGENT_ICONS[index] ?? <FileText size={18} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span
                    className={clsx(
                      'font-body text-sm font-semibold',
                      NAME_CLASSES[statusKey],
                    )}
                  >
                    {run.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {duration && (
                      <span className="font-body text-xs text-text-tertiary">
                        {duration}
                      </span>
                    )}
                    <StatusBadge status={run.status} />
                  </div>
                </div>

                <p className="font-body text-xs mt-0.5 truncate text-text-secondary">
                  {AGENT_DESCRIPTIONS[index] ?? ''}
                </p>

                {/* Preview text when completed */}
                {isCompleted && run.preview && (
                  <div className="mt-2 p-2 rounded-md bg-success/[0.08] border border-success/[0.12]">
                    <p className="font-body text-xs line-clamp-2 text-emerald-400">
                      {run.preview}
                    </p>
                  </div>
                )}

                {/* Error message */}
                {isError && run.error && (
                  <div className="mt-2 p-2 rounded-md bg-danger/[0.08] border border-danger/[0.12]">
                    <p className="font-body text-xs text-red-400">{run.error}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentProgress;
