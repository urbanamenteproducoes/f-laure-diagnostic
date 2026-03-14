import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { ArrowLeft } from 'lucide-react';

interface LoginProps {
  setView: (view: 'landing' | 'quiz' | 'processing' | 'report' | 'admin' | 'login' | 'clientArea') => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ setView, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRedirect = (email: string) => {
    const isAdmin = email === 'produtorahc@gmail.com';
    setView(isAdmin ? 'admin' : 'clientArea');
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.email) {
        handleRedirect(result.user.email);
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
      setError('Erro ao fazer login com Google.');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user.email) {
        handleRedirect(result.user.email);
      }
    } catch (err) {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background-dark">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 text-slate-400 hover:text-white flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" /> Voltar
      </button>
      
      <div className="w-full max-w-sm bg-slate-900 p-8 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        
        <form onSubmit={handleEmailLogin} className="mb-6">
          <input 
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded mb-4"
          />
          <input 
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded mb-4"
          />
          <button 
            type="submit"
            className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-primary/90 transition"
          >
            Entrar
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900 text-slate-400">ou</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition"
        >
          Entrar com Google
        </button>
      </div>
    </div>
  );
};

export default Login;
