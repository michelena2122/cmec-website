import React from 'react';
import { Save, Plus, Trash2, FileText, Upload } from 'lucide-react';

const AdminNosotros = () => {
  const [activeTab, setActiveTab] = React.useState('texto');
  const [guardado, setGuardado] = React.useState(false);
  const [data, setData] = React.useState({
    texto: '',
    directiva: [],
    presidentes: [],
    docs: { estatutos: '', etica: '', conducta: '', privacidad: '' }
  });

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_nosotros');
    if (stored) { try { setData(JSON.parse(stored)); } catch {} }
  }, []);

  const guardar = (newData) => {
    const stored = localStorage.getItem('cmec_nosotros');
    const current = stored ? JSON.parse(stored) : { texto: '', directiva: [], presidentes: [], docs: { estatutos: '', etica: '', conducta: '', privacidad: '' } };
    const updated = { ...current, ...newData };
    setData(updated);
    localStorage.setItem('cmec_nosotros', JSON.stringify(updated));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const toBase64 = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Nosotros</h1>
          <p className="text-slate-500">Edita el contenido de la pagina institucional.</p>
        </div>
        <div className="flex bg-white rounded-2xl p-1 border border-slate-200">
          {[{id:'texto',label:'Texto'},{id:'directiva',label:'Mesa Directiva'},{id:'presidentes',label:'Presidentes'},{id:'docs',label:'Documentos'}].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-sky-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {guardado && <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm z-50">Guardado</div>}

      {activeTab === 'texto' && <TextoTab data={data} guardar={guardar} />}
      {activeTab === 'directiva' && <DirectivaTab data={data} guardar={guardar} toBase64={toBase64} />}
      {activeTab === 'presidentes' && <PresidentesTab data={data} guardar={guardar} toBase64={toBase64} />}
      {activeTab === 'docs' && <DocsTab data={data} guardar={guardar} toBase64={toBase64} />}
    </div>
  );
};

const TextoTab = ({ data, guardar }) => {
  const [texto, setTexto] = React.useState(data.texto);
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8">
      <h3 className="font-bold text-slate-900 mb-4">Texto institucional</h3>
      <textarea
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Escribe aqui el texto sobre el CMEC (max 500 caracteres)..."
        maxLength={500}
        rows={8}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/20"
      />
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-slate-400">{texto.length}/500</p>
        <button onClick={() => guardar({ texto: texto })} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm">
          <Save size={16}/> Guardar
        </button>
      </div>
    </div>
  );
};

