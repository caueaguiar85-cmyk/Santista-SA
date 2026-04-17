import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarDays, Sparkles } from 'lucide-react';
import type { Interview, PillarType } from '../../types/interview';
import { PILLAR_LABELS, HIERARCHY_LABELS } from '../../types/interview';
import Badge from '../ui/Badge';

// Maps pillar to badge variant (pilar-1..5 per index order in types)
// Pillar order mirrors index used by badge variant mapping below
const _PILLAR_ORDER: PillarType[] = ['processos', 'sistemas', 'operacoes', 'organizacao', 'roadmap'];
void _PILLAR_ORDER; // referenced only for documentation order

type BadgeVariant = 'pilar-1' | 'pilar-2' | 'pilar-3' | 'pilar-4' | 'pilar-5';

const PILLAR_BADGE_VARIANT: Record<PillarType, BadgeVariant> = {
  processos:   'pilar-1',
  sistemas:    'pilar-2',
  operacoes:   'pilar-3',
  organizacao: 'pilar-4',
  roadmap:     'pilar-5',
};

// Avatar background colours that mirror the pilar CSS variables
const PILLAR_AVATAR_CLASS: Record<PillarType, string> = {
  processos:   'bg-blue-500',
  sistemas:    'bg-violet-500',
  operacoes:   'bg-emerald-500',
  organizacao: 'bg-amber-500',
  roadmap:     'bg-red-500',
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

interface InterviewCardProps {
  interview: Interview;
  onClick: () => void;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview, onClick }) => {
  const {
    intervieweeName,
    role,
    area,
    pillar,
    level,
    date,
    status,
    aiInsights,
  } = interview;

  const initials = intervieweeName.trim().charAt(0).toUpperCase();

  let formattedDate = date;
  try {
    formattedDate = format(parseISO(date), "d 'de' MMM yyyy", { locale: ptBR });
  } catch {
    // fallback to raw string
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full text-left group',
        'bg-surface-2 rounded-xl border border-border shadow-sm',
        'p-5 flex flex-col gap-4',
        'transition-all duration-300 ease-in-out',
        'hover:shadow-md hover:border-border/80 hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
      ].join(' ')}
    >
      {/* Top row: avatar + name/role + IA badge */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={[
            'shrink-0 h-10 w-10 rounded-full flex items-center justify-center',
            'text-white font-heading font-semibold text-base select-none',
            PILLAR_AVATAR_CLASS[pillar],
          ].join(' ')}
          aria-hidden="true"
        >
          {initials}
        </div>

        {/* Name + role */}
        <div className="min-w-0 flex-1">
          <p className="font-heading font-semibold text-primary text-sm leading-snug truncate">
            {intervieweeName}
          </p>
          <p className="font-body text-xs text-primary/60 truncate mt-0.5">
            {role} &middot; {area}
          </p>
        </div>

        {/* IA badge */}
        {aiInsights && (
          <span
            title="Analisado por IA"
            className={[
              'shrink-0 inline-flex items-center gap-1',
              'px-2 py-0.5 rounded-full text-xs font-medium font-body',
              'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
            ].join(' ')}
          >
            <Sparkles size={11} aria-hidden="true" />
            IA
          </span>
        )}
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap gap-1.5">
        <Badge variant={PILLAR_BADGE_VARIANT[pillar]} size="sm">
          {PILLAR_LABELS[pillar]}
        </Badge>
        <Badge variant="default" size="sm">
          {HIERARCHY_LABELS[level]}
        </Badge>
        <Badge variant={STATUS_VARIANT[status]} size="sm">
          {STATUS_LABEL[status]}
        </Badge>
      </div>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-xs text-primary/50 font-body">
        <CalendarDays size={13} aria-hidden="true" />
        <span>{formattedDate}</span>
      </div>
    </button>
  );
};

export default InterviewCard;
