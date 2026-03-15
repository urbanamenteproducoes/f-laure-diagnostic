import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import Processing from './components/Processing';
import Report from './components/Report';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import ClientArea from './components/ClientArea';
import { generateDiagnostic } from './utils/diagnosticLogic';
import { DiagnosticResult } from './types';

export default function App() {
  const [view, setView] = useState<'landing' | 'quiz' | 'processing' | 'report' | 'admin' | 'login' | 'clientArea'>('landing');
  
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [currentResult, setCurrentResult] = useState<DiagnosticResult | null>(null);
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('f_laure_diagnostics');
    if (saved) {
      try {
        setDiagnostics(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved diagnostics");
      }
    }
  }, []);

  // Expose view switcher to window for Admin component access
  useEffect(() => {
    (window as any).toggleClientView = () => setView('clientArea');
  }, []);

  const handleQuizComplete = (finalAnswers: Record<string, any>) => {
    setAnswers(finalAnswers);
    setView('processing');
  };

  const handleProcessingComplete = async () => {
    const resultData = generateDiagnostic(answers);
    const newDiagnostic: DiagnosticResult = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      ...resultData
    };
    
    setCurrentResult(newDiagnostic);
    
    const updatedDiagnostics = [newDiagnostic, ...diagnostics];
    setDiagnostics(updatedDiagnostics);
    localStorage.setItem('f_laure_diagnostics', JSON.stringify(updatedDiagnostics));
    
    // Tentar notificar o admin localmente via Notificações de Navegador
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("F-Laure: Novo Diagnóstico Finalizado!", {
          body: `Score: ${newDiagnostic.scores.overall}% - ID: ${newDiagnostic.id}`,
          icon: "/favicon.ico"
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }

    // Disparar envio de e-mail via Vercel Serverless para produtorahc@gmail.com
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diagnosticId: newDiagnostic.id,
          diagnosticScore: newDiagnostic.scores.overall,
          companyName: answers.companyName || answers['1'] || 'Empresa Anônima',
          resultData: newDiagnostic
        })
      });
    } catch (e) {
      console.warn("API de email não configurada em dev / falhou:", e);
    }

    setView('report');
  };

  const handleViewAdminResult = (result: DiagnosticResult) => {
    setCurrentResult(result);
    setView('report');
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'landing' && (
            <LandingPage 
              onStart={() => setView('quiz')} 
              onAdmin={() => setView('login')} 
            />
          )}
          
          {view === 'quiz' && (
            <Quiz 
              onComplete={handleQuizComplete} 
              onCancel={() => setView('landing')} 
            />
          )}
          
          {view === 'processing' && (
            <Processing 
              onComplete={handleProcessingComplete} 
            />
          )}
          
          {view === 'report' && currentResult && (
            <Report 
              result={currentResult} 
              onRestart={() => setView('landing')} 
              onLogin={() => setView('login')}
            />
          )}
          
          {view === 'login' && (
            <Login 
              setView={setView} 
              onBack={() => setView('landing')} 
            />
          )}
          
          {view === 'clientArea' && (
            <ClientArea onBack={() => setView('admin')} />
          )}
          
          {view === 'admin' && (
            <AdminDashboard 
              diagnostics={diagnostics} 
              onBack={() => setView('landing')}
              onViewResult={handleViewAdminResult}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
