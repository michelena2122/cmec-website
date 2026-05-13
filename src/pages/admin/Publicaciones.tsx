import React from 'react';
import { Plus, Trash2, FileText, Mail } from 'lucide-react';

const temasFijos = [
  'Cancer Colorrectal',
  'Colonoscopia diagnostica y terapeutica',
  'Patologia anorrectal',
  'Enfermedad de Crohn y Colitis ulcerosa',
  'Cirugia colorrectal',
  'Piso pelvico e incontinencia',
  'Estomas y colostomias',
  'Urgencias colorrectales',
  'Diverticulosis y diverticulitis',
  'Microbiota intestinal',
  'Inteligencia artificial aplicada a coloproctologia',
];

const AdminPublicaciones = () => {
  const [guardado, setGuardado] = React.useState(false);
  const [data, setData] = React.useState({ publicaciones: [], email: '' });
  const [titulo, setTitulo] = React.useState('');
  const [autores, setAutores] = React.useState('');
  const [tema, setTema] = React.useState(temasFijos[0]);
  const [pdf, setPdf] = React.useState('');

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_publicaciones');
    if (stored) { try { setData(JSON.parse(stored)); } catch {} }
  }, []);

  const guardar = (newData) => {
    const updated = { ...data, ...newData };
    setData(updated);
    localStorage.setItem('cmec_publicaciones', JSON.stringify(updated));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const agregar = () => {
    if (!titulo.trim()) return;
    guardar({ publicaciones: [{ id: Date.now().toString(), titulo, autores, tema, pdf }, ...data.publicaciones] });
    setTitulo(''); setAutores(''); setTema(temasFijos[0]); setPdf('');
  };

  const borrar = (id) => {
    if (confirm('Eliminar?')) guardar({ publicaciones: data.publicaciones.filter(p => p.id !== id) });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">Publicaciones</h1>
        <p className="text-slate-500">Gestiona las publicaciones cientificas del colegio.</p>
      </div>

      {guardado && <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm z-50">Guardado</div>}

      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Email de contacto para publicaciones</h3>
        <div className="flex gap-4">
          <input
            value={data.email}
            onChange={e => guardar({ email: e.target.value })}
            placeholder="publicaciones@cmec.org.mx"
            type="email"
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Agregar Publicacion</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Titulo</label>
            <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Titulo de la publicacion..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Autores</label>
            <input value={autores} onChange={e => setAutores(e.target.value)} placeholder="Dr. Nombre, Dra. Nombre..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tema</label>
            <select value={tema} onChange={e => setTema(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm">
              {temasFijos.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">URL del PDF</label>
            <input value={pdf} onChange={e => setPdf(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
        </div>
        <button onClick={agregar} disabled={!titulo.trim()} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-40">
          <Plus size={16}/> Agregar
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-700 text-sm uppercase">Publicaciones ({data.publicaciones.length})</h3>
        </div>
        {data.publicaciones.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="mx-auto text-slate-200 mb-4" size={48}/>
            <p className="text-slate-400">No hay publicaciones aun.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b border-slate-100">
                <th className="px-6 py-4">Titulo</th>
                <th className="px-6 py-4">Autores</th>
                <th className="px-6 py-4">Tema</th>
                <th className="px-6 py-4">PDF</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.publicaciones.map(pub => (
                <tr key={pub.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4 font-bold text-sm max-w-xs truncate">{pub.titulo}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{pub.autores}</td>
                  <td className="px-6 py-4"><span className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-bold">{pub.tema}</span></td>
                  <td className="px-6 py-4 text-sm">
                    {pub.pdf ? <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="text-sky-600 font-bold hover:underline">Ver PDF</a> : <span className="text-slate-300">Sin PDF</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => borrar(pub.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl opacity-0 group-hover:opacity-100">
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

export default AdminPublicaciones;