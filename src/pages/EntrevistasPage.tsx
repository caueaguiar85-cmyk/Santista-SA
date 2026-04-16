import React, { useState } from 'react';
import { Plus, SlidersHorizontal } from 'lucide-react';
import type { PillarType, HierarchyLevel, InterviewStatus } from '../types/interview';
import { PILLAR_LABELS, HIERARCHY_LABELS } from '../types/interview';
import { useInterviewStore } from '../store/interviewStore';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import InterviewList from '../components/entrevistas/InterviewList';
import InterviewForm from '../components/entrevistas/InterviewForm';
import CoverageMap from '../components/entrevistas/CoverageMap';

// ─── types ────────────────────────────────────────────────────────────────────

interface Filters {
  pillar: PillarType | '';
  level:  HierarchyLevel | '';
  status: InterviewStatus | '';
}

const DEFAULT_FILTERS: Filters = { pillar: '', level: '', status: '' };

// ─── select style ─────────────────────────────────────────────────────────────

const selectClass = [
  'h-9 rounded-lg border border-border bg-surface-2 px-3',
  'font-body text-sm text-primary',
  'transition-colors duration-200',
  'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60',
].join(' ');

// ─── component ────────────────────────────────────────────────────────────────

const EntrevistasPage: React.FC = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [filters, setFilters]     = useState<Filters>(DEFAULT_FILTERS);

  const interviews = useInterviewStore((s) => s.interviews);
  const total      = interviews.length;

  const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const hasActiveFilters = filters.pillar || filters.level || filters.status;

  return (
    <div>
      {/* Page header */}
      <Header
        title="Entrevistas"
        subtitle="Gestao de entrevistas do assessment"
        actions={
          <Button
            variant="primary"
            icon={<Plus size={16} />}
            onClick={() => setFormOpen(true)}
          >
            Nova Entrevista
          </Button>
        }
      />

      <div className="grid gap-6">
        {/* ── Filter bar ────────────────────────────────────────────────── */}
        <section
          aria-label="Filtros"
          className="bg-surface-2 rounded-xl border border-border p-4 flex flex-wrap items-center gap-3"
        >
          <div className="flex items-center gap-2 text-primary/50 shrink-0">
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span className="font-body text-sm font-medium">Filtros</span>
            {total > 0 && (
              <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium font-body">
                {total} {total === 1 ? 'entrevista' : 'entrevistas'}
              </span>
            )}
          </div>

          {/* Pillar */}
          <select
            id="filter-pillar"
            value={filters.pillar}
            onChange={(e) => setFilter('pillar', e.target.value as PillarType | '')}
            className={selectClass}
            aria-label="Filtrar por pilar"
          >
            <option value="">Todos os pilares</option>
            {(Object.entries(PILLAR_LABELS) as [PillarType, string][]).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>

          {/* Level */}
          <select
            id="filter-level"
            value={filters.level}
            onChange={(e) => setFilter('level', e.target.value as HierarchyLevel | '')}
            className={selectClass}
            aria-label="Filtrar por nivel hierarquico"
          >
            <option value="">Todos os niveis</option>
            {(Object.entries(HIERARCHY_LABELS) as [HierarchyLevel, string][]).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>

          {/* Status */}
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) => setFilter('status', e.target.value as InterviewStatus | '')}
            className={selectClass}
            aria-label="Filtrar por status"
          >
            <option value="">Todos os status</option>
            <option value="scheduled">Agendada</option>
            <option value="completed">Concluida</option>
            <option value="analyzed">Analisada</option>
          </select>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className={[
                'h-9 px-3 rounded-lg font-body text-sm font-medium',
                'text-primary/60 hover:text-primary hover:bg-surface',
                'border border-transparent hover:border-border',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
              ].join(' ')}
            >
              Limpar filtros
            </button>
          )}
        </section>

        {/* ── Interview list ────────────────────────────────────────────── */}
        <section aria-label="Lista de entrevistas">
          <InterviewList filters={filters} />
        </section>

        {/* ── Coverage map ──────────────────────────────────────────────── */}
        <section aria-label="Mapa de cobertura">
          <CoverageMap />
        </section>
      </div>

      {/* New interview form modal */}
      <InterviewForm
        isOpen={isFormOpen}
        onClose={() => setFormOpen(false)}
      />
    </div>
  );
};

export default EntrevistasPage;
