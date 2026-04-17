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

O Assessment Estrategico contratado junto a Stoken Advisory tem como escopo mapear os cinco pilares de maturidade (Processos & Governanca, Sistemas & Dados, Operacoes & Eficiencia, Organizacao & Capacidade e Roadmap de Transformacao), identificar gaps criticos, quantificar o potencial de ganho e entregar um roadmap priorizando iniciativas nas tres ondas: Estabilizar (0–6 meses), Otimizar (6–18 meses) e Transformar (18–36 meses).

Em abril de 2025, a Deloitte entregou o Plano Diretor de Digitalizacao e Industria 4.0 para a Santista, resultado de um trabalho extensivo que incluiu 46+ entrevistas distribuidas entre Financeiro (4), Comercial (11), Fabril (10), Industrial (3), Supply Chain (10), Gente e Gestao (1), TI (3), Corporativa (3) e Juridico (1). Duas plantas foram visitadas presencialmente — Americana e Tatui — entre 28 e 31 de janeiro de 2025, resultando em mapeamento de 32 sistemas classificados conforme o modelo ISA-95.

O principal achado da Deloitte foi o gap critico na camada ISA-95 Nivel 3: ausencia completa de MES (Manufacturing Execution System), PIMS (Process Information Management System) e LIMS (Laboratory Information Management System). Essa lacuna faz com que dados de processo sejam coletados manualmente em mais de 40 formularios de papel, transcritos para Excel, e cheguem a gestao com dias de atraso. O sistema ERP PeopleSoft tem possibilidade de descontinuidade no Brasil em 2027, e o sistema Intex — que tenta ser simultaneamente ERP e MES textil — esta 20 versoes desatualizado. O gasto energetico da empresa e de R$ 70M/ano, com potencial de reducao de 10% mediante gestao inteligente de energia.`,

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
    {
      id: 'd3',
      name: 'Entregavel Deloitte — Entendimento Inicial As-Is',
      type: 'data',
      uploadedAt: '2025-04-15',
      size: '18.4 MB',
    },
    {
      id: 'd4',
      name: 'Mapeamento de Variaveis Criticas (Deloitte)',
      type: 'data',
      uploadedAt: '2025-04-15',
      size: '3.2 MB',
    },
    {
      id: 'd5',
      name: 'Fluxo de Processos Americana e Tatui',
      type: 'data',
      uploadedAt: '2025-02-10',
      size: '5.8 MB',
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

  // ── ENTREVISTAS DELOITTE — Visitas Americana e Tatui (Jan/2025) ───────────

  {
    id: 'i6',
    intervieweeName: 'Ibsen Borges Filho',
    role: 'Diretor Industrial',
    area: 'Diretoria Industrial',
    level: 'c-level',
    pillar: 'operacoes',
    date: '2025-01-29',
    status: 'analyzed',
    readyForAI: true,
    tags: ['ISA-95', 'MES', 'PIMS', 'automacao', 'produtividade', 'Industria 4.0'],
    aiInsights: {
      summary:
        'Ibsen apresentou uma visao clara dos gaps de automacao e sistemas industriais. A ausencia de MES/PIMS e o principal gargalo para a evolucao da produtividade. O sistema BMS opera em modo somente leitura, sem capacidade de escrita nas maquinas, e o Intex esta 20 versoes atrasado, comprometendo a gestao da producao.',
      keyFindings: [
        'Gap critico ISA-95 Nivel 3: ausencia total de MES, PIMS e LIMS entre o chao de fabrica (Nivel 2) e o ERP (Nivel 4)',
        'Sistema BMS opera em modo read-only — consegue ler dados das maquinas mas nao consegue enviar comandos de volta, limitando a automacao',
        'Intex esta 20 versoes desatualizado, acumulando funcoes de ERP e MES sem cumprir adequadamente nenhuma delas',
        'Meta de produtividade de 40 km/per capita ate 2027 depende de conectividade de maquinas e coleta automatica de dados',
        'OEE atual e baixo e sem medicao automatizada — calculo depende de apontamentos manuais com horas de atraso',
        'Conectividade das maquinas e limitada: PLCs antigos sem protocolo padrao, sensores analogicos e falta de rede industrial',
      ],
      tags: ['ISA-95', 'MES', 'PIMS', 'BMS', 'Intex', 'OEE', 'automacao', 'Industria 4.0'],
      sentiment: 'negative',
      maturityIndicators: [
        'ISA-95 Nivel 3 inexistente — funcionalidades de MES/PIMS/LIMS ausentes ou em papel/Excel',
        'Automacao industrial em estagio basico — PLCs isolados sem conectividade com camada de gestao',
        'BMS limitado a leitura de dados, sem capacidade de controle ou escrita nas maquinas',
        'Sistema Intex 20 versoes atrasado — interface obsoleta e funcionalidades subutilizadas',
        'Apontamentos de producao manuais com latencia de horas, inviabilizando gestao em tempo real',
      ],
    },
    transcript: `ENTREVISTADOR: Ibsen, obrigado por nos receber na planta de Americana. Gostriamos de entender sua visao sobre os desafios de automacao e sistemas industriais da Santista.

IBSEN BORGES FILHO: Obrigado pela visita. Olha, o cenario e desafiador. Quando a gente olha o modelo ISA-95, que e a referencia mundial para integracao de sistemas industriais, a Santista tem um buraco enorme no Nivel 3. Nos temos o chao de fabrica la embaixo com PLCs e sensores — Nivel 0, 1 e 2 — e temos o ERP la em cima no Nivel 4. Mas no meio, onde deveria ter MES, PIMS, LIMS, nao tem nada. E como se faltasse o andar inteiro de um predio. O resultado e que os dados de processo sao coletados na mao, em formulario de papel, e digitados em planilhas. Isso nao e Industria 4.0, isso e Industria 1.5.

