import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export default function ScheduleMeetingModal({ isOpen, onClose, initialEmail }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: initialEmail || '',
    phone: '',
    preferredTime: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Agendamento:', formData);
    alert('Solicitação de reunião enviada com sucesso!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Agendar Reunião</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1">Nome</label>
            <input 
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">E-mail</label>
            <input 
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Telefone</label>
            <input 
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Horário Preferencial</label>
            <select 
              required
              value={formData.preferredTime}
              onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
            >
              <option value="">Selecione...</option>
              <option value="morning">Manhã (09:00 - 12:00)</option>
              <option value="afternoon">Tarde (13:00 - 18:00)</option>
            </select>
          </div>
          <button 
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all mt-4"
          >
            Enviar Solicitação
          </button>
        </form>
      </div>
    </div>
  );
}
