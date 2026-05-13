import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CMEC_THEME } from '../../constants';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const stored = localStorage.getItem('cmec_socios');
    if (!stored) { setError('No hay socios registrados. Contacta al administrador.'); return; }

    const socios = JSON.parse(stored);
    const socio = socios.find(s => s.email?.toLowerCase() === email.toLowerCase());

    if (!socio) { setError('Email no encontrado. Verifica tus datos.'); return; }
    if (socio.password !== password) { setError('Contraseña incorrecta.'); return; }

    localStorage.setItem('cmec_socio_session', JSON.stringify(socio));
    navigate(CMEC_THEME.routes.SOCIO_DASHBOARD);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-sky-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-lg">
            C
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Área de Socios</h2>
          <p className="mt-2 text-sm text-slate-500">Ingresa con tu email y contraseña.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                placeholder="doctor@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
              <input
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-rose-600 text-sm bg-rose-50 px-4 py-3 rounded-xl">
              <AlertCircle size={16}/> {error}
            </div>
          )}

          <button type="submit" className="w-full flex justify-center py-4 px-4 rounded-2xl text-white bg-sky-900 hover:bg-sky-800 font-bold text-sm transition-all shadow-lg">
            <LogIn size={20} className="mr-2"/> Entrar al Portal
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <AlertCircle size={14}/> Solo miembros certificados del CMEC.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;