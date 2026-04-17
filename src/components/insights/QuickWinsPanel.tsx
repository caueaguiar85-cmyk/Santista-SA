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
      <span
        className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
        style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.25)' }}
      >
        {rank}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold leading-tight line-clamp-2" style={{ color: 'var(--t-text)' }}>
            {insight.title}
          </p>
          {insight.estimatedValue && (
            <span className="shrink-0 text-sm font-bold" style={{ color: '#10B981' }}>
              {roiLabel(insight.estimatedValue)}
            </span>
          )}
        </div>

        {/* Value bar */}
        {value > 0 && (
          <div className="mt-1.5 h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(245,158,11,0.12)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${barWidth}%`, background: '#F59E0B' }}
            />
          </div>
        )}

        <p className="text-xs mt-1.5 line-clamp-1" style={{ color: 'var(--t-text-sec)' }}>
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
    <div className="rounded-xl p-6 shadow-sm" style={{ border: '2px solid rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.04)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-full text-white text-lg font-bold shadow-sm"
          style={{ background: 'rgba(245,158,11,0.3)' }}
        >
          ⚡
        </div>
        <div>
          <h2 className="font-heading text-base font-bold leading-tight" style={{ color: '#F59E0B' }}>
            Top 5 Quick Wins por ROI
          </h2>
          <p className="text-xs" style={{ color: '#D97706' }}>
            Iniciativas de alto retorno com baixo esforco de implementacao
          </p>
        </div>
        <span
          className="ml-auto shrink-0 inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.25)' }}
        >
          {quickWins.length} identificado{quickWins.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* List */}
      {quickWins.length === 0 ? (
        <p className="text-sm text-center py-4" style={{ color: '#F59E0B' }}>
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
