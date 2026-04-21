const siteData = {
  firmName: 'Website',
  specialization: 'Website',
  whatsappNumber: '5511111111111',
  email: 'talentdeveloper@gmail.com',
  phone: '5511111111111',
  address: 'Website',
  cityState: 'Website',
  oabNumber: 'Website',
  yearsExperience: 10,
  processesHandled: 500,
  successRate: 95,
  tagline: 'Advocacia de Excelência',
  colorScheme: 'dark-gold',
  includeBlog: true,
  whatsappLink: (msg = 'Olá! Gostaria de mais informações sobre os serviços jurídicos.') =>
    `https://wa.me/5511111111111?text=${encodeURIComponent(msg)}`,
  services: [
    {
      icon: 'fas fa-file-contract',
      title: 'Consultoria Jurídica',
      shortDesc: 'Assessoria jurídica completa e personalizada, com análise detalhada de casos e orientação estratégica para tomada de decisões.',
      fullDesc: 'Oferecemos consultoria jurídica abrangente, analisando cada caso de forma minuciosa para identificar as melhores estratégias e soluções legais. Nossa equipe está preparada para atender demandas complexas com agilidade e precisão.',
      features: [
        'Análise detalhada de documentos e contratos',
        'Pareceres jurídicos fundamentados',
        'Orientação estratégica personalizada',
        'Acompanhamento processual completo'
      ]
    },
    {
      icon: 'fas fa-gavel',
      title: 'Assessoria Jurídica Preventiva',
      shortDesc: 'Atuação preventiva para evitar litígios, com análise de riscos e implementação de medidas de conformidade e segurança jurídica.',
      fullDesc: 'Prevenção é a melhor estratégia. Identificamos riscos jurídicos antes que se tornem problemas, implementando políticas e procedimentos que garantem a conformidade e segurança da sua empresa.',
      features: [
        'Mapeamento de riscos jurídicos',
        'Programas de compliance',
        'Treinamentos para equipes',
        'Auditorias jurídicas preventivas'
      ]
    },
    {
      icon: 'fas fa-handshake',
      title: 'Contratos e Acordos',
      shortDesc: 'Elaboração, análise e revisão de contratos, garantindo segurança jurídica e proteção dos interesses dos nossos clientes.',
      fullDesc: 'Nossos especialistas elaboram, revisam e negociam contratos de todos os tipos, garantindo que cada cláusula proteja seus interesses e esteja em conformidade com a legislação vigente.',
      features: [
        'Elaboração de contratos sob medida',
        'Revisão e análise de cláusulas',
        'Negociação contratual',
        'Gestão de contratos vigentes'
      ]
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Contencioso Judicial',
      shortDesc: 'Representação em processos judiciais de todas as instâncias, com atuação estratégica e foco em resultados positivos.',
      fullDesc: 'Atuamos em todas as instâncias do Poder Judiciário, defendendo seus direitos com estratégia, experiência e dedicação. Nossa equipe possui amplo conhecimento processual para garantir os melhores resultados.',
      features: [
        'Representação em todas as instâncias',
        'Elaboração de petições e recursos',
        'Acompanhamento processual em tempo real',
        'Mediação e arbitragem'
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
