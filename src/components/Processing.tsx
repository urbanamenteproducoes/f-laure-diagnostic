import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, CheckCircle2, Loader2, Terminal } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const logs = [
  "Pipeline de ingestão de dados inicializado...",
  "Cruzando dados com benchmarks do setor...",
  "Mapeamento heurístico da presença digital...",
  "Sintetizando matrizes estratégicas de avaliação de risco...",
  "Gerando recomendações acionáveis...",
  "Compilação do relatório final..."
];

export default function Processing({ onComplete }: Props) {
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4 seconds total
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, (currentStep / steps) * 100);
      setProgress(newProgress);
      
      const logIdx = Math.floor((newProgress / 100) * logs.length);
      setCurrentLogIdx(Math.min(logIdx, logs.length - 1));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col min-h-screen bg-background-dark items-center justify-center p-6">
      <div className="w-full max-w-2xl flex flex-col items-center">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Analisando seus dados...
          </h1>
          <p className="text-slate-400">Nosso motor neural está processando o perfil do seu negócio.</p>
        </div>

        {/* Scanner Visual */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-primary/20 bg-slate-900 mb-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          
          <motion.div 
            className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_#006eff] opacity-70"
            animate={{ y: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-32 h-32 border-4 border-primary/30 rounded-full flex items-center justify-center border-t-primary border-r-primary animate-spin">
              <div className="animate-spin-reverse">
                <Search className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div className="mt-6 px-4 py-1 bg-primary/20 rounded-full border border-primary/40">
              <span className="text-xs font-mono text-primary uppercase tracking-widest animate-pulse">Processamento em Tempo Real</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800/50 rounded-xl p-6 border border-primary/10 mb-8">
          <div className="flex justify-between items-end mb-4">
            <p className="text-white font-semibold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              Status do Sistema
            </p>
            <p className="text-primary font-bold text-xl">{Math.round(progress)}%</p>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden mb-4">
            <div className="h-full rounded-full bg-primary shadow-[0_0_10px_#006eff]" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-slate-400 text-sm font-mono italic h-6">
            {logs[currentLogIdx]}
          </p>
        </div>

      </div>
    </div>
  );
}
