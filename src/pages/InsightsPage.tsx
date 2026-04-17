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

const CHIP_STYLES: { label: string; className: string }[] = [
  { label: 'Riscos', className: 'bg-danger/[0.08] text-danger border border-danger/20' },
  { label: 'Oportunidades', className: 'bg-success/[0.08] text-success border border-success/20' },
  { label: 'Quick Wins', className: 'bg-warning/[0.08] text-warning border border-warning/20' },
  { label: 'Estrategicos', className: 'bg-info/[0.08] text-info border border-info/20' },
];

const selectClass =
  'text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 min-w-[160px] border border-border bg-input text-text';

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

  const chipCounts = [counts.risk, counts.opportunity, counts.quick_win, counts.strategic];

  return (
    <div>
      <Header
        title="Insights"
        subtitle="Feed de insights gerados pelos agentes de IA"
        actions={
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="font-semibold text-text">{counts.total}</span> insights
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
          {CHIP_STYLES.map(({ label, className }, idx) => (
            <div
              key={label}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${className}`}
            >
              <span className="font-bold text-sm">{chipCounts[idx]}</span>
              {label}
            </div>
          ))}
        </div>
      )}

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-xl bg-surface-2 border border-border">
        <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
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
            className="text-xs text-danger underline underline-offset-2 transition-colors"
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