ENTREVISTADOR: E o sistema BMS que voces utilizam? Ele nao cobre parte dessa lacuna?

IBSEN BORGES FILHO: O BMS e uma ferramenta limitada. Ele consegue ler dados das maquinas — temperatura, pressao, velocidade — mas e somente leitura. Nao consegue escrever de volta na maquina. Entao se eu detecto um desvio, eu nao consigo corrigir automaticamente. Preciso que um operador va ate a maquina e faca o ajuste manual. Isso e inaceitavel para quem quer chegar a 40 km por capita ate 2027. E o Intex, que deveria ser o nosso MES textil, esta 20 versoes atrasado. A interface e dos anos 2000, os usuarios resistem a usar, e os apontamentos que entram tem baixa qualidade. O Intex tenta ser ERP e MES ao mesmo tempo e nao faz bem nenhum dos dois.

ENTREVISTADOR: Qual e a sua prioridade para resolver esses gaps?

IBSEN BORGES FILHO: Primeiro, precisamos de um PIMS para historizar os dados de processo em tempo real. Isso e a fundacao. Sem dado bom, nao tem analytics, nao tem OEE confiavel, nao tem nada. Depois, um MES que integre com o PIMS e com o ERP para gestao de ordens, rastreabilidade e qualidade. E por fim, conectar as maquinas — muitos PLCs sao antigos e nao tem protocolo padrao. Precisamos de gateways e padronizacao de comunicacao. Sem isso, a meta de produtividade de 40 km/per capita e inatingivel.`,
  },

  {
    id: 'i7',
    intervieweeName: 'Adilson Ferrari',
    role: 'Gerente de Manutencao e Automacao',
    area: 'Manutencao e Engenharia',
    level: 'gerencia',
    pillar: 'operacoes',
    date: '2025-01-28',
    status: 'analyzed',
    readyForAI: true,
    tags: ['manutencao', 'Engeman', 'automacao', 'PLC', 'cyberseguranca', 'preditiva'],
    aiInsights: {
      summary:
        'Adilson revelou um cenario de manutencao predominantemente reativa com o sistema Engeman limitado a gestao de ordens de servico, sem modulo de custos ou integracao com sistemas de processo. A automacao esta restrita a 2 recursos tecnicos para toda a planta, e a cyberseguranca OT e praticamente inexistente.',
      keyFindings: [
        'Engeman utilizado apenas para gestao de ordens de servico — sem modulo de custos, sem integracao com sistemas de processo ou ERP',
        'Rondas de inspecao sao 100% manuais com prancheta e papel, sem uso de dispositivos moveis ou sensores',
        'Nao existe programa de manutencao preditiva — toda a manutencao e corretiva ou preventiva baseada em calendario',
        'Apenas 2 recursos de automacao para toda a planta — PLC acesso restrito, dependencia critica de pessoas',
        'Cobertura Wi-Fi do processo e parcial, impossibilitando uso de dispositivos moveis no chao de fabrica',
        'Cyberseguranca OT e inexistente — sem segmentacao de rede TI/OT, dados transferidos via pen-drive entre maquinas',
      ],
      tags: ['Engeman', 'manutencao reativa', 'automacao', 'PLC', 'cyberseguranca OT', 'Wi-Fi'],
      sentiment: 'negative',
      maturityIndicators: [
        'Manutencao no estagio reativo/preventivo basico — sem analytics preditivo ou prescritivo',
        'Engeman como sistema isolado sem integracao com ERP, PIMS ou MES',
        'Automacao com apenas 2 recursos tecnicos — risco critico de dependencia de pessoas',
        'Infraestrutura de rede industrial insuficiente — Wi-Fi parcial e sem segmentacao TI/OT',
        'Transferencia de dados via pen-drive — risco de cyberseguranca e contaminacao por malware',
      ],
    },
    transcript: `ENTREVISTADOR: Adilson, como funciona a gestao de manutencao e automacao hoje na planta de Americana?

ADILSON FERRARI: A gente usa o Engeman como sistema de manutencao, mas ele e bem limitado no nosso contexto. Basicamente serve para abrir e fechar ordem de servico e controlar o calendario de preventiva. Nao tem modulo de custos integrado — a gente nao sabe quanto gasta por equipamento, por linha ou por tipo de falha. Nao tem integracao com o ERP pra material de reposicao, entao o almoxarifado de pecas e controlado em paralelo numa planilha. E nao tem integracao com nenhum sistema de processo — se uma maquina parou, o Engeman nao sabe automaticamente, alguem tem que ir la e registrar.

ENTREVISTADOR: E sobre as rondas de inspecao e manutencao preventiva?

ADILSON FERRARI: As rondas sao feitas com prancheta e formulario impresso. O mecanico vai ate o equipamento, anota temperatura, vibracao percebida, ruido, estado visual, e depois alguem digita isso no sistema. Nao temos nenhum sensor online para monitoramento continuo. Nao temos analytics preditivo — nenhum modelo que me diga "essa maquina vai falhar em 72 horas". Tudo e baseado em calendario ou na experiencia do mecanico. Quando eu falo que precisamos de preditiva, o pessoal concorda, mas nao temos infraestrutura de dados para isso.

ENTREVISTADOR: Como esta a situacao da automacao e da cyberseguranca?

