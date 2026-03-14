import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Layers, Building2, Globe, Palette, Zap, Users, Target, Cpu } from 'lucide-react';
import { quizSteps } from '../data/quizSteps';

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Globe,
  Palette,
  Zap,
  Users,
  Target
};

interface Props {
  onComplete: (answers: Record<string, any>) => void;
  onCancel: () => void;
}
export default function Quiz({ onComplete, onCancel }: Props) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [emailError, setEmailError] = useState<string | null>(null);

  const checkCondition = (condition?: any, currentAnswers: any = answers) => {
    if (!condition) return true;
    const { field, operator, value } = condition;
    const answer = currentAnswers[field];

    switch (operator) {
      case 'equals':
        return answer === value;
      case 'not_equals':
        return answer !== value;
      case 'contains':
        return Array.isArray(answer) && answer.includes(value);
      case 'not_contains':
        return Array.isArray(answer) && !answer.includes(value);
      default:
        return true;
    }
  };

  const activeSteps = quizSteps.filter(s => s.questions.some(q => checkCondition(q.condition)));
  
  // Guard clause if activeSteps changes abruptly
  const validStepIdx = Math.min(currentStepIdx, activeSteps.length - 1);
  const step = activeSteps[validStepIdx];
  const progress = ((validStepIdx) / activeSteps.length) * 100;

  const handleAnswer = (questionId: string, value: any) => {
    if (questionId === 'contact_email') {
      setEmailError(null);
    }
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (step.questions.some(q => q.id === 'contact_email')) {
      const email = answers['contact_email'];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        setEmailError('Por favor, insira um endereço de e-mail válido.');
        return;
      }
    }
    setEmailError(null);

    if (validStepIdx < activeSteps.length - 1) {
      setCurrentStepIdx(validStepIdx + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (validStepIdx > 0) {
      setCurrentStepIdx(validStepIdx - 1);
    } else {
      onCancel();
    }
  };


  const visibleQuestions = step.questions.filter(q => checkCondition(q.condition));

  const isStepComplete = visibleQuestions.every(q => {
    const val = answers[q.id];
    if (q.type === 'multiple_choice') return Array.isArray(val) && val.length > 0;
    return val !== undefined && val !== '';
  });

  const StepIcon = step.icon && iconMap[step.icon] ? iconMap[step.icon] : Layers;

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      {/* Header & Progress */}
      <div className="w-full max-w-3xl mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-primary" />
            <h2 className="text-white font-bold">F-Laure / Hard Produções</h2>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-white">Cancelar</button>
        </header>

        <div className="flex flex-col gap-3 mb-10">
          <div className="flex justify-between items-end">
            <p className="text-white text-lg font-semibold">Passo {currentStepIdx + 1} de {quizSteps.length}</p>
            <p className="text-primary text-sm font-bold">{Math.round(progress)}% Concluído</p>
          </div>
          <div className="rounded-full bg-slate-800 h-2.5 overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <StepIcon className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{step.title}</h1>
              </div>
              <p className="text-slate-400 text-lg">{step.subtitle}</p>
            </div>

            <div className="flex flex-col gap-8">
              {visibleQuestions.map(q => (
                <div key={q.id} className="flex flex-col gap-4">
                  <label id={`label-${q.id}`} className="text-white font-semibold text-lg">{q.label}</label>
                  
                  {q.type === 'text' && (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        aria-labelledby={`label-${q.id}`}
                        value={answers[q.id] || ''}
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        className={`bg-slate-900/50 border-2 rounded-xl px-4 py-4 text-white focus:outline-none transition-colors text-lg ${
                          q.id === 'contact_email' && emailError 
                            ? 'border-rose-500 focus:border-rose-500' 
                            : 'border-slate-800 focus:border-primary'
                        }`}
                      />
                      {q.id === 'contact_email' && emailError && (
                        <span className="text-rose-500 text-sm font-medium">{emailError}</span>
                      )}
                    </div>
                  )}

                  {q.type === 'single_choice' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="radiogroup" aria-labelledby={`label-${q.id}`}>
                      {q.options?.map(opt => {
                        const selected = answers[q.id] === opt.value;
                        return (
                          <div
                            key={opt.value}
                            onClick={() => handleAnswer(q.id, opt.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleAnswer(q.id, opt.value);
                              }
                            }}
                            role="radio"
                            aria-checked={selected}
                            tabIndex={0}
                            className={`group flex items-start gap-4 rounded-xl border-2 p-5 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark ${
                              selected ? 'border-primary bg-primary/10' : 'border-slate-800 bg-white/5 hover:border-primary/50'
                            }`}
                          >
                            <div className="pt-1">
                              <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${selected ? 'border-primary' : 'border-slate-600'}`}>
                                {selected && <div className="h-3 w-3 rounded-full bg-primary" />}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-white text-lg font-bold mb-1">{opt.label}</p>
                              {opt.description && <p className="text-slate-400 text-sm leading-relaxed">{opt.description}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'multiple_choice' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="group" aria-labelledby={`label-${q.id}`}>
                      {q.options?.map(opt => {
                        const selectedArr = answers[q.id] || [];
                        const selected = selectedArr.includes(opt.value);
                        
                        const toggle = () => {
                          if (selected) {
                            handleAnswer(q.id, selectedArr.filter((v: string) => v !== opt.value));
                          } else {
                            handleAnswer(q.id, [...selectedArr, opt.value]);
                          }
                        };

                        return (
                          <div
                            key={opt.value}
                            onClick={toggle}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggle();
                              }
                            }}
                            role="checkbox"
                            aria-checked={selected}
                            tabIndex={0}
                            className={`group flex items-start gap-4 rounded-xl border-2 p-5 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark ${
                              selected ? 'border-primary bg-primary/10' : 'border-slate-800 bg-white/5 hover:border-primary/50'
                            }`}
                          >
                            <div className="pt-1">
                              <div className={`h-6 w-6 rounded border-2 flex items-center justify-center ${selected ? 'border-primary bg-primary' : 'border-slate-600'}`}>
                                {selected && <Check className="w-4 h-4 text-white" />}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-white text-lg font-bold mb-1">{opt.label}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-10 mt-10 border-t border-slate-800">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-slate-400 hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <button 
            onClick={handleNext}
            disabled={!isStepComplete}
            className="flex items-center gap-2 px-10 py-3 rounded-lg font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {currentStepIdx === quizSteps.length - 1 ? 'Gerar Relatório' : 'Continuar'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
