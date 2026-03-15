import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, Layers, ShieldCheck, Clock, CheckCircle2, Trophy, Star, ArrowRight, Activity, Users, Lock, ChevronRight, Zap, Video, Calendar, Music, Megaphone, PenTool, LayoutTemplate } from 'lucide-react';

interface Props {
  onStart: () => void;
  onAdmin: () => void;
}

export default function LandingPage({ onStart, onAdmin }: Props) {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });
  const [viewerCount, setViewerCount] = useState(47);

  // Escassez Real: Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Prova Social Dinâmica: Viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Rastreamento Simulado (Pixel)
  const trackConversion = (planName: string) => {
    console.log(`[Pixel] Conversion initiated for: ${planName}`);
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', { content_name: planName });
    }
    onStart(); // Aciona o fluxo de diagnóstico/ação do app
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "F-Laure Diagnostic",
    "url": "https://produtora.urbrasil.com",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "997",
      "highPrice": "4997",
      "priceCurrency": "BRL"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f1823] text-slate-100 font-sans selection:bg-orange-500/30 overflow-x-hidden">
      {/* Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />

      {/* Sticky Navigation Container */}
      <div className="sticky top-0 z-50 w-full">
        {/* Urgency Banner */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-2.5 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-3 relative shadow-lg">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 animate-pulse" />
            VAGAS LIMITADAS: Diagnóstico Gratuito encerra em:
          </span>
          <div className="flex gap-1.5 font-mono text-base bg-black/30 px-2 py-0.5 rounded border border-white/10">
            <span>{String(timeLeft.hours).padStart(2, '0')}:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}:</span>
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Main Header */}
        <header className="flex items-center justify-between px-6 lg:px-20 py-4 bg-[#0f1823]/95 backdrop-blur-md border-b border-white/10 transition-all">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="F-Laure Logo" className="w-10 h-10 rounded-xl shadow-xl shadow-blue-500/10 border border-white/10" />
            <div className="flex flex-col leading-tight">
              <h2 className="text-white text-lg font-black tracking-tighter uppercase">F-Laure</h2>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">Creative Studio</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-8 mr-8">
              <a href="#about" className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Sobre</a>
              <a href="#portfolio" className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Portfólio</a>
              <a href="#plans" className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Planos</a>
            </nav>

            <button 
              onClick={onAdmin} 
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer hidden sm:block uppercase tracking-widest mr-4"
            >
              ADM
            </button>

            <button className="md:hidden p-2 text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>

            <button 
              onClick={() => trackConversion('Header CTA')}
              className="flex items-center justify-center rounded-xl h-11 px-6 bg-blue-600 text-white text-sm font-black transition-all active:scale-95 hover:bg-blue-500 shadow-xl shadow-blue-600/20"
            >
              <span className="sm:inline hidden">Iniciar Diagnóstico</span>
              <span className="sm:hidden inline">Começar</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </header>
      </div>

      <main className="flex flex-col flex-1">
        
        {/* AIDA: ATTENTION & INTEREST (Hero Section) */}
        <section className="relative px-6 lg:px-20 pt-20 pb-28 overflow-hidden flex flex-col items-center text-center">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 max-w-4xl flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
              <Activity className="w-4 h-4" />
              <span>Método Validado por 250+ Empresas</span>
            </div>

            {/* Headline com Número Específico (Attention) */}
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8">
              Aumente sua Lucratividade em <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">37% nos Próximos 90 Dias</span>
            </h1>

            {/* Sub-headline addressing Pain (Interest) */}
            <p className="text-slate-300 text-lg md:text-2xl font-normal leading-relaxed mb-10 max-w-3xl">
              Cansado de estratégias genéricas que custam caro e não trazem retorno? O segredo das marcas líderes finalmente revelado através do nosso Diagnóstico Empresarial Exclusivo.
            </p>

            {/* Dynamic Social Proof */}
            <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium mb-8 bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20">
              <Users className="w-4 h-4" />
              <span>{viewerCount} empreendedores estão visualizando esta página agora</span>
            </div>

            {/* Primary Action */}
            <button 
              onClick={() => trackConversion('Hero CTA')}
              className="group relative flex items-center justify-center gap-3 rounded-2xl h-16 sm:h-20 px-8 sm:px-12 bg-orange-600 text-white text-lg sm:text-xl font-black uppercase tracking-wide transition-all hover:bg-orange-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(234,88,12,0.4)] overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">Garantir Meu Diagnóstico Gratuito</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-xs text-slate-500 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Seus dados estão 100% seguros. Sem compromisso.
            </p>
          </motion.div>
        </section>

        {/* PAS: PROBLEM, AGITATION, SOLUTION (Aversão à Perda) */}
        <section className="px-6 lg:px-20 py-24 bg-[#0a1017] border-y border-white/5 relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Qual o verdadeiro <span className="text-red-400">custo da inércia?</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                <strong className="text-white">Problema:</strong> Todos os dias que você adia uma otimização sistêmica no seu negócio, a concorrência avança.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                <strong className="text-red-400">Agitação:</strong> Estudos mostram que negócios sem diagnóstico de eficiência perdem, em média, R$ 14.500 mensais em gargalos operacionais e oportunidades de vendas ignoradas. Você está literalmente deixando dinheiro na mesa.
              </p>
              <div className="p-6 bg-blue-900/20 border border-blue-500/20 rounded-2xl mt-4">
                <p className="text-blue-300 text-lg leading-relaxed">
                  <strong className="text-blue-400">Solução:</strong> Com o ecossistema F-Laure, aplicamos Inteligência Artificial e Neuromarketing para mapear exatamente onde está o lucro oculto da sua empresa em menos de 48 horas.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Pattern of Reading Z - Image placing */}
              <div className="aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1017] via-transparent to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1000" 
                  alt="Especialista F-Laure analisando dados de crescimento" 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Autoridade Comprovada</p>
                    <p className="text-sm text-emerald-300">+250 empresas transformadas</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DESIRE: Benefícios e Prova Social */}
        <section className="px-6 lg:px-20 py-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-16">
              Resultados Validados por Quem Importa
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-20">
              {[
                { name: "Carlos Henrique Moura", role: "CEO, TechLog Brasil", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256", result: "+42% em Vendas", text: "Antes do diagnóstico da F-Laure, nossos custos de aquisição estavam engolindo a margem. Em 3 meses, não só reduzimos o CAC, como batemos o recorde histórico de faturamento." },
                { name: "Amanda Silveira", role: "Diretora, Clínica Vitae", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256", result: "ROI de 310%", text: "A reestruturação digital baseada em dados superou qualquer expectativa. A clareza que o relatório inicial trouxe foi divisor de águas na nossa tomada de decisão." },
                { name: "Roberto Alves", role: "Fundador, VarejoX", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256", result: "Escala Nacional", text: "Estávamos travados tentando escalar. O mapeamento encontrou gargalos que nenhuma outra agência viu. O diferencial deles é a execução cirúrgica e técnica." }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl flex flex-col items-start text-left relative"
                >
                  <div className="flex gap-1 mb-6 text-orange-400">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8 flex-1 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img src={testimonial.img} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" loading="lazy" />
                    <div>
                      <p className="text-white font-bold">{testimonial.name}</p>
                      <p className="text-sm text-slate-400">{testimonial.role}</p>
                      <p className="text-sm text-emerald-400 font-bold mt-1">{testimonial.result}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bullet points with Icons */}
            <div className="w-full bg-blue-900/10 border border-blue-500/20 rounded-3xl p-8 md:p-12 text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Por que somos a escolha definitiva?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Inteligência Analítica: Decisões baseadas em cruzamento de +50 métricas",
                  "Velocidade de Implementação: Soluções validadas em menos de 15 dias",
                  "Design Psicológico: Telas criadas para guiar o cérebro à compra",
                  "Suporte Dedicado: Um estrategista sênior cuidando da sua conta"
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-500/20 p-1 rounded-full text-blue-400 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-slate-300 text-lg">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ECOSSISTEMA 360 */}
        <section className="px-6 lg:px-20 py-24 bg-[#0d141d] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ecossistema F-Laure 360º</h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto">Não somos apenas uma agência, somos uma produtora e assessoria completa. Integramos as principais vertentes da arte, mídia e negócios para blindar a sua marca e escalar sua carreira ou projeto corporativo.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Video, title: "Audiovisual Master", desc: "Produção de filmes, comerciais, videoclipes, curtas, médias, longas e ensaios fotográficos de altíssimo nível." },
                { icon: Megaphone, title: "Marketing & Entretenimento", desc: "Gestão de tráfego, social media IA, sites, blogs, além de produção artística de Shows e Espetáculos de Dança." },
                { icon: Users, title: "Agenciamento (Casting)", desc: "Gestão de carreira para atores, cantores, dançarinos, bandas musicais, grupos de pagode, e corais." },
                { icon: Calendar, title: "Eventos & Leis Culturais", desc: "Produção de festas e captação de recursos especializada via Leis de Incentivo, Editais e Projetos Sociais (Rouanet, etc)." }
              ].map((item, i) => (
                <div key={i} className="bg-slate-800/20 border border-slate-700/30 p-8 rounded-3xl hover:border-blue-500/30 transition-colors group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                    <item.icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ESTRUTURA DE PLANOS (Anchor Pricing, Scarcity, Most Popular badge) */}
        <section className="px-6 lg:px-20 py-24 bg-[#0a1017]" id="planos">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-6">
              Planos Desenhados para Escalar
            </h2>
            <p className="text-slate-400 text-lg text-center max-w-2xl mb-16">
              Escolha a estrutura ideal para o seu momento atual. Todos os planos incluem nossa <span className="text-white font-bold">Garantia Blindada de 30 Dias</span>.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full items-start">
              
              {/* PLANO GRATUITO: DIAGNÓSTICO E PARECER */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 flex flex-col h-full relative">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700/80 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                  Serviço Essencial
                </div>
                <h3 className="text-2xl font-bold text-slate-300 mb-2 mt-2">Diagnóstico Inicial</h3>
                <p className="text-slate-400 text-sm mb-6 h-12">O primeiro e mais fundamental serviço. Parecer técnico da nossa equipe sobre o seu estado atual.</p>
                <div className="mb-8 border-b border-slate-700/50 pb-8 mt-auto">
                  <p className="text-slate-500 line-through text-xs mb-1">Preço Normal: R$ 500,00</p>
                  <p className="text-emerald-400 text-4xl font-black">
                    Gratuito
                  </p>
                </div>
                <ul className="flex flex-col gap-4 mb-8">
                  {['Avaliação completa de Gargalos', 'Análise de Material/Portfólio', 'Mapeamento de Leis/Editais aplicáveis', 'Draft de Estratégia Inicial'].map((ft, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {ft}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => {
                    trackConversion('Diagnostico CTA');
                  }}
                  className="w-full py-4 rounded-xl bg-orange-600/10 text-orange-400 border border-orange-500/20 font-bold hover:bg-orange-600/20 hover:border-orange-500/50 transition-colors mt-auto"
                >
                  Iniciar Avaliação
                </button>
              </div>
              {/* PLANO BASIC */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-3xl p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-300 mb-2">Fundação</h3>
                <p className="text-slate-400 text-sm mb-6 h-10">Ideal para negócios validando presença digital.</p>
                <div className="mb-8 border-b border-slate-700/50 pb-8 mt-auto">
                  <p className="text-slate-500 line-through text-sm mb-1">De R$ 2.997,00</p>
                  <p className="text-white text-4xl font-black flex items-baseline gap-1">
                    <span className="text-2xl text-slate-400">R$</span> 997 <span className="text-sm font-normal text-slate-400">/mês</span>
                  </p>
                </div>
                <ul className="flex flex-col gap-4 mb-8">
                  {['Identidade Visual e Social Media Base', 'Design de Landing Page / Blog', 'Ensaios Fotográficos Iniciais', 'Suporte em 48h'].map((ft, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {ft}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => trackConversion('Plano Fundação')}
                  className="w-full py-4 rounded-xl border-2 border-slate-600 text-white font-bold hover:bg-slate-700 transition-colors mt-auto"
                >
                  Começar com Fundação
                </button>
              </div>

              {/* PLANO PRO (Recomendado/Anchor) */}
              <div className="bg-gradient-to-b from-blue-900/60 to-[#0f1823] border border-blue-500 relative rounded-3xl p-8 shadow-2xl shadow-blue-900/30 transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-emerald-400 text-[#0f1823] text-sm font-black uppercase tracking-widest px-6 py-1.5 rounded-full">
                  Mais Popular
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 mt-4">Growth Estratégico</h3>
                <p className="text-blue-200 text-sm mb-6 h-10">Para empresas que precisam escalar vendas massivamente.</p>
                <div className="mb-8 border-b border-blue-500/30 pb-8">
                  <p className="text-blue-300/50 line-through text-sm mb-1">De R$ 5.997,00</p>
                  <p className="text-white text-5xl font-black flex items-baseline gap-1">
                    <span className="text-2xl text-blue-300">R$</span> 1.997 <span className="text-sm font-normal text-blue-300">/mês</span>
                  </p>
                </div>
                <ul className="flex flex-col gap-4 mb-8">
                  {['Tudo do Fundação', 'Produção Audiovisual e Comercial', 'Agenciamento e Gestão de Carreira', 'Automação Estratégica IA', 'Eventos e Captação de Recursos (Leis)'].map((ft, i) => (
                    <li key={i} className="flex items-start gap-3 text-white text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /> {ft}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => trackConversion('Plano Growth')}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-lg transition-colors shadow-lg shadow-blue-600/20 flex justify-center items-center gap-2"
                >
                  Escalar Agora <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-blue-300 mt-4 flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3 text-orange-400" /> Bônus Limitado: Mentoria C-Level Incluída
                </p>
              </div>

              {/* PLANO PREMIUM */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-3xl p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-300 mb-2">Corporate AI</h3>
                <p className="text-slate-400 text-sm mb-6 h-10">Ecossistema complexo feito para operações Enterprise.</p>
                <div className="mb-8 border-b border-slate-700/50 pb-8 mt-auto">
                  <p className="text-slate-500 line-through text-sm mb-1">Preço Regular Ref: R$ 12k+</p>
                  <p className="text-white text-4xl font-black flex items-baseline gap-1">
                    <span className="text-2xl text-slate-400">R$</span> 4.997 <span className="text-sm font-normal text-slate-400">/mês</span>
                  </p>
                </div>
                <ul className="flex flex-col gap-4 mb-8">
                  {['Audiovisual (Filmes, Curtas e Longas)', 'Captação Avançada (Leis e Editais)', 'Ecossistema Tecnológico Interligado', 'Produção de Mega Eventos e Shows', 'Time Dedicado Master (Atores/Músicos)'].map((ft, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {ft}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => trackConversion('Plano Corporate')}
                  className="w-full py-4 rounded-xl border-2 border-slate-600 text-white font-bold hover:bg-slate-700 transition-colors mt-auto"
                >
                  Falar com Consultor
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* COMPROMISSO: Reciprocidade & Garantia (If-Then) */}
        <section className="px-6 lg:px-20 py-20 bg-emerald-900/20 border-y border-emerald-500/20">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-emerald-950/40 p-10 rounded-3xl border border-emerald-500/30">
            <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex flex-shrink-0 items-center justify-center">
              <ShieldCheck className="w-12 h-12 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Garantia Condicional de Lucro</h3>
              <p className="text-emerald-100/80 text-lg leading-relaxed mb-6">
                <strong>Se você aplicar nossa estratégia validada e não obtiver um ROI positivo em 90 dias, então nós trabalharemos de graça para você até atingir a meta estabelecida.</strong> O risco está 100% sobre nossos ombros.
              </p>
              <button 
                onClick={() => trackConversion('Garantia CTA')}
                className="text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-2"
              >
                Ler termos transparentes <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer minimalista */}
      <footer className="bg-black py-12 px-6 lg:px-20 flex flex-col items-center border-t border-white/5">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-6 h-6 text-slate-500" />
          <h4 className="text-slate-400 font-bold text-lg">F-Laure / Hard Produções</h4>
        </div>
        <p className="text-slate-600 text-sm mb-4 text-center max-w-lg">
          Transformando empresas locais em líderes de mercado através do ecossistema digital inteligente.
        </p>
        <p className="text-slate-700 text-xs">
          Copyright © {new Date().getFullYear()} F-Laure. Todos os direitos reservados. 
        </p>
      </footer>
    </div>
  );
}