ADILSON FERRARI: A automacao e um ponto critico. Eu tenho 2 pessoas de automacao para toda a planta. Sao eles que acessam os PLCs, fazem ajustes, fazem backup de programas. Se esses dois saem, a planta fica sem capacidade de intervir na automacao. O acesso aos PLCs e restrito a essas 2 pessoas por seguranca, mas tambem por falta de gente qualificada. Sobre cyberseguranca, sinceramente, e preocupante. Nao tem segmentacao entre a rede de TI e a rede de automacao. Dados de processo sao transferidos de maquinas para a rede via pen-drive — isso e um risco enorme de malware. A cobertura Wi-Fi no processo e parcial, entao o pessoal usa pen-drive porque nao tem outra opcao. Precisamos urgentemente de uma estrategia de cyberseguranca OT antes que aconteca um incidente.`,
  },

  {
    id: 'i8',
    intervieweeName: 'Caio Cardoso Campiotto',
    role: 'Gerente de Excelencia Operacional',
    area: 'Excelencia Operacional',
    level: 'gerencia',
    pillar: 'processos',
    date: '2025-01-29',
    status: 'analyzed',
    readyForAI: true,
    tags: ['standards', 'Excel', 'KPIs', 'SIDD', 'dados manuais', 'variabilidade'],
    aiInsights: {
      summary:
        'Caio descreveu um cenario de gestao de performance baseado em Excel e dados manuais, com mais de 200 KPIs no sistema CID sendo desmembrados em 2000 indicadores sem governanca clara. A coleta de dados para standards e manual e a producao consistentemente fica 10% abaixo do plano, sem ferramentas de controle estatistico de processo.',
      keyFindings: [
        'Mais de 200 KPIs no sistema CID sendo desmembrados em cerca de 2000 indicadores — excesso de metricas sem governanca clara',
        'Coleta de dados para definicao de standards e 100% manual, baseada em cronometragem no chao de fabrica',
        'Existem 4 fichas tecnicas diferentes entre BDI, Intex, PeopleSoft e Standard Industrial — sem fonte unica de verdade',
        'Producao consistentemente 10% abaixo do plano — sem ferramenta de analise de causa raiz automatizada',
        'Nao existe controle estatistico de processo (SPC) — variabilidade e detectada apenas por inspeccao visual ou reclamacao do cliente',
        'Excel e a ferramenta dominante para toda a gestao de excelencia operacional, incluindo analises de produtividade e qualidade',
      ],
      tags: ['KPIs', 'CID', 'standards', 'Excel', 'SPC', 'ficha tecnica', 'variabilidade'],
      sentiment: 'negative',
      maturityIndicators: [
        'Gestao de KPIs sem governanca — 200 indicadores proliferando para 2000 sem priorizacao',
        'Coleta de dados para standards manual — cronometragem no chao de fabrica sem automacao',
        '4 fichas tecnicas concorrentes — ausencia de Master Data Management para dados de produto',
        'Ausencia de SPC — controle de qualidade reativo e nao preventivo',
        'Excel como plataforma principal de analytics — sem BI integrado ou dashboards automatizados',
      ],
    },
    transcript: `ENTREVISTADOR: Caio, como funciona o processo de excelencia operacional e gestao de standards na Santista hoje?

CAIO CARDOSO CAMPIOTTO: A excelencia operacional aqui e um trabalho de formiguinha. Nos temos mais de 200 KPIs cadastrados no sistema CID, e na pratica eles se desdobram em quase 2000 indicadores quando voce olha por maquina, por turno, por artigo. O problema e que nao tem governanca clara sobre o que realmente importa. Todo mundo olha o seu indicador favorito e ninguem tem a visao integrada. A coleta de dados para definicao de standards — tempo de setup, velocidade de tear, rendimento de tingimento — e feita manualmente, com cronometro e prancheta no chao de fabrica. E um processo caro, demorado e que fica defasado rapidamente.

ENTREVISTADOR: Voce mencionou fichas tecnicas. Como funciona a gestao de dados de produto?

CAIO CARDOSO CAMPIOTTO: Esse e um dos maiores problemas que eu enfrento. Nos temos 4 fichas tecnicas diferentes. A ficha do BDI, a ficha do Intex, a ficha do PeopleSoft e o Standard Industrial. Cada uma com dados ligeiramente diferentes, mantidas por equipes diferentes, sem sincronizacao. Quando eu preciso do dado correto de consumo de fio para um artigo, eu tenho que consultar as 4 fichas e cruzar manualmente. Isso e absurdo para uma empresa do porte da Santista. Precisamos de uma ficha tecnica unica, digital, integrada com o MES e o ERP.

ENTREVISTADOR: E sobre a aderencia ao plano de producao e controle de variabilidade?

