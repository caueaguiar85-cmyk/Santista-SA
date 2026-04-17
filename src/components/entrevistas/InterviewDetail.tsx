import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  X,
  Sparkles,
  Loader2,
  CalendarDays,
  User,
  Briefcase,
  Building2,
  Layers,
  Tag,
  CheckCircle2,
  TrendingUp,
  MessageSquareText,
} from 'lucide-react';
import type { Interview, AIInsights } from '../../types/interview';
import { PILLAR_LABELS, HIERARCHY_LABELS } from '../../types/interview';
import { useInterviewStore } from '../../store/interviewStore';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

type PillarType = Interview['pillar'];
type BadgeVariant = 'pilar-1' | 'pilar-2' | 'pilar-3' | 'pilar-4' | 'pilar-5';

const PILLAR_BADGE_VARIANT: Record<PillarType, BadgeVariant> = {
  processos:   'pilar-1',
  sistemas:    'pilar-2',
  operacoes:   'pilar-3',
  organizacao: 'pilar-4',
  roadmap:     'pilar-5',
};

const STATUS_LABEL: Record<string, string> = {
  scheduled: 'Agendada',
  completed: 'Concluida',
  analyzed:  'Analisada',
};

const STATUS_VARIANT: Record<string, 'warning' | 'info' | 'success'> = {
  scheduled: 'warning',
  completed: 'info',
  analyzed:  'success',
};

const SENTIMENT_CONFIG: Record<
  AIInsights['sentiment'],
  { label: string; classes: string }
> = {
  positive: { label: 'Positivo',  classes: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  neutral:  { label: 'Neutro',    classes: 'bg-sky-500/10 text-sky-400 border border-sky-500/20' },
  negative: { label: 'Negativo',  classes: 'bg-red-500/10 text-red-400 border border-red-500/20' },
};

// Placeholder AI analysis that runs after 2 s
function simulateAIAnalysis(interview: Interview): Promise<AIInsights> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary: `Entrevista com ${interview.intervieweeName} revelou perspectivas relevantes sobre ${PILLAR_LABELS[interview.pillar]}. O entrevistado demonstrou visao critica e construtiva sobre os processos atuais.`,
        keyFindings: [
          'Necessidade de maior integração entre sistemas existentes',
          'Oportunidade de automatização de processos repetitivos',
          'Alinhamento estratégico parcialmente consolidado',
          'Equipe demonstra abertura a novas metodologias',
        ],
        tags: ['transformacao-digital', 'eficiencia', interview.pillar, interview.level],
        sentiment: 'neutral',
        maturityIndicators: [
          'Governança em nível inicial',
          'Processos parcialmente documentados',
          'Capacidade de melhoria identificada',
        ],
      });
    }, 2000);
  });
}

interface InterviewDetailProps {
  interview: Interview;
  onClose: () => void;
}

const SectionTitle: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-2 mb-3">
    <span className="text-accent" aria-hidden="true">{icon}</span>
    <h3 className="font-heading font-semibold text-primary text-base">{label}</h3>
  </div>
);

