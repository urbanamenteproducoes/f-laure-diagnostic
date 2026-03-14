import { DiagnosticResult, Recommendation } from '../types';

export function generateDiagnostic(answers: Record<string, any>): Omit<DiagnosticResult, 'id' | 'date'> {
  let overall = 60;
  let readiness = 50;
  let efficiency = 50;
  
  const categories = {
    'Presença Digital': 50,
    'Marca e Conteúdo': 50,
    'Vendas e Automação': 50,
    'Estrutura do Negócio': 50,
  };

  const recommendations: Recommendation[] = [];

  // Digital Presence
  if (answers.website === 'none' || answers.website === 'needs_work') {
    overall -= 10;
    readiness -= 15;
    categories['Presença Digital'] -= 20;
    recommendations.push({
      title: answers.website === 'none' ? 'Criar Site Profissional' : 'Redesign e Otimização do Site',
      description: 'Uma vitrine digital de alta performance é essencial para capturar leads e estabelecer autoridade.',
      priority: 'Alta',
      department: 'Web Design'
    });
  } else if (answers.website === 'good') {
    overall += 10;
    readiness += 15;
    categories['Presença Digital'] += 20;
  }

  if (answers.google_my_business === 'no' || answers.google_my_business === 'needs_work') {
    categories['Presença Digital'] -= 10;
    recommendations.push({
      title: 'Otimizar Google Meu Negócio',
      description: 'Melhore o SEO local e a visibilidade otimizando totalmente o seu perfil no Google Meu Negócio.',
      priority: 'Média',
      department: 'SEO'
    });
  }

  // Brand & Content
  if (answers.visuals === 'no' || answers.visuals === 'some') {
    categories['Marca e Conteúdo'] -= 10;
    recommendations.push({
      title: 'Produção Audiovisual Profissional',
      description: 'Atualize seus ativos visuais com fotografia de alta qualidade e vídeos institucionais para construir confiança.',
      priority: 'Média',
      department: 'Audiovisual'
    });
  }

  if (answers.brand_manual === 'no' || answers.brand_manual === 'partial') {
    categories['Marca e Conteúdo'] -= 10;
    recommendations.push({
      title: 'Desenvolver Identidade de Marca',
      description: 'Crie um brandbook abrangente para garantir consistência visual em todos os canais.',
      priority: 'Média',
      department: 'Branding'
    });
  }

  if (answers.video_marketing === 'no' || answers.video_marketing === 'want_to') {
    categories['Marca e Conteúdo'] -= 10;
    recommendations.push({
      title: 'Implementar Estratégia de Vídeo Marketing',
      description: 'Comece a produzir conteúdo em vídeo curto (Reels, TikToks) para aumentar o engajamento e o alcance.',
      priority: 'Alta',
      department: 'Conteúdo'
    });
  }

  // Sales & Automation
  if (answers.crm === 'no' || answers.crm === 'underutilized') {
    efficiency -= 20;
    categories['Vendas e Automação'] -= 20;
    recommendations.push({
      title: 'Implementar CRM e Funil de Vendas',
      description: 'Centralize a gestão de leads e automatize os acompanhamentos para aumentar as taxas de conversão.',
      priority: 'Alta',
      department: 'Automação'
    });
  }

  if (answers.automation === 'no' || answers.automation === 'basic') {
    efficiency -= 15;
    categories['Vendas e Automação'] -= 10;
    recommendations.push({
      title: 'Automação de WhatsApp e E-mail',
      description: 'Implemente fluxos de trabalho baseados em IA para engajar prospects instantaneamente e reduzir a sobrecarga operacional manual.',
      priority: 'Média',
      department: 'Automação'
    });
  }

  if (answers.sales_funnel === 'no' || answers.sales_funnel === 'partial') {
    categories['Vendas e Automação'] -= 15;
    recommendations.push({
      title: 'Mapear e Otimizar o Funil de Vendas',
      description: 'Defina etapas claras para a jornada do seu cliente para identificar pontos de desistência e melhorar as taxas de conversão.',
      priority: 'Alta',
      department: 'Vendas'
    });
  }

  if (answers.lead_response_time === 'slow' || answers.lead_response_time === 'very_slow') {
    efficiency -= 15;
    categories['Vendas e Automação'] -= 15;
    recommendations.push({
      title: 'Melhorar o Tempo de Resposta a Leads',
      description: 'Implemente respostas iniciais automatizadas para engajar leads imediatamente enquanto estão quentes.',
      priority: 'Alta',
      department: 'Automação'
    });
  }

  // Business Structure
  if (answers.marketing_team === 'none' || answers.marketing_team === 'small') {
    categories['Estrutura do Negócio'] -= 10;
    recommendations.push({
      title: 'Terceirizar Operações de Marketing',
      description: 'Faça parceria com uma agência para lidar com tarefas especializadas como anúncios pagos, SEO e criação de conteúdo.',
      priority: 'Média',
      department: 'Estratégia'
    });
  }

  if (answers.biggest_bottleneck && answers.biggest_bottleneck.includes('conversion')) {
    recommendations.push({
      title: 'Otimização da Taxa de Conversão (CRO)',
      description: 'Analise o comportamento do usuário no seu site e landing pages para identificar e corrigir bloqueadores de conversão.',
      priority: 'Alta',
      department: 'Growth'
    });
  }

  // Goals
  if (answers.main_goal === 'brand') {
    recommendations.push({
      title: 'Campanha de Reconhecimento de Marca',
      description: 'Lance campanhas direcionadas focadas em alcance e impressões para construir autoridade no seu mercado.',
      priority: 'Média',
      department: 'Growth'
    });
  }

  if (answers.main_goal === 'sales' || answers.main_goal === 'leads') {
    recommendations.push({
      title: 'Campanha de Marketing de Performance',
      description: 'Lance campanhas de anúncios pagos direcionados para atrair tráfego qualificado para suas landing pages otimizadas.',
      priority: 'Alta',
      department: 'Growth'
    });
  }

  // Funding & Specialty
  if (answers.funding_status === 'already_funded') {
    recommendations.push({
      title: 'Otimizar Captação de Recursos',
      description: 'Como você já tem experiência, podemos focar em diversificar suas fontes de fomento e otimizar a prestação de contas.',
      priority: 'Média',
      department: 'Fomento'
    });
  } else if (answers.funding_status === 'interested_incentive') {
    recommendations.push({
      title: 'Planejamento para Leis de Incentivo',
      description: 'Vamos estruturar seu projeto para atender aos requisitos das leis de incentivo e aumentar suas chances de aprovação.',
      priority: 'Alta',
      department: 'Fomento'
    });
  }

  // Normalize scores to be between 10 and 100
  const normalize = (val: number) => Math.min(100, Math.max(10, Math.round(val)));

  return {
    companyName: answers.companyName || 'Empresa Desconhecida',
    answers,
    scores: {
      overall: normalize(overall),
      readiness: normalize(readiness),
      efficiency: normalize(efficiency),
      categories: {
        'Presença Digital': normalize(categories['Presença Digital']),
        'Marca e Conteúdo': normalize(categories['Marca e Conteúdo']),
        'Vendas e Automação': normalize(categories['Vendas e Automação']),
        'Estrutura do Negócio': normalize(categories['Estrutura do Negócio']),
      }
    },
    recommendations: recommendations.sort((a, b) => {
      const priorityWeights = { 'Alta': 3, 'Média': 2, 'Baixa': 1 };
      return priorityWeights[b.priority] - priorityWeights[a.priority];
    })
  };
}
