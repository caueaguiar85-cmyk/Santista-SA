import React, { useState } from 'react';
import clsx from 'clsx';
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  DollarSign,
  FileSearch,
} from 'lucide-react';
import type { PillarScore, Risk, Recommendation } from '../../types/diagnostico';
import { CMMI_LEVELS } from '../../types/diagnostico';
import type { PillarType } from '../../types/interview';
import { PILLAR_LABELS } from '../../types/interview';
import { useDiagnosticoStore } from '../../store/diagnosticoStore';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

// ----------------------------
// Props
// ----------------------------
interface PillarAnalysisProps {
  pillarScore: PillarScore | undefined;
  pillar: PillarType;
}

// ----------------------------
// Helpers
// ----------------------------
function cmmiLevelBadgeVariant(score: number): 'danger' | 'warning' | 'info' | 'success' | 'accent' {
  if (score < 2) return 'danger';
  if (score < 3) return 'warning';
  if (score < 4) return 'info';
  if (score < 5) return 'success';
  return 'accent';
}

function priorityVariant(priority: Recommendation['priority']): 'danger' | 'warning' | 'success' {
  if (priority === 'Alta') return 'danger';
  if (priority === 'Media') return 'warning';
  return 'success';
}

function riskScoreColor(score: number): string {
  if (score >= 3.5) return 'text-red-400 font-bold';
  if (score >= 2.5) return 'text-amber-400 font-semibold';
  return 'text-emerald-400';
}

function effortLabel(effort: 'P' | 'M' | 'G'): string {
  if (effort === 'P') return 'Pequeno';
  if (effort === 'M') return 'Medio';
  return 'Grande';
}

function statusLabel(status: PillarScore['status']): string {
  if (status === 'draft') return 'Rascunho';
  if (status === 'reviewed') return 'Revisado';
  return 'Aprovado';
}

function categoryVariant(
  category: Risk['category'],
): 'danger' | 'warning' | 'info' | 'default' | 'accent' {
  if (category === 'Operacional') return 'warning';
  if (category === 'Estrategico') return 'accent';
  if (category === 'Tecnologico') return 'info';
  if (category === 'Regulatorio') return 'danger';
  return 'default';
}

// ----------------------------
// Status button class maps
// ----------------------------
const STATUS_ACTIVE_CLASSES: Record<string, string> = {
  approved: 'bg-success/[0.1] border border-success/[0.25] text-success',
  reviewed: 'bg-info/[0.1] border border-info/[0.25] text-info',
  draft: 'bg-warning/[0.1] border border-warning/[0.25] text-warning',
};

const STATUS_INACTIVE_CLASS = 'border border-border text-text-tertiary';

// ----------------------------
// Sub-components
// ----------------------------
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-text-tertiary">{icon}</span>
      <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-text">
        {title}
      </h4>
    </div>
  );
}

