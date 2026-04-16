import React from 'react';
import Badge from '../ui/Badge';
import type { Initiative } from '../../types/diagnostico';
import { PILLAR_LABELS } from '../../types/interview';
import type { PillarType } from '../../types/interview';

interface InitiativeCardProps {
  initiative: Initiative;
}

const EFFORT_LABELS: Record<Initiative['effort'], string> = {
  P: 'Pequeno',
  M: 'Medio',
  G: 'Grande',
};

const EFFORT_VARIANT: Record<Initiative['effort'], 'success' | 'warning' | 'danger'> = {
  P: 'success',
  M: 'warning',
  G: 'danger',
};

const STATUS_LABELS: Record<Initiative['status'], string> = {
  proposed: 'Proposto',
  approved: 'Aprovado',
  in_progress: 'Em andamento',
  completed: 'Concluido',
};

const STATUS_VARIANT: Record<
  Initiative['status'],
  'default' | 'info' | 'warning' | 'success'
> = {
  proposed: 'default',
  approved: 'info',
  in_progress: 'warning',
  completed: 'success',
};

const WAVE_ACCENT: Record<Initiative['wave'], string> = {
  stabilize: 'border-l-red-400',
  optimize: 'border-l-amber-400',
  transform: 'border-l-emerald-400',
};

function pillarVariant(
  pillar: PillarType
): 'pilar-1' | 'pilar-2' | 'pilar-3' | 'pilar-4' | 'pilar-5' {
  const map: Record<
    PillarType,
    'pilar-1' | 'pilar-2' | 'pilar-3' | 'pilar-4' | 'pilar-5'
  > = {
    processos: 'pilar-1',
    sistemas: 'pilar-2',
    operacoes: 'pilar-3',
    organizacao: 'pilar-4',
    roadmap: 'pilar-5',
  };
  return map[pillar];
}

/** Render impact as filled dots (1-5) */
const ImpactDots: React.FC<{ impact: number }> = ({ impact }) => {
  const dots = Math.round(Math.max(1, Math.min(5, impact / 20)));
  return (
    <div className="flex items-center gap-0.5" title={`Impacto: ${impact}/100`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={[
            'inline-block w-2 h-2 rounded-full',
            i < dots ? 'bg-accent' : 'bg-border',
          ].join(' ')}
        />
      ))}
    </div>
  );
};

const InitiativeCard: React.FC<InitiativeCardProps> = ({ initiative }) => {
  return (
    <div
      className={[
        'bg-surface-2 rounded-xl border border-border border-l-4 shadow-sm p-4',
        'hover:shadow-md transition-shadow duration-300',
        WAVE_ACCENT[initiative.wave],
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-heading text-sm font-semibold text-primary leading-snug flex-1">
          {initiative.name}
        </h3>
        <Badge variant={EFFORT_VARIANT[initiative.effort]} size="sm">
          {initiative.effort} — {EFFORT_LABELS[initiative.effort]}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-xs text-text-muted leading-relaxed mb-3 line-clamp-3">
        {initiative.description}
      </p>

      {/* Impact dots + pillar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Impacto:</span>
          <ImpactDots impact={initiative.impact} />
          <span className="text-xs font-semibold text-accent">{initiative.impact}/100</span>
        </div>
        <Badge variant={pillarVariant(initiative.pillar)} size="sm">
          {PILLAR_LABELS[initiative.pillar].split(' ')[0]}
        </Badge>
      </div>

      {/* Timing */}
      <div className="text-xs text-text-muted mb-3">
        <span className="font-medium text-text">Inicio:</span> Mes {initiative.startMonth} &nbsp;|&nbsp;
        <span className="font-medium text-text">Duracao:</span> {initiative.durationMonths} mes
        {initiative.durationMonths !== 1 ? 'es' : ''}
      </div>

      {/* Responsible */}
      {initiative.responsible && (
        <div className="text-xs text-text-muted mb-3">
          <span className="font-medium text-text">Responsavel:</span>{' '}
          {initiative.responsible}
        </div>
      )}

      {/* Dependencies */}
      {initiative.dependencies && initiative.dependencies.length > 0 && (
        <div className="mb-3">
          <span className="text-xs font-medium text-text">Dependencias:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {initiative.dependencies.map((dep, idx) => (
              <span
                key={idx}
                className="text-xs bg-surface px-2 py-0.5 rounded-full border border-border text-text-muted"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="pt-2 border-t border-border">
        <Badge variant={STATUS_VARIANT[initiative.status]} size="sm">
          {STATUS_LABELS[initiative.status]}
        </Badge>
      </div>
    </div>
  );
};

export default InitiativeCard;
