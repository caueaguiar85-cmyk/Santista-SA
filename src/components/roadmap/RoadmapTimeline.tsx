import React from 'react';
import clsx from 'clsx';
import { useDiagnosticoStore } from '../../store/diagnosticoStore';
import InitiativeCard from './InitiativeCard';
import type { Initiative } from '../../types/diagnostico';

const WAVE_ORDER: Initiative['wave'][] = ['stabilize', 'optimize', 'transform'];

interface WaveConfig {
  label: string;
  period: string;
  headerBgClass: string;
  headerTextClass: string;
  borderClass: string;
  bgClass: string;
  icon: string;
}

const WAVE_CONFIG: Record<Initiative['wave'], WaveConfig> = {
  stabilize: {
    label: 'Estabilizar',
    period: '0 – 6 meses',
    headerBgClass: 'bg-danger',
    headerTextClass: 'text-white',
    borderClass: 'border-2 border-danger/[0.3]',
    bgClass: 'bg-danger/[0.04]',
    icon: '🔧',
  },
  optimize: {
    label: 'Otimizar',
    period: '6 – 18 meses',
    headerBgClass: 'bg-warning',
    headerTextClass: 'text-white',
    borderClass: 'border-2 border-warning/[0.3]',
    bgClass: 'bg-warning/[0.04]',
    icon: '⚙️',
  },
  transform: {
    label: 'Transformar',
    period: '18 – 36 meses',
    headerBgClass: 'bg-success',
    headerTextClass: 'text-white',
    borderClass: 'border-2 border-success/[0.3]',
    bgClass: 'bg-success/[0.04]',
    icon: '🚀',
  },
};

interface WaveSectionProps {
  wave: Initiative['wave'];
  initiatives: Initiative[];
}

const WaveSection: React.FC<WaveSectionProps> = ({ wave, initiatives }) => {
  const config = WAVE_CONFIG[wave];

  return (
    <section className={clsx('rounded-xl overflow-hidden shadow-sm', config.borderClass)}>
      {/* Wave header */}
      <div className={clsx('px-6 py-4 flex items-center justify-between gap-4', config.headerBgClass)}>
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-hidden>
            {config.icon}
          </span>
          <div>
            <h2 className={clsx('font-heading text-xl font-bold leading-tight', config.headerTextClass)}>
              {config.label}
            </h2>
            <p className={clsx('text-sm opacity-80', config.headerTextClass)}>{config.period}</p>
          </div>
        </div>
        <span
          className={clsx(
            'shrink-0 inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold bg-white/20',
            config.headerTextClass,
          )}
        >
          {initiatives.length} iniciativa{initiatives.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Initiative cards */}
      <div className={clsx('p-6', config.bgClass)}>
        {initiatives.length === 0 ? (
          <p className="text-sm text-center py-6 text-text-secondary">
            Nenhuma iniciativa nesta onda ainda.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {initiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const RoadmapTimeline: React.FC = () => {
  const report = useDiagnosticoStore((s) => s.report);
  const initiatives: Initiative[] = report?.initiatives ?? [];

  return (
    <div className="space-y-6">
      {WAVE_ORDER.map((wave) => {
        const waveInitiatives = initiatives.filter((i) => i.wave === wave);
        return (
          <WaveSection key={wave} wave={wave} initiatives={waveInitiatives} />
        );
      })}
    </div>
  );
};

export default RoadmapTimeline;