function RiskCard({ risk }: { risk: Risk }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 p-3 transition-colors text-left bg-surface-3"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="font-body text-sm font-semibold truncate text-text">{risk.title}</p>
            <div className="flex items-center gap-2 flex-wrap mt-0.5">
              <Badge variant={categoryVariant(risk.category)} size="sm">
                {risk.category}
              </Badge>
              <span className="font-body text-xs text-text-secondary">
                Prob.: {risk.probability}% &middot; Impacto: {risk.impact}/5
              </span>
              <span className={`font-body text-xs ${riskScoreColor(risk.riskScore)}`}>
                Score: {risk.riskScore.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        {open ? <ChevronUp size={14} className="shrink-0 text-text-tertiary" /> : <ChevronDown size={14} className="shrink-0 text-text-tertiary" />}
      </button>

      {open && (
        <div className="p-3 space-y-2.5 bg-surface-2 border-t border-border">
          <p className="font-body text-sm text-text-secondary">{risk.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <p className="font-body text-xs mb-0.5 text-text-tertiary">Custo estimado</p>
              <p className="font-body text-sm font-semibold text-text">{risk.estimatedCost}</p>
            </div>
            <div>
              <p className="font-body text-xs mb-0.5 text-text-tertiary">Fonte</p>
              <p className="font-body text-sm text-text-secondary">{risk.source}</p>
            </div>
          </div>
          <div>
            <p className="font-body text-xs mb-0.5 text-text-tertiary">Mitigacao</p>
            <p className="font-body text-sm text-text-secondary">{risk.mitigation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function RecommendationCard({ rec }: { rec: Recommendation }) {
  const typeLabels: Record<Recommendation['type'], string> = {
    quick_win: 'Quick Win',
    strategic: 'Estrategico',
    structural: 'Estrutural',
  };

  return (
    <div className="rounded-lg p-3 border border-border bg-surface-3">
      <div className="flex items-start gap-3">
        <Lightbulb size={15} className="shrink-0 mt-0.5 text-accent" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-body text-sm font-semibold text-text">{rec.title}</p>
            <Badge variant={priorityVariant(rec.priority)} size="sm">
              {rec.priority}
            </Badge>
            <Badge variant="default" size="sm">
              {typeLabels[rec.type]}
            </Badge>
          </div>
          <p className="font-body text-sm mb-2 text-text-secondary">{rec.description}</p>
          <div className="flex items-center gap-4 text-xs font-body text-text-secondary">
            <span>Esforco: <strong className="text-text">{effortLabel(rec.effort)}</strong></span>
            <span>Impacto: <strong className="text-text">{rec.impact}/5</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------
// Main component
// ----------------------------
const PillarAnalysis: React.FC<PillarAnalysisProps> = ({ pillarScore, pillar }) => {
  const updatePillarStatus = useDiagnosticoStore((s) => s.updatePillarStatus);

  if (!pillarScore) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-surface-3">
            <FileSearch size={28} className="text-text-tertiary" />
          </div>
          <p className="font-heading text-lg font-semibold mb-1 text-text-tertiary">
            Analise pendente
          </p>
          <p className="font-body text-sm text-text-tertiary">
            Execute o diagnostico para gerar a analise de{' '}
            <strong>{PILLAR_LABELS[pillar]}</strong>.
          </p>
        </div>
      </Card>
    );
  }

  const levelNum = Math.round(pillarScore.score) as keyof typeof CMMI_LEVELS;
  const levelName = CMMI_LEVELS[levelNum] ?? 'Inicial';

  return (
    <div className="space-y-4">
      {/* Score + Status header */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-center rounded-xl px-5 py-3 bg-surface-3 border border-border">
              <p className="font-heading text-4xl font-bold text-text">
                {pillarScore.score.toFixed(1)}
              </p>
              <p className="font-body text-xs text-text-tertiary">/5.0</p>
            </div>
            <div>
              <p className="font-body text-xs mb-1 text-text-tertiary">Nivel CMMI</p>
              <Badge variant={cmmiLevelBadgeVariant(pillarScore.score)} size="md">
                Nivel {levelNum} — {levelName}
              </Badge>
              <p className="font-body text-xs mt-2 text-text-secondary">
                {PILLAR_LABELS[pillar]}
              </p>
            </div>
          </div>

          {/* Status controls */}
          <div className="flex flex-col items-start sm:items-end gap-2">
            <p className="font-body text-xs text-text-tertiary">Status da analise</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['draft', 'reviewed', 'approved'] as const).map((s) => {
                const isActive = pillarScore.status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updatePillarStatus(pillar, s)}
                    className={clsx(
                      'px-3 py-1 rounded-full font-body text-xs font-medium transition-all',
                      isActive ? STATUS_ACTIVE_CLASSES[s] : STATUS_INACTIVE_CLASS,
                    )}
                  >
                    {statusLabel(s)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* AS-IS */}
      <Card title="Situacao Atual (AS-IS)">
        <div className="space-y-3">
          {pillarScore.asIs.split('. ').reduce<string[][]>((acc, sentence, i, arr) => {
            const chunkIndex = Math.floor(i / 2);
            if (!acc[chunkIndex]) acc[chunkIndex] = [];
            acc[chunkIndex].push(sentence + (i < arr.length - 1 ? '.' : ''));
            return acc;
          }, []).map((chunk, i) => (
            <p key={i} className="font-body text-sm leading-relaxed text-text-secondary">
              {chunk.join(' ')}
            </p>
          ))}
        </div>
      </Card>

      {/* Key Findings */}
      {pillarScore.keyFindings.length > 0 && (
        <Card title="Principais Constatacoes">
          <div>
            <SectionHeader icon={<CheckCircle2 size={15} />} title="" />
            <ul className="space-y-2">
              {pillarScore.keyFindings.map((finding, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-accent" />
                  <span className="font-body text-sm text-text-secondary">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {/* Critical Gaps */}
      {pillarScore.criticalGaps.length > 0 && (
        <Card title="Gaps Criticos">
          <ul className="space-y-2">
            {pillarScore.criticalGaps.map((gap, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                <span className="font-body text-sm text-text-secondary">{gap}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Risks */}
      {pillarScore.risks.length > 0 && (
        <Card
          title="Riscos Identificados"
          subtitle={`${pillarScore.risks.length} risco(s) mapeado(s)`}
        >
          <div className="space-y-2">
            {pillarScore.risks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        </Card>
      )}

      {/* Recommendations */}
      {pillarScore.recommendations.length > 0 && (
        <Card
          title="Recomendacoes"
          subtitle={`${pillarScore.recommendations.length} iniciativa(s) sugerida(s)`}
        >
          <div className="space-y-2">
            {pillarScore.recommendations.map((rec) => (
              <RecommendationCard key={rec.id} rec={rec} />
            ))}
          </div>
        </Card>
      )}

      {/* Estimated Gains */}
      {pillarScore.estimatedGains && (
        <Card title="Ganhos Estimados">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="rounded-xl p-4 text-center min-w-[140px] bg-success/[0.08] border border-success/[0.15]">
              <DollarSign size={20} className="mx-auto mb-1 text-success" />
              <p className="font-heading text-2xl font-bold text-success">
                {pillarScore.estimatedGains.totalEstimatedGain}
              </p>
              <p className="font-body text-xs mt-0.5 text-success">ganho total estimado</p>
            </div>
            <div className="rounded-xl p-4 text-center min-w-[100px] bg-info/[0.08] border border-info/[0.15]">
              <Clock size={20} className="mx-auto mb-1 text-info" />
              <p className="font-heading text-2xl font-bold text-info">
                {pillarScore.estimatedGains.paybackMonths}m
              </p>
              <p className="font-body text-xs mt-0.5 text-info">payback medio</p>
            </div>
          </div>

          {pillarScore.estimatedGains.byInitiative.length > 0 && (
            <div className="mt-4">
              <p className="font-body text-xs uppercase tracking-wider mb-2 text-text-tertiary">
                Por iniciativa
              </p>
              <div className="space-y-2">
                {pillarScore.estimatedGains.byInitiative.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 py-1.5 last:border-0 border-b border-border"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp size={13} className="text-emerald-500 shrink-0" />
                      <span className="font-body text-sm text-text-secondary">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        variant={
                          item.confidence === 'Alta'
                            ? 'success'
                            : item.confidence === 'Media'
                            ? 'warning'
                            : 'default'
                        }
                        size="sm"
                      >
                        {item.confidence}
                      </Badge>
                      <span className="font-body text-sm font-semibold text-success">
                        {item.gain}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default PillarAnalysis;
