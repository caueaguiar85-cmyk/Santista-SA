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
  { label: string; bg: string; color: string; border: string }
> = {
  positive: { label: 'Positivo',  bg: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' },
  neutral:  { label: 'Neutro',    bg: 'rgba(59,130,246,0.1)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.2)' },
  negative: { label: 'Negativo',  bg: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' },
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
    <span style={{ color: 'var(--t-accent)' }} aria-hidden="true">{icon}</span>
    <h3 className="font-heading font-semibold text-base" style={{ color: 'var(--t-text)' }}>{label}</h3>
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
          <h2 className="font-heading text-xl font-semibold leading-tight" style={{ color: 'var(--t-text)' }}>
            {intervieweeName}
          </h2>
          <p className="font-body text-sm mt-1" style={{ color: 'var(--t-text-sec)' }}>
            {role} &middot; {area}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2"
          style={{ color: 'var(--t-text-ter)' }}
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
          <div key={label} className="rounded-lg p-3" style={{ background: 'var(--t-surface-alt)', borderRadius: 8, padding: 12, border: '1px solid var(--t-border)' }}>
            <div className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--t-text-sec)' }}>
              <span aria-hidden="true">{icon}</span>
              <span className="font-body text-xs">{label}</span>
            </div>
            <p className="font-body text-sm font-medium truncate" style={{ color: 'var(--t-text)' }}>{value}</p>
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
          <div className="rounded-lg p-4 max-h-48 overflow-y-auto" style={{ background: 'var(--t-surface-alt)', border: '1px solid var(--t-border)' }}>
            <p className="font-body text-sm whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--t-text)' }}>
              {transcript}
            </p>
          </div>
        </div>
      )}

      {/* AI Insights */}
      {aiInsights ? (
        <div
          className="flex flex-col gap-5 rounded-xl p-5"
          style={{ border: '1px solid rgba(16,185,129,0.15)', borderRadius: 12, padding: 20, background: 'rgba(16,185,129,0.04)' }}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={16} style={{ color: '#10B981' }} aria-hidden="true" />
            <h3 className="font-heading font-semibold text-base" style={{ color: 'var(--t-text)' }}>
              Analise de Inteligencia Artificial
            </h3>
          </div>

          {/* Summary */}
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--t-text-sec)' }}>
              Resumo
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--t-text)' }}>
              {aiInsights.summary}
            </p>
          </div>

          {/* Sentiment */}
          <div className="flex items-center gap-2">
            <p className="font-body text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--t-text-sec)' }}>
              Sentimento:
            </p>
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body"
              style={{
                background: SENTIMENT_CONFIG[aiInsights.sentiment].bg,
                color: SENTIMENT_CONFIG[aiInsights.sentiment].color,
                border: SENTIMENT_CONFIG[aiInsights.sentiment].border,
              }}
            >
              {SENTIMENT_CONFIG[aiInsights.sentiment].label}
            </span>
          </div>

          {/* Key findings */}
          {aiInsights.keyFindings.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={14} style={{ color: '#10B981' }} aria-hidden="true" />
                <p className="font-body text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--t-text-sec)' }}>
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
                    <span className="font-body text-sm" style={{ color: 'var(--t-text)' }}>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Maturity indicators */}
          {aiInsights.maturityIndicators.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} style={{ color: '#10B981' }} aria-hidden="true" />
                <p className="font-body text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--t-text-sec)' }}>
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
                    <span className="font-body text-sm" style={{ color: 'var(--t-text)' }}>{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI tags */}
          {aiInsights.tags.length > 0 && (
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--t-text-sec)' }}>
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
        <div className="flex flex-col items-center gap-3 py-6 rounded-xl" style={{ border: '1px dashed var(--t-border)', background: 'var(--t-surface-alt)' }}>
          <Sparkles size={24} style={{ color: 'var(--t-text-ter)' }} aria-hidden="true" />
          <p className="font-body text-sm text-center" style={{ color: 'var(--t-text-sec)' }}>
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
