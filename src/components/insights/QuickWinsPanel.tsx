import React from 'react';
import { useDiagnosticoStore } from '../../store/diagnosticoStore';
import type { Insight } from '../../types/diagnostico';

/** Parse a currency string like "R$ 1.200.000" and return numeric value */
function parseBRL(value?: string): number {
  if (!value) return 0;
  return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
}

function roiLabel(value?: string): string {
  const n = parseBRL(value);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return value ?? '—';
}

interface QuickWinItemProps {
  rank: number;
  insight: Insight;
}

const QuickWinItem: React.FC<QuickWinItemProps> = ({ rank, insight }) => {
  const value = parseBRL(insight.estimatedValue);
  const barWidth = Math.min(100, (value / 2_000_000) * 100);

  return (
    <li className="flex items-start gap-3">
      {/* Rank */}
      <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
        {rank}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-primary leading-tight line-clamp-2">
            {insight.title}
          </p>
          {insight.estimatedValue && (
            <span className="shrink-0 text-sm font-bold text-emerald-700">
              {roiLabel(insight.estimatedValue)}
            </span>
          )}
        </div>

        {/* Value bar */}
        {value > 0 && (
          <div className="mt-1.5 h-1.5 w-full bg-amber-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${barWidth}%` }}
            />
          </div>
        )}

        <p className="text-xs text-text-muted mt-1.5 line-clamp-1">
          {insight.suggestedAction}
        </p>
      </div>
    </li>
  );
};

const QuickWinsPanel: React.FC = () => {
  const insights = useDiagnosticoStore((s) => s.insights);

  const quickWins: Insight[] = insights
    .filter((i) => i.type === 'quick_win')
    .sort((a, b) => parseBRL(b.estimatedValue) - parseBRL(a.estimatedValue))
    .slice(0, 5);

  return (
    <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-400 text-white text-lg font-bold shadow-sm">
          ⚡
        </div>
        <div>
          <h2 className="font-heading text-base font-bold text-amber-900 leading-tight">
            Top 5 Quick Wins por ROI
          </h2>
          <p className="text-xs text-amber-700">
            Iniciativas de alto retorno com baixo esforco de implementacao
          </p>
        </div>
        <span className="ml-auto shrink-0 inline-flex items-center justify-center px-3 py-1 rounded-full bg-amber-200 text-amber-800 text-xs font-semibold border border-amber-300">
          {quickWins.length} identificado{quickWins.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* List */}
      {quickWins.length === 0 ? (
        <p className="text-sm text-amber-700 text-center py-4">
          Nenhum quick win identificado ainda. Execute o diagnostico para gerar oportunidades.
        </p>
      ) : (
        <ul className="space-y-4">
          {quickWins.map((qw, index) => (
            <QuickWinItem key={qw.id} rank={index + 1} insight={qw} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuickWinsPanel;
