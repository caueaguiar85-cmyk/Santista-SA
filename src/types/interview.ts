export type PillarType = 'processos' | 'sistemas' | 'operacoes' | 'organizacao' | 'roadmap';
export type HierarchyLevel = 'c-level' | 'gerencia' | 'operacional';
export type InterviewStatus = 'scheduled' | 'completed' | 'analyzed';

export const PILLAR_LABELS: Record<PillarType, string> = {
  processos: 'Processos & Governanca',
  sistemas: 'Sistemas & Dados',
  operacoes: 'Operacoes & Eficiencia',
  organizacao: 'Organizacao & Capacidade',
  roadmap: 'Roadmap de Transformacao',
};

export const PILLAR_COLORS: Record<PillarType, string> = {
  processos: 'var(--color-pilar-1)',
  sistemas: 'var(--color-pilar-2)',
  operacoes: 'var(--color-pilar-3)',
  organizacao: 'var(--color-pilar-4)',
  roadmap: 'var(--color-pilar-5)',
};

export const HIERARCHY_LABELS: Record<HierarchyLevel, string> = {
  'c-level': 'C-Level',
  'gerencia': 'Gerencia',
  'operacional': 'Operacional',
};

export interface AIInsights {
  summary: string;
  keyFindings: string[];
  tags: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  maturityIndicators: string[];
}

export interface Interview {
  id: string;
  interviewerName?: string;
  intervieweeName: string;
  role: string;
  area: string;
  level: HierarchyLevel;
  pillar: PillarType;
  date: string;
  status: InterviewStatus;
  transcript: string;
  aiInsights: AIInsights | null;
  tags: string[];
  readyForAI: boolean;
}

/** Suggested questions per pillar — based on Deloitte/Stoken assessment framework */
export const SUGGESTED_QUESTIONS: Record<PillarType, string[]> = {
  processos: [
    'Como funciona o processo de S&OP atualmente? Existe validacao estrategica de demanda?',
    'Qual o nivel de integracao entre as areas (Comercial, PCP, Financeiro)?',
    'Como sao definidos, acompanhados e revisados os KPIs da area?',
    'O planejamento de producao e feito em sistema ou em Excel? Por que?',
    'Como funciona o custeio de produtos? Qual a granularidade disponivel?',
    'Existe controle de acuracia do cronograma de producao?',
  ],
  sistemas: [
    'Quantos sistemas diferentes sao utilizados no dia a dia da sua area?',
    'Como os dados sao transferidos entre sistemas? Integracao automatica ou manual?',
    'O ERP atual (PeopleSoft) atende as necessidades? Quais gaps existem?',
    'Existe Data Warehouse, Data Lake ou fonte unica de verdade?',
    'Existe politica de cyberseguranca para os sistemas industriais (OT)?',
    'Qual o nivel de padronizacao tecnologica entre Americana e Tatui?',
  ],
  operacoes: [
    'Como e feita a coleta de dados de producao? Automatica ou manual?',
    'Qual o OEE atual das linhas? Como e calculado e com que frequencia?',
    'Existe manutencao preditiva ou apenas corretiva/preventiva?',
    'Quais maquinas tem conectividade (PLC, sensores)? Quais nao tem?',
    'Como funciona a climatizacao das areas produtivas? Impacta a qualidade?',
    'Qual o consumo energetico da area? Existe medicao digital ou analogica?',
  ],
  organizacao: [
    'Qual a taxa de turnover atual? Quais os principais motivos de saida?',
    'Como e feita a capacitacao de novos funcionarios? Existe trilha estruturada?',
    'Existe programa de desenvolvimento de competencias digitais/analiticas?',
    'Como e a gestao de mudanca para novas tecnologias e processos?',
    'Existe documentacao de processos e procedimentos? Sao seguidos na pratica?',
    'Como funciona a avaliacao de desempenho? E digital ou manual?',
  ],
  roadmap: [
    'Quais sao as prioridades de transformacao digital para a sua area?',
    'Quais projetos de melhoria ja foram tentados? O que funcionou e o que nao?',
    'Qual o maior risco se nada mudar nos proximos 12 meses?',
    'Existem quick wins que poderiam ser implementados imediatamente?',
    'Qual tecnologia voce gostaria de ter que nao tem hoje?',
    'O que e mais urgente: reduzir custo, aumentar produtividade ou melhorar qualidade?',
  ],
};

