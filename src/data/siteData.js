const siteData = {
  firmName: 'Elcio Brack',
  specialization: 'Licitações',
  whatsappNumber: '(54) 996134928',
  email: 'ebrackassessoria@gmail.com',
  phone: '(54) 996134928',
  address: 'Website',
  cityState: 'Website',
  oabNumber: 'Website',
  yearsExperience: 12,
  processesHandled: 500,
  successRate: 95,
  tagline: 'O Maior Comprador do Brasil',
  colorScheme: 'dark-gold',
  includeBlog: true,
  whatsappLink: (msg = 'Olá! Gostaria de mais informações sobre os serviços jurídicos.') =>
    `https://wa.me/(54) 996134928?text=${encodeURIComponent(msg)}`,
  services: [
    {
      icon: 'fas fa-file-contract',
      title: '1. Consultoria Estratégica em Licitações',
      shortDesc: 'A solução completa, do planejamento à assinatura do contrato. Oferecemos suporte integral em todas as etapas do processo licitatório. Com a autoridade de quem foi Pregoeiro por 12 anos, nossa atuação cobre 100% das necessidades da empresa: desde a busca e análise de editais, montagem da documentação e elaboração da proposta, até a participação ativa na sala de lances e condução de recursos.',
      fullDesc: 'A gestão completa do seu processo licitatório, do edital à assinatura do contrato. Muitas empresas perdem oportunidades por não terem tempo ou equipe qualificada para gerir a burocracia dos certames. Nossa assessoria "full service" elimina esse gargalo. Com a expertise de quem presidiu certames por 12 anos, cuidamos de cada detalhe :',
      features: [
        'Busca e Triagem: Identificamos as melhores oportunidades para o seu nicho de mercado.',
        'Análise de Viabilidade: Estudo técnico do edital para garantir que sua empresa atenda a todos os requisitos.',
        'Montagem de Propostas: Elaboração de planilhas de custos, exequibilidade e organização documental.',
        'Participação na Disputa: Atuação direta na sala de lances, com estratégia de desempate e monitoramento em tempo real.',
        'Assinatura do Contrato: Suporte na fase de homologação e adjudicação, garantindo que o direito conquistado seja formalizado.'
      ]
    },
    {
      icon: 'fas fa-gavel',
      title: '2. Blindagem e Conformidade Preventiva',
      shortDesc: 'Segurança total para sua empresa vencer e manter o contrato. Atuamos na fase interna da licitação, auxiliando na montagem do acervo documental e técnico. O objetivo é garantir que sua empresa esteja 100% em conformidade com a Nova Lei de Licitações (14.133), evitando desclassificações por detalhes burocráticos.',
      fullDesc: 'Reduza riscos e evite desclassificações por detalhes técnicos. A Nova Lei de Licitações (14.133) exige um rigor documental e técnico sem precedentes. Nossa atuação preventiva blinda sua empresa contra erros fatais que afastam bons licitantes da disputa : ',
      features: [
        'Auditoria Documental: Revisão completa do acervo da empresa (certidões, balanços e atestados).',
        'Conformidade com a Lei 14.133: Adequação imediata dos processos internos às novas exigências legais.',
        'Treinamento Estratégico: Orientação para sua equipe comercial sobre como se comportar e o que evitar durante o processo de habilitação.',
        'Impugnação de Editais: Correção de exigências ilegais ou abusivas que possam prejudicar sua participação.'
      ]
    },
    {
      icon: 'fas fa-handshake',
      title: '3. Gestão de Contratos e Reequilíbrio',
      shortDesc: 'Proteção do seu lucro e do seu capital de giro. Contratos públicos são vivos. Atuamos na elaboração de pedidos de realinhamento de preços, reajustes e prorrogações. Além disso, garantimos que sua empresa não seja prejudicada por inadimplência ou má gestão do órgão público.',
      fullDesc: 'Garanta a saúde financeira e a rentabilidade do seu contrato público. Vencer a licitação é apenas o começo. O desafio real é manter a rentabilidade ao longo do tempo. Atuamos para que sua empresa não seja sufocada pela inflação ou por atrasos do órgão público : ',
      features: [
        'Reequilíbrio Econômico-Financeiro: Elaboração de pedidos de realinhamento e reajuste de preços fundamentados.',
        'Aditivos e Prorrogações: Gestão de prazos e termos aditivos para expansão ou continuidade do serviço.',
        'Combate à Inadimplência: Atuação técnica e jurídica para garantir o recebimento de faturas e o cumprimento da ordem cronológica de pagamentos.',
        'Defesa em Sanções: Proteção contra multas indevidas, advertências ou processos de suspensão por falhas na execução.',
        'Suspensão de Serviço: Orientação segura sobre o direito de parar o serviço em caso de falta de pagamento, conforme a lei.'
      ]
    },
    {
      icon: 'fas fa-balance-scale',
      title: '4. Contencioso e Defesa Administrativa',
      shortDesc: 'Combate rigoroso a irregularidades e concorrência desleal. Representação técnica em recursos, contrarrazões e impugnações. Utilizamos o conhecimento dos bastidores para derrubar propostas irregulares de concorrentes e defender a sua habilitação com teses jurídicas sólidas e atualizadas. Atuação estratégica em todas as instâncias e junto aos Tribunais de Contas.',
      fullDesc: 'Combate rigoroso a irregularidades e defesa intransigente do seu direito. Onde outros enxergam uma derrota, nós enxergamos uma tese jurídica. Utilizamos o conhecimento dos "bastidores" para garantir que a melhor proposta vença, combatendo qualquer desvio de conduta : ',
      features: [
        'Recursos e Contrarrazões: Peças fundamentadas tecnicamente para reverter desclassificações ou inabilitar concorrentes.',
        'Derrubada de Propostas Irregulares: Identificação de falhas em fichas técnicas, homologações e planilhas de terceiros.',
        'Representação em Tribunais de Contas: Atuação perante o TCE e TCU para garantir a lisura do certame.',
        'Ações Judiciais: Mandados de Segurança e ações ordinárias para proteção urgente de direitos violados.',
        'Defesa em Processos de Inidoneidade: Proteção da marca e do direito de continuar contratando com o Poder Público.'
      ]
    }
  ],
  blogPosts: [
    {
      id: 1,
      title: 'Principais mudanças legislativas que você precisa conhecer',
      summary: 'Entenda as alterações mais significativas na legislação e como elas podem impactar você.',
      category: 'Análise Jurídica',
      date: '15 Abr 2026',
      readTime: '5 min de leitura',
      icon: 'fas fa-newspaper'
    },
    {
      id: 2,
      title: 'Como proteger seus direitos: guia essencial',
      summary: 'Guia completo com orientações práticas para garantir a proteção dos seus direitos.',
      category: 'Dicas Jurídicas',
      date: '10 Abr 2026',
      readTime: '4 min de leitura',
      icon: 'fas fa-laptop'
    },
    {
      id: 3,
      title: 'Aspectos essenciais na elaboração de contratos',
      summary: 'Saiba quais cuidados tomar ao elaborar ou assinar contratos para garantir segurança jurídica.',
      category: 'Contratos',
      date: '05 Abr 2026',
      readTime: '6 min de leitura',
      icon: 'fas fa-file-signature'
    },
    {
      id: 4,
      title: 'Compliance empresarial: por que sua empresa precisa',
      summary: 'Descubra como um programa de compliance pode proteger e fortalecer o seu negócio.',
      category: 'Compliance',
      date: '01 Abr 2026',
      readTime: '7 min de leitura',
      icon: 'fas fa-shield-alt'
    },
    {
      id: 5,
      title: 'Mediação e arbitragem: alternativas à via judicial',
      summary: 'Conheça os métodos alternativos de resolução de conflitos e suas vantagens.',
      category: 'Contencioso',
      date: '25 Mar 2026',
      readTime: '5 min de leitura',
      icon: 'fas fa-handshake'
    },
    {
      id: 6,
      title: 'Direitos trabalhistas: o que todo empregador deve saber',
      summary: 'Informações essenciais sobre direitos trabalhistas e obrigações do empregador.',
      category: 'Direito do Trabalho',
      date: '20 Mar 2026',
      readTime: '6 min de leitura',
      icon: 'fas fa-users'
    }
  ],
  blogCategories: [
    'Análise Jurídica',
    'Dicas Jurídicas',
    'Contratos',
    'Compliance',
    'Contencioso',
    'Direito do Trabalho'
  ]
};

export default siteData;
