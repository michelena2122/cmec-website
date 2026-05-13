import React from 'react';
import { Plus, Trash2, Save, Calendar, Clock, Video, Link } from 'lucide-react';

const AdminSesiones = () => {
  const [sesiones, setSesiones] = React.useState([]);
  const [guardado, setGuardado] = React.useState(false);
  const [mes, setMes] = React.useState('');
  const [dia, setDia] = React.useState('');
  const [hora, setHora] = React.useState('');
  const [tema, setTema] = React.useState('');
  const [ponente1, setPonente1] = React.useState('');
  const [ponente2, setPonente2] = React.useState('');
  const [ponente3, setPonente3] = React.useState('');
  const [ponente4, setPonente4] = React.useState('');
  const [ponente5, setPonente5] = React.useState('');
  const [ponente6, setPonente6] = React.useState('');
  const [tipo, setTipo] = React.useState('Zoom');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_sesiones');
    if (stored) { try { setSesiones(JSON.parse(stored)); } catch {} }
  }, []);

  const guardar = (lista) => {
    setSesiones(lista);
    localStorage.setItem('cmec_sesiones', JSON.stringify(lista));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const agregar = () => {
    if (!mes || !dia || !hora || !tema) return;
    const nueva = {
      id: Date.now().toString(), mes, dia, hora, tema, tipo, link,
      ponentes: [ponente1, ponente2, ponente3, ponente4, ponente5, ponente6].filter(p => p.trim() !== '')
    };
    guardar([...sesiones, nueva]);
    setMes(''); setDia(''); setHora(''); setTema('');
    setPonente1(''); setPonente2(''); setPonente3('');
    setPonente4(''); setPonente5(''); setPonente6('');
    setTipo('Zoom'); setLink('');
  };

  const borrar = (id) => {
    if (confirm('Eliminar esta sesion?')) guardar(sesiones.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">Sesiones Académicas</h1>
        <p className="text-slate-500">Las sesiones que captures aqui se muestran en la pagina publica.</p>
      </div>

      {guardado && (
        <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm z-50">
          Guardado correctamente
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 text-xl mb-6">Nueva Sesion</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mes</label>
            <input value={mes} onChange={e => setMes(e.target.value)} placeholder="Mayo" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Dia (2 digitos)</label>
            <input value={dia} onChange={e => setDia(e.target.value)} placeholder="15" maxLength={2} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Hora (00:00)</label>
            <input value={hora} onChange={e => setHora(e.target.value)} placeholder="20:00" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tema (90 caracteres)</label>
          <input value={tema} onChange={e => setTema(e.target.value)} placeholder="Tema de la sesion..." maxLength={90} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          <p className="text-xs text-slate-400 text-right mt-1">{tema.length}/90</p>
        </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Ponente 1</label>
    <input value={ponente1} onChange={e => setPonente1(e.target.value)} placeholder="Dr. Nombre" maxLength={30} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
  </div>
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Ponente 2</label>
    <input value={ponente2} onChange={e => setPonente2(e.target.value)} placeholder="Dr. Nombre" maxLength={30} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
  </div>
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Ponente 3</label>
    <input value={ponente3} onChange={e => setPonente3(e.target.value)} placeholder="Dr. Nombre" maxLength={30} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
  </div>
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Ponente 4</label>
    <input value={ponente4} onChange={e => setPonente4(e.target.value)} placeholder="Dr. Nombre" maxLength={30} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
  </div>
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Ponente 5</label>
    <input value={ponente5} onChange={e => setPonente5(e.target.value)} placeholder="Dr. Nombre" maxLength={30} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
  </div>
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Ponente 6</label>
    <input value={ponente6} onChange={e => setPonente6(e.target.value)} placeholder="Dr. Nombre" maxLength={30} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
  </div>
</div>

<div className="grid grid-cols-2 gap-4 mb-6">
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Plataforma</label>
    <select value={tipo} onChange={e => setTipo(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm">
      <option>Zoom</option>
      <option>YouTube</option>
              <option>Meet</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Link de sesion</label>
            <input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
        </div>
        <button onClick={agregar} disabled={!mes || !dia || !hora || !tema} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-3 rounded-xl font-bold text-sm disabled:opacity-40">
          <Plus size={16}/> Agregar Sesion
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-700 text-sm uppercase">Sesiones programadas ({sesiones.length})</h3>
        </div>
        {sesiones.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="mx-auto text-slate-200 mb-4" size={48}/>
            <p className="text-slate-400">No hay sesiones aun.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b border-slate-100">
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Hora</th>
                <th className="px-6 py-4">Tema</th>
                <th className="px-6 py-4">Ponentes</th>
                <th className="px-6 py-4">Plataforma</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sesiones.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4 font-bold text-sm">{s.dia} {s.mes}</td>
                  <td className="px-6 py-4 text-sm">{s.hora}</td>
                  <td className="px-6 py-4 text-sm max-w-xs truncate">{s.tema}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{s.ponentes.join(', ')}</td>
                  <td className="px-6 py-4"><span className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-bold">{s.tipo}</span></td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => borrar(s.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl opacity-0 group-hover:opacity-100">
                      <Trash2 size={16}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminSesiones;