import React from 'react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { useDiagnosticoStore } from '../../store/diagnosticoStore';
import { PILLAR_LABELS } from '../../types/interview';
import type { Insight, PillarType } from '../../types/diagnostico';

export interface InsightsFeedFilters {
  pillar?: PillarType;
  type?: Insight['type'];
  impact?: Insight['impact'];
}

interface InsightsFeedProps {
  filters?: InsightsFeedFilters;
}

const TYPE_LABELS: Record<Insight['type'], string> = {
  risk: 'Risco',
  opportunity: 'Oportunidade',
  quick_win: 'Quick Win',
  strategic: 'Estrategico',
};

const STATUS_LABELS: Record<Insight['status'], string> = {
  new: 'Novo',
  analyzing: 'Analisando',
  validated: 'Validado',
  discarded: 'Descartado',
};

const IMPACT_ORDER: Record<Insight['impact'], number> = {
  Alto: 0,
  Medio: 1,
  Baixo: 2,
};

function impactVariant(impact: Insight['impact']): 'danger' | 'warning' | 'default' {
  if (impact === 'Alto') return 'danger';
  if (impact === 'Medio') return 'warning';
  return 'default';
}

function typeVariant(type: Insight['type']): 'danger' | 'warning' | 'accent' | 'info' {
  if (type === 'risk') return 'danger';
  if (type === 'quick_win') return 'accent';
  if (type === 'strategic') return 'info';
  return 'warning';
}

function pillarVariant(pillar: PillarType): 'pilar-1' | 'pilar-2' | 'pilar-3' | 'pilar-4' | 'pilar-5' {
  const map: Record<PillarType, 'pilar-1' | 'pilar-2' | 'pilar-3' | 'pilar-4' | 'pilar-5'> = {
    processos: 'pilar-1',
    sistemas: 'pilar-2',
    operacoes: 'pilar-3',
    organizacao: 'pilar-4',
    roadmap: 'pilar-5',
  };
  return map[pillar];
}

function statusVariant(status: Insight['status']): 'success' | 'info' | 'warning' | 'default' {
  if (status === 'validated') return 'success';
  if (status === 'analyzing') return 'info';
  if (status === 'discarded') return 'default';
  return 'warning';
}

const InsightCard: React.FC<{ insight: Insight }> = ({ insight }) => {
  const updateInsightStatus = useDiagnosticoStore((s) => s.updateInsightStatus);

  return (
    <Card>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-heading text-base font-semibold leading-snug flex-1 text-text">
          {insight.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 shrink-0">
          <Badge variant={impactVariant(insight.impact)} size="sm">
            {insight.impact}
          </Badge>
          <Badge variant={typeVariant(insight.type)} size="sm">
            {TYPE_LABELS[insight.type]}
          </Badge>
          <Badge variant={pillarVariant(insight.pillar)} size="sm">
            {PILLAR_LABELS[insight.pillar]}
          </Badge>
        </div>
      </div>

      <p className="text-sm leading-relaxed mb-4 line-clamp-3 text-text">
        {insight.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs mb-4 text-text-secondary">
        {insight.estimatedValue && (
          <div>
            <span className="font-semibold text-text">Valor estimado:</span>{' '}
            <span className="font-medium text-success">{insight.estimatedValue}</span>
          </div>
        )}
        <div>
          <span className="font-semibold text-text">Origem:</span> {insight.origin}
        </div>
        {insight.benchmarkSource && (
          <div>
            <span className="font-semibold text-text">Benchmark:</span> {insight.benchmarkSource}
          </div>
        )}
        {insight.suggestedAction && (
          <div className="sm:col-span-2">
            <span className="font-semibold text-text">Acao sugerida:</span>{' '}
            {insight.suggestedAction}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <Badge variant={statusVariant(insight.status)} size="sm">
          {STATUS_LABELS[insight.status]}
        </Badge>

        <select
          value={insight.status}
          onChange={(e) =>
            updateInsightStatus(insight.id, e.target.value as Insight['status'])
          }
          className="text-xs rounded-md px-2 py-1 focus:outline-none focus:ring-1 border border-border bg-input text-text"
          aria-label="Alterar status do insight"
        >
          <option value="new">Novo</option>
          <option value="analyzing">Analisando</option>
          <option value="validated">Validado</option>
          <option value="discarded">Descartado</option>
        </select>
      </div>
    </Card>
  );
};

const InsightsFeed: React.FC<InsightsFeedProps> = ({ filters = {} }) => {
  const insights = useDiagnosticoStore((s) => s.insights);

  const filtered = insights
    .filter((i) => {
      if (filters.pillar && i.pillar !== filters.pillar) return false;
      if (filters.type && i.type !== filters.type) return false;
      if (filters.impact && i.impact !== filters.impact) return false;
      return true;
    })
    .sort((a, b) => IMPACT_ORDER[a.impact] - IMPACT_ORDER[b.impact]);

  if (filtered.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-sm text-text-secondary">
            Nenhum insight encontrado para os filtros selecionados.
          </p>
          <p className="text-xs mt-1 text-text-secondary">
            Execute o diagnostico para gerar insights automaticamente.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-text-secondary">
        {filtered.length} insight{filtered.length !== 1 ? 's' : ''} encontrado
        {filtered.length !== 1 ? 's' : ''} — ordenados por impacto
      </p>
      {filtered.map((insight) => (
        <InsightCard key={insight.id} insight={insight} />
      ))}
    </div>
  );
};

export default InsightsFeed;
