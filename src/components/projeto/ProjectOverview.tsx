import React from 'react';
import { differenceInDays, parseISO } from 'date-fns';
import { Layers, TrendingUp, Clock, Users } from 'lucide-react';
import Card from '../ui/Card';
import { useProjectStore } from '../../store/projectStore';
import { useInterviewStore } from '../../store/interviewStore';

// Circular progress ring
interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 64,
  strokeWidth = 6,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--t-border)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--t-accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  );
};

// Individual metric card
interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: string;
  accent?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, sub, accent }) => (
  <div
    className="flex flex-col gap-3 rounded-xl p-5"
    style={
      accent
        ? { background: 'var(--t-accent-soft)', border: '1px solid rgba(227,30,36,0.15)' }
        : { background: 'var(--t-surface)', border: '1px solid var(--t-border)' }
    }
  >
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center"
      style={{ background: 'var(--t-accent-soft)' }}
    >
      <span style={{ color: 'var(--t-accent)' }}>{icon}</span>
    </div>
    <div>
      <p
        className="font-body text-xs font-medium uppercase tracking-wide mb-1"
        style={{ color: accent ? 'var(--t-text-sec)' : 'var(--t-text-sec)' }}
      >
        {label}
      </p>
      <div
        className="font-heading text-2xl font-bold"
        style={{ color: accent ? 'var(--t-accent)' : 'var(--t-text)' }}
      >
        {value}
      </div>
      {sub && (
        <p
          className="font-body text-xs mt-0.5"
          style={{ color: accent ? 'var(--t-text-sec)' : 'var(--t-text-sec)' }}
        >
          {sub}
        </p>
      )}
    </div>
  </div>
);

// Info row
interface InfoRowProps {
  label: string;
  value: string | number;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid var(--t-border)' }}>
    <span className="font-body text-sm" style={{ color: 'var(--t-text-sec)' }}>{label}</span>
    <span className="font-body text-sm font-semibold" style={{ color: 'var(--t-text)' }}>{value}</span>
  </div>
);

const ProjectOverview: React.FC = () => {
  const project = useProjectStore((s) => s.project);
  const interviews = useInterviewStore((s) => s.interviews);

  if (!project) return null;

  const daysRemaining = differenceInDays(parseISO(project.endDate), new Date());
  const interviewsCompleted = interviews.filter(
    (i) => i.status === 'analyzed' || i.status === 'completed'
  ).length;

  const phaseLabels: Record<number, string> = {
    1: 'Diagnostico',
    2: 'Analise',
    3: 'Entrega',
  };

  return (
    <div className="space-y-5">
      {/* 4 metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Fase atual */}
        <MetricCard
          accent
          icon={<Layers size={20} />}
          label="Fase Atual"
          value={`Fase ${project.currentPhase}`}
          sub={phaseLabels[project.currentPhase] ?? ''}
        />

        {/* Conclusao */}
        <div className="flex flex-col gap-3 rounded-xl p-5" style={{ background: 'var(--t-surface)', border: '1px solid var(--t-border)' }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--t-accent-soft)' }}>
            <TrendingUp size={20} style={{ color: 'var(--t-accent)' }} />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <CircularProgress value={project.completionPercent} size={56} strokeWidth={5} />
              <span
                className="absolute font-body text-xs font-bold"
                style={{ fontSize: '10px', color: 'var(--t-text)' }}
              >
                {project.completionPercent}%
              </span>
            </div>
            <div>
              <p className="font-body text-xs font-medium uppercase tracking-wide mb-0.5" style={{ color: 'var(--t-text-sec)' }}>
                Conclusao
              </p>
              <p className="font-heading text-xl font-bold" style={{ color: 'var(--t-text)' }}>
                {project.completionPercent}%
              </p>
            </div>
          </div>
        </div>

        {/* Dias restantes */}
        <MetricCard
          icon={<Clock size={20} />}
          label="Dias Restantes"
          value={daysRemaining > 0 ? daysRemaining : 0}
          sub={daysRemaining < 0 ? 'Prazo encerrado' : 'ate o encerramento'}
        />

        {/* Entrevistas */}
        <MetricCard
          icon={<Users size={20} />}
          label="Entrevistas Realizadas"
          value={interviewsCompleted}
          sub={`de ${interviews.length} agendadas`}
        />
      </div>

      {/* Project info card */}
      <Card title="Informacoes do Projeto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div>
            <InfoRow label="Cliente" value={project.client} />
            <InfoRow label="Setor" value={project.sector} />
            <InfoRow label="Receita Anual" value={project.revenue} />
          </div>
          <div>
            <InfoRow label="Colaboradores" value={project.employees.toLocaleString('pt-BR')} />
            <InfoRow label="Unidades / Fabricas" value={project.factories} />
            <InfoRow
              label="Duracao do Projeto"
              value={`${project.startDate} — ${project.endDate}`}
            />
          </div>
        </div>
        {project.context && (
          <p className="font-body text-sm mt-4 leading-relaxed pt-4" style={{ color: 'var(--t-text-sec)', borderTop: '1px solid var(--t-border)' }}>
            {project.context}
          </p>
        )}
      </Card>
    </div>
  );
};

export default ProjectOverview;
