import React from 'react';
import { Save, Image } from 'lucide-react';

const AdminHeader = () => {
  const [guardado, setGuardado] = React.useState(false);
  const [data, setData] = React.useState({
    logo1: '', logo2: '', logo3: '', logo4: ''
  });

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_header');
    if (stored) { try { setData(JSON.parse(stored)); } catch {} }
  }, []);

  const guardar = () => {
    localStorage.setItem('cmec_header', JSON.stringify(data));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">Encabezado</h1>
        <p className="text-slate-500">Configura los logotipos que aparecen en el encabezado del sitio.</p>
      </div>

      {guardado && <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm z-50">Guardado</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1,2,3,4].map(n => (
          <div key={n} className="bg-white rounded-3xl border border-slate-200 p-8">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Image className="text-sky-600" size={20}/> Logotipo {n}
            </h3>
            {data[`logo${n}`] && (
              <div className="mb-4 p-4 bg-slate-50 rounded-xl flex items-center justify-center">
                <img src={data[`logo${n}`]} alt={`Logo ${n}`} className="max-h-20 object-contain"/>
              </div>
            )}
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">URL de imagen</label>
            <input
              value={data[`logo${n}`]}
              onChange={e => setData({...data, [`logo${n}`]: e.target.value})}
              placeholder="https://..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={guardar} className="flex items-center gap-2 bg-sky-900 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-sky-900/20 hover:bg-sky-800 transition-all">
          <Save size={16}/> Guardar Encabezado
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;