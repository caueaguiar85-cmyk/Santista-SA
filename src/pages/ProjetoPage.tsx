import React from 'react';
import Header from '../components/layout/Header';
import ProjectOverview from '../components/projeto/ProjectOverview';
import MilestonesTimeline from '../components/projeto/MilestonesTimeline';
import DocumentsPanel from '../components/projeto/DocumentsPanel';
import TeamPanel from '../components/projeto/TeamPanel';
import { useProjectStore } from '../store/projectStore';

const ProjetoPage: React.FC = () => {
  const project = useProjectStore((s) => s.project);

  if (!project) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl font-semibold text-primary mb-2">
            Nenhum projeto carregado
          </p>
          <p className="font-body text-text-muted">
            Configure um projeto para visualizar o painel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface px-6 py-8 max-w-7xl mx-auto">
      <Header
        title="Projeto"
        subtitle="Visao geral do assessment Santista S.A."
      />

      {/* Hero metrics + project info */}
      <div className="mb-6">
        <ProjectOverview />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline — wide column */}
        <div className="lg:col-span-2">
          <MilestonesTimeline />
        </div>

        {/* Side column */}
        <div className="flex flex-col gap-6">
          <DocumentsPanel />
          <TeamPanel />
        </div>
      </div>
    </div>
  );
};

export default ProjetoPage;
