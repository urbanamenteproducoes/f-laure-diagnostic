import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const ClientArea: React.FC = () => {
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
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Área do Cliente</h2>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sair
        </button>
      </div>
      
      <div className="bg-slate-800 p-6 rounded-xl">
        <p className="mb-4">Bem-vindo, {user?.displayName || 'Cliente'}.</p>
        <h3 className="text-xl font-semibold mb-4">Serviços Disponíveis</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li><a href="#" className="text-emerald-400 hover:underline">Acesso ao seu relatório completo</a></li>
          <li><a href="#" className="text-emerald-400 hover:underline">Consultoria agendada</a></li>
          <li><a href="#" className="text-emerald-400 hover:underline">Recursos de captação</a></li>
        </ul>
      </div>
    </div>
  );
};

export default ClientArea;
