import React from 'react';
import clsx from 'clsx';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import RoadmapTimeline from '../components/roadmap/RoadmapTimeline';
import { useDiagnosticoStore } from '../store/diagnosticoStore';

const RoadmapPage: React.FC = () => {
  const report = useDiagnosticoStore((s) => s.report);
  const initiatives = report?.initiatives ?? [];

  const handleExport = () => {
    alert('Exportacao em desenvolvimento');
  };

  // Summary stats
  const stats = {
    total: initiatives.length,
    stabilize: initiatives.filter((i) => i.wave === 'stabilize').length,
    optimize: initiatives.filter((i) => i.wave === 'optimize').length,
    transform: initiatives.filter((i) => i.wave === 'transform').length,
    avgImpact:
      initiatives.length > 0
        ? Math.round(
            initiatives.reduce((sum, i) => sum + i.impact, 0) / initiatives.length
          )
        : 0,
  };

  return (
    <div>
      <Header
        title="Roadmap"
        subtitle="Plano de transformacao 24-36 meses"
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            }
          >
            Exportar Roadmap
          </Button>
        }
      />

      {/* Empty state */}
      {initiatives.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-5xl mb-4" role="img" aria-label="roadmap vazio">
              🗺️
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2 text-text">
              Roadmap ainda nao gerado
            </h3>
            <p className="text-sm max-w-sm mx-auto text-text-secondary">
              Execute o diagnostico completo para que os agentes de IA construam o plano de
              transformacao automaticamente.
            </p>
          </div>
        </Card>
      ) : (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total de iniciativas', value: stats.total, colorClass: 'text-text' },
              { label: 'Estabilizar (0–6m)', value: stats.stabilize, colorClass: 'text-danger' },
              { label: 'Otimizar (6–18m)', value: stats.optimize, colorClass: 'text-warning' },
              { label: 'Transformar (18–36m)', value: stats.transform, colorClass: 'text-success' },
            ].map(({ label, value, colorClass }) => (
              <div
                key={label}
                className="rounded-xl p-4 shadow-sm text-center bg-surface-2 border border-border"
              >
                <p className={clsx('text-3xl font-bold font-heading', colorClass)}>{value}</p>
                <p className="text-xs mt-1 leading-tight text-text-secondary">{label}</p>
              </div>
            ))}
          </div>

          {/* Impacto medio badge */}
          {stats.avgImpact > 0 && (
            <div className="flex items-center gap-2 mb-6 text-sm text-text-secondary">
              <span>Impacto medio das iniciativas:</span>
              <span className="font-bold text-accent">{stats.avgImpact}/100</span>
            </div>
          )}

          {/* Timeline */}
          <RoadmapTimeline />
        </>
      )}
    </div>
  );
};

export default RoadmapPage;