CAIO CARDOSO CAMPIOTTO: A producao fica consistentemente uns 10% abaixo do plano. E quando eu vou investigar por que, nao tenho ferramenta de analise de causa raiz automatizada. E tudo manual — eu pego os dados do Intex, exporto para Excel, cruzo com os apontamentos de parada, e tento montar uma historia. Demora dias para ter uma analise que deveria ser instantanea. E sobre controle estatistico de processo, simplesmente nao existe. Nos nao temos SPC. A variabilidade e detectada quando o tecido ja saiu da maquina — as vezes dias depois, na inspecao final. Ou pior, pelo cliente. Isso e inaceitavel numa operacao que quer ser de classe mundial.`,
  },

  {
    id: 'i9',
    intervieweeName: 'Rodrigo Nogaroto',
    role: 'Gerente de Producao Tinturaria-Acabamento',
    area: 'Tinturaria e Acabamento',
    level: 'gerencia',
    pillar: 'operacoes',
    date: '2025-01-28',
    status: 'analyzed',
    readyForAI: true,
    tags: ['tinturaria', 'acabamento', 'qualidade', 'apontamento manual', 'Intex', 'papel'],
    aiInsights: {
      summary:
        'Rodrigo revelou problemas criticos de qualidade e rastreabilidade na tinturaria e acabamento: defeitos detectados com 25 dias de atraso, diferencas de rendimento de 15% entre turnos sem explicacao clara, coleta de dados inteiramente em papel e transferencia de dados via pen-drive representando risco de seguranca.',
      keyFindings: [
        'Defeitos de qualidade detectados com ate 25 dias de atraso — inspecao visual manual ao final do processo',
        'Diferenca de rendimento de 15% entre turnos: 85% no turno noturno vs 65% no turno diurno, possivelmente relacionada a controle climatico',
        'Coleta de dados 100% em papel com formularios impressos — transcricao posterior para Excel e Intex',
        'Transferencia de dados entre maquinas e rede feita via pen-drive — risco grave de cyberseguranca',
        'Sem rastreabilidade automatizada de lotes — impossivel correlacionar defeito com parametros de processo',
        'Desvios de qualidade estimados em 5-10% da producao, sendo 60% atribuidos a processo e 40% a manutencao',
      ],
      tags: ['qualidade', 'tinturaria', 'acabamento', 'defeitos', 'pen-drive', 'apontamento manual'],
      sentiment: 'negative',
      maturityIndicators: [
        'Controle de qualidade reativo — deteccao de defeitos com 25 dias de atraso',
        'Coleta de dados em papel sem digitalizacao no ponto de captura',
        'Sem rastreabilidade automatizada de lotes na tinturaria e acabamento',
        'Variabilidade entre turnos de 15% sem ferramenta de analise de causa raiz',
        'Pen-drive como meio de transferencia de dados — ausencia de rede industrial adequada',
      ],
    },
    transcript: `ENTREVISTADOR: Rodrigo, como funciona o controle de qualidade e a coleta de dados na tinturaria e acabamento?

RODRIGO NOGAROTO: O controle de qualidade aqui e um desafio diario. A inspecao e visual, feita por operadores no final do processo. O problema e que entre o momento que o defeito acontece — la no tingimento ou no acabamento — e o momento que ele e detectado na inspecao final, podem se passar ate 25 dias. Vinte e cinco dias. Nesse tempo, voce ja produziu toneladas de tecido com o mesmo defeito sem saber. Nao temos nenhum sistema de deteccao em linha, nenhuma camera, nenhum sensor de qualidade automatico.

ENTREVISTADOR: E sobre a coleta de dados de processo? Como funciona no dia a dia?

RODRIGO NOGAROTO: Tudo em papel. O operador preenche formularios impressos a cada lote — temperatura, pressao, velocidade, produtos quimicos, tempos de processo. Depois, alguem pega esses formularios e digita no Intex ou numa planilha Excel. So que muitas vezes o dado chega incompleto, ilegivel ou com atraso. E o pior: a transferencia de dados de algumas maquinas mais modernas, que tem PLC com dados digitais, e feita via pen-drive. O operador espeta o pen-drive na maquina, copia o arquivo, e leva ate um computador da rede. Isso e um risco de seguranca enorme — qualquer virus no pen-drive pode contaminar tanto a maquina quanto a rede.

ENTREVISTADOR: Voce mencionou diferenca de rendimento entre turnos. Pode detalhar?

RODRIGO NOGAROTO: Sim, isso e algo que me intriga. O turno da noite tem um rendimento de aproximadamente 85%, enquanto o turno do dia fica em torno de 65%. Uma diferenca de 15 pontos percentuais. A minha hipotese e que tem relacao com o controle climatico — temperatura e umidade do ar influenciam muito o tingimento e o acabamento. A noite e mais frio e umido, e aparentemente isso beneficia o processo. Mas eu nao tenho dados para provar porque nao temos sensores ambientais integrados. E tudo empirico, baseado na experiencia dos mestres de turno. Nos estimamos que entre 5 e 10% da producao tem algum desvio de qualidade, sendo que 60% dos defeitos sao de processo e 40% sao de manutencao — maquina desregulada, rolo danificado, coisas assim.`,
  },

  {
    id: 'i10',
    intervieweeName: 'Vanessa Bellote',
    role: 'Gerente de PCP e Expedicao',
    area: 'PCP e Expedicao (Tatui)',
    level: 'gerencia',
    pillar: 'processos',
    date: '2025-01-31',
    status: 'analyzed',
    readyForAI: true,
    tags: ['PCP', 'expedicao', 'planejamento', 'estoque', 'Intex', 'custo'],
    aiInsights: {
      summary:
        'Vanessa descreveu um processo de planejamento de producao quase inteiramente em Excel devido a lentidao e limitacoes do Intex. O calculo de custos demora 20-25 dias para 1500 SKUs, e a visibilidade de estoque entre plantas e precaria, gerando decisoes de expedição sub-otimas.',
      keyFindings: [
        'Planejamento de producao feito em Excel porque o Intex e lento demais para simulacoes e reprogramacoes',
        'Calculo de custos leva 20-25 dias para processar 1500 SKUs — totalmente manual com coleta de dados de multiplas areas',
        'Falta de visibilidade de estoque em tempo real entre as plantas — decisoes de expedicao baseadas em dados defasados',
        'Intex possui funcionalidades de PCP mas a lentidao e interface obsoleta fazem com que os usuarios prefiram Excel',
        'Acuracidade de estoque comprometida — diferencas frequentes entre estoque fisico e sistema',
      ],
      tags: ['PCP', 'planejamento', 'Excel', 'Intex', 'custeio', 'estoque', 'expedicao'],
      sentiment: 'negative',
      maturityIndicators: [
        'Planejamento de producao em Excel — sistema Intex subutilizado por lentidao',
        'Custeio manual levando 20-25 dias — sem integracao automatica de dados de consumo',
        'Visibilidade de estoque entre plantas deficiente — sem consolidacao em tempo real',
        'Acuracidade de estoque baixa — divergencias frequentes entre fisico e sistema',
      ],
    },
    transcript: `ENTREVISTADOR: Vanessa, como funciona o planejamento de producao e a gestao de expedicao aqui em Tatui?

