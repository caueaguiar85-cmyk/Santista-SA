import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProjetoPage       from './pages/ProjetoPage';
import EntrevistasPage   from './pages/EntrevistasPage';
import DiagnosticoPage   from './pages/DiagnosticoPage';
import InsightsPage      from './pages/InsightsPage';
import RoadmapPage       from './pages/RoadmapPage';
import ConfiguracoesPage from './pages/ConfiguracoesPage';
import { useProjectStore }     from './store/projectStore';
import { useInterviewStore }   from './store/interviewStore';
import { useDiagnosticoStore } from './store/diagnosticoStore';
import {
  santistaSeed,
  sampleInterviews,
  sampleInsights,
  sampleInitiatives,
  sampleBenchmark,
  sampleKPIs,
} from './data/santista-seed';

function AppRoutes() {
  const project      = useProjectStore((s) => s.project);
  const setProject   = useProjectStore((s) => s.setProject);

  const interviews   = useInterviewStore((s) => s.interviews);
  const setInterviews = useInterviewStore((s) => s.setInterviews);

  const insights     = useDiagnosticoStore((s) => s.insights);
  const setInsights  = useDiagnosticoStore((s) => s.setInsights);
  const report       = useDiagnosticoStore((s) => s.report);
  const setReport    = useDiagnosticoStore((s) => s.setReport);

  useEffect(() => {
    // Seed project
    if (!project) {
      setProject(santistaSeed);
    }

    // Seed interviews
    if (interviews.length === 0) {
      setInterviews(sampleInterviews);
    }

    // Seed diagnostico data
    if (insights.length === 0) {
      setInsights(sampleInsights);

      // Also populate report with initiatives, benchmark and KPIs
      setReport({
        projectId: santistaSeed.id,
        generatedAt: new Date().toISOString(),
        overallScore: sampleBenchmark.companyScore,
        pillarScores: [],
        executiveSummary: '',
        kpis: sampleKPIs,
        raciMatrix: [],
        marketBenchmark: sampleBenchmark,
        initiatives: sampleInitiatives,
      });
    } else if (report && report.initiatives.length === 0) {
      // Ensure initiatives are present even if insights were already seeded
      setReport({
        ...report,
        kpis: sampleKPIs,
        marketBenchmark: sampleBenchmark,
        initiatives: sampleInitiatives,
      });
    }
  }, [
    project, setProject,
    interviews.length, setInterviews,
    insights.length, setInsights,
    report, setReport,
  ]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/projeto" replace />} />
        <Route path="/projeto"        element={<ProjetoPage />}       />
        <Route path="/entrevistas"    element={<EntrevistasPage />}   />
        <Route path="/diagnostico"    element={<DiagnosticoPage />}   />
        <Route path="/insights"       element={<InsightsPage />}      />
        <Route path="/roadmap"        element={<RoadmapPage />}       />
        <Route path="/configuracoes"  element={<ConfiguracoesPage />} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/projeto" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
