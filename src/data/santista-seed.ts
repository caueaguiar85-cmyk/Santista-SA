import type { Project } from '../types/project';
import type { Interview } from '../types/interview';
import type { Insight, Initiative, BenchmarkData, KPI } from '../types/diagnostico';

// ─────────────────────────────────────────────────────────────────────────────
// 1. PROJETO — santistaSeed
// ─────────────────────────────────────────────────────────────────────────────

export const santistaSeed: Project = {
  id: 'santista-2026',
  name: 'Diagnostico Estrategico Santista',
  client: 'Santista S.A.',
  sector: 'Industria Textil — Jeanswear & Workwear',
  revenue: 'R$ 750M (atual) → R$ 900M (projetado 2027)',
  employees: 3500,
  factories: 4,
  startDate: '2026-04-21',
  endDate: '2026-05-19',
  currentPhase: 1,
  completionPercent: 15,

  context: `A Santista S.A. e uma das maiores fabricantes texteis do Brasil, com 85 anos de historia e quatro plantas industriais localizadas em Sao Paulo (SP), Americana (SP), Juiz de Fora (MG) e Blumenau (SC). Seu portfolio abrange denim, workwear tecnico e uniformes corporativos, atendendo tanto o mercado nacional quanto clientes de exportacao na America Latina.

Com receita atual de R$ 750M e meta de atingir R$ 900M ate 2027, a empresa enfrenta um momento critico de transformacao: o parque tecnologico e composto por 39 sistemas legados com baixa integracao, o que gera retrabalho, ilhas de informacao e decisoes baseadas em planilhas. O risco de descontinuidade do ERP atual — em versao sem suporte desde 2023 — representa uma ameaca operacional de alta prioridade.

No plano industrial, a produtividade atual e de 34 km de tecido por funcionario ao ano, com meta de elevar para 40 km/func/ano ate 2027. Para isso, a empresa aprovou um CAPEX de R$ 300M destinado a automacao de teares, reforma das linhas de acabamento e implantacao de um sistema MES nas quatro plantas. O budget de TI e de R$ 40M anuais, sendo 70% comprometido com manutencao do legado e apenas 30% disponivel para inovacao.

Em abril de 2025, a Santista constituiu o Escritorio de Transformacao (Transformation Office), liderado pela Diretora de Estrategia, com o objetivo de coordenar as iniciativas de modernizacao. A parceria com a Vexia — startup especializada em automacao industrial — esta em fase de piloto na planta de Americana, com resultados preliminares de reducao de paradas nao planejadas em 18%.

O Assessment Estrategico contratado junto a Stoken Advisory tem como escopo mapear os cinco pilares de maturidade (Processos & Governanca, Sistemas & Dados, Operacoes & Eficiencia, Organizacao & Capacidade e Roadmap de Transformacao), identificar gaps criticos, quantificar o potencial de ganho e entregar um roadmap priorizando iniciativas nas tres ondas: Estabilizar (0–6 meses), Otimizar (6–18 meses) e Transformar (18–36 meses).`,

  milestones: [
    {
      id: 'm1',
      label: 'Kick-off do Projeto',
      date: '2026-04-21',
      status: 'in_progress',
      phase: 1,
      deliverable: 'Ata de kick-off e plano de trabalho aprovado',
    },
    {
      id: 'm2',
      label: 'Coleta de Dados e Documentos',
      date: '2026-04-25',
      status: 'pending',
      phase: 1,
      deliverable: 'Repositorio de documentos organizado na plataforma',
    },
    {
      id: 'm3',
      label: 'Entrevistas C-Level (5 executivos)',
      date: '2026-04-28',
      status: 'pending',
      phase: 1,
      deliverable: 'Transcricoes validadas e prontas para analise IA',
    },
    {
      id: 'm4',
      label: 'Entrevistas Gerencia (8 gestores)',
      date: '2026-05-02',
      status: 'pending',
      phase: 1,
      deliverable: 'Transcricoes validadas e prontas para analise IA',
    },
    {
      id: 'm5',
      label: 'Workshopping Operacional (plantas)',
      date: '2026-05-05',
      status: 'pending',
      phase: 1,
      deliverable: 'Notas de campo e evidencias fotograficas',
    },
    {
      id: 'm6',
      label: 'Analise IA — Pilares 1 e 2',
      date: '2026-05-07',
      status: 'pending',
      phase: 2,
      deliverable: 'Relatorio parcial Processos & Sistemas com scores CMMI',
    },
    {
      id: 'm7',
      label: 'Analise IA — Pilares 3, 4 e 5',
      date: '2026-05-09',
      status: 'pending',
      phase: 2,
      deliverable: 'Relatorio parcial Operacoes, Organizacao e Roadmap',
    },
    {
      id: 'm8',
      label: 'Benchmark Setorial',
      date: '2026-05-12',
      status: 'pending',
      phase: 2,
      deliverable: 'Comparativo Santista vs. setor vs. top quartile',
    },
    {
      id: 'm9',
      label: 'Matriz de Iniciativas e Priorizacao',
      date: '2026-05-14',
      status: 'pending',
      phase: 2,
      deliverable: 'Roadmap em tres ondas com esforco x impacto',
    },
    {
      id: 'm10',
      label: 'Relatorio Executivo (draft)',
      date: '2026-05-15',
      status: 'pending',
      phase: 2,
      deliverable: 'Documento Word/PDF para revisao interna Stoken',
    },
    {
      id: 'm11',
      label: 'Revisao Interna e Ajustes',
      date: '2026-05-16',
      status: 'pending',
      phase: 3,
      deliverable: 'Relatorio revisado com comentarios incorporados',
    },
    {
      id: 'm12',
      label: 'Apresentacao para Board Santista',
      date: '2026-05-19',
      status: 'pending',
      phase: 3,
      deliverable: 'Deck executivo apresentado e aprovado',
    },
    {
      id: 'm13',
      label: 'Entrega do Roadmap Detalhado',
      date: '2026-05-19',
      status: 'pending',
      phase: 3,
      deliverable: 'Roadmap com RACI, KPIs, cronograma e estimativas de ganho',
    },
    {
      id: 'm14',
      label: 'Revisao Trimestral de KPIs (follow-up)',
      date: '2026-08-19',
      status: 'pending',
      phase: 3,
      deliverable: 'Relatorio de acompanhamento das iniciativas aprovadas',
    },
  ],

  team: [
    {
      id: 't1',
      name: 'Carolina Stocche (Caca)',
      role: 'Socia Diretora',
      allocation: 60,
    },
    {
      id: 't2',
      name: 'PMO Senior',
      role: 'Gerente de Projeto',
      allocation: 100,
    },
    {
      id: 't3',
      name: 'Analista Senior',
      role: 'Analista de Dados',
      allocation: 80,
    },
  ],

  documents: [
    {
      id: 'd1',
      name: 'Proposta Comercial — Assessment Santista',
      type: 'proposal',
      uploadedAt: '2026-04-10',
      size: '2.4 MB',
    },
    {
      id: 'd2',
      name: 'Organograma Santista 2026',
      type: 'organogram',
      uploadedAt: '2026-04-15',
      size: '1.1 MB',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. ENTREVISTAS — sampleInterviews
// ─────────────────────────────────────────────────────────────────────────────

export const sampleInterviews: Interview[] = [
  {
    id: 'i1',
    intervieweeName: 'Carlos Mendonca',
    role: 'Diretor de Operacoes',
    area: 'Operacoes Industriais',
    level: 'c-level',
    pillar: 'operacoes',
    date: '2026-04-22',
    status: 'completed',
    readyForAI: true,
    tags: ['OEE', 'manutencao', 'paradas nao planejadas', 'teares', 'CAPEX'],
    aiInsights: null,
    transcript: `ENTREVISTADOR: Carlos, obrigado pela disponibilidade. Vamos comecar pela visao geral das operacoes. Qual e o maior desafio que voce enfrenta hoje no chao de fabrica?

CARLOS MENDONCA: Olha, sem duvida e a gestao das paradas nao planejadas. Nos temos hoje um OEE medio de 67% nas quatro plantas. Isso esta muito abaixo do que eu considero aceitavel — o nosso benchmark interno e 78%, e o mercado de ponta fica em torno de 85%. Entao temos um gap significativo.

ENTREVISTADOR: Quais sao as principais causas dessas paradas?

CARLOS MENDONCA: Tres razoes principais. Primeiro, manutencao reativa. Nos ainda operamos em modo "quebrou, conserta". Nao temos um programa estruturado de manutencao preditiva. Segundo, setup de maquinas: troca de artigo demora em media 4 horas, sendo que tecnicamente poderiamos fazer em 2 horas com o processo certo — e ai o pessoal da Vexia esta nos ajudando a entender como. Terceiro, a falta de visibilidade em tempo real. Quando uma maquina para em Blumenau, eu fico sabendo duas horas depois por e-mail. E impossivel gerenciar assim.

ENTREVISTADOR: E o projeto com a Vexia? Como esta progredindo?

CARLOS MENDONCA: Estamos em piloto em Americana ha tres meses. Os resultados preliminares sao animadores — reduzimos paradas nao planejadas em 18% so nessa planta. Mas eu tenho preocupacao com a escala. A Vexia e uma startup, e eu preciso de garantias de que a solucao vai funcionar em quatro plantas, com os nossos 600 teares e a integracao com o nosso ERP. Essa integracao e o no gordio — o nosso ERP e muito antigo e a API e uma bagunca.

ENTREVISTADOR: Fale sobre o plano de CAPEX. Como voce ve o investimento de R$ 300M?

CARLOS MENDONCA: E necessario, mas eu tenho receio de que a gente invista pesado em hardware — novos teares, sistemas de acabamento — sem resolver o problema de gestao. Maquina boa com processo ruim continua sendo ineficiente. O que eu defendo e que pelo menos 20% desse CAPEX seja direcionado para sistemas MES e infraestrutura de dados antes de comprar mais equipamento. Hoje nos nao temos visibilidade do que acontece em tempo real. Como eu vou tomar decisao?

ENTREVISTADOR: Voce tem alguma iniciativa de dados ou analytics hoje?

CARLOS MENDONCA: Tem um projeto de BI que o pessoal de TI esta tocando, mas e tudo historico — relatorio do dia anterior. Para operacoes, isso e inutil. Eu preciso de dado em tempo real, no maximo com 15 minutos de delay. E os dashboards que temos sao feitos em Excel pelo meu assistente. Todo dia ele passa duas horas atualizando planilhas. E um desperdicio absurdo de tempo e de talento.

ENTREVISTADOR: Quais sao os seus KPIs prioritarios para os proximos 18 meses?

CARLOS MENDONCA: Quero chegar a 78% de OEE ate o final de 2026 e a 82% ate meados de 2027. Reducao de paradas nao planejadas em 40%. E quero zerar a dependencia de planilhas na operacao — 100% dos indicadores operacionais em sistema. Esses tres objetivos estao interligados. Sem dado bom, nao consigo gerir o OEE. Sem MES, nao consigo dado bom.`,
  },

  {
    id: 'i2',
    intervieweeName: 'Ana Paula Ferreira',
    role: 'Diretora de TI',
    area: 'Tecnologia da Informacao',
    level: 'c-level',
    pillar: 'sistemas',
    date: '2026-04-23',
    status: 'analyzed',
    readyForAI: true,
    tags: [
      'sistemas legados',
      'ERP',
      'divida tecnica',
      'integracao',
      'risco operacional',
      'budget TI',
    ],
    aiInsights: {
      summary:
        'Ana Paula descreveu um cenario critico de obsolescencia tecnologica: 39 sistemas sem integracao adequada, ERP fora de suporte desde 2023 e um budget de TI majoritariamente consumido pela manutencao do legado. O sentimento e de urgencia e frustacao diante da impossibilidade de inovar sem antes estabilizar a base.',
      keyFindings: [
        'ERP (SAP R/3 4.6C) sem suporte do fabricante desde 2023 — risco de descontinuidade critico',
        '39 sistemas legados com integracao via planilhas e arquivos FTP, gerando retrabalho diario estimado em 120 horas/semana',
        '70% do budget de TI (R$ 28M de R$ 40M) comprometido com manutencao do legado, restando apenas R$ 12M para inovacao',
        'Ausencia de Data Warehouse ou Data Lake — dados analiticos espalhados em 17 bases diferentes sem governanca',
        'Time de TI composto por 45 pessoas, sendo 60% com perfil de manutencao e apenas 40% com perfil de desenvolvimento/inovacao',
        'Proposta de migracao para S/4HANA aguardando aprovacao do board ha 14 meses',
      ],
      tags: [
        'ERP legado',
        'risco critico',
        'divida tecnica',
        'governanca de dados',
        'S/4HANA',
        'budget restrito',
      ],
      sentiment: 'negative',
      maturityIndicators: [
        'CMMI Nivel 1 em Gestao de Dados — sem politica formal de governanca',
        'CMMI Nivel 2 em Gestao de Sistemas — processos documentados porem nao padronizados entre plantas',
        'Arquitetura ponto-a-ponto com mais de 200 integraces customizadas sem documentacao atualizada',
        'SLA medio de disponibilidade dos sistemas criticos: 94,2% — abaixo do target de 99,5%',
        'Ausencia de ambiente de homologacao para 12 dos 39 sistemas — mudancas direto em producao',
      ],
    },
    transcript: `ENTREVISTADOR: Ana Paula, vamos comecar pelo panorama geral do parque de TI. Como voce descreveria a situacao atual?

ANA PAULA FERREIRA: Eu costumo dizer que a Santista tem um palaco construido sobre areia. Nos temos 39 sistemas em producao, muitos deles com mais de 15 anos. O nosso ERP e um SAP R/3 versao 4.6C — essa versao saiu de suporte do fabricante em 2023. Estamos operando em risco. Qualquer incidente critico e a SAP nao tem obrigacao de nos atender.

ENTREVISTADOR: Como esses sistemas se comunicam entre si?

ANA PAULA FERREIRA: Na maioria das vezes, nao se comunicam. A "integracao" e feita por planilhas de Excel que um analista exporta de um sistema e importa em outro. Nos temos arquivos FTP rodando de madrugada que movem dados entre sistemas. E isso em 2026. A gente estimou que esse retrabalho de integracao manual consome umas 120 horas de trabalho por semana entre as equipes.

ENTREVISTADOR: E o budget? Como esta distribuido?

ANA PAULA FERREIRA: O budget total de TI e R$ 40M por ano. Mas 70% vai para manter o que temos: licencas, infraestrutura, suporte, manutencao corretiva. Sobram R$ 12M para inovacao. E mesmo esses R$ 12M estao pre-comprometidos com projetos aprovados. A realidade e que eu nao tenho folgura para fazer nada novo sem cortar algo.

ENTREVISTADOR: Qual e o risco que mais te preocupa?

ANA PAULA FERREIRA: O ERP, sem sombra de duvida. Nos submetemos uma proposta de migracao para o S/4HANA ha 14 meses. O projeto tem custo estimado de R$ 45M e prazo de 24 meses. O board ainda nao aprovou por causa do valor e da percepcao de risco de uma migracao grande. Mas eu prefiro esse risco controlado ao risco de ficar sem ERP um dia. Se o banco de dados do SAP atual corromper e a SAP nao nos atender, a Santista para de emitir nota fiscal.

ENTREVISTADOR: E quanto a dados e analytics?

ANA PAULA FERREIRA: Nao temos Data Warehouse estruturado. Os dados analiticos estao espalhados em 17 bases diferentes. Cada diretoria tem o seu cubo de dados, gerenciado pelo seu proprio time. Nao existe governanca centralizada. O resultado e que numa reuniao de board, cada diretor chega com um numero diferente para a mesma metrica. E constrangedor e perigoso.

ENTREVISTADOR: Como voce ve o roadmap de modernizacao?

ANA PAULA FERREIRA: A prioridade numero um e estabilizar — resolver o ERP, consolidar os dados, implantar uma camada de integracao moderna em vez desses arquivos FTP. So depois disso a gente pode falar em inovar com IA, automacao e afins. Eu fico nervosa quando alguem fala em "Data Lake" ou "IA" enquanto a nossa base esta nessa situacao. E como querer reformar o apartamento sem ter feito o encanamento.`,
  },

  {
    id: 'i3',
    intervieweeName: 'Roberto Nascimento',
    role: 'Gerente de S&OP',
    area: 'Planejamento e Logistica',
    level: 'gerencia',
    pillar: 'processos',
    date: '2026-04-24',
    status: 'completed',
    readyForAI: true,
    tags: ['S&OP', 'planejamento', 'previsao de demanda', 'estoques', 'silos organizacionais'],
    aiInsights: null,
    transcript: `ENTREVISTADOR: Roberto, conte-nos como funciona o processo de S&OP hoje na Santista.

ROBERTO NASCIMENTO: O S&OP existe no papel. A gente tem uma reuniao mensal que chamamos de S&OP, mas na pratica e uma apresentacao de numeros historicos onde cada area defende o seu territorio. Nao existe um processo integrado de consenso entre Vendas, Operacoes e Financeiro.

ENTREVISTADOR: Qual e o impacto pratico disso?

ROBERTO NASCIMENTO: O impacto e visivel em dois lugares. Primeiro, no nivel de estoque: nos giramos com um estoque de produto acabado equivalente a 68 dias de venda, sendo que o benchmark do setor e 45 dias. Isso representa capital imobilizado de aproximadamente R$ 85M a mais do que precisariamos ter. Segundo, na ruptura: apesar do estoque alto, temos uma taxa de atendimento de pedidos em dia de 76%. O estoque e do produto errado, no lugar errado.

ENTREVISTADOR: Por que isso acontece?

ROBERTO NASCIMENTO: Tres razoes. Primeira: a previsao de demanda e feita no sistema de vendas sem comunicacao com o planejamento da producao. Cada um usa uma premissa diferente. Segunda: as plantas produzem para otimizar o seu proprio setup — aproveitam quando o tear esta configurado para um artigo e produzem em excesso para evitar a troca — mas isso gera estoque de produto que nao e o que o cliente quer. Terceira: nao existe visibilidade de estoque em tempo real entre as plantas. Quando falta um artigo em Sao Paulo, as vezes ele esta sobrando em Blumenau, mas a gente nao sabe.

ENTREVISTADOR: Voce tem alguma ferramenta de previsao de demanda?

ROBERTO NASCIMENTO: Temos uma aba de Excel. Com series historicas de 12 meses e ajuste manual. Nao tem machine learning, nao tem sazonalidade automatica, nao tem integracao com dados de sell-through dos clientes. E uma previsao que erra em media 34% — eu mesmo calculei. Para o mercado de moda, onde o ciclo de colecao e curto, um erro de 34% e catastrofico.

ENTREVISTADOR: O que voce precisaria para melhorar esse processo?

ROBERTO NASCIMENTO: Tres coisas. Um sistema de S&OP integrado que conecte Vendas, Plano de Producao e Financeiro em tempo real. Uma ferramenta de demand sensing que use dados de sell-through dos clientes e sazonalidade. E visibilidade de estoque consolidada entre as quatro plantas. Com isso, eu estimo que consigo reduzir o estoque para 50 dias em 12 meses, liberando R$ 55M de capital de giro.

ENTREVISTADOR: Existe resistencia interna para mudar o processo?

ROBERTO NASCIMENTO: Existe. A area Comercial e muito autonoma e tem receio de perder flexibilidade. O Diretor Comercial acha que qualquer processo de S&OP vai "engessá-lo". Mas o que ele nao ve e que a flexibilidade atual custa caro — R$ 85M de estoque e 24% de pedidos atrasados nao e flexibilidade, e ineficiencia.`,
  },

  {
    id: 'i4',
    intervieweeName: 'Mariana Costa',
    role: 'Head de RH',
    area: 'Recursos Humanos',
    level: 'c-level',
    pillar: 'organizacao',
    date: '2026-04-29',
    status: 'scheduled',
    readyForAI: false,
    tags: [],
    aiInsights: null,
    transcript: '',
  },

  {
    id: 'i5',
    intervieweeName: 'Pedro Almeida',
    role: 'Coordenador de Automacao / Vexia',
    area: 'Automacao Industrial',
    level: 'gerencia',
    pillar: 'roadmap',
    date: '2026-04-30',
    status: 'scheduled',
    readyForAI: false,
    tags: [],
    aiInsights: null,
    transcript: '',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. INSIGHTS — sampleInsights
// ─────────────────────────────────────────────────────────────────────────────

export const sampleInsights: Insight[] = [
  {
    id: 'ins1',
    title: 'ERP fora de suporte representa risco critico de continuidade operacional',
    description:
      'O SAP R/3 4.6C opera sem suporte do fabricante desde 2023. Um incidente de corrupcao de banco de dados ou falha critica pode paralisar a emissao de notas fiscais e o faturamento da empresa, sem garantia de atendimento pela SAP. O risco e agravado pela ausencia de ambiente de homologacao em 12 dos 39 sistemas, com mudancas sendo aplicadas diretamente em producao.',
    impact: 'Alto',
    estimatedValue: 'Risco de paralisacao de R$ 2M+/dia em faturamento',
    origin: 'Entrevista Ana Paula Ferreira (Diretora de TI) — 2026-04-23',
    benchmarkSource: 'Gartner — "ERP End-of-Life Risk Framework 2025"',
    suggestedAction:
      'Iniciar imediatamente o processo de aprovacao da migracao para S/4HANA e contratar suporte estendido de terceiro (SAP Partner) enquanto a migracao nao e concluida.',
    status: 'validated',
    type: 'risk',
    pillar: 'sistemas',
  },
  {
    id: 'ins2',
    title: 'OEE 11 pontos abaixo do benchmark — perda anual estimada de R$ 62M',
    description:
      'O OEE medio de 67% nas quatro plantas esta 11 pontos abaixo do target interno (78%) e 18 pontos abaixo do top quartile setorial (85%). Cada ponto percentual de OEE na base de producao da Santista representa aproximadamente R$ 5,6M em capacidade produtiva anual. O gap total representa uma perda potencial de R$ 62M/ano em producao nao realizada.',
    impact: 'Alto',
    estimatedValue: 'R$ 62M/ano em capacidade nao aproveitada',
    origin: 'Entrevista Carlos Mendonca (Diretor de Operacoes) — 2026-04-22',
    benchmarkSource: 'ABIT — Indice de Eficiencia Industrial Textil 2025',
    suggestedAction:
      'Implantar programa de manutencao preditiva nas quatro plantas e expandir o piloto Vexia para reducao de setup time. Meta: OEE 78% em 12 meses.',
    status: 'validated',
    type: 'risk',
    pillar: 'operacoes',
  },
  {
    id: 'ins3',
    title: 'Retrabalho de integracao manual consome 120h/semana da equipe de TI',
    description:
      'A ausencia de uma camada de integracao moderna forca a equipe a realizar transferencia de dados via planilhas e arquivos FTP entre os 39 sistemas. O volume estimado e de 120 horas de trabalho tecnico por semana — equivalente a 3 FTEs dedicados exclusivamente a mover dados de um sistema para outro sem gerar valor.',
    impact: 'Alto',
    estimatedValue: 'R$ 1,8M/ano em custo de retrabalho (3 FTEs + overhead)',
    origin: 'Entrevista Ana Paula Ferreira (Diretora de TI) — 2026-04-23',
    benchmarkSource: 'McKinsey Digital — "The Cost of Integration Debt 2025"',
    suggestedAction:
      'Implantar plataforma de integracao (iPaaS) para substituir os arquivos FTP e automatizar os fluxos de dados criticos. Estimativa de ROI em 8 meses.',
    status: 'validated',
    type: 'quick_win',
    pillar: 'sistemas',
  },
  {
    id: 'ins4',
    title: 'Estoque 51% acima do benchmark setorial — R$ 85M de capital imobilizado',
    description:
      'O estoque de produto acabado equivale a 68 dias de venda, contra benchmark setorial de 45 dias. A diferenca representa aproximadamente R$ 85M de capital imobilizado desnecessariamente. Paradoxalmente, o indice de atendimento de pedidos em dia e de apenas 76%, indicando que o problema e de mix e visibilidade, nao de volume total de estoque.',
    impact: 'Alto',
    estimatedValue: 'R$ 55M de capital de giro liberado em 12 meses',
    origin: 'Entrevista Roberto Nascimento (Gerente de S&OP) — 2026-04-24',
    benchmarkSource: 'ILOS — Benchmarking de Estoques na Industria Textil 2025',
    suggestedAction:
      'Implantar solucao de S&OP digital com demand sensing integrado ao sell-through dos clientes e visibilidade de estoque em tempo real entre as quatro plantas.',
    status: 'validated',
    type: 'opportunity',
    pillar: 'processos',
  },
  {
    id: 'ins5',
    title: 'Piloto Vexia indica potencial de reducao de 40% nas paradas nao planejadas',
    description:
      'Os resultados preliminares do piloto de automacao com a Vexia em Americana mostram reducao de 18% nas paradas nao planejadas em apenas 3 meses. Extrapolando para as quatro plantas com o programa completo, a estimativa e de reducao de 40% nas paradas, o que contribui diretamente para o ganho de OEE almejado.',
    impact: 'Alto',
    estimatedValue: 'R$ 34M/ano em ganho de producao ao atingir OEE 78%',
    origin: 'Entrevista Carlos Mendonca (Diretor de Operacoes) — 2026-04-22',
    benchmarkSource: 'Vexia — Relatorio de Piloto Americana, Mar/2026',
    suggestedAction:
      'Aprovar expansao do piloto Vexia para as plantas de Juiz de Fora e Blumenau no segundo semestre, com framework de integracao MES definido previamente.',
    status: 'analyzing',
    type: 'opportunity',
    pillar: 'operacoes',
  },
  {
    id: 'ins6',
    title: 'Previsao de demanda com erro de 34% inviabiliza planejamento eficiente',
    description:
      'O processo atual de previsao de demanda, baseado em planilhas com series historicas de 12 meses, apresenta erro medio de 34% (MAPE). No mercado de moda/denim, onde ciclos de colecao duram 4-6 meses, esse nivel de erro gera excesso de producao de artigos sem demanda e ruptura dos artigos certos simultaneamente.',
    impact: 'Medio',
    estimatedValue: 'Impacto indireto de R$ 85M em estoque mal alocado',
    origin: 'Entrevista Roberto Nascimento (Gerente de S&OP) — 2026-04-24',
    benchmarkSource: 'Gartner Supply Chain Top 25 — Demand Sensing Benchmarks 2025',
    suggestedAction:
      'Implementar solucao de demand sensing com ML usando dados de sell-through dos clientes, historico de 36 meses e variaveis externas (sazonalidade, tendencias de moda).',
    status: 'validated',
    type: 'quick_win',
    pillar: 'processos',
  },
  {
    id: 'ins7',
    title: 'Concentracao de 70% do budget de TI em legado limita capacidade de inovacao',
    description:
      'Com R$ 28M dos R$ 40M anuais de TI destinados a manutencao do legado, a empresa tem apenas R$ 12M para inovacao — ja totalmente comprometidos. Esse padrao, chamado de "aprisao do legado", e comum em empresas que postergam a modernizacao e resulta em aceleracao da divida tecnica. A projecao e de que, sem intervencao, o custo de manutencao do legado chegara a R$ 35M em 2028.',
    impact: 'Alto',
    estimatedValue: 'R$ 8M de economia anual pos-modernizacao do portfolio',
    origin: 'Entrevista Ana Paula Ferreira (Diretora de TI) — 2026-04-23',
    benchmarkSource: 'Forrester — "Total Cost of Legacy Systems in Manufacturing 2025"',
    suggestedAction:
      'Elaborar plano de racionalizacao do portfolio de sistemas: consolidar os 39 sistemas em no maximo 18 em 36 meses, priorizando substituicao dos sistemas sem API moderna.',
    status: 'validated',
    type: 'strategic',
    pillar: 'sistemas',
  },
  {
    id: 'ins8',
    title: 'Escritorio de Transformacao recente e oportunidade para acelerar mudanca cultural',
    description:
      'A constituicao do Transformation Office em abril de 2025 e um sinal positivo de comprometimento da lideranca com a mudanca. Porem, com apenas 12 meses de existencia e sem metodologia consolidada, o escritorio ainda nao tem autoridade formal para priorizar e travar iniciativas conflitantes entre as diretorias. E uma janela de oportunidade para estruturar governance antes que o modelo se consolide de forma disfuncional.',
    impact: 'Medio',
    estimatedValue: 'Aceleracao de 30% no tempo de realizacao dos ganhos das iniciativas',
    origin: 'Contexto do projeto e entrevistas preliminares — Abr/2026',
    benchmarkSource: 'BCG — "Transformation Office Excellence 2025"',
    suggestedAction:
      'Definir charter formal do Transformation Office com mandato, poderes de priorizacao, rituais de governanca mensais e KPIs de saude da transformacao.',
    status: 'new',
    type: 'strategic',
    pillar: 'organizacao',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. INICIATIVAS — sampleInitiatives
// ─────────────────────────────────────────────────────────────────────────────

export const sampleInitiatives: Initiative[] = [
  // ── ONDA 1: ESTABILIZAR (0–6 meses) ──────────────────────────────────────
  {
    id: 'init1',
    name: 'Data Lake MVP — Camada de Dados Unificada',
    description:
      'Implantar um Data Lake minimo viavel na nuvem (AWS S3 + Glue) para consolidar os dados das 17 bases analiticas dispersas, eliminar os arquivos FTP criticos e criar uma fonte unica de verdade para os KPIs operacionais e financeiros.',
    pillar: 'sistemas',
    wave: 'stabilize',
    effort: 'M',
    impact: 85,
    responsible: 'Diretora de TI + Analista Senior Stoken',
    dependencies: [],
    status: 'proposed',
    startMonth: 1,
    durationMonths: 4,
  },
  {
    id: 'init2',
    name: 'S&OP Digital — Planejamento Integrado',
    description:
      'Implantar ferramenta de S&OP (SAP IBP ou Kinaxis) conectando Vendas, Producao e Financeiro em um unico processo mensal com dados em tempo real. Incluir modulo de demand sensing com ML para reduzir erro de previsao de 34% para abaixo de 18%.',
    pillar: 'processos',
    wave: 'stabilize',
    effort: 'M',
    impact: 90,
    responsible: 'Gerente de S&OP + PMO Senior Stoken',
    dependencies: ['init1'],
    status: 'proposed',
    startMonth: 2,
    durationMonths: 5,
  },
  {
    id: 'init3',
    name: 'Automacao Quick Wins — Expansao Vexia',
    description:
      'Expandir o piloto de automacao Vexia das linhas de Americana para as plantas de Juiz de Fora e Blumenau, focando em reducao de setup time e manutencao preditiva. Meta: OEE de 67% para 73% nas tres plantas ate o mes 6.',
    pillar: 'operacoes',
    wave: 'stabilize',
    effort: 'P',
    impact: 80,
    responsible: 'Diretor de Operacoes + Coordenador Vexia',
    dependencies: [],
    status: 'proposed',
    startMonth: 1,
    durationMonths: 6,
  },

  // ── ONDA 2: OTIMIZAR (6–18 meses) ────────────────────────────────────────
  {
    id: 'init4',
    name: 'MES Industrial — Gestao de Producao em Tempo Real',
    description:
      'Implantar sistema MES (Manufacturing Execution System) integrado nas quatro plantas para monitoramento de OEE em tempo real, rastreabilidade de producao lote a lote e gestao automatizada de ordens de producao. Eliminar os dashboards em Excel da operacao.',
    pillar: 'operacoes',
    wave: 'optimize',
    effort: 'G',
    impact: 95,
    responsible: 'Diretor de Operacoes + TI',
    dependencies: ['init1', 'init3'],
    status: 'proposed',
    startMonth: 7,
    durationMonths: 10,
  },
  {
    id: 'init5',
    name: 'Integracao ERP — Migracao para S/4HANA',
    description:
      'Executar a migracao do SAP R/3 4.6C para S/4HANA, eliminando o risco de descontinuidade do ERP atual. O projeto inclui revisao de processos (fit-gap), migracao de dados, integracao com o Data Lake e treinamento dos 320 usuarios-chave.',
    pillar: 'sistemas',
    wave: 'optimize',
    effort: 'G',
    impact: 100,
    responsible: 'Diretora de TI + Integradora SAP',
    dependencies: ['init1'],
    status: 'proposed',
    startMonth: 6,
    durationMonths: 12,
  },
  {
    id: 'init6',
    name: 'Centro de Excelencia Digital (CoE)',
    description:
      'Criar o Centro de Excelencia Digital como nucleo permanente de gestao da transformacao: metodologia de priorizacao de iniciativas, gestao de portfolio digital, capacitacao continua das equipes e curadoria de tecnologias emergentes aplicaveis ao negocio textil.',
    pillar: 'organizacao',
    wave: 'optimize',
    effort: 'M',
    impact: 70,
    responsible: 'Transformation Office + Head de RH',
    dependencies: ['init1', 'init2'],
    status: 'proposed',
    startMonth: 8,
    durationMonths: 6,
  },

  // ── ONDA 3: TRANSFORMAR (18–36 meses) ────────────────────────────────────
  {
    id: 'init7',
    name: 'IA Preditiva — Qualidade e Demanda',
    description:
      'Desenvolver modelos de IA para predicao de defeitos de qualidade no processo de tecelagem (visao computacional) e forecasting avancado de demanda integrando dados de sell-through, tendencias de moda e variaveis macroeconomicas. Alvo: reducao de 50% nos defeitos de primeira qualidade e MAPE de demanda abaixo de 12%.',
    pillar: 'sistemas',
    wave: 'transform',
    effort: 'G',
    impact: 90,
    responsible: 'CoE Digital + Parceiro de IA',
    dependencies: ['init1', 'init4', 'init5'],
    status: 'proposed',
    startMonth: 19,
    durationMonths: 12,
  },
  {
    id: 'init8',
    name: 'Digital Twin das Plantas Industriais',
    description:
      'Criar gemeos digitais das quatro plantas industriais para simulacao de cenarios de producao, otimizacao de layout, planejamento de CAPEX e treinamento imersivo de operadores. Baseado nos dados do MES e sensores IoT instalados na onda anterior.',
    pillar: 'roadmap',
    wave: 'transform',
    effort: 'G',
    impact: 85,
    responsible: 'Diretor de Operacoes + CoE Digital',
    dependencies: ['init4', 'init5', 'init7'],
    status: 'proposed',
    startMonth: 22,
    durationMonths: 14,
  },
  {
    id: 'init9',
    name: 'Plataforma de Dados Unificada — Data Mesh',
    description:
      'Evoluir o Data Lake MVP para uma arquitetura de Data Mesh com dominios de dados por area de negocio, self-service analytics para gestores e dados abertos para parceiros e clientes estrategicos. Habilitar o modelo de negocio de "Santista como plataforma" para o ecossistema textil.',
    pillar: 'sistemas',
    wave: 'transform',
    effort: 'G',
    impact: 80,
    responsible: 'Diretora de TI + CoE Digital',
    dependencies: ['init1', 'init5', 'init6'],
    status: 'proposed',
    startMonth: 20,
    durationMonths: 16,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. BENCHMARK — sampleBenchmark
// ─────────────────────────────────────────────────────────────────────────────

export const sampleBenchmark: BenchmarkData = {
  companyScore: 38,
  sectorAverage: 52,
  topQuartile: 74,
  byPillar: [
    {
      pillar: 'processos',
      company: 32,
      sector: 50,
      topQuartile: 72,
    },
    {
      pillar: 'sistemas',
      company: 28,
      sector: 48,
      topQuartile: 76,
    },
    {
      pillar: 'operacoes',
      company: 45,
      sector: 55,
      topQuartile: 78,
    },
    {
      pillar: 'organizacao',
      company: 42,
      sector: 53,
      topQuartile: 70,
    },
    {
      pillar: 'roadmap',
      company: 35,
      sector: 50,
      topQuartile: 72,
    },
  ],
  references: [
    'ABIT — Relatorio de Maturidade Digital na Industria Textil Brasileira 2025',
    'McKinsey Apparel & Textile Digital Maturity Index 2025',
    'Gartner Manufacturing Excellence Benchmark 2025',
    'ILOS — Benchmarking de Operacoes na Industria de Confeccao 2025',
    'Forrester Digital Transformation in Hard Goods Manufacturing 2025',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. KPIs — sampleKPIs
// ─────────────────────────────────────────────────────────────────────────────

export const sampleKPIs: KPI[] = [
  // ── Processos & Governanca ────────────────────────────────────────────────
  {
    id: 'kpi1',
    pillar: 'processos',
    name: 'Erro de Previsao de Demanda (MAPE)',
    description:
      'Mean Absolute Percentage Error do processo de forecasting mensal de demanda por SKU.',
    currentBaseline: '34%',
    target: '15%',
    unit: '%',
    timeframe: '18 meses',
  },
  {
    id: 'kpi2',
    pillar: 'processos',
    name: 'Giro de Estoque de Produto Acabado',
    description: 'Dias de cobertura do estoque de produto acabado em relacao a venda media diaria.',
    currentBaseline: '68 dias',
    target: '45 dias',
    unit: 'dias',
    timeframe: '12 meses',
  },

  // ── Sistemas & Dados ──────────────────────────────────────────────────────
  {
    id: 'kpi3',
    pillar: 'sistemas',
    name: 'Disponibilidade dos Sistemas Criticos (SLA)',
    description:
      'Percentual de disponibilidade mensal dos sistemas criticos (ERP, MES, WMS) medido em janela 24x7.',
    currentBaseline: '94,2%',
    target: '99,5%',
    unit: '%',
    timeframe: '12 meses',
  },
  {
    id: 'kpi4',
    pillar: 'sistemas',
    name: 'Reducao do Portfolio de Sistemas',
    description:
      'Numero de sistemas em producao apos consolidacao — meta de reducao de 39 para 18 sistemas.',
    currentBaseline: '39 sistemas',
    target: '18 sistemas',
    unit: 'sistemas',
    timeframe: '36 meses',
  },

  // ── Operacoes & Eficiencia ────────────────────────────────────────────────
  {
    id: 'kpi5',
    pillar: 'operacoes',
    name: 'OEE — Overall Equipment Effectiveness',
    description:
      'Eficiencia global de equipamentos calculada como produto de Disponibilidade x Performance x Qualidade, media das quatro plantas.',
    currentBaseline: '67%',
    target: '82%',
    unit: '%',
    timeframe: '18 meses',
  },
  {
    id: 'kpi6',
    pillar: 'operacoes',
    name: 'Produtividade por Funcionario',
    description:
      'Volume de tecido produzido (em km) por funcionario ao ano, media das quatro plantas.',
    currentBaseline: '34 km/func/ano',
    target: '40 km/func/ano',
    unit: 'km/func/ano',
    timeframe: '24 meses',
  },

  // ── Organizacao & Capacidade ──────────────────────────────────────────────
  {
    id: 'kpi7',
    pillar: 'organizacao',
    name: 'Indice de Capacitacao Digital dos Gestores',
    description:
      'Percentual de gestores (N-1 e N-2 do board) com certificacao minima em literacia digital e gestao de dados.',
    currentBaseline: '12%',
    target: '75%',
    unit: '%',
    timeframe: '18 meses',
  },
  {
    id: 'kpi8',
    pillar: 'organizacao',
    name: 'Turnover de Profissionais de TI e Dados',
    description:
      'Taxa de rotatividade anual do time de Tecnologia e Dados, incluindo analistas, engenheiros e arquitetos.',
    currentBaseline: '28%',
    target: '15%',
    unit: '%',
    timeframe: '12 meses',
  },

  // ── Roadmap de Transformacao ──────────────────────────────────────────────
  {
    id: 'kpi9',
    pillar: 'roadmap',
    name: 'Iniciativas de Transformacao On-Track',
    description:
      'Percentual das iniciativas do roadmap com status "no prazo" e "no orcamento" no monitoramento mensal do Transformation Office.',
    currentBaseline: 'N/A (baseline a definir no kick-off)',
    target: '80%',
    unit: '%',
    timeframe: '6 meses pos-aprovacao',
  },
  {
    id: 'kpi10',
    pillar: 'roadmap',
    name: 'ROI Acumulado das Iniciativas (Onda 1)',
    description:
      'Retorno financeiro acumulado das iniciativas da Onda Estabilizar ao final do mes 6, em relacao ao investimento total aprovado para essa onda.',
    currentBaseline: 'R$ 0 (pre-execucao)',
    target: 'R$ 45M (ROI 1,8x sobre investimento de R$ 25M)',
    unit: 'R$ M',
    timeframe: '6 meses',
  },
];
