import React from 'react';
import { Plus, Trash2, BookOpen, Upload } from 'lucide-react';

const AdminRevista = () => {
  const [guardado, setGuardado] = React.useState(false);
  const [revistas, setRevistas] = React.useState([]);
  const [anio, setAnio] = React.useState('');
  const [mes, setMes] = React.useState('Enero');
  const [pdf, setPdf] = React.useState('');

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_revista');
    if (stored) { try { setRevistas(JSON.parse(stored)); } catch {} }
  }, []);

  const guardar = (lista) => {
    setRevistas(lista);
    localStorage.setItem('cmec_revista', JSON.stringify(lista));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const agregar = () => {
    if (!anio || !pdf) return;
    guardar([{ id: Date.now().toString(), anio, mes, pdf }, ...revistas]);
    setAnio(''); setMes('Enero'); setPdf('');
  };

  const borrar = (id) => {
    if (confirm('Eliminar?')) guardar(revistas.filter(r => r.id !== id));
  };

  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">Revista CMEC</h1>
        <p className="text-slate-500">Gestiona las ediciones de la revista por mes y año.</p>
      </div>

      {guardado && <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm z-50">Guardado</div>}

      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Agregar Edicion</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Año</label>
            <input value={anio} onChange={e => setAnio(e.target.value)} placeholder="2025" maxLength={4} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mes</label>
            <select value={mes} onChange={e => setMes(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm">
              {meses.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">PDF de la edicion</label>
  <div className="flex items-center gap-4">
    <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50">
      <Upload size={16} className="text-sky-600"/> Subir PDF
      <input type="file" accept=".pdf" className="hidden" onChange={async e => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => setPdf(reader.result);
          reader.readAsDataURL(file);
        }
      }}/>
    </label>
    {pdf && <span className="text-emerald-600 font-bold text-xs">✓ PDF listo</span>}
  </div>
</div>
        </div>
        <button onClick={agregar} disabled={!anio || !pdf} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-40">
          <Plus size={16}/> Agregar Edicion
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-700 text-sm uppercase">Ediciones ({revistas.length})</h3>
        </div>
        {revistas.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="mx-auto text-slate-200 mb-4" size={48}/>
            <p className="text-slate-400">No hay ediciones aun.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b border-slate-100">
                <th className="px-6 py-4">Año</th>
                <th className="px-6 py-4">Mes</th>
                <th className="px-6 py-4">PDF</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {revistas.map(r => (
                <tr key={r.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4 font-bold text-sm">{r.anio}</td>
                  <td className="px-6 py-4 text-sm">{r.mes}</td>
                  <td className="px-6 py-4 text-sm">
                    {r.pdf ? <a href={r.pdf} target="_blank" rel="noopener noreferrer" className="text-sky-600 font-bold hover:underline">Ver PDF</a> : <span className="text-slate-300">Sin PDF</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => borrar(r.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl opacity-0 group-hover:opacity-100">
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

export default AdminRevista;