import React from 'react';
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

const CELL_CLASSES: Record<CellState, string> = {
  analyzed: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
  completed: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
  empty:    'bg-red-500/10 border-red-500/20 text-red-400',
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

const CoverageMap: React.FC = () => {
  const interviews = useInterviewStore((s) => s.interviews);

  /**
   * For each (pillar, level) cell, determine its best state:
   *   - "analyzed"  if any interview in that cell has status === 'analyzed'
   *   - "completed" if none are analyzed but at least one is completed
   *   - "empty"     otherwise
   */
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
    <div className="bg-surface-2 rounded-xl border border-border shadow-sm p-6 flex flex-col gap-6">
      {/* Section header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-heading text-lg font-semibold text-primary">
            Mapa de Cobertura
          </h2>
          <p className="font-body text-sm text-primary/60 mt-0.5">
            Distribuicao das entrevistas por pilar e nivel hierarquico
          </p>
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Total',      value: totalInterviews, color: 'text-primary' },
            { label: 'Analisadas', value: analyzedCount,   color: 'text-emerald-600' },
            { label: 'Concluidas', value: completedCount,  color: 'text-amber-600' },
            { label: 'Cobertura',  value: `${coveredCells}/${totalCells}`, color: 'text-blue-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <p className={['font-heading text-xl font-bold', color].join(' ')}>{value}</p>
              <p className="font-body text-xs text-primary/50">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid — horizontally scrollable on small screens */}
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="min-w-[560px]">
          {/* Pillar header row */}
          <div className="grid gap-1.5 mb-1.5" style={{ gridTemplateColumns: '110px repeat(5, 1fr)' }}>
            {/* empty top-left corner */}
            <div />
            {PILLARS.map((pillar) => (
              <div
                key={pillar}
                className={[
                  'rounded-lg px-2 py-1.5 text-center',
                  'text-white text-xs font-body font-semibold',
                  PILLAR_HEADER_CLASS[pillar],
                ].join(' ')}
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
                <span className="font-body text-sm font-medium text-primary/70">
                  {HIERARCHY_LABELS[level]}
                </span>
              </div>

              {PILLARS.map((pillar) => {
                const { state, count } = getCellInfo(pillar, level);
                return (
                  <div
                    key={pillar}
                    title={`${PILLAR_LABELS[pillar]} · ${HIERARCHY_LABELS[level]} · ${CELL_LABEL[state]}`}
                    className={[
                      'rounded-lg border flex flex-col items-center justify-center',
                      'py-3 gap-0.5 transition-all duration-200 hover:brightness-95',
                      CELL_CLASSES[state],
                    ].join(' ')}
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
        <span className="font-body text-xs font-semibold text-primary/50 uppercase tracking-wide">
          Legenda:
        </span>
        {LEGEND_ITEMS.map(({ state, label }) => (
          <div key={state} className="flex items-center gap-1.5">
            <span
              className={[
                'h-3 w-3 rounded border shrink-0',
                CELL_CLASSES[state],
              ].join(' ')}
              aria-hidden="true"
            />
            <span className="font-body text-xs text-primary/70">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverageMap;
