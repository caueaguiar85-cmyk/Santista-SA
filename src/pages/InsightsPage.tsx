import React, { useState } from 'react';
import Header from '../components/layout/Header';
import InsightsFeed from '../components/insights/InsightsFeed';
import QuickWinsPanel from '../components/insights/QuickWinsPanel';
import HeatMap from '../components/insights/HeatMap';
import { useDiagnosticoStore } from '../store/diagnosticoStore';
import { PILLAR_LABELS } from '../types/interview';
import type { PillarType } from '../types/interview';
import type { Insight } from '../types/diagnostico';
import type { InsightsFeedFilters } from '../components/insights/InsightsFeed';

const ALL_PILLARS: PillarType[] = [
  'processos',
  'sistemas',
  'operacoes',
  'organizacao',
  'roadmap',
];

const TYPE_OPTIONS: { value: Insight['type'] | ''; label: string }[] = [
  { value: '', label: 'Todos os tipos' },
  { value: 'risk', label: 'Risco' },
  { value: 'opportunity', label: 'Oportunidade' },
  { value: 'quick_win', label: 'Quick Win' },
  { value: 'strategic', label: 'Estrategico' },
];

const IMPACT_OPTIONS: { value: Insight['impact'] | ''; label: string }[] = [
  { value: '', label: 'Todos os impactos' },
  { value: 'Alto', label: 'Alto' },
  { value: 'Medio', label: 'Medio' },
  { value: 'Baixo', label: 'Baixo' },
];

const selectClass =
  'text-sm border border-border rounded-lg px-3 py-2 bg-surface-2 text-text focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[160px]';

const InsightsPage: React.FC = () => {
  const insights = useDiagnosticoStore((s) => s.insights);

  const [pillarFilter, setPillarFilter] = useState<PillarType | ''>('');
  const [typeFilter, setTypeFilter] = useState<Insight['type'] | ''>('');
  const [impactFilter, setImpactFilter] = useState<Insight['impact'] | ''>('');

  const activeFilters: InsightsFeedFilters = {
    ...(pillarFilter ? { pillar: pillarFilter } : {}),
    ...(typeFilter ? { type: typeFilter } : {}),
    ...(impactFilter ? { impact: impactFilter } : {}),
  };

  const hasFilters = Boolean(pillarFilter || typeFilter || impactFilter);

  const handleClearFilters = () => {
    setPillarFilter('');
    setTypeFilter('');
    setImpactFilter('');
  };

  // Summary counts
  const counts = {
    total: insights.length,
    risk: insights.filter((i) => i.type === 'risk').length,
    opportunity: insights.filter((i) => i.type === 'opportunity').length,
    quick_win: insights.filter((i) => i.type === 'quick_win').length,
    strategic: insights.filter((i) => i.type === 'strategic').length,
    alto: insights.filter((i) => i.impact === 'Alto').length,
  };

  return (
    <div>
      <Header
        title="Insights"
        subtitle="Feed de insights gerados pelos agentes de IA"
        actions={
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span className="font-semibold text-primary">{counts.total}</span> insights
            &nbsp;|&nbsp;
            <span className="text-danger font-semibold">{counts.alto}</span> alto impacto
          </div>
        }
      />

      {/* Quick Wins Panel */}
      {insights.some((i) => i.type === 'quick_win') && (
        <div className="mb-8">
          <QuickWinsPanel />
        </div>
      )}

      {/* Summary chips */}
      {insights.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { label: 'Riscos', count: counts.risk, color: 'bg-red-100 text-red-700 border-red-200' },
            { label: 'Oportunidades', count: counts.opportunity, color: 'bg-green-100 text-green-700 border-green-200' },
            { label: 'Quick Wins', count: counts.quick_win, color: 'bg-amber-100 text-amber-700 border-amber-200' },
            { label: 'Estrategicos', count: counts.strategic, color: 'bg-sky-100 text-sky-700 border-sky-200' },
          ].map(({ label, count, color }) => (
            <div
              key={label}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${color}`}
            >
              <span className="font-bold text-sm">{count}</span>
              {label}
            </div>
          ))}
        </div>
      )}

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-surface-2 border border-border rounded-xl">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
          Filtros:
        </span>

        {/* Pillar filter */}
        <select
          value={pillarFilter}
          onChange={(e) => setPillarFilter(e.target.value as PillarType | '')}
          className={selectClass}
          aria-label="Filtrar por pilar"
        >
          <option value="">Todos os pilares</option>
          {ALL_PILLARS.map((p) => (
            <option key={p} value={p}>
              {PILLAR_LABELS[p]}
            </option>
          ))}
        </select>

        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as Insight['type'] | '')}
          className={selectClass}
          aria-label="Filtrar por tipo"
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Impact filter */}
        <select
          value={impactFilter}
          onChange={(e) => setImpactFilter(e.target.value as Insight['impact'] | '')}
          className={selectClass}
          aria-label="Filtrar por impacto"
        >
          {IMPACT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={handleClearFilters}
            className="text-xs text-text-muted hover:text-danger underline underline-offset-2 transition-colors"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Insights feed */}
      <div className="mb-10">
        <InsightsFeed filters={activeFilters} />
      </div>

      {/* Heat map at bottom */}
      {insights.length > 0 && <HeatMap />}
    </div>
  );
};

export default InsightsPage;