/** Perguntas especificas por area funcional da empresa — baseadas no diagnostico Deloitte */
export const AREA_QUESTIONS: Record<string, string[]> = {
  // ── FABRIL ────────────────────────────────────────────────────────────
  'Fiacao': [
    'Como funciona o apontamento de producao das fiadeiras (Open-End, MVS, Convencional)?',
    'O Intex recebe os dados de producao automaticamente ou por digitacao manual?',
    'Qual a produtividade atual (kg/hora) e como se compara ao standard?',
    'Como e feito o controle de rendimento das maquinas? Usa o CONTFIA?',
    'Quais as principais causas de parada nas fiadeiras?',
    'Como e controlado o estoque de fios entre fiacao e tecelagem?',
    'O indice de residuos da fiacao (~12%) e monitorado? Como e classificado?',
    'Existe diferenca de rendimento significativa entre turnos? Qual a causa?',
    'A linha de abertura e cardas tem algum tipo de automacao ou coleta de dados?',
    'Como e feita a rastreabilidade do lote de algodao ate o fio produzido?',
  ],
  'Tecelagem': [
    'O BMSVision cobre todos os teares? Quais ficam de fora?',
    'Como funciona o apontamento de producao — e via BMS ou manual no Intex?',
    'A Patrulha do Tecelao ainda e necessaria? Quais defeitos ela detecta?',
    'Como e o processo de troca de artigo (setup)? Quanto tempo leva em media?',
    'O BMS fornece estimativa de fim de rolo? A equipe usa esse dado?',
    'Qual o principal tipo de parada nao planejada nos teares?',
    'Como e monitorada a qualidade do ar comprimido para os teares?',
    'Existe controle de eficiencia por tear individual ou apenas por linha?',
    'Como os dados de quebra de fio e variacao de rendimento sao registrados?',
    'Quais informacoes voce gostaria de ter em tempo real que hoje nao tem?',
  ],
  'Tinturaria': [
    'Como sao controladas as variaveis criticas (temperatura, pressao, pH, velocidade)?',
    'Os dados vao para o DataMetrics automaticamente ou sao anotados em papel?',
    'Como funciona o controle de receitas de tingimento? E digital ou manual?',
    'Existe rastreabilidade entre o lote tingido e os parametros de processo?',
    'Quando um defeito de cor e detectado, quanto tempo ja passou desde o tingimento?',
    'A preparacao e mistura de produtos quimicos e manual ou automatizada?',
    'Como funciona o controle de concentracao de corante e soda caustica?',
    'As Rope Dye, Multicaixa e Ball Warper tem instrumentacao conectada?',
    'Qual a diferenca de rendimento entre turnos na tinturaria? Tem hipotese da causa?',
    'Como e feita a carta de controle do processo? Em papel ou sistema?',
  ],
  'Acabamento': [
    'Quais maquinas do acabamento tem apontamento automatico via Intex/Encoder?',
    'Como funcionam os controles de processo das Ramas, Sanfor e Lixadeira?',
    'Os formularios de controle (FO18273, FO18286, FO18287) sao em papel?',
    'Quanto tempo leva entre a producao no acabamento e a inspecao final?',
    'Como e o controle de temperatura e velocidade na Rama? Supervisorio ou manual?',
    'A Camera de Cura tem controle automatico de processo?',
    'Quais defeitos de acabamento sao mais frequentes?',
    'Existe correlacao entre parametros de processo e qualidade final do tecido?',
    'Como e a comunicacao entre acabamento e inspecao quando ha problema?',
    'Se pudesse automatizar uma coisa no acabamento, o que seria?',
  ],
  'Qualidade': [
    'Como funciona a inspecao final de tecidos? E 100% visual?',
    'Qual o tempo medio entre a producao e a deteccao de defeitos (~25 dias)?',
    'O sistema SIT ainda e utilizado? Atende as necessidades?',
    'Como funciona o Casin para inspecao e plano de corte?',
    'Existe controle estatistico de processo (SPC) em alguma etapa?',
    'Como sao registradas as nao-conformidades? Existe gestao de acoes corretivas?',
    'O desvio de qualidade estimado de 5-10% e monitorado formalmente?',
    'Como e a relacao entre defeitos de processo (60%) e de manutencao (40%)?',
    'Ja foi avaliada inspecao automatica por visao computacional?',
    'Quais indicadores de qualidade sao acompanhados e com que frequencia?',
  ],
  'Manutencao': [
    'O Engeman atende as necessidades de gestao de manutencao? Quais gaps?',
    'Como e feita a abertura de OS — tablets, papel, sistema?',
    'Existe integracao entre Engeman e outros sistemas (Intex, PeopleSoft)?',
    'Os indicadores classicos (MTBF, MTTR) sao calculados e usados na pratica?',
    'Como funcionam as rondas de inspecao? Sao manuais com checklist em papel?',
    'Quais equipamentos criticos tem monitoramento de vibracao/temperatura?',
    'Existe Analise de Causa Raiz estruturada ou e feita em Excel (5W1H)?',
    'Os Planos de Acao de manutencao sao gerenciados no Engeman ou fora?',
    'Qual a cobertura de manutencao preditiva vs preventiva vs corretiva?',
    'Ja foi considerado monitoramento online de condicao (CBM) para compressores e caldeiras?',
  ],
  'Automacao': [
    'Quantos recursos de automacao a Santista tem? Sao suficientes?',
    'Quais PLCs predominam nas plantas (Siemens, Rockwell, outros)?',
    'Existe restricao de acesso aos PLCs por parte dos fabricantes de maquinas?',
    'O BMS permite escrita (set-up, parametrizacao) ou apenas leitura?',
    'Como e a cobertura de rede Wi-Fi no chao de fabrica?',
    'Existe segmentacao de rede entre TI e OT?',
    'Dados sao transferidos via pen-drive em alguma area? Qual o risco?',
    'Como e o suporte a sistemas de automacao (PLCs, IHMs)? So 2 pessoas?',
    'Existem ativos de automacao obsoletos mapeados para modernizacao?',
    'Qual a visao para conectividade das maquinas nos proximos 2 anos?',
  ],
  // ── SUPPLY CHAIN ─────────────────────────────────────────────────────
  'PCP': [
    'O Plano Mestre de Producao e feito no Intex ou em Excel? Por que?',
    'Como funciona a programacao de producao? Usa o modulo de scheduling do Intex?',
    'Qual a acuracia do cronograma de producao? Quantos % abaixo do plano?',
    'Como e a comunicacao do plano para Compras (grau de confianca)?',
    'Qual o tempo de resposta quando ocorre um desvio de producao?',
    'Como e feita a reprogramacao quando uma maquina para inesperadamente?',
    'O Solver de mix e utilizado? Como funciona a otimizacao?',
    'Quais restricoes de capacidade sao mais criticas (maquina, mao de obra, insumo)?',
    'Como e o fluxo de ordens de producao: abertura, execucao, fechamento?',
    'Existe gargalo no fechamento de ordens por falta de alocacao de materiais?',
  ],
  'Logistica': [
    'Como funciona o controle de estoque de produto acabado (DPA)?',
    'A acuracia de estoque entre fisico e sistema e confiavel?',
    'Existe visibilidade de estoque em tempo real entre as plantas?',
    'Como e o processo de expedicao? Picking manual ou sistematizado?',
    'O WMS atual atende? Consegue localizar itens facilmente?',
    'Qual o lead time medio de entrega apos faturamento?',
    'A concentracao de 40% das vendas nos ultimos dias afeta a expedicao?',
    'Como sao feitas as transferencias entre plantas (Americana-Tatui)?',
    'O conferencia de estoque de PA e manual (inventario em papel)?',
    'Quais melhorias mais impactariam a operacao de logistica e expedicao?',
  ],
  'Suprimentos': [
    'Como e recebida a necessidade de compra — PCP envia plano com que antecedencia?',
    'Existe indicador de grau de confianca do plano de producao para calibrar compras?',
    'Quais insumos sao mais criticos (algodao, corantes, quimicos, fios comprados)?',
    'Como funciona o ponto de ressuprimento? Esta no sistema ou em Excel?',
    'Notas fiscais de servico e mercadoria sao 100% digitadas manualmente?',
    'Existe ferramenta de SRM ou gestao de fornecedores?',
    'Quantas rupturas de insumo ocorrem por mes? Qual o impacto na producao?',
    'O processo de cotacao e manual (email) ou tem alguma automatizacao?',
    'Como e a gestao de contratos com fornecedores recorrentes?',
    'Ja foi avaliado RPA para automatizar etapas administrativas de compras?',
  ],
  'S&OP': [
    'Como esta estruturado o ciclo S&OP atualmente? Quais reunioes e em que dias?',
    'A reuniao de S&OP e espaco de decisao ou apenas de homologacao?',
    'Existe validacao estrategica de demanda pela Diretoria antes de travar o plano?',
    'Como e feita a previsao de demanda? Modelos estatisticos ou julgamento?',
    'Qual o MAPE atual da previsao de demanda?',
    'O Comercial recebe devolutiva quando o mix e ajustado pelo PCP?',
    'Existe forum de S&OE semanal? Quem participa?',
    'Como e a integracao entre demanda irrestrita e capacidade de fabrica?',
    'As decisoes de mix consideram Contribuicao Marginal por produto?',
    'Quais ferramentas sao usadas no S&OP (Excel, Solver, sistema)?',
  ],
  // ── COMERCIAL ────────────────────────────────────────────────────────
  'Comercial': [
    'Como funciona a jornada de venda do representante (captura ate faturamento)?',
    'O sistema IFV atende as necessidades da forca de vendas?',
    'Os vendedores tem acesso a margem/CM dos produtos que vendem?',
    'Como funciona o fluxo de desconto? Esta no sistema ou via email/aprovacao manual?',
    'Quanto tempo leva o ciclo completo de venda (pedido ate entrega)?',
    'O cadastro de cliente/avaliacao de credito e rapido ou moroso?',
    'A concentracao de vendas nos ultimos dias do mes e um problema reconhecido?',
    'Como e a visibilidade de estoque disponivel para o vendedor?',
    'Existe inteligencia de mercado ou analise de potencial por regiao/canal?',
    'O CRM (vTiger) e utilizado? Quais funcionalidades sao mais uteis?',
  ],
  'Marketing': [
    'Como funciona o processo de desenvolvimento de novos produtos (CPD)?',
    'Existe fluxo de governanca para o funil de inovacao?',
    'O sistema BDI atende para gestao de novos produtos? Quais limitacoes?',
    'Como e feita a precificacao de novos produtos? Simulacao de custo e em Excel?',
    'Qual o tempo medio de time-to-market de um novo artigo?',
    'Como e a comunicacao com S&OP sobre lancamento de novos produtos?',
    'As fichas tecnicas do desenvolvimento estao integradas com a producao?',
    'Existe analise de rentabilidade por SKU, familia, canal?',
    'Como sao pesquisadas as tendencias de mercado para guiar o portfolio?',
    'A prototipacao em fabrica e feita com facilidade ou causa interferencia na producao?',
  ],
  // ── FINANCEIRO ───────────────────────────────────────────────────────
  'Financeiro': [
    'O fluxo de caixa e demonstracoes financeiras sao feitas em Excel ou sistema?',
    'Como funciona a gestao de resultado? Os indicadores sao confiaveis?',
    'Existe diferenca de granularidade entre orcamento e realizado?',
    'O Hyperion (EPM) atende para o ciclo orcamentario? Quais gaps?',
    'Como e a relacao entre custo standard e custo real — consegue comparar por fase?',
    'Ocorre desaparecimento de notas fiscais no fluxo de entrada?',
    'Notas fiscais sem pedido de compra causam problemas na contabilizacao?',
    'A alocacao de custos entre JW e WW e precisa ou baseada em rateio?',
    'Qual o maior gap em termos de visibilidade financeira hoje?',
    'Se tivesse uma informacao financeira que nao tem, qual seria?',
  ],
  'Custos': [
    'Quanto tempo leva para apurar o custo de 1500 SKUs? Quantas pessoas envolvidas?',
    'De quais fontes vem os dados de custo (PeopleSoft, Intex, planilhas, gestores)?',
    'A alocacao de custos indiretos e por rateio simplificado ou custeio ABC?',
    'Consegue calcular margem real por cliente ou por pedido?',
    'Os custos de energia, agua e utilidades sao alocados por consumo real ou volume?',
    'Como e o processo de reconciliacao de custos standard vs real?',
    'As informacoes de custo estao disponiveis para o Comercial tomar decisao de preco?',
    'Existe simulacao de custo para novos produtos no desenvolvimento?',
    'O custo calculado fica desatualizado antes de ser publicado? Com que frequencia?',
    'Se o custeio fosse automatico e em 3 dias em vez de 25, o que mudaria na gestao?',
  ],
  // ── TI ───────────────────────────────────────────────────────────────
  'TI': [
    'Quantos sistemas estao em producao atualmente? Qual o plano de consolidacao?',
    'O PeopleSoft tem risco de descontinuidade? Qual o plano de contingencia?',
    'Como e a arquitetura de integracao entre os sistemas (API, FTP, manual)?',
    'Existe proposta de Data Lake ou Data Warehouse? Qual o status?',
    'Quantas horas por semana sao gastas em retrabalho de integracao manual?',
    'O time de TI tem perfil de inovacao ou esta focado em manutencao do legado?',
    'Qual o split do budget de TI entre manutencao e inovacao?',
    'Existe politica de cyberseguranca especifica para OT/automacao?',
    'Como e a governanca de TI — existe comite de arquitetura ou priorizacao?',
    'O QlikSense com MCP ja foi explorado para IA generativa?',
  ],
  // ── GENTE & GESTAO ───────────────────────────────────────────────────
  'RH': [
    'Qual a taxa de turnover mensal? E maior em quais areas?',
    'Como e o processo de onboarding de novos funcionarios? Quanto tempo leva?',
    'Existe trilha de desenvolvimento estruturada por funcao?',
    'O sistema Senior atende para folha, ponto e RH? Quais gaps?',
    'Como funciona a gestao de performance — e digital (LIFT) ou manual?',
    'Existe programa de e-Learning ou capacitacao digital?',
    'A jornada do colaborador (admissao a desenvolvimento) e digital ou manual?',
    'Existe autoatendimento para o funcionario (consulta de holerite, ferias, etc)?',
    'Como e tratada a dificuldade de contratacao (80 vagas abertas)?',
    'A area de Gente & Gestao tem analytics (People Analytics) ou e tudo manual?',
  ],
  // ── DIRETORIA ────────────────────────────────────────────────────────
  'Diretoria': [
    'Qual a visao estrategica para a transformacao digital da Santista?',
    'O Forum de S&OP funciona como espaco de decisao real ou de homologacao?',
    'Existe visibilidade de Contribuicao Marginal por produto, familia e canal?',
    'Como e a governanca de priorizacao de investimentos em tecnologia?',
    'O Escritorio de Transformacao tem mandato e poderes formais?',
    'Quais os indicadores executivos mais importantes que faltam hoje?',
    'A meta de 40 km/per capita ate 2027 — qual o papel da tecnologia nisso?',
    'O CAPEX de R$ 300M esta equilibrado entre hardware e sistemas/gestao?',
    'A iniciativa Polux de diversificacao profissional esta gerando resultado?',
    'Qual a maior preocupacao para os proximos 12 meses em termos de risco operacional?',
  ],
  // ── JURIDICO & COMPLIANCE ────────────────────────────────────────────
  'Juridico': [
    'Como funciona a gestao de contratos hoje? O CLM atende?',
    'Existem riscos regulatorios relacionados a LGPD nos sistemas atuais?',
    'Como e o controle de adequacao a legislacao ambiental (SOGI)?',
    'Existem preocupacoes de compliance com a transferencia de dados via pen-drive?',
    'Como e a gestao de riscos trabalhistas — o PPP/SIMO foi descontinuado?',
    'Qual o impacto de compliance na decisao de sistemas (ERP, cyberseg)?',
  ],
  // ── UTILIDADES ───────────────────────────────────────────────────────
  'Utilidades': [
    'Como e feita a medicao de consumo energetico — medidores digitais ou analogicos?',
    'O sistema de controle de demanda CCK esta ativo ou desativado?',
    'Quais as fontes de energia (eletrica, biomassa, gas) e o custo total (~R$ 70M/ano)?',
    'As caldeiras tem automacao e monitoramento continuo de parametros?',
    'A ETA e ETE operam de forma automatica ou semi-automatica por quadro de comandos?',
    'Existe plano de eficiencia energetica? Qual o potencial de reducao (10%)?',
    'Como e o controle de climatizacao das areas produtivas (temperatura, umidade)?',
    'Os compressores sao monitorados continuamente ou por ronda manual?',
    'Existe controle de geracao de residuos por area?',
    'Quais investimentos em utilidades teriam maior impacto em reducao de custo?',
  ],
};
