import React from 'react';
import { useDiagnosticoStore } from '../../store/diagnosticoStore';
import InitiativeCard from './InitiativeCard';
import type { Initiative } from '../../types/diagnostico';

const WAVE_ORDER: Initiative['wave'][] = ['stabilize', 'optimize', 'transform'];

interface WaveConfig {
  label: string;
  period: string;
  headerBg: string;
  headerText: string;
  borderColor: string;
  bgColor: string;
  icon: string;
}

const WAVE_CONFIG: Record<Initiative['wave'], WaveConfig> = {
  stabilize: {
    label: 'Estabilizar',
    period: '0 – 6 meses',
    headerBg: 'bg-red-500',
    headerText: 'text-white',
    borderColor: 'border-red-500/30',
    bgColor: 'bg-red-500/5',
    icon: '🔧',
  },
  optimize: {
    label: 'Otimizar',
    period: '6 – 18 meses',
    headerBg: 'bg-amber-500',
    headerText: 'text-white',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/5',
    icon: '⚙️',
  },
  transform: {
    label: 'Transformar',
    period: '18 – 36 meses',
    headerBg: 'bg-emerald-500',
    headerText: 'text-white',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/5',
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
    <section className={`rounded-xl border-2 ${config.borderColor} overflow-hidden shadow-sm`}>
      {/* Wave header */}
      <div className={`${config.headerBg} px-6 py-4 flex items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-hidden>
            {config.icon}
          </span>
          <div>
            <h2 className={`font-heading text-xl font-bold ${config.headerText} leading-tight`}>
              {config.label}
            </h2>
            <p className={`text-sm ${config.headerText} opacity-80`}>{config.period}</p>
          </div>
        </div>
        <span
          className={`shrink-0 inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/20 ${config.headerText} text-sm font-semibold`}
        >
          {initiatives.length} iniciativa{initiatives.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Initiative cards */}
      <div className={`${config.bgColor} p-6`}>
        {initiatives.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-6">
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
