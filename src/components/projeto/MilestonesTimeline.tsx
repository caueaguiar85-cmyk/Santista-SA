import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCircle2, CircleDot, Circle } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { useProjectStore } from '../../store/projectStore';
import type { Milestone } from '../../types/project';

// Status cycle: pending -> in_progress -> completed -> pending
const nextStatus = (current: Milestone['status']): Milestone['status'] => {
  if (current === 'pending') return 'in_progress';
  if (current === 'in_progress') return 'completed';
  return 'pending';
};

const phaseLabel: Record<number, string> = {
  1: 'Fase 1 — Diagnostico',
  2: 'Fase 2 — Analise',
  3: 'Fase 3 — Entrega',
};

const phaseBadgeVariant: Record<number, 'pilar-1' | 'pilar-2' | 'pilar-3'> = {
  1: 'pilar-1',
  2: 'pilar-2',
  3: 'pilar-3',
};

interface StatusIconProps {
  status: Milestone['status'];
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  if (status === 'completed') {
    return <CheckCircle2 size={20} className="text-success shrink-0" />;
  }
  if (status === 'in_progress') {
    return <CircleDot size={20} className="text-accent shrink-0" />;
  }
  return <Circle size={20} className="text-border shrink-0" />;
};

const connectorColor = (status: Milestone['status']): string => {
  if (status === 'completed') return 'bg-success';
  if (status === 'in_progress') return 'bg-accent';
  return 'bg-border';
};

interface MilestoneRowProps {
  milestone: Milestone;
  isLast: boolean;
  onToggle: (id: string, next: Milestone['status']) => void;
}

const MilestoneRow: React.FC<MilestoneRowProps> = ({ milestone, isLast, onToggle }) => {
  const formattedDate = (() => {
    try {
      return format(parseISO(milestone.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return milestone.date;
    }
  })();

  const labelColor =
    milestone.status === 'completed'
      ? 'text-primary'
      : milestone.status === 'in_progress'
      ? 'text-primary font-semibold'
      : 'text-text-muted';

  return (
    <div className="flex gap-4">
      {/* Icon + connector */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onToggle(milestone.id, nextStatus(milestone.status))}
          className="mt-0.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-transform hover:scale-110"
          title="Alterar status"
          aria-label={`Alterar status: ${milestone.label}`}
        >
          <StatusIcon status={milestone.status} />
        </button>
        {!isLast && (
          <div className={['w-0.5 flex-1 mt-1 mb-0 rounded-full min-h-[24px]', connectorColor(milestone.status)].join(' ')} />
        )}
      </div>

      {/* Content */}
      <div className={['pb-5 flex-1', isLast ? '' : ''].join(' ')}>
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span className={['font-body text-sm', labelColor].join(' ')}>
            {milestone.label}
          </span>
          <Badge variant={phaseBadgeVariant[milestone.phase]} size="sm">
            Fase {milestone.phase}
          </Badge>
          {milestone.status === 'in_progress' && (
            <Badge variant="accent" size="sm">Em andamento</Badge>
          )}
          {milestone.status === 'completed' && (
            <Badge variant="success" size="sm">Concluido</Badge>
          )}
        </div>
        <p className="font-body text-xs text-text-muted">{formattedDate}</p>
        {milestone.deliverable && (
          <p className="font-body text-xs text-primary/60 mt-1 italic">
            Entregavel: {milestone.deliverable}
          </p>
        )}
      </div>
    </div>
  );
};

const MilestonesTimeline: React.FC = () => {
  const project = useProjectStore((s) => s.project);
  const updateMilestone = useProjectStore((s) => s.updateMilestone);

  if (!project) return null;

  // Group milestones by phase, preserving order
  const phases = [1, 2, 3] as const;
  const grouped = phases.reduce<Record<number, Milestone[]>>((acc, phase) => {
    acc[phase] = project.milestones.filter((m) => m.phase === phase);
    return acc;
  }, {});

  const handleToggle = (id: string, next: Milestone['status']) => {
    updateMilestone(id, next);
  };

  return (
    <Card
      title="Cronograma de Marcos"
      subtitle="Clique no icone para alternar o status do marco"
    >
      <div className="space-y-6">
        {phases.map((phase) => {
          const milestones = grouped[phase];
          if (!milestones || milestones.length === 0) return null;

          return (
            <div key={phase}>
              {/* Phase header */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={[
                    'font-body text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border',
                    phase === 1
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : phase === 2
                      ? 'bg-violet-50 text-violet-700 border-violet-200'
                      : 'bg-teal-50 text-teal-700 border-teal-200',
                  ].join(' ')}
                >
                  {phaseLabel[phase]}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Milestones */}
              <div>
                {milestones.map((milestone, idx) => (
                  <MilestoneRow
                    key={milestone.id}
                    milestone={milestone}
                    isLast={idx === milestones.length - 1}
                    onToggle={handleToggle}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {project.milestones.length === 0 && (
          <p className="font-body text-sm text-text-muted text-center py-8">
            Nenhum marco cadastrado para este projeto.
          </p>
        )}
      </div>
    </Card>
  );
};

export default MilestonesTimeline;
