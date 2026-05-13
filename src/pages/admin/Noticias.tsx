import React from 'react';
import { Megaphone, Plus, Trash2, Calendar, Save, X } from 'lucide-react';

interface Noticia {
  id: string;
  titulo: string;
  fecha: string;
}

const AdminNoticias = () => {
  const [noticias, setNoticias] = React.useState<Noticia[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [titulo, setTitulo] = React.useState('');
  const [fecha, setFecha] = React.useState('');
  const [guardado, setGuardado] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_noticias');
    if (stored) {
      try { setNoticias(JSON.parse(stored)); } catch {}
    }
  }, []);

  const guardar = (lista: Noticia[]) => {
    setNoticias(lista);
    localStorage.setItem('cmec_noticias', JSON.stringify(lista));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const agregar = () => {
    if (!titulo.trim() || !fecha.trim()) return;
    guardar([{ id: Date.now().toString(), titulo: titulo.trim(), fecha }, ...noticias]);
    setTitulo('');
    setFecha('');
    setShowForm(false);
  };

  const borrar = (id: string) => {
    if (confirm('Eliminar esta noticia?')) guardar(noticias.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Noticias Institucionales</h1>
          <p className="text-slate-500">Las noticias que captures aqui se muestran en la pagina publica.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-sky-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
          <Plus size={20} /> Agregar Noticia
        </button>
      </div>
      {showForm && (
        <div className="bg-white rounded-3xl border-2 border-sky-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 text-xl">Nueva Noticia</h3>
            <button onClick={() => setShowForm(false)}><X size={20} /></button>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Fecha</label>
              <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Titulo</label>
              <input type="text" placeholder="Titulo de la noticia..." value={titulo} onChange={e => setTitulo(e.target.value)} maxLength={120} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm" />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm">Cancelar</button>
            <button onClick={agregar} disabled={!titulo.trim() || !fecha.trim()} className="px-6 py-3 bg-sky-900 text-white rounded-xl font-bold text-sm flex items-center gap-2 disabled:opacity-40">
              <Save size={16} /> Guardar
            </button>
          </div>
        </div>
      )}
      {guardado && (
        <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm z-50">
          Guardado correctamente
        </div>
      )}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-700 text-sm uppercase">Noticias publicadas ({noticias.length})</h3>
        </div>
        {noticias.length === 0 ? (
          <div className="text-center py-20">
            <Megaphone className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400">No hay noticias aun.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b border-slate-100">
                <th className="px-8 py-4">Fecha</th>
                <th className="px-8 py-4">Titulo</th>
                <th className="px-8 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {noticias.map(noticia => (
                <tr key={noticia.id} className="hover:bg-slate-50 group">
                  <td className="px-8 py-5 text-xs font-bold text-slate-500">{noticia.fecha}</td>
                  <td className="px-8 py-5 font-semibold text-slate-800 text-sm">{noticia.titulo}</td>
                  <td className="px-8 py-5 text-right">
                    <button onClick={() => borrar(noticia.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl opacity-0 group-hover:opacity-100">
                      <Trash2 size={16} />
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

export default AdminNoticias;
