import React from 'react';
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

const AgentProgress: React.FC<AgentProgressProps> = ({ agentRuns }) => {
  const completed = agentRuns.filter((r) => r.status === 'completed').length;
  const total = agentRuns.length || 9;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (agentRuns.length === 0) {
    return (
      <div className="text-center py-8">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
          style={{ background: 'var(--t-surface-alt)' }}
        >
          <FileText size={24} style={{ color: 'var(--t-text-ter)' }} />
        </div>
        <p className="font-body text-sm" style={{ color: 'var(--t-text-sec)' }}>
          Nenhuma execucao iniciada ainda
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overall progress */}
      <div className="flex items-center justify-between mb-1">
        <span className="font-body text-sm font-medium" style={{ color: 'var(--t-text-sec)' }}>
          Progresso geral
        </span>
        <span className="font-body text-sm font-semibold" style={{ color: 'var(--t-text)' }}>
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

          const cardStyle: React.CSSProperties = isRunning
            ? { border: '1px solid rgba(59,130,246,0.15)', background: 'rgba(59,130,246,0.05)' }
            : isCompleted
            ? { border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(16,185,129,0.05)' }
            : isError
            ? { border: '1px solid rgba(239,68,68,0.15)', background: 'rgba(239,68,68,0.05)' }
            : { border: '1px solid var(--t-border)', background: 'var(--t-surface)' };

          const iconStyle: React.CSSProperties = isRunning
            ? { background: 'rgba(59,130,246,0.12)', color: '#60A5FA' }
            : isCompleted
            ? { background: 'rgba(16,185,129,0.12)', color: '#34D399' }
            : isError
            ? { background: 'rgba(239,68,68,0.12)', color: '#F87171' }
            : { background: 'var(--t-surface-alt)', color: 'var(--t-text-ter)' };

          const nameStyle: React.CSSProperties = isCompleted
            ? { color: '#34D399' }
            : isError
            ? { color: '#F87171' }
            : isRunning
            ? { color: '#60A5FA' }
            : { color: 'var(--t-text-ter)' };

          return (
            <div
              key={run.id}
              className="flex gap-3 p-3 rounded-lg transition-all duration-300"
              style={cardStyle}
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                style={iconStyle}
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
                    className="font-body text-sm font-semibold"
                    style={nameStyle}
                  >
                    {run.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {duration && (
                      <span className="font-body text-xs" style={{ color: 'var(--t-text-ter)' }}>
                        {duration}
                      </span>
                    )}
                    <StatusBadge status={run.status} />
                  </div>
                </div>

                <p className="font-body text-xs mt-0.5 truncate" style={{ color: 'var(--t-text-sec)' }}>
                  {AGENT_DESCRIPTIONS[index] ?? ''}
                </p>

                {/* Preview text when completed */}
                {isCompleted && run.preview && (
                  <div
                    className="mt-2 p-2"
                    style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: 6 }}
                  >
                    <p className="font-body text-xs line-clamp-2" style={{ color: '#34D399' }}>
                      {run.preview}
                    </p>
                  </div>
                )}

                {/* Error message */}
                {isError && run.error && (
                  <div
                    className="mt-2 p-2"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: 6 }}
                  >
                    <p className="font-body text-xs" style={{ color: '#F87171' }}>{run.error}</p>
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
