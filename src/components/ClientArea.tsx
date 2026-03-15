import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack?: () => void;
}

const ClientArea: React.FC<Props> = ({ onBack }) => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      {onBack && (
        <header className="px-6 lg:px-20 py-4 border-b border-slate-800 flex items-center gap-4">
           <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold">
            <ArrowLeft className="w-5 h-5" />
            Voltar para Administração
          </button>
        </header>
      )}
      
      <div className="p-8 px-6 lg:px-20 max-w-7xl mx-auto w-full flex-1 text-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Área do Cliente (Visualização Adm)</h2>
          {!onBack && (
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-bold"
            >
              Sair
            </button>
          )}
        </div>
        
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
          <p className="mb-4">Bem-vindo, {user?.displayName || 'Administrador'}.</p>
          <h3 className="text-xl font-semibold mb-4 text-white">Serviços Disponíveis</h3>
          <ul className="space-y-3 list-disc list-inside">
            <li><a href="#" className="text-emerald-400 hover:underline">Acesso ao seu relatório completo</a></li>
            <li><a href="#" className="text-emerald-400 hover:underline">Consultoria agendada</a></li>
            <li><a href="#" className="text-emerald-400 hover:underline">Recursos de fomento (Editais)</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClientArea;