VANESSA BELLOTE: O planejamento de producao deveria ser feito no Intex, que tem modulo de PCP. Mas na pratica, a gente faz tudo em Excel. O motivo e simples: o Intex e muito lento. Quando eu preciso reprogramar uma ordem ou simular um cenario alternativo, o sistema demora minutos para responder. No Excel eu faco em segundos. Entao o Plano Mestre de Producao e montado em planilha, e depois a gente "empurra" as ordens para o Intex para execucao. E um retrabalho absurdo, porque eu mantenho dois controles paralelos. Mas nao tenho alternativa enquanto o sistema nao for atualizado.

ENTREVISTADOR: E sobre o processo de custeio? Como funciona?

VANESSA BELLOTE: O custeio e um processo doloroso. Para calcular o custo de 1500 SKUs, a equipe precisa coletar dados de multiplas areas — consumo de materia-prima, tempos de maquina, energia, mao de obra, produtos quimicos. Esses dados vem de fontes diferentes: Intex, PeopleSoft, planilhas dos gestores de area. Juntar tudo, conciliar e calcular leva entre 20 e 25 dias. Sao 2 pessoas dedicadas a isso. E quando termina, ja esta desatualizado porque os precos de insumos mudaram. Nos precisamos de um sistema de custeio integrado que colete automaticamente os dados de consumo.

ENTREVISTADOR: E a gestao de estoques e expedicao?

VANESSA BELLOTE: A visibilidade de estoque e um problema serio. Eu nao consigo ver em tempo real o que tem em Americana, em Juiz de Fora ou em Blumenau. Quando o comercial vende algo que esta em outra planta, a gente descobre depois. A acuracidade do estoque tem problema tambem — frequentemente o estoque fisico nao bate com o sistema. Isso gera expedicoes erradas, devolvidas, e atraso no atendimento ao cliente. O Intex tem modulo de estoque, mas como os apontamentos de producao sao manuais e atrasados, o saldo do sistema nunca esta correto no momento da decisao.`,
  },

  {
    id: 'i11',
    intervieweeName: 'Adalberto',
    role: 'Gerente de Custos Industriais',
    area: 'Custos Industriais',
    level: 'gerencia',
    pillar: 'processos',
    date: '2025-01-29',
    status: 'analyzed',
    readyForAI: true,
    tags: ['custeio', 'Excel', 'custos', 'PeopleSoft', 'alocacao', 'SKU'],
    aiInsights: {
      summary:
        'Adalberto detalhou um processo de custeio industrial totalmente manual e fragmentado, dependente de coleta de dados de multiplas fontes desconectadas. O calculo de custos para 1500 SKUs leva 20-25 dias e a alocacao de custos entre as linhas JW e WW e imprecisa, comprometendo a rentabilidade por produto.',
      keyFindings: [
        'Calculo de custo de 1500 SKUs requer 20-25 dias de trabalho manual com 2 pessoas dedicadas',
        'Dados de custos coletados de fontes desconectadas: PeopleSoft (contabilidade), Intex (producao), planilhas de gestores (utilidades)',
        'Alocacao de custos entre linhas Jeanswear (JW) e Workwear (WW) e feita por rateio simplificado, nao por custeio ABC',
        'Nao existe sistema integrado de custeio — toda a analise e feita em planilhas Excel complexas',
        'Custos de energia, agua e utilidades sao alocados por volume de producao e nao por consumo real por area',
        'Impossibilidade de calcular margem por cliente ou por pedido — apenas por linha de produto agregada',
      ],
      tags: ['custeio', 'Excel', 'PeopleSoft', 'Intex', 'alocacao', 'margem', 'SKU'],
      sentiment: 'negative',
      maturityIndicators: [
        'Custeio manual em Excel sem sistema integrado — ciclo de 20-25 dias para 1500 SKUs',
        'Alocacao de custos por rateio simplificado — sem custeio ABC ou por atividade',
        'Dados de custos fragmentados entre PeopleSoft, Intex e planilhas sem integracao',
        'Impossibilidade de custeio por cliente ou pedido — visibilidade limitada a linha de produto',
        'Custos indiretos alocados por volume e nao por consumo real — distorcao de rentabilidade',
      ],
    },
    transcript: `ENTREVISTADOR: Adalberto, como funciona o processo de custeio industrial na Santista hoje?

ADALBERTO: O custeio aqui e um trabalho artesanal, infelizmente. Para calcular o custo dos nossos 1500 SKUs, eu preciso ir buscar informacao em varios lugares. O consumo de materia-prima vem do Intex, mas nem sempre esta atualizado porque os apontamentos de producao sao manuais. Os dados contabeis vem do PeopleSoft. Os custos de utilidades — energia, agua, biomassa, gas — vem de planilhas que os gestores de cada area me enviam por e-mail. Juntar tudo isso, conciliar, validar e calcular leva entre 20 e 25 dias. Eu tenho 2 pessoas na minha equipe dedicadas exclusivamente a esse processo todo mes.

ENTREVISTADOR: Como e feita a alocacao de custos entre as diferentes linhas de produto?

ADALBERTO: Ai esta outro problema. A Santista tem duas grandes linhas: Jeanswear e Workwear. Os custos diretos — fio, corante, produtos quimicos — a gente consegue alocar razoavelmente bem por linha. Mas os custos indiretos — energia, manutencao, depreciacao, overhead — sao alocados por um rateio simplificado baseado em volume de producao. Nao e custeio ABC, nao e custeio por atividade. E um rateio proporcional. Isso gera distorcoes. Um artigo de Workwear que usa muito acabamento quimico pode estar subsidiando um artigo de Jeanswear mais simples, e a gente nao sabe. Nao consigo dizer com precisao qual e a margem real de cada produto.

