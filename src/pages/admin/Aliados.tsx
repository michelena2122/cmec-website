import React from 'react';
import { Plus, Trash2, Users, Upload } from 'lucide-react';

const AdminAliados = () => {
  const [guardado, setGuardado] = React.useState(false);
  const [aliados, setAliados] = React.useState([]);
  const [nombre, setNombre] = React.useState('');
  const [resumen, setResumen] = React.useState('');
  const [foto, setFoto] = React.useState('');
  const [convenio, setConvenio] = React.useState('');

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_aliados');
    if (stored) { try { setAliados(JSON.parse(stored)); } catch {} }
  }, []);

  const guardar = (lista) => {
    setAliados(lista);
    localStorage.setItem('cmec_aliados', JSON.stringify(lista));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const agregar = () => {
    if (!nombre.trim()) return;
    guardar([{ id: Date.now().toString(), nombre, resumen, foto, convenio }, ...aliados]);
    setNombre(''); setResumen(''); setFoto(''); setConvenio('');
  };

  const borrar = (id) => {
    if (confirm('Eliminar aliado?')) guardar(aliados.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">Aliados</h1>
        <p className="text-slate-500">Gestiona los aliados y convenios del colegio.</p>
      </div>

      {guardado && <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm z-50">Guardado</div>}

      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Agregar Aliado</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre del aliado" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Fotografia</label>
  <div className="flex items-center gap-4">
    <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50">
      <Upload size={16} className="text-sky-600"/> Subir foto
      <input type="file" accept="image/*" className="hidden" onChange={async e => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => setFoto(reader.result);
          reader.readAsDataURL(file);
        }
      }}/>
    </label>
    {foto && <img src={foto} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-100"/>}
  </div>
</div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Resumen (200 caracteres)</label>
            <textarea value={resumen} onChange={e => setResumen(e.target.value)} placeholder="Descripcion del aliado..." maxLength={200} rows={3} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm resize-none"/>
            <p className="text-xs text-slate-400 text-right mt-1">{resumen.length}/200</p>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">URL PDF Convenio</label>
            <input value={convenio} onChange={e => setConvenio(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
        </div>
        <button onClick={agregar} disabled={!nombre.trim()} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-40">
          <Plus size={16}/> Agregar
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-700 text-sm uppercase">Aliados ({aliados.length})</h3>
        </div>
        {aliados.length === 0 ? (
          <div className="text-center py-16">
            <Users className="mx-auto text-slate-200 mb-4" size={48}/>
            <p className="text-slate-400">No hay aliados aun.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {aliados.map(aliado => (
              <div key={aliado.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group relative">
                {aliado.foto && <img src={aliado.foto} alt={aliado.nombre} className="w-16 h-16 rounded-xl object-cover border border-slate-200"/>}
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">{aliado.nombre}</h4>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">{aliado.resumen}</p>
                  {aliado.convenio && <a href={aliado.convenio} target="_blank" rel="noopener noreferrer" className="text-sky-600 text-xs font-bold mt-2 inline-block hover:underline">Ver Convenio</a>}
                </div>
                <button onClick={() => borrar(aliado.id)} className="absolute top-3 right-3 p-1.5 text-slate-300 hover:text-rose-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 size={14}/>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAliados;