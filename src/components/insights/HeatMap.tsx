import React from 'react';
import { useDiagnosticoStore } from '../../store/diagnosticoStore';
import { PILLAR_LABELS } from '../../types/interview';
import type { PillarType } from '../../types/interview';
import type { Insight } from '../../types/diagnostico';

const PILLARS: PillarType[] = ['processos', 'sistemas', 'operacoes', 'organizacao', 'roadmap'];
const TYPES: Insight['type'][] = ['risk', 'opportunity', 'quick_win', 'strategic'];

const TYPE_LABELS: Record<Insight['type'], string> = {
  risk: 'Risco',
  opportunity: 'Oportunidade',
  quick_win: 'Quick Win',
  strategic: 'Estrategico',
};

const TYPE_BASE_COLORS: Record<Insight['type'], { base: string; text: string }> = {
  risk:        { base: '#ef4444', text: '#ffffff' },
  opportunity: { base: '#22c55e', text: '#ffffff' },
  quick_win:   { base: '#f59e0b', text: '#ffffff' },
  strategic:   { base: '#3b82f6', text: '#ffffff' },
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 200, g: 200, b: 200 };
}

interface CellProps {
  count: number;
  maxCount: number;
  type: Insight['type'];
}

const Cell: React.FC<CellProps> = ({ count, maxCount, type }) => {
  const { base, text } = TYPE_BASE_COLORS[type];
  const { r, g, b } = hexToRgb(base);
  const opacity = count === 0 ? 0.05 : 0.15 + (count / Math.max(maxCount, 1)) * 0.75;

  return (
    <div
      className="flex items-center justify-center rounded-lg h-12 transition-all duration-300 select-none"
      style={{
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})`,
        border: `1px solid rgba(${r}, ${g}, ${b}, ${Math.min(opacity + 0.2, 1)})`,
      }}
      title={`${count} insight${count !== 1 ? 's' : ''}`}
    >
      {count > 0 ? (
        <span
          className="text-sm font-bold"
          style={{ color: opacity > 0.5 ? text : `rgb(${r},${g},${b})` }}
        >
          {count}
        </span>
      ) : (
        <span className="text-xs text-text-muted opacity-40">—</span>
      )}
    </div>
  );
};

const HeatMap: React.FC = () => {
  const insights = useDiagnosticoStore((s) => s.insights);

  // Build count matrix
  const matrix: Record<Insight['type'], Record<PillarType, number>> = {
    risk:        { processos: 0, sistemas: 0, operacoes: 0, organizacao: 0, roadmap: 0 },
    opportunity: { processos: 0, sistemas: 0, operacoes: 0, organizacao: 0, roadmap: 0 },
    quick_win:   { processos: 0, sistemas: 0, operacoes: 0, organizacao: 0, roadmap: 0 },
    strategic:   { processos: 0, sistemas: 0, operacoes: 0, organizacao: 0, roadmap: 0 },
  };

  for (const insight of insights) {
    matrix[insight.type][insight.pillar]++;
  }

  const maxCount = Math.max(
    1,
    ...TYPES.flatMap((t) => PILLARS.map((p) => matrix[t][p]))
  );

  return (
    <div className="rounded-xl border border-border bg-surface-2 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="font-heading text-base font-semibold text-primary leading-tight">
            Mapa de Calor — Concentracao por Pilar e Tipo
          </h2>
          <p className="text-xs text-text-muted mt-0.5">
            Intensidade indica quantidade de insights nessa celula
          </p>
        </div>
        <span className="text-xs text-text-muted">
          Total: {insights.length} insight{insights.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          {/* Column headers (pillars) */}
          <div className="grid gap-2 mb-2" style={{ gridTemplateColumns: '120px repeat(5, 1fr)' }}>
            <div /> {/* empty corner */}
            {PILLARS.map((pillar) => (
              <div key={pillar} className="text-center">
                <span className="text-xs font-semibold text-text-muted leading-tight block px-1">
                  {PILLAR_LABELS[pillar].split(' ')[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Rows (types) */}
          {TYPES.map((type) => {
            const { base } = TYPE_BASE_COLORS[type];
            const { r, g, b } = hexToRgb(base);
            return (
              <div
                key={type}
                className="grid gap-2 mb-2"
                style={{ gridTemplateColumns: '120px repeat(5, 1fr)' }}
              >
                {/* Row label */}
                <div className="flex items-center pr-3">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold leading-tight"
                    style={{ color: `rgb(${r}, ${g}, ${b})` }}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                    />
                    {TYPE_LABELS[type]}
                  </span>
                </div>

                {/* Cells */}
                {PILLARS.map((pillar) => (
                  <Cell
                    key={pillar}
                    count={matrix[type][pillar]}
                    maxCount={maxCount}
                    type={type}
                  />
                ))}
              </div>
            );
          })}

          {/* Full pillar label row */}
          <div className="grid gap-2 mt-3" style={{ gridTemplateColumns: '120px repeat(5, 1fr)' }}>
            <div />
            {PILLARS.map((pillar) => (
              <div key={pillar} className="text-center px-1">
                <span className="text-[10px] text-text-muted leading-tight block">
                  {PILLAR_LABELS[pillar]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-border">
        {TYPES.map((type) => {
          const { base } = TYPE_BASE_COLORS[type];
          const { r, g, b } = hexToRgb(base);
          return (
            <div key={type} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
              />
              <span className="text-xs text-text-muted">{TYPE_LABELS[type]}</span>
            </div>
          );
        })}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs text-text-muted">Menor</span>
          <div className="flex gap-0.5">
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((op) => (
              <span
                key={op}
                className="inline-block w-4 h-4 rounded-sm"
                style={{ backgroundColor: `rgba(100,100,100,${op})` }}
              />
            ))}
          </div>
          <span className="text-xs text-text-muted">Maior</span>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
