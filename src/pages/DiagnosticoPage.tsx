import React, { useState } from 'react';
import {
  Activity,
  Layers,
  Settings2,
  Play,
  ChevronDown,
  Award,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Tabs from '../components/ui/Tabs';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import MaturityRadar from '../components/diagnostico/MaturityRadar';
import PillarAnalysis from '../components/diagnostico/PillarAnalysis';
import AgentControls from '../components/diagnostico/AgentControls';
import { useDiagnosticoStore } from '../store/diagnosticoStore';
import type { PillarType } from '../types/interview';
import { PILLAR_LABELS } from '../types/interview';
import { CMMI_LEVELS } from '../types/diagnostico';

// ----------------------------
// Constants
// ----------------------------
const PILLARS: PillarType[] = ['processos', 'sistemas', 'operacoes', 'organizacao', 'roadmap'];

const PILLAR_BADGE_VARIANTS = [
  'pilar-1',
  'pilar-2',
  'pilar-3',
  'pilar-4',
  'pilar-5',
] as const;

const TABS = [
  { id: 'dashboard', label: 'Dashboard de Maturidade', icon: <Activity size={16} /> },
  { id: 'pilares', label: 'Analise por Pilar', icon: <Layers size={16} /> },
  { id: 'geracao', label: 'Controles de Geracao', icon: <Settings2 size={16} /> },
];

// ----------------------------
// Benchmark comparison card
// ----------------------------
type ReportType = import('../types/diagnostico').DiagnosticReport | null;

function BenchmarkCard({ report }: { report: ReportType }) {
  if (!report?.marketBenchmark) {
    return (
      <Card title="Benchmark do Setor" subtitle="Dados de referencia">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-primary/60">Score da empresa</span>
            <span className="font-body text-sm font-semibold text-primary">—</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-primary/60">Media do setor</span>
            <span className="font-body text-sm font-semibold text-primary">3.1</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-primary/60">Top quartil</span>
            <span className="font-body text-sm font-semibold text-primary">4.0</span>
          </div>
        </div>
      </Card>
    );
  }

  const { companyScore, sectorAverage, topQuartile } = report.marketBenchmark;
  const gap = sectorAverage - companyScore;

  return (
    <Card title="Benchmark do Setor" subtitle="Comparativo com o mercado">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-primary/60">Score da empresa</span>
          <span className="font-heading text-sm font-bold text-primary">
            {companyScore.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-primary/60">Media do setor</span>
          <div className="flex items-center gap-1.5">
            <span className="font-body text-sm font-semibold text-amber-600">
              {sectorAverage.toFixed(1)}
            </span>
            {gap > 0 && (
              <Badge variant="danger" size="sm">
                -{gap.toFixed(1)}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-primary/60">Top quartil</span>
          <span className="font-body text-sm font-semibold text-emerald-600">
            {topQuartile.toFixed(1)}
          </span>
        </div>
        {report.marketBenchmark.references.length > 0 && (
          <div className="pt-2 border-t border-border">
            <p className="font-body text-xs text-primary/30">
              {report.marketBenchmark.references[0]}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

// ----------------------------
// Dashboard tab
// ----------------------------
function DashboardTab() {
  const report = useDiagnosticoStore((s) => s.report);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar - wide */}
        <div className="lg:col-span-2">
          <Card title="Radar de Maturidade" subtitle="5 pilares da cadeia de suprimentos">
            <MaturityRadar report={report} />
          </Card>
        </div>

        {/* Side column */}
        <div className="flex flex-col gap-4">
          <Card>
            <div className="text-center py-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <Award size={22} className="text-primary" />
              </div>
              <p className="font-body text-sm text-primary/50 mb-1">Maturidade Geral</p>
              <p className="font-heading text-5xl font-bold text-primary">
                {report ? report.overallScore.toFixed(1) : '—'}
              </p>
              <p className="font-body text-xs text-primary/40 mt-1">escala CMMI 1–5</p>
              {report && (
                <div className="mt-3">
                  <Badge variant="warning">
                    Nivel {Math.round(report.overallScore)} —{' '}
                    {CMMI_LEVELS[Math.round(report.overallScore) as 1 | 2 | 3 | 4 | 5]}
                  </Badge>
                </div>
              )}
            </div>
          </Card>

          <BenchmarkCard report={report} />
        </div>
      </div>

      {/* Pillar score summary */}
      {report && (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {PILLARS.map((pillar, i) => {
            const ps = report.pillarScores.find((s) => s.pillar === pillar);
            return (
              <Card key={pillar} className="text-center">
                <Badge variant={PILLAR_BADGE_VARIANTS[i]} size="sm" className="mb-2">
                  {PILLAR_LABELS[pillar].split(' ')[0]}
                </Badge>
                <p className="font-heading text-3xl font-bold text-primary mt-1">
                  {ps ? ps.score.toFixed(1) : '—'}
                </p>
                <p className="font-body text-xs text-primary/40 mt-0.5">
                  {ps ? ps.level : 'Pendente'}
                </p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ----------------------------
// Pillar analysis tab
// ----------------------------
function PilaresTab() {
  const report = useDiagnosticoStore((s) => s.report);
  const [activePillar, setActivePillar] = useState<PillarType>('processos');

  const pillarScore = report?.pillarScores.find((ps) => ps.pillar === activePillar);

  return (
    <div className="space-y-4">
      {/* Pillar selector */}
      <div className="flex flex-wrap gap-2">
        {PILLARS.map((pillar, i) => {
          const ps = report?.pillarScores.find((s) => s.pillar === pillar);
          const isActive = activePillar === pillar;

          return (
            <button
              key={pillar}
              type="button"
              onClick={() => setActivePillar(pillar)}
              className={[
                'inline-flex items-center gap-2 px-3 py-2 rounded-lg border font-body text-sm font-medium transition-all',
                isActive
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-surface-2 text-primary/50 hover:text-primary hover:border-primary/30',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <Badge variant={PILLAR_BADGE_VARIANTS[i]} size="sm" className="shrink-0">
                {i + 1}
              </Badge>
              <span>{PILLAR_LABELS[pillar]}</span>
              {ps && (
                <span className="font-heading font-bold text-xs ml-1">
                  {ps.score.toFixed(1)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <PillarAnalysis pillarScore={pillarScore} pillar={activePillar} />
    </div>
  );
}

// ----------------------------
// Main page
// ----------------------------
const DiagnosticoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isRunning } = useDiagnosticoStore();

  const handleRunAll = () => {
    setActiveTab('geracao');
  };

  const handleRunIndividual = () => {
    setActiveTab('geracao');
  };

  return (
    <div className="min-h-screen bg-surface px-6 py-8 max-w-7xl mx-auto">
      <Header
        title="Diagnostico"
        subtitle="Centro de analise estrategica"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              icon={<Play size={16} />}
              onClick={handleRunAll}
              disabled={isRunning}
              loading={isRunning}
            >
              {isRunning ? 'Executando...' : 'Rodar Diagnostico Completo'}
            </Button>

            <Button
              variant="outline"
              icon={<ChevronDown size={16} />}
              onClick={handleRunIndividual}
              disabled={isRunning}
            >
              Rodar Agente Individual
            </Button>
          </div>
        }
      />

      {/* Tabs */}
      <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      {/* Tab content */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'pilares' && <PilaresTab />}
        {activeTab === 'geracao' && <AgentControls />}
      </div>
    </div>
  );
};

export default DiagnosticoPage;
