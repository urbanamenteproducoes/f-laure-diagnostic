import { QuizStep } from '../types';

export const quizSteps: QuizStep[] = [
  {
    id: 'profile',
    title: 'Como você se define?',
    subtitle: 'Nós personalizamos a avaliação. Qual é o seu modelo de atuação hoje?',
    icon: 'Target',
    questions: [
      {
        id: 'profile_type',
        label: 'Escolha a categoria que melhor representa seu momento atual:',
        type: 'single_choice',
        options: [
          { label: 'Empresa / Negócio Tradicional', value: 'business', description: 'Comércio, Indústria, Hotelaria, Software, Serviços (B2B/B2C).' },
          { label: 'Artista / Profissional Criativo', value: 'artist', description: 'Atores, Cantores, Dançarinos, Músicos, Criadores de Conteúdo.' },
          { label: 'Projeto Cultural / Produtor de Eventos', value: 'event', description: 'Produção de Festas, Shows, Festivais e Projetos de Editais.' }
        ]
      },
      {
        id: 'artist_intent',
        label: 'Como artista, qual é a sua intenção principal com a conexão de hoje?',
        type: 'single_choice',
        options: [
          { label: 'Banco de Talentos (Trabalho)', value: 'casting', description: 'Quero cadastrar meu Release/Portfólio no Casting para ser chamado para gravações e elencos.' },
          { label: 'Sou o meu próprio Projeto', value: 'production', description: 'Estou buscando os serviços da F-Laure para produzir a minha carreira, marketing ou conteúdos.' },
          { label: 'Unir Vínculo (Ambos)', value: 'both', description: 'Quero estruturar a minha carreira com ajuda de vocês e também estar nos elencos da casa.' }
        ],
        condition: { field: 'profile_type', operator: 'equals', value: 'artist' }
      }
    ]
  },
  {
    id: 'identity',
    title: 'Identidade e Proposta de Valor',
    subtitle: 'Conte-nos sobre a essência do seu trabalho (Metodologia Canvas).',
    icon: 'Building2',
    questions: [
      { id: 'companyName', label: 'Nome (Organização / Artista / Projeto)', type: 'text', placeholder: 'ex: Acme Corp, F-Laure, João Silva' },
      { id: 'segment', label: 'Segmento / Nicho de Atuação', type: 'text', placeholder: 'ex: Hotelaria, Música Pop, Tecnologia' },
      {
        id: 'years',
        label: 'Aproximadamente, quanto tempo de atuação / mercado?',
        type: 'single_choice',
        options: [
          { label: 'Começando agora', value: '0-1' },
          { label: '1 a 3 anos', value: '1-3' },
          { label: '3 a 10 anos', value: '3-10' },
          { label: 'Mais de 10 anos', value: '10+' }
        ]
      },
      {
        id: 'b2b_b2c',
        label: 'Quem é o seu principal público / consumidor?',
        type: 'single_choice',
        options: [
          { label: 'B2B (Outras Empresas / Contratantes)', value: 'b2b' },
          { label: 'B2C (Consumidores Finais / Fãs / Público)', value: 'b2c' },
          { label: 'B2G (Governo / Patrocinadores)', value: 'b2g' },
          { label: 'Múltiplos (Um mix entre empresas e fãs)', value: 'both' }
        ]
      },
      {
        id: 'main_product',
        label: 'Qual é o seu principal Produto, Serviço ou Espetáculo?',
        type: 'text',
        placeholder: 'ex: Software SaaS, Hospedagem, Álbum Musical'
      },
      {
        id: 'portfolio_links',
        label: 'Links Importantes (Portfólios, Vídeos, Drive, Materiais Anteriores)',
        type: 'text',
        placeholder: 'Cole aqui links para analisarmos seu histórico (Opcional)'
      }
    ]
  },
  {
    id: 'specialty_funding',
    title: 'Fomento e Captação Cultural',
    subtitle: 'Nós conectamos arte e negócios através das leis de incentivo.',
    icon: 'Palette',
    questions: [
      { 
        id: 'artistic_specialty', 
        label: 'Qual a sua Especialidade Artística ou Tema do Evento?', 
        type: 'text', 
        placeholder: 'ex: Dança Contemporânea, Festival de Jazz, Gravação de Longa',
        condition: { field: 'profile_type', operator: 'not_equals', value: 'business' } 
      },
      {
        id: 'funding_status',
        label: 'Qual sua experiência com Captação (Leis Rouanet, Paulo Gustavo, etc)?',
        type: 'single_choice',
        options: [
          { label: 'Já tenho histórico aprovado/captado em editais', value: 'already_funded' },
          { label: 'Tenho interesse forte em iniciar captação subsidiada', value: 'interested_incentive' },
          { label: 'Não possuo experiência e vivo 100% de bilheteria/venda', value: 'no_experience' }
        ],
        condition: { field: 'profile_type', operator: 'not_equals', value: 'business' }
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
        ],
        or_conditions: [
          { field: 'website', operator: 'not_equals', value: 'none' },
          { field: 'social', operator: 'not_contains', value: 'none' }
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
    title: 'Captação, Automação e Conversão',
    subtitle: 'Análise do seu processo de atração de público, ingressos ou vendas organizacionais.',
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
        label: 'Você tem um Funil de Vendas ou Jornada do Público mapeada?',
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
        label: 'Tamanho da Organização / Equipe do Projeto',
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
        label: 'Você tem uma equipe de Vendas / Relacionamento dedicada?',
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
          { label: 'Aumentar Vendas / Bilheteria / Faturamento', value: 'sales', description: 'Crescimento direto de receita financeira e otimização de conversão.' },
          { label: 'Aumentar Reconhecimento e Valor da Marca (Branding)', value: 'brand', description: 'Alcançar mais pessoas e construir autoridade / fama.' },
          { label: 'Gerar Leads / Captar Parcerias Fortes', value: 'leads', description: 'Construir um pipeline de prospects qualificados ou parceiros de negócio.' },
          { label: 'Melhorar Eficiência e Escala', value: 'efficiency', description: 'Automatizar processos operacionais para agilizar o negócio e produzir mais.' }
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
