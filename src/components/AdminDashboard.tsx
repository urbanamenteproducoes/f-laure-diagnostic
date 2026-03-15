import React, { useState, useMemo } from 'react';
import { DiagnosticResult } from '../types';
import { ArrowLeft, Users, FileText, Calendar, ChevronRight, Search, ArrowUpDown } from 'lucide-react';

interface Props {
  diagnostics: DiagnosticResult[];
  onBack: () => void;
  onViewResult: (result: DiagnosticResult) => void;
}

export default function AdminDashboard({ diagnostics, onBack, onViewResult }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedDiagnostics = useMemo(() => {
    let result = [...diagnostics];

    // Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(d => 
        d.companyName.toLowerCase().includes(lowerTerm) ||
        (d.answers.contact_email && d.answers.contact_email.toLowerCase().includes(lowerTerm))
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'score') {
        comparison = a.scores.overall - b.scores.overall;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [diagnostics, searchTerm, sortBy, sortOrder]);

  const toggleSort = (field: 'date' | 'score') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      {/* Header */}
      <header className="flex items-center justify-between px-6 lg:px-20 py-4 sticky top-0 bg-background-dark/80 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button onClick={onBack} aria-label="Go back" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white text-lg font-bold tracking-tight">Painel de Administração</h2>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => (window as any).toggleClientView?.()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700 text-sm font-bold"
          >
            Ver Área do Cliente
          </button>
          <div className="flex items-center gap-2 text-slate-400">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">{diagnostics.length} Leads</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-20 py-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Diagnósticos Concluídos</h1>
          <p className="text-slate-400">Revise e analise perfis de clientes em potencial.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar por empresa ou e-mail..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => toggleSort('date')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${sortBy === 'date' ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600'}`}
            >
              <Calendar className="w-4 h-4" />
              Data
              <ArrowUpDown className="w-4 h-4 opacity-50" />
            </button>
            <button 
              onClick={() => toggleSort('score')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${sortBy === 'score' ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600'}`}
            >
              <FileText className="w-4 h-4" />
              Pontuação
              <ArrowUpDown className="w-4 h-4 opacity-50" />
            </button>
          </div>
        </div>

        {filteredAndSortedDiagnostics.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
            <FileText className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhum diagnóstico encontrado</h3>
            <p className="text-slate-400">Tente ajustar seus filtros de busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredAndSortedDiagnostics.map((diag) => (
              <div 
                key={diag.id}
                onClick={() => onViewResult(diag)}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-primary/50 cursor-pointer transition-all group"
              >
                <div className="flex flex-col gap-1 mb-4 md:mb-0">
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {diag.companyName}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(diag.date).toLocaleDateString()}
                    </span>
                    {diag.answers.contact_email && (
                      <span className="hidden md:inline-block px-2 py-0.5 bg-slate-800 rounded text-xs">
                        {diag.answers.contact_email}
                      </span>
                    )}
                    <span className="px-2 py-0.5 bg-slate-800 rounded text-xs">
                      Pontuação: {diag.scores.overall}/100
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Maior Necessidade</span>
                    <span className="text-sm font-medium text-slate-300">
                      {diag.recommendations[0]?.department || 'Geral'}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
