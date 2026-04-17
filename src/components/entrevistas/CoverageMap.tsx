import React from 'react';
import clsx from 'clsx';
import type { PillarType, HierarchyLevel } from '../../types/interview';
import { PILLAR_LABELS, HIERARCHY_LABELS } from '../../types/interview';
import { useInterviewStore } from '../../store/interviewStore';

const PILLARS: PillarType[]       = ['processos', 'sistemas', 'operacoes', 'organizacao', 'roadmap'];
const LEVELS: HierarchyLevel[]    = ['c-level', 'gerencia', 'operacional'];

// Pillar short label for narrow headers
const PILLAR_SHORT: Record<PillarType, string> = {
  processos:   'Processos',
  sistemas:    'Sistemas',
  operacoes:   'Operacoes',
  organizacao: 'Organizacao',
  roadmap:     'Roadmap',
};

// Header accent colours per pillar
const PILLAR_HEADER_CLASS: Record<PillarType, string> = {
  processos:   'bg-blue-500',
  sistemas:    'bg-violet-500',
  operacoes:   'bg-emerald-500',
  organizacao: 'bg-amber-500',
  roadmap:     'bg-red-500',
};

type CellState = 'analyzed' | 'completed' | 'empty';

interface CellInfo {
  state: CellState;
  count: number;
}

const CELL_CLASS: Record<CellState, string> = {
  analyzed:  'bg-success/[0.12] border-success/30 text-success',
  completed: 'bg-warning/[0.08] border-warning/25 text-warning',
  empty:     'bg-danger/[0.08] border-danger/20 text-danger',
};

const CELL_LABEL: Record<CellState, string> = {
  analyzed:  'Analisada',
  completed: 'Concluida',
  empty:     'Sem entrevista',
};

const LEGEND_ITEMS: { state: CellState; label: string }[] = [
  { state: 'analyzed',  label: 'Analisada pela IA' },
  { state: 'completed', label: 'Concluida (sem analise IA)' },
  { state: 'empty',     label: 'Sem entrevista' },
];

const STAT_COLOR_CLASS: Record<string, string> = {
  'Total': 'text-text',
  'Analisadas': 'text-success',
  'Concluidas': 'text-warning',
  'Cobertura': 'text-info',
};

const CoverageMap: React.FC = () => {
  const interviews = useInterviewStore((s) => s.interviews);

  function getCellInfo(pillar: PillarType, level: HierarchyLevel): CellInfo {
    const matches = interviews.filter(
      (i) => i.pillar === pillar && i.level === level
    );
    const count = matches.length;
    if (count === 0) return { state: 'empty', count: 0 };
    const hasAnalyzed  = matches.some((i) => i.status === 'analyzed');
    const hasCompleted = matches.some((i) => i.status === 'completed');
    const state: CellState = hasAnalyzed ? 'analyzed' : hasCompleted ? 'completed' : 'empty';
    return { state, count };
  }

  const totalInterviews = interviews.length;
  const analyzedCount   = interviews.filter((i) => i.status === 'analyzed').length;
  const completedCount  = interviews.filter((i) => i.status === 'completed').length;
  const coveredCells    = PILLARS.flatMap((p) =>
    LEVELS.map((l) => getCellInfo(p, l))
  ).filter((c) => c.state !== 'empty').length;
  const totalCells = PILLARS.length * LEVELS.length;

  return (
    <div className="rounded-xl shadow-sm p-6 flex flex-col gap-6 bg-surface-2 border border-border">
      {/* Section header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-heading text-lg font-semibold text-text">
            Mapa de Cobertura
          </h2>
          <p className="font-body text-sm mt-0.5 text-text-secondary">
            Distribuicao das entrevistas por pilar e nivel hierarquico
          </p>
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Total',      value: totalInterviews },
            { label: 'Analisadas', value: analyzedCount },
            { label: 'Concluidas', value: completedCount },
            { label: 'Cobertura',  value: `${coveredCells}/${totalCells}` },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className={clsx('font-heading text-xl font-bold', STAT_COLOR_CLASS[label])}>{value}</p>
              <p className="font-body text-xs text-text-secondary">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="min-w-[560px]">
          {/* Pillar header row */}
          <div className="grid gap-1.5 mb-1.5" style={{ gridTemplateColumns: '110px repeat(5, 1fr)' }}>
            <div />
            {PILLARS.map((pillar) => (
              <div
                key={pillar}
                className={clsx(
                  'rounded-lg px-2 py-1.5 text-center',
                  'text-white text-xs font-body font-semibold',
                  PILLAR_HEADER_CLASS[pillar],
                )}
              >
                {PILLAR_SHORT[pillar]}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {LEVELS.map((level) => (
            <div
              key={level}
              className="grid gap-1.5 mb-1.5"
              style={{ gridTemplateColumns: '110px repeat(5, 1fr)' }}
            >
              {/* Row label */}
              <div className="flex items-center">
                <span className="font-body text-sm font-medium text-text-secondary">
                  {HIERARCHY_LABELS[level]}
                </span>
              </div>

              {PILLARS.map((pillar) => {
                const { state, count } = getCellInfo(pillar, level);
                return (
                  <div
                    key={pillar}
                    title={`${PILLAR_LABELS[pillar]} · ${HIERARCHY_LABELS[level]} · ${CELL_LABEL[state]}`}
                    className={clsx(
                      'rounded-lg border flex flex-col items-center justify-center py-3 gap-0.5 transition-all duration-200 hover:brightness-95',
                      CELL_CLASS[state],
                    )}
                  >
                    <span className="font-heading text-lg font-bold leading-none">
                      {state === 'empty' ? '—' : count}
                    </span>
                    <span className="font-body text-[10px] leading-tight opacity-70">
                      {state === 'empty' ? 'vazio' : count === 1 ? 'entrevista' : 'entrevistas'}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border">
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Legenda:
        </span>
        {LEGEND_ITEMS.map(({ state, label }) => (
          <div key={state} className="flex items-center gap-1.5">
            <span
              className={clsx('h-3 w-3 rounded border shrink-0', CELL_CLASS[state])}
              aria-hidden="true"
            />
            <span className="font-body text-xs text-text-secondary">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverageMap;