const InterviewDetail: React.FC<InterviewDetailProps> = ({ interview, onClose }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const updateAIInsights = useInterviewStore((s) => s.updateAIInsights);

  const {
    intervieweeName,
    role,
    area,
    level,
    pillar,
    date,
    status,
    transcript,
    aiInsights,
    tags,
  } = interview;

  let formattedDate = date;
  try {
    formattedDate = format(parseISO(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    // fallback
  }

  const handleAnalyze = async () => {
    if (analyzing) return;
    setAnalyzing(true);
    try {
      const insights = await simulateAIAnalysis(interview);
      updateAIInsights(interview.id, insights);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-xl font-semibold text-primary leading-tight">
            {intervieweeName}
          </h2>
          <p className="font-body text-sm text-primary/60 mt-1">
            {role} &middot; {area}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className={[
            'shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-lg',
            'text-primary/40 hover:text-primary hover:bg-surface',
            'transition-colors duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
          ].join(' ')}
        >
          <X size={18} />
        </button>
      </div>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant={PILLAR_BADGE_VARIANT[pillar]}>
          {PILLAR_LABELS[pillar]}
        </Badge>
        <Badge variant="default">{HIERARCHY_LABELS[level]}</Badge>
        <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: <User size={14} />,         label: 'Entrevistado', value: intervieweeName },
          { icon: <Briefcase size={14} />,     label: 'Cargo',       value: role },
          { icon: <Building2 size={14} />,     label: 'Area',        value: area },
          { icon: <Layers size={14} />,        label: 'Nivel',       value: HIERARCHY_LABELS[level] },
          { icon: <CalendarDays size={14} />,  label: 'Data',        value: formattedDate },
        ].map(({ icon, label, value }) => (
          <div key={label} className="bg-surface rounded-lg p-3 border border-border">
            <div className="flex items-center gap-1.5 text-primary/50 mb-1">
              <span aria-hidden="true">{icon}</span>
              <span className="font-body text-xs">{label}</span>
            </div>
            <p className="font-body text-sm font-medium text-primary truncate">{value}</p>
          </div>
        ))}
      </div>

      {/* Tags da entrevista */}
      {tags.length > 0 && (
        <div>
          <SectionTitle icon={<Tag size={15} />} label="Tags" />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="accent" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Transcript */}
      {transcript && (
        <div>
          <SectionTitle icon={<MessageSquareText size={15} />} label="Transcrição" />
          <div className="bg-surface rounded-lg border border-border p-4 max-h-48 overflow-y-auto">
            <p className="font-body text-sm text-primary/80 whitespace-pre-wrap leading-relaxed">
              {transcript}
            </p>
          </div>
        </div>
      )}

      {/* AI Insights */}
      {aiInsights ? (
        <div className="flex flex-col gap-5 border border-emerald-500/20 rounded-xl p-5 bg-emerald-500/5">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-600" aria-hidden="true" />
            <h3 className="font-heading font-semibold text-primary text-base">
              Analise de Inteligencia Artificial
            </h3>
          </div>

          {/* Summary */}
          <div>
            <p className="font-body text-xs font-semibold text-primary/50 uppercase tracking-wide mb-1">
              Resumo
            </p>
            <p className="font-body text-sm text-primary/80 leading-relaxed">
              {aiInsights.summary}
            </p>
          </div>

          {/* Sentiment */}
          <div className="flex items-center gap-2">
            <p className="font-body text-xs font-semibold text-primary/50 uppercase tracking-wide">
              Sentimento:
            </p>
            <span
              className={[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body',
                SENTIMENT_CONFIG[aiInsights.sentiment].classes,
              ].join(' ')}
            >
              {SENTIMENT_CONFIG[aiInsights.sentiment].label}
            </span>
          </div>

          {/* Key findings */}
          {aiInsights.keyFindings.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={14} className="text-emerald-600" aria-hidden="true" />
                <p className="font-body text-xs font-semibold text-primary/50 uppercase tracking-wide">
                  Principais achados
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {aiInsights.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                    <span className="font-body text-sm text-primary/80">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Maturity indicators */}
          {aiInsights.maturityIndicators.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-emerald-600" aria-hidden="true" />
                <p className="font-body text-xs font-semibold text-primary/50 uppercase tracking-wide">
                  Indicadores de maturidade
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {aiInsights.maturityIndicators.map((indicator, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500"
                      aria-hidden="true"
                    />
                    <span className="font-body text-sm text-primary/80">{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI tags */}
          {aiInsights.tags.length > 0 && (
            <div>
              <p className="font-body text-xs font-semibold text-primary/50 uppercase tracking-wide mb-2">
                Tags da IA
              </p>
              <div className="flex flex-wrap gap-1.5">
                {aiInsights.tags.map((tag) => (
                  <Badge key={tag} variant="success" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Analyze button */
        <div className="flex flex-col items-center gap-3 py-6 border border-dashed border-border rounded-xl bg-surface/50">
          <Sparkles size={24} className="text-primary/30" aria-hidden="true" />
          <p className="font-body text-sm text-primary/50 text-center">
            {transcript
              ? 'Esta entrevista ainda nao foi analisada pela IA.'
              : 'Adicione uma transcricao para habilitar a analise de IA.'}
          </p>
          <Button
            variant="accent"
            size="sm"
            icon={analyzing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            loading={analyzing}
            disabled={!transcript || analyzing}
            onClick={handleAnalyze}
          >
            {analyzing ? 'Analisando...' : 'Analisar com IA'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default InterviewDetail;
