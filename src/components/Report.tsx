import React, { useState } from 'react';
import { DiagnosticResult } from '../types';
import { Download, Share2, TrendingUp, TrendingDown, Lightbulb, Map, PieChart, ArrowLeft, RefreshCw, Calendar } from 'lucide-react';
import ScheduleMeetingModal from './ScheduleMeetingModal';

interface Props {
  result: DiagnosticResult;
  onRestart: () => void;
  onLogin: () => void;
}

export default function Report({ result, onRestart, onLogin }: Props) {
  const { scores, recommendations, companyName, answers } = result;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-6 md:px-10 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="text-primary">
            <PieChart className="w-8 h-8" />
          </div>
          <h2 className="text-white text-lg font-bold tracking-tight">Estratégia de Crescimento</h2>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Baixar relatório" className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-800 text-white hover:bg-slate-700 transition-all border border-slate-700">
            <Download className="w-5 h-5" />
          </button>
          <button aria-label="Compartilhar relatório" className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-800 text-white hover:bg-slate-700 transition-all border border-slate-700">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-10 lg:px-20 py-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded uppercase tracking-wider border border-primary/30">
                Diagnóstico Concluído
              </span>
              <span className="text-slate-400 text-sm">{companyName}</span>
            </div>
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Relatório Estratégico de Crescimento
            </h1>
            <p className="text-slate-400 text-lg font-normal">
              Análise detalhada do desempenho geral e prontidão de mercado
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary/10 text-primary px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/20 transition-all border border-primary/30"
            >
              <Calendar className="w-5 h-5" />
              Agendar Reunião
            </button>
            <button 
              onClick={onLogin}
              className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-700 transition-all border border-slate-700"
            >
              Acessar Área do Cliente
            </button>
            <button 
              onClick={onRestart}
              className="bg-primary text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <RefreshCw className="w-5 h-5" />
              Gerar Novos Insights
            </button>
          </div>
        </div>

        <ScheduleMeetingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          initialEmail={answers['contact_email']}
        />

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Desempenho Geral', value: scores.overall, icon: PieChart, trend: '+5.2%', up: true },
            { label: 'Prontidão de Mercado', value: scores.readiness, icon: Map, trend: '+2.1%', up: true },
            { label: 'Índice de Eficiência', value: scores.efficiency, icon: TrendingUp, trend: '-1.4%', up: false },
          ].map((kpi, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-xl p-8 bg-slate-900/50 border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <kpi.icon className="w-16 h-16 text-primary" />
              </div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{kpi.label}</p>
              <div className="flex items-end gap-2">
                <p className="text-white text-5xl font-bold leading-tight">{kpi.value}<span className="text-2xl text-slate-500">/100</span></p>
                <span className={`text-sm font-bold flex items-center mb-2 ${kpi.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {kpi.up ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {kpi.trend}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-2">
                <div className="bg-primary h-full rounded-full" style={{ width: `${kpi.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Charts */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-white text-xl font-bold">Desempenho por Categoria</h2>
              </div>
              <div className="space-y-6">
                {Object.entries(scores.categories).map(([category, score]) => (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">{category}</span>
                      <span className="text-primary font-bold">{score}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col h-full overflow-hidden">
              <div className="p-6 border-b border-slate-800 bg-slate-900">
                <h2 className="text-white text-xl font-bold flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  Recomendações
                </h2>
                <p className="text-slate-400 text-sm mt-1">Ações prioritárias baseadas nos dados atuais</p>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto max-h-[500px]">
                {recommendations.map((rec, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase border ${
                        rec.priority === 'Alta' ? 'bg-rose-500/20 text-rose-500 border-rose-500/30' :
                        rec.priority === 'Média' ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' :
                        'bg-primary/20 text-primary border-primary/30'
                      }`}>
                        Prioridade {rec.priority}
                      </span>
                      <span className="text-slate-500 text-xs">{rec.department}</span>
                    </div>
                    <h4 className="text-slate-100 font-semibold group-hover:text-primary transition-colors">{rec.title}</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{rec.description}</p>
                  </div>
                ))}
                {recommendations.length === 0 && (
                  <p className="text-slate-400 text-sm text-center py-8">Nenhuma recomendação crítica no momento.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
