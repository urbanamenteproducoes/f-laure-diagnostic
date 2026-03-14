import { QuizStep } from '../types';

export const quizSteps: QuizStep[] = [
  {
    id: 'identity',
    title: 'Identidade da Empresa',
    subtitle: 'Conte-nos um pouco sobre o seu negócio.',
    icon: 'Building2',
    questions: [
      { id: 'companyName', label: 'Nome da Empresa', type: 'text', placeholder: 'ex: Acme Corp' },
      { id: 'segment', label: 'Segmento de Atuação', type: 'text', placeholder: 'ex: Varejo, Tecnologia, Serviços' },
      {
        id: 'years',
        label: 'Anos de operação',
        type: 'single_choice',
        options: [
          { label: 'Começando agora', value: '0-1' },
          { label: '1-3 anos', value: '1-3' },
          { label: '3-10 anos', value: '3-10' },
          { label: 'Mais de 10 anos', value: '10+' }
        ]
      },
      {
        id: 'b2b_b2c',
        label: 'Quem são seus principais clientes?',
        type: 'single_choice',
        options: [
          { label: 'B2B (Outras Empresas)', value: 'b2b' },
          { label: 'B2C (Consumidores)', value: 'b2c' },
          { label: 'Ambos B2B e B2C', value: 'both' }
        ]
      },
      {
        id: 'main_product',
        label: 'Qual é o seu principal produto ou serviço?',
        type: 'text',
        placeholder: 'ex: Software SaaS, Consultoria, Roupas'
      }
    ]
  },
  {
    id: 'specialty_funding',
    title: 'Especialidade e Fomento',
    subtitle: 'Detalhes sobre sua atuação artística e captação de recursos.',
    icon: 'Palette',
    questions: [
      { 
        id: 'artistic_specialty', 
        label: 'Qual a sua especialidade artística ou literária? (ex: casting, dança, literatura)', 
        type: 'text', 
        placeholder: 'ex: Casting de atores, Dança contemporânea, Literatura' 
      },
      {
        id: 'funding_status',
        label: 'Como está sua experiência com captação de recursos?',
        type: 'single_choice',
        options: [
          { label: 'Já captei recursos via editais', value: 'already_funded' },
          { label: 'Tenho interesse em captar via leis de incentivo', value: 'interested_incentive' },
          { label: 'Ainda não tenho experiência', value: 'no_experience' }
        ]
      }
    ]
  },
  {
    id: 'digital_presence',
    title: 'Presença Digital',
    subtitle: 'Como você se apresenta online atualmente?',
    icon: 'Globe',
    questions: [
      {
        id: 'website',
        label: 'Você tem um site?',
        type: 'single_choice',
        options: [
          { label: 'Sim, e tem bom desempenho', value: 'good', description: 'Gera leads e vendas.' },
          { label: 'Sim, mas precisa de reformulação', value: 'needs_work', description: 'Está desatualizado ou lento.' },
          { label: 'Ainda não temos site', value: 'none', description: 'Dependemos de redes sociais ou offline.' }
        ]
      },
      {
        id: 'website_platform',
        label: 'Em qual plataforma seu site foi construído?',
        type: 'single_choice',
        options: [
          { label: 'WordPress', value: 'wordpress' },
          { label: 'Shopify', value: 'shopify' },
          { label: 'Wix / Squarespace', value: 'builders' },
          { label: 'Personalizado / Outro', value: 'custom' },
          { label: 'Não sei', value: 'unknown' }
        ],
        condition: { field: 'website', operator: 'not_equals', value: 'none' }
      },
      {
        id: 'social',
        label: 'Principais redes sociais',
        type: 'multiple_choice',
        options: [
          { label: 'Instagram', value: 'instagram' },
          { label: 'LinkedIn', value: 'linkedin' },
          { label: 'TikTok', value: 'tiktok' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'YouTube', value: 'youtube' },
          { label: 'Nenhuma', value: 'none' }
        ]
      },
      {
        id: 'traffic_source',
        label: 'Qual é a sua principal fonte de tráfego online?',
        type: 'single_choice',
        options: [
          { label: 'Redes Sociais Orgânicas', value: 'social_organic' },
          { label: 'Anúncios Pagos (Meta, Google)', value: 'paid_ads' },
          { label: 'SEO / Busca no Google', value: 'seo' },
          { label: 'Indicações / Boca a Boca', value: 'referrals' }
        ]
      },
      {
        id: 'google_my_business',
        label: 'Seu perfil no Google Meu Negócio está otimizado?',
        type: 'single_choice',
        options: [
          { label: 'Sim, totalmente otimizado', value: 'yes' },
          { label: 'Existe, mas não está atualizado', value: 'needs_work' },
          { label: 'Não / O que é isso?', value: 'no' }
        ]
      }
    ]
  },
  {
    id: 'brand_content',
    title: 'Marca e Conteúdo',
    subtitle: 'Vamos avaliar sua identidade visual e estratégia de conteúdo.',
    icon: 'Palette',
    questions: [
      {
        id: 'visuals',
        label: 'Você tem fotos/vídeos profissionais?',
        type: 'single_choice',
        options: [
          { label: 'Sim, de alta qualidade', value: 'yes' },
          { label: 'Alguns, mas precisamos de mais', value: 'some' },
          { label: 'Não, a maioria é de banco de imagens/amadora', value: 'no' }
        ]
      },
      {
        id: 'brand_manual',
        label: 'Você tem uma Identidade de Marca documentada (Brandbook)?',
        type: 'single_choice',
        options: [
          { label: 'Sim, brandbook completo', value: 'yes' },
          { label: 'Apenas um logotipo e algumas cores', value: 'partial' },
          { label: 'Não, improvisamos', value: 'no' }
        ]
      },
      {
        id: 'content_freq',
        label: 'Frequência de publicação de conteúdo',
        type: 'single_choice',
        options: [
          { label: 'Diariamente', value: 'daily' },
          { label: 'Semanalmente', value: 'weekly' },
          { label: 'Raramente / Inconsistente', value: 'rarely' }
        ]
      },
      {
        id: 'content_creation',
        label: 'Quem cria o seu conteúdo?',
        type: 'single_choice',
        options: [
          { label: 'Equipe interna', value: 'inhouse' },
          { label: 'Agência / Freelancer', value: 'agency' },
          { label: 'Eu mesmo faço', value: 'myself' }
        ]
      },
      {
        id: 'video_marketing',
        label: 'Você está usando Vídeo Marketing (Reels, TikToks, YouTube)?',
        type: 'single_choice',
        options: [
          { label: 'Sim, intensamente', value: 'yes' },
          { label: 'Ocasionalmente', value: 'sometimes' },
          { label: 'Não, mas queremos', value: 'want_to' },
          { label: 'Não, não temos interesse', value: 'no' }
        ]
      }
    ]
  },
  {
    id: 'automation_sales',
    title: 'Automação e Vendas',
    subtitle: 'Quão eficiente é o seu processo de captura de leads e vendas?',
    icon: 'Zap',
    questions: [
      {
        id: 'crm',
        label: 'Você usa um CRM?',
        type: 'single_choice',
        options: [
          { label: 'Sim, ativamente', value: 'yes' },
          { label: 'Temos um, mas quase não usamos', value: 'underutilized' },
          { label: 'Nenhum CRM', value: 'no' }
        ]
      },
      {
        id: 'crm_tool',
        label: 'Qual CRM você usa?',
        type: 'text',
        placeholder: 'ex: HubSpot, Salesforce, Pipedrive',
        condition: { field: 'crm', operator: 'not_equals', value: 'no' }
      },
      {
        id: 'automation',
        label: 'Você usa automação de marketing/WhatsApp?',
        type: 'single_choice',
        options: [
          { label: 'Sim, fluxos avançados', value: 'advanced' },
          { label: 'Respostas automáticas básicas', value: 'basic' },
          { label: 'Nenhuma automação', value: 'no' }
        ]
      },
      {
        id: 'sales_funnel',
        label: 'Você tem um funil de vendas mapeado?',
        type: 'single_choice',
        options: [
          { label: 'Sim, etapas claras', value: 'yes' },
          { label: 'Mais ou menos, na nossa cabeça', value: 'partial' },
          { label: 'Nenhum funil estruturado', value: 'no' }
        ]
      },
      {
        id: 'lead_response_time',
        label: 'Tempo médio para responder a um novo lead',
        type: 'single_choice',
        options: [
          { label: 'Menos de 5 minutos', value: 'fast' },
          { label: 'Dentro de uma hora', value: 'medium' },
          { label: 'Dentro de 24 horas', value: 'slow' },
          { label: 'Mais de 24 horas', value: 'very_slow' }
        ]
      }
    ]
  },
  {
    id: 'business_structure',
    title: 'Estrutura do Negócio e Equipe',
    subtitle: 'Conte-nos sobre suas capacidades internas.',
    icon: 'Users',
    questions: [
      {
        id: 'team_size',
        label: 'Tamanho da Empresa (Funcionários)',
        type: 'single_choice',
        options: [
          { label: '1-5 (Micro)', value: '1-5' },
          { label: '6-20 (Pequena)', value: '6-20' },
          { label: '21-50 (Média)', value: '21-50' },
          { label: '50+ (Grande)', value: '50+' }
        ]
      },
      {
        id: 'marketing_team',
        label: 'Você tem uma equipe de marketing dedicada?',
        type: 'single_choice',
        options: [
          { label: 'Sim, equipe completa', value: 'full' },
          { label: 'Apenas 1-2 pessoas', value: 'small' },
          { label: 'Nenhuma equipe dedicada', value: 'none' }
        ]
      },
      {
        id: 'sales_team',
        label: 'Você tem uma equipe de vendas dedicada?',
        type: 'single_choice',
        options: [
          { label: 'Sim, equipe completa', value: 'full' },
          { label: 'Apenas 1-2 pessoas', value: 'small' },
          { label: 'Nenhuma equipe dedicada', value: 'none' }
        ]
      },
      {
        id: 'biggest_bottleneck',
        label: 'Qual é o seu maior gargalo no momento?',
        type: 'multiple_choice',
        options: [
          { label: 'Poucos leads', value: 'leads' },
          { label: 'Baixa taxa de conversão', value: 'conversion' },
          { label: 'Falta de reconhecimento da marca', value: 'brand' },
          { label: 'Processos ineficientes', value: 'processes' },
          { label: 'Falta de conteúdo/criativos', value: 'content' }
        ]
      }
    ]
  },
  {
    id: 'goals',
    title: 'Objetivos e Investimento',
    subtitle: 'O que você está tentando alcançar?',
    icon: 'Target',
    questions: [
      {
        id: 'main_goal',
        label: 'Objetivo principal para os próximos 6 meses',
        type: 'single_choice',
        options: [
          { label: 'Aumentar Vendas', value: 'sales', description: 'Crescimento direto de receita e otimização de conversão.' },
          { label: 'Aumentar Reconhecimento da Marca', value: 'brand', description: 'Alcançar mais pessoas e construir autoridade.' },
          { label: 'Gerar Leads', value: 'leads', description: 'Construir um pipeline de prospects qualificados.' },
          { label: 'Melhorar Eficiência', value: 'efficiency', description: 'Automatizar processos e economizar tempo.' }
        ]
      },
      {
        id: 'revenue_goal',
        label: 'Qual é a sua meta de crescimento de receita mensal?',
        type: 'single_choice',
        options: [
          { label: '10-20%', value: 'realistic' },
          { label: '20-50%', value: 'aggressive' },
          { label: '50%+', value: 'hyper' }
        ]
      },
      {
        id: 'budget',
        label: 'Orçamento Mensal de Marketing',
        type: 'single_choice',
        options: [
          { label: 'Menos de R$ 1.000', value: 'low' },
          { label: 'R$ 1.000 - R$ 5.000', value: 'medium' },
          { label: 'R$ 5.000 - R$ 15.000', value: 'high' },
          { label: 'Mais de R$ 15.000', value: 'enterprise' }
        ]
      },
      {
        id: 'timeline',
        label: 'Quando você quer começar a implementar mudanças?',
        type: 'single_choice',
        options: [
          { label: 'Imediatamente', value: 'now' },
          { label: 'Dentro de 1 mês', value: '1_month' },
          { label: 'Dentro de 3 meses', value: '3_months' },
          { label: 'Apenas explorando', value: 'exploring' }
        ]
      },
      {
        id: 'contact_email',
        label: 'Para onde devemos enviar seu relatório de diagnóstico detalhado?',
        type: 'text',
        placeholder: 'seu@email.com'
      }
    ]
  }
];