ENTREVISTADOR: Qual seria a solucao ideal do seu ponto de vista?

ADALBERTO: Eu precisaria de um sistema de custeio integrado que puxe automaticamente os dados de consumo do MES — quando existir um MES —, os dados contabeis do ERP, e os dados de utilidades de medidores digitais por area. Hoje os medidores de energia sao analogicos e a leitura e mensal. Se eu tivesse medidores digitais por area produtiva, eu conseguiria alocar o custo de energia de forma muito mais precisa. E com um sistema integrado, o calculo que leva 25 dias poderia ser feito em 2 ou 3 dias. Isso liberaria minha equipe para fazer analise de valor ao inves de ficar digitando dados em planilha.`,
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

  // ── INSIGHTS DELOITTE — Plano Diretor de Digitalizacao e Industria 4.0 ────

  {
    id: 'ins9',
    title: 'Ausencia completa de camada MES/PIMS/LIMS — gap critico ISA-95 Nivel 3',
    description:
      'A analise ISA-95 revela ausencia das camadas fundamentais de Nivel 3: sistema MES para gestao da manufatura, PIMS para historizacao de dados de processo e LIMS para gestao laboratorial. As funcionalidades que deveriam estar nesses sistemas estao distribuidas em planilhas Excel, registros manuais em papel e no sistema legado Intex, que esta 20 versoes desatualizado.',
    impact: 'Alto',
    estimatedValue: 'Habilitador de R$ 100M+ em ganhos de eficiencia operacional',
    origin: 'Deloitte — Entregavel Entendimento Inicial As-Is (Abril/2025)',
    benchmarkSource: 'ISA-95 Model — Niveis 0 a 4',
    suggestedAction:
      'Implantar PIMS como fundacao de dados, seguido de MES integrado e LIMS para gestao laboratorial.',
    status: 'validated',
    type: 'risk',
    pillar: 'sistemas',
  },
  {
    id: 'ins10',
    title: 'PeopleSoft ERP com risco de descontinuidade no Brasil em 2027',
    description:
      'O ERP Oracle PeopleSoft utilizado pela Santista tem possibilidade de descontinuidade na regiao Brasil e Argentina em 2027. O sistema nao possui modulo de manufatura integrado e opera sem integracao com a camada de Nivel 3 (Intex). A falta do modulo de manufatura no ERP e um gap estrutural que compromete a gestao integrada da producao.',
    impact: 'Alto',
    estimatedValue: 'Risco de paralisacao operacional e custo de migracao emergencial',
    origin: 'Deloitte — Landscape de Solucoes Existentes',
    benchmarkSource: 'Oracle — Product Lifecycle Roadmap 2025',
    suggestedAction:
      'Iniciar planejamento de migracao do ERP com prioridade ao modulo de manufatura.',
    status: 'validated',
    type: 'risk',
    pillar: 'sistemas',
  },
  {
    id: 'ins11',
    title: 'Intex com 20 versoes de atraso — funcionalidades MES e ERP subutilizadas',
    description:
      'O sistema Intex, que acumula funcionalidades tanto de ERP quanto de MES para a manufatura textil, esta 20 versoes desatualizado. Isso exige que o Plano Mestre de Producao seja feito em Excel. O sistema possui funcionalidades robustas de planejamento, sequenciamento, rastreabilidade e coleta de dados, mas a interface obsoleta e apontamentos de baixa qualidade geram resistencia dos usuarios.',
    impact: 'Alto',
    estimatedValue: 'R$ 15M/ano em ganhos de produtividade com atualizacao e adocao',
    origin: 'Deloitte — Analise ISA-95 do Intex',
    benchmarkSource: 'Datatex — Intex Funcionalidade ERP/MES Textil',
    suggestedAction:
      'Avaliar atualizacao do Intex ou substituicao por MES moderno com integracao ao novo ERP.',
    status: 'validated',
    type: 'risk',
    pillar: 'sistemas',
  },
  {
    id: 'ins12',
    title: 'Coleta de dados 90% manual — 40+ formularios em papel no chao de fabrica',
    description:
      'O mapeamento Deloitte identificou mais de 40 formularios de papel utilizados na producao (FO13811, FO13961, FO18259, etc.) para controle de engomagem, tingimento, caldeiras, tecelagem e acabamento. Esses apontamentos sao valiosos mas chegam com atraso, nao estao integrados a MES/PIMS, e geram retrabalho na transcricao para Excel e sistemas.',
    impact: 'Alto',
    estimatedValue: 'R$ 4M/ano em retrabalho de transcricao + riscos de erro',
    origin: 'Deloitte — Mapa de Apontamentos Manuais',
    benchmarkSource: 'ISA-95 — Coleta de Dados de Producao (Nivel 2-3)',
    suggestedAction:
      'Digitalizar formularios criticos com tablets/IoT e integrar ao PIMS/MES.',
    status: 'validated',
    type: 'quick_win',
    pillar: 'operacoes',
  },
  {
    id: 'ins13',
    title: 'Defeitos de qualidade detectados com 25 dias de atraso — perda de rastreabilidade',
    description:
      'Muitos problemas de qualidade do produto sao detectados tardiamente (~25 dias) por inspecao visual ao final do processo. Isso gera perdas, reprocessamentos e inviabiliza mecanismos como OEE em tempo real. A inspecao e controle de qualidade e totalmente manual e sem rastreabilidade. Desvios estimados de 5-10% na qualidade (60% processo, 40% manutencao).',
    impact: 'Alto',
    estimatedValue: 'R$ 12M/ano em perdas por defeitos e reprocessamento',
    origin: 'Deloitte — Visita Tecnica Americana/Tatui (Jan/2025)',
    benchmarkSource: 'ISA-95 — Gestao da Qualidade de Operacao',
    suggestedAction:
      'Implantar inspecao automatizada com visao computacional e SPC em tempo real integrado ao MES.',
    status: 'validated',
    type: 'opportunity',
    pillar: 'operacoes',
  },
  {
    id: 'ins14',
    title: 'Gasto energetico de R$ 70M/ano com potencial de reducao de 10%',
    description:
      'A Santista gasta aproximadamente R$ 70M/ano em energia (eletrica, biomassa, gas). Nao possui sistema de gerenciamento de consumo e demanda, com medicao analogica mensal manual. O sistema de controle de demanda CCK esta aparentemente desativado. Potencial de economia de R$ 2-3M/ano com gestao inteligente.',
    impact: 'Alto',
    estimatedValue: 'R$ 2-3M/ano em economia de energia',
    origin: 'Deloitte — Entrevistas com Executivos',
    benchmarkSource: 'ABESCO — Benchmarking de Eficiencia Energetica Industrial 2025',
    suggestedAction:
      'Implementar sistema de gerenciamento energetico (EMS) com medicao digital por area e controle de demanda automatizado.',
    status: 'validated',
    type: 'quick_win',
    pillar: 'operacoes',
  },
  {
    id: 'ins15',
    title: 'S&OP, custeio e planejamento 100% em Excel — risco de decisoes erradas',
    description:
      'O processo de S&OP e inteiramente realizado em planilhas Excel sem analise estatistica. O custeio requer 2 pessoas digitando 20-25 dias para 1500 SKUs. Existem 4 fichas tecnicas diferentes entre BDI, Intex, PeopleSoft e Standard Industrial. A producao nao consegue cumprir o plano, ficando ~10% abaixo da meta.',
    impact: 'Alto',
    estimatedValue: 'R$ 8M/ano em custo de ineficiencia + decisoes sub-otimas',
    origin: 'Deloitte — Diagnostico Corporativo e Visita Tecnica',
    benchmarkSource: 'Gartner — S&OP Maturity Model 2025',
    suggestedAction:
      'Implementar ferramenta sistemica de planning com modelos estatisticos embarcados e ficha tecnica unica.',
    status: 'validated',
    type: 'strategic',
    pillar: 'processos',
  },
  {
    id: 'ins16',
    title: 'Cyberseguranca OT e foco exclusivo de TI — sistemas industriais expostos',
    description:
      'As politicas e praticas de cyberseguranca sao voltadas principalmente para TI, com apenas controles basicos para automacao/OT. Dados transferidos via pen-drive entre maquinas e rede representam risco. A cobertura Wi-Fi do processo e parcial. Nao ha segmentacao adequada de rede entre TI e OT.',
    impact: 'Alto',
    estimatedValue: 'Risco de parada total — incalculavel',
    origin: 'Deloitte — Visita Tecnica Automacao',
    benchmarkSource: 'NIST Cybersecurity Framework — Manufacturing Profile',
    suggestedAction:
      'Implementar segmentacao de rede TI/OT, eliminar uso de pen-drives, expandir Wi-Fi industrial e criar politica de cyberseguranca OT.',
    status: 'validated',
    type: 'risk',
    pillar: 'sistemas',
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

  // ── INICIATIVAS DELOITTE — Plano Diretor de Digitalizacao e Industria 4.0 ─

  // WAVE 1 - STABILIZE
  {
    id: 'init10',
    name: 'Implantacao PIMS — Historiador de Dados de Processo',
    description:
      'Implementar sistema PIMS para gerenciamento e armazenamento historico de dados operacionais em tempo real, coletando dados de PLCs, sensores e instrumentacao existente. Fundacao para integracao com MES e analytics avancado.',
    pillar: 'sistemas',
    wave: 'stabilize',
    effort: 'M',
    impact: 90,
    responsible: 'Gerente de Automacao + TI',
    dependencies: [],
    status: 'proposed',
    startMonth: 1,
    durationMonths: 5,
  },
  {
    id: 'init11',
    name: 'Digitalizacao de Apontamentos — Tablets no Chao de Fabrica',
    description:
      'Substituir os 40+ formularios em papel por coleta digital via tablets industriais integrados ao PIMS. Prioridade: formularios de tingimento (FO18200, FO18272), acabamento (FO18273, FO18286) e caldeiras (FO18626, FO18632).',
    pillar: 'operacoes',
    wave: 'stabilize',
    effort: 'P',
    impact: 75,
    responsible: 'Excelencia Operacional + Automacao',
    dependencies: ['init10'],
    status: 'proposed',
    startMonth: 3,
    durationMonths: 4,
  },
  {
    id: 'init12',
    name: 'Gestao Energetica — EMS e Medicao Digital',
    description:
      'Implantar sistema de gerenciamento energetico (EMS) com medidores digitais por area produtiva, substituindo medicao analogica mensal. Reativar e modernizar sistema de controle de demanda CCK. Meta: reducao de 10% no gasto energetico (R$ 7M/ano de economia).',
    pillar: 'operacoes',
    wave: 'stabilize',
    effort: 'P',
    impact: 80,
    responsible: 'Manutencao + Utilidades',
    dependencies: [],
    status: 'proposed',
    startMonth: 2,
    durationMonths: 4,
  },
  {
    id: 'init13',
    name: 'Cyberseguranca OT — Segmentacao TI/OT e Eliminacao de Pen-Drives',
    description:
      'Implementar segmentacao de rede entre TI e OT conforme IEC 62443, eliminar transferencia de dados via pen-drive, expandir Wi-Fi industrial para cobertura completa do processo e criar politica de cyberseguranca OT.',
    pillar: 'sistemas',
    wave: 'stabilize',
    effort: 'M',
    impact: 85,
    responsible: 'TI + Automacao',
    dependencies: [],
    status: 'proposed',
    startMonth: 1,
    durationMonths: 6,
  },

  // WAVE 2 - OPTIMIZE
  {
    id: 'init14',
    name: 'MES Textil Integrado — ISA-95 Nivel 3 Completo',
    description:
      'Implantar MES completo cobrindo as 4 dimensoes ISA-95 Nivel 3: Gestao da Producao (GPO), Gestao da Qualidade (GQO), Gestao da Manutencao (GMO) e Gestao de Inventario (GIO). Integracao com PIMS, ERP e Engeman. Inclui APS para sequenciamento otimizado.',
    pillar: 'operacoes',
    wave: 'optimize',
    effort: 'G',
    impact: 100,
    responsible: 'Diretoria Industrial + TI',
    dependencies: ['init10', 'init11'],
    status: 'proposed',
    startMonth: 7,
    durationMonths: 12,
  },
  {
    id: 'init15',
    name: 'LIMS — Gestao Laboratorial Integrada',
    description:
      'Implementar sistema LIMS para gestao dos laboratorios de qualidade, com integracao ao MES e ERP. Automatizar planos de inspecao, registro de resultados, SPC e gestao de nao-conformidades. Reduzir o delay de deteccao de defeitos de 25 dias para tempo real.',
    pillar: 'operacoes',
    wave: 'optimize',
    effort: 'M',
    impact: 85,
    responsible: 'Qualidade + TI',
    dependencies: ['init14'],
    status: 'proposed',
    startMonth: 10,
    durationMonths: 6,
  },
  {
    id: 'init16',
    name: 'Ficha Tecnica Unica e PLM Digital',
    description:
      'Consolidar as 4 fichas tecnicas dispersas (BDI, Intex, PeopleSoft, Standard Industrial) em uma ficha tecnica unica digital. Implantar PLM para gestao do ciclo de vida do produto, simulacao de custos e integracao com MES para execucao.',
    pillar: 'processos',
    wave: 'optimize',
    effort: 'M',
    impact: 80,
    responsible: 'Desenvolvimento + TI + Custos',
    dependencies: ['init14'],
    status: 'proposed',
    startMonth: 8,
    durationMonths: 8,
  },

  // WAVE 3 - TRANSFORM
  {
    id: 'init17',
    name: 'Inspecao Automatica por Visao Computacional',
    description:
      'Implantar sistemas de inspecao automatica de tecidos usando cameras e IA para deteccao de defeitos em tempo real durante a producao, substituindo inspecao visual manual. Integracao com MES para bloqueio automatico de lotes fora de especificacao.',
    pillar: 'operacoes',
    wave: 'transform',
    effort: 'G',
    impact: 90,
    responsible: 'CoE Digital + Parceiro de Visao Computacional',
    dependencies: ['init14', 'init15'],
    status: 'proposed',
    startMonth: 20,
    durationMonths: 10,
  },
  {
    id: 'init18',
    name: 'Manutencao Preditiva com Analytics Avancado',
    description:
      'Implementar plataforma de manutencao preditiva integrando dados de vibracao, temperatura e processo do PIMS com modelos de ML para antecipacao de falhas. Prioridade: compressores, teares e caldeiras. Meta: reducao de 50% em paradas nao planejadas.',
    pillar: 'operacoes',
    wave: 'transform',
    effort: 'G',
    impact: 85,
    responsible: 'Manutencao + CoE Digital',
    dependencies: ['init10', 'init14'],
    status: 'proposed',
    startMonth: 19,
    durationMonths: 12,
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

  // ── KPIs DELOITTE — Plano Diretor de Digitalizacao e Industria 4.0 ────────

  {
    id: 'kpi11',
    pillar: 'operacoes',
    name: 'Formularios Digitalizados (%)',
    description:
      'Percentual dos 40+ formularios em papel substituidos por coleta digital via tablets/IoT.',
    currentBaseline: '0%',
    target: '100%',
    unit: '%',
    timeframe: '18 meses',
  },
  {
    id: 'kpi12',
    pillar: 'operacoes',
    name: 'Tempo de Deteccao de Defeitos de Qualidade',
    description:
      'Tempo medio entre a ocorrencia de um defeito de qualidade e sua deteccao pelo sistema.',
    currentBaseline: '25 dias',
    target: 'Tempo real (<1h)',
    unit: 'dias',
    timeframe: '24 meses',
  },
  {
    id: 'kpi13',
    pillar: 'operacoes',
    name: 'Custo Energetico por Metro de Tecido',
    description:
      'Custo de energia (eletrica + biomassa + gas) por metro linear de tecido produzido.',
    currentBaseline: 'R$ 70M/ano total (sem granularidade)',
    target: 'Reducao de 10% (R$ 7M/ano)',
    unit: 'R$/metro',
    timeframe: '12 meses',
  },
  {
    id: 'kpi14',
    pillar: 'sistemas',
    name: 'Cobertura ISA-95 Nivel 3',
    description:
      'Percentual das funcionalidades ISA-95 Nivel 3 (Producao, Qualidade, Manutencao, Inventario) cobertas por sistemas digitais vs. papel/Excel.',
    currentBaseline: '15% (apenas Intex parcial + BMS parcial)',
    target: '90%',
    unit: '%',
    timeframe: '36 meses',
  },
];