const DirectivaTab = ({ data, guardar, toBase64 }) => {
  const [nombre, setNombre] = React.useState('');
  const [cargo, setCargo] = React.useState('Presidente');
  const [foto, setFoto] = React.useState('');

  const handleFoto = async (e) => {
    const file = e.target.files[0];
    if (file) { const b64 = await toBase64(file); setFoto(b64); }
  };

  const agregar = () => {
    if (!nombre) return;
    const stored = localStorage.getItem('cmec_nosotros');
    const current = stored ? JSON.parse(stored) : { presidentes: [] };
    const nuevosPresidentes = [...(current.presidentes || []), { id: Date.now().toString(), nombre, periodo, foto }];
    guardar({ presidentes: nuevosPresidentes });
    setNombre(''); setPeriodo(''); setFoto('');
  };

  const borrar = (id) => { if (confirm('Eliminar?')) guardar({ directiva: data.directiva.filter(i => i.id !== id) }); };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Agregar miembro</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Dr. Nombre Apellido" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cargo</label>
            <select value={cargo} onChange={e => setCargo(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm">
              <option>Presidente</option>
              <option>Vicepresidente</option>
              <option>Secretario</option>
              <option>Tesorero</option>
              <option>Vocal</option>
              <option>Comite Cientifico</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Foto</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50">
                <Upload size={16} className="text-sky-600"/> Subir foto
                <input type="file" accept="image/*" className="hidden" onChange={handleFoto}/>
              </label>
              {foto && <img src={foto} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200"/>}
            </div>
          </div>
        </div>
        <button onClick={agregar} disabled={!nombre} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-40">
          <Plus size={16}/> Agregar
        </button>
      </div>
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        {data.directiva.length === 0 ? <p className="text-center py-12 text-slate-400">No hay miembros aun.</p> : (
          <table className="w-full text-left">
            <thead><tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b"><th className="px-6 py-4">Foto</th><th className="px-6 py-4">Nombre</th><th className="px-6 py-4">Cargo</th><th className="px-6 py-4"></th></tr></thead>
            <tbody className="divide-y divide-slate-50">
              {data.directiva.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4">{item.foto && <img src={item.foto} alt="" className="w-10 h-10 rounded-xl object-cover"/>}</td>
                  <td className="px-6 py-4 font-bold text-sm">{item.nombre}</td>
                  <td className="px-6 py-4 text-sm">{item.cargo}</td>
                  <td className="px-6 py-4 text-right"><button onClick={() => borrar(item.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const PresidentesTab = ({ data, guardar, toBase64 }) => {
  const [nombre, setNombre] = React.useState('');
  const [periodo, setPeriodo] = React.useState('');
  const [foto, setFoto] = React.useState('');

  const handleFoto = async (e) => {
    const file = e.target.files[0];
    if (file) { const b64 = await toBase64(file); setFoto(b64); }
  };

  const agregar = () => {
    if (!nombre) return;
    guardar({ presidentes: [...data.presidentes, { id: Date.now().toString(), nombre, periodo, foto }] });
    setNombre(''); setPeriodo(''); setFoto('');
  };

  const borrar = (id) => { if (confirm('Eliminar?')) guardar({ presidentes: data.presidentes.filter(i => i.id !== id) }); };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Agregar Expresidente</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Dr. Nombre" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Periodo</label>
            <input value={periodo} onChange={e => setPeriodo(e.target.value)} placeholder="2020-2022" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Foto</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50">
                <Upload size={16} className="text-sky-600"/> Subir foto
                <input type="file" accept="image/*" className="hidden" onChange={handleFoto}/>
              </label>
              {foto && <img src={foto} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200"/>}
            </div>
          </div>
        </div>
        <button onClick={agregar} disabled={!nombre} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm disabled:opacity-40">
          <Plus size={16}/> Agregar
        </button>
      </div>
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        {data.presidentes.length === 0 ? <p className="text-center py-12 text-slate-400">No hay presidentes aun.</p> : (
          <table className="w-full text-left">
            <thead><tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b"><th className="px-6 py-4">Foto</th><th className="px-6 py-4">Nombre</th><th className="px-6 py-4">Periodo</th><th className="px-6 py-4"></th></tr></thead>
            <tbody className="divide-y divide-slate-50">
              {data.presidentes.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4">{item.foto && <img src={item.foto} alt="" className="w-10 h-10 rounded-xl object-cover"/>}</td>
                  <td className="px-6 py-4 font-bold text-sm">{item.nombre}</td>
                  <td className="px-6 py-4 text-sm">{item.periodo}</td>
                  <td className="px-6 py-4 text-right"><button onClick={() => borrar(item.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const DocsTab = ({ data, guardar, toBase64 }) => {
  const handleDoc = async (key, e) => {
    const file = e.target.files[0];
    if (file) {
      const b64 = await toBase64(file);
      guardar({ docs: { ...data.docs, [key]: b64 } });
    }
  };

  return (
    <div className="space-y-4">
      {[
        { key: 'estatutos', label: 'Estatutos' },
        { key: 'etica', label: 'Codigo de Etica' },
        { key: 'conducta', label: 'Codigo de Conducta' },
        { key: 'privacidad', label: 'Aviso de Privacidad' },
      ].map(doc => (
        <div key={doc.key} className="bg-white rounded-3xl border border-slate-200 p-6 flex items-center gap-6">
          <div className="p-3 bg-sky-50 rounded-xl"><FileText className="text-sky-600" size={20}/></div>
          <div className="flex-1">
            <p className="font-bold text-slate-900 text-sm mb-2">{doc.label}</p>
            <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50 w-fit">
              <Upload size={16} className="text-sky-600"/> Subir PDF
              <input type="file" accept=".pdf" className="hidden" onChange={e => handleDoc(doc.key, e)}/>
            </label>
          </div>
          {data.docs[doc.key] && (
            <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
              ✓ Subido
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminNosotros;