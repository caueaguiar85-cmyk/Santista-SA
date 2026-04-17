import React, { useState } from 'react';
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
// Sub-components
// ----------------------------
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-primary/40">{icon}</span>
      <h4 className="font-heading text-sm font-semibold text-primary uppercase tracking-wider">
        {title}
      </h4>
    </div>
  );
}

function RiskCard({ risk }: { risk: Risk }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 p-3 bg-surface hover:bg-surface/80 transition-colors text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="font-body text-sm font-semibold text-primary truncate">{risk.title}</p>
            <div className="flex items-center gap-2 flex-wrap mt-0.5">
              <Badge variant={categoryVariant(risk.category)} size="sm">
                {risk.category}
              </Badge>
              <span className="font-body text-xs text-primary/50">
                Prob.: {risk.probability}% &middot; Impacto: {risk.impact}/5
              </span>
              <span className={`font-body text-xs ${riskScoreColor(risk.riskScore)}`}>
                Score: {risk.riskScore.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        {open ? <ChevronUp size={14} className="shrink-0 text-primary/40" /> : <ChevronDown size={14} className="shrink-0 text-primary/40" />}
      </button>

      {open && (
        <div className="p-3 bg-surface-2 border-t border-border space-y-2.5">
          <p className="font-body text-sm text-primary/70">{risk.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <p className="font-body text-xs text-primary/40 mb-0.5">Custo estimado</p>
              <p className="font-body text-sm font-semibold text-primary">{risk.estimatedCost}</p>
            </div>
            <div>
              <p className="font-body text-xs text-primary/40 mb-0.5">Fonte</p>
              <p className="font-body text-sm text-primary/70">{risk.source}</p>
            </div>
          </div>
          <div>
            <p className="font-body text-xs text-primary/40 mb-0.5">Mitigacao</p>
            <p className="font-body text-sm text-primary/70">{risk.mitigation}</p>
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
    <div className="border border-border rounded-lg p-3 bg-surface">
      <div className="flex items-start gap-3">
        <Lightbulb size={15} className="text-accent shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-body text-sm font-semibold text-primary">{rec.title}</p>
            <Badge variant={priorityVariant(rec.priority)} size="sm">
              {rec.priority}
            </Badge>
            <Badge variant="default" size="sm">
              {typeLabels[rec.type]}
            </Badge>
          </div>
          <p className="font-body text-sm text-primary/60 mb-2">{rec.description}</p>
          <div className="flex items-center gap-4 text-xs font-body text-primary/50">
            <span>Esforco: <strong className="text-primary/70">{effortLabel(rec.effort)}</strong></span>
            <span>Impacto: <strong className="text-primary/70">{rec.impact}/5</strong></span>
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface mb-4">
            <FileSearch size={28} className="text-primary/20" />
          </div>
          <p className="font-heading text-lg font-semibold text-primary/40 mb-1">
            Analise pendente
          </p>
          <p className="font-body text-sm text-primary/30">
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
            <div className="text-center bg-surface rounded-xl border border-border px-5 py-3">
              <p className="font-heading text-4xl font-bold text-primary">
                {pillarScore.score.toFixed(1)}
              </p>
              <p className="font-body text-xs text-primary/40">/5.0</p>
            </div>
            <div>
              <p className="font-body text-xs text-primary/40 mb-1">Nivel CMMI</p>
              <Badge variant={cmmiLevelBadgeVariant(pillarScore.score)} size="md">
                Nivel {levelNum} — {levelName}
              </Badge>
              <p className="font-body text-xs text-primary/50 mt-2">
                {PILLAR_LABELS[pillar]}
              </p>
            </div>
          </div>

          {/* Status controls */}
          <div className="flex flex-col items-start sm:items-end gap-2">
            <p className="font-body text-xs text-primary/40">Status da analise</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['draft', 'reviewed', 'approved'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => updatePillarStatus(pillar, s)}
                  className={[
                    'px-3 py-1 rounded-full font-body text-xs font-medium border transition-all',
                    pillarScore.status === s
                      ? s === 'approved'
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                        : s === 'reviewed'
                        ? 'bg-sky-500/15 border-sky-500/30 text-sky-400'
                        : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                      : 'border-border text-primary/40 hover:border-primary/30 hover:text-primary/60',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {statusLabel(s)}
                </button>
              ))}
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
            <p key={i} className="font-body text-sm text-primary/70 leading-relaxed">
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
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="font-body text-sm text-primary/70">{finding}</span>
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
                <span className="font-body text-sm text-primary/70">{gap}</span>
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
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center min-w-[140px]">
              <DollarSign size={20} className="text-emerald-400 mx-auto mb-1" />
              <p className="font-heading text-2xl font-bold text-emerald-400">
                {pillarScore.estimatedGains.totalEstimatedGain}
              </p>
              <p className="font-body text-xs text-emerald-500 mt-0.5">ganho total estimado</p>
            </div>
            <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 text-center min-w-[100px]">
              <Clock size={20} className="text-sky-400 mx-auto mb-1" />
              <p className="font-heading text-2xl font-bold text-sky-400">
                {pillarScore.estimatedGains.paybackMonths}m
              </p>
              <p className="font-body text-xs text-sky-500 mt-0.5">payback medio</p>
            </div>
          </div>

          {pillarScore.estimatedGains.byInitiative.length > 0 && (
            <div className="mt-4">
              <p className="font-body text-xs text-primary/40 uppercase tracking-wider mb-2">
                Por iniciativa
              </p>
              <div className="space-y-2">
                {pillarScore.estimatedGains.byInitiative.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 py-1.5 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp size={13} className="text-emerald-500 shrink-0" />
                      <span className="font-body text-sm text-primary/70">{item.name}</span>
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
                      <span className="font-body text-sm font-semibold text-emerald-400">
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
