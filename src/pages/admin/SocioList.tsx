import React from 'react';
import { Users, Upload, Search, Trash2 } from 'lucide-react';
import Papa from 'papaparse';

const SocioList = () => {
  const [activeTab, setActiveTab] = React.useState('socios');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [socios, setSocios] = React.useState([]);
  const [guardado, setGuardado] = React.useState(false);
  const [montoCuota, setMontoCuota] = React.useState('');
  const [linkCuota, setLinkCuota] = React.useState('');

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_socios');
    if (stored) { try { setSocios(JSON.parse(stored)); } catch {} }
    const storedCuota = localStorage.getItem('cmec_cuota');
    if (storedCuota) { try { const c = JSON.parse(storedCuota); setMontoCuota(c.monto || ''); setLinkCuota(c.link || ''); } catch {} }
  }, []);

  const guardar = (lista) => {
    setSocios(lista);
    localStorage.setItem('cmec_socios', JSON.stringify(lista));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const guardarCuota = (monto, link) => {
    localStorage.setItem('cmec_cuota', JSON.stringify({ monto, link }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const rows = results.data.slice(1).filter(row => row.some(cell => cell));
          const parsed = rows.map((row, i) => ({
            id: Date.now().toString() + i,
            numero: row[0] || '',
            prefijo: row[1] || '',
            nombre: row[2] || '',
            fechaIngreso: row[3] || '',
            email: row[4] || '',
            telefono: row[5] || '',
            cuota2020: row[6] || '',
            cuota2021: row[7] || '',
            cuota2022: row[8] || '',
            cuota2023: row[9] || '',
            cuota2024: row[10] || '',
            cuota2025: row[11] || '',
            cuota2026: row[12] || '',
            password: row[4] ? row[4].split('@')[0] : '123456',
          }));
          guardar(parsed);
        },
        header: false,
      });
    }
  };

  const borrar = (id) => {
    if (confirm('Eliminar socio?')) guardar(socios.filter(s => s.id !== id));
  };

  const filtrados = socios.filter(s =>
    s.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.numero?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const anioActual = '2026';
  const activos = socios.filter(s => s[`cuota${anioActual}`]).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Socios</h1>
          <p className="text-slate-500 text-sm">Administra y valida los miembros del colegio.</p>
        </div>
        <label className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 cursor-pointer flex items-center gap-2 transition-all">
          <Upload size={18}/> Importar CSV
          <input type="file" className="hidden" accept=".csv" onChange={handleFileUpload} />
        </label>
      </div>

      {guardado && <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm z-50">Guardado — {socios.length} socios</div>}

      <div className="flex bg-white rounded-2xl p-1 border border-slate-200">
        {[{id:'socios',label:'Socios'},{id:'cuota',label:'Cuota'},{id:'cartas',label:'Configuración de Cartas'},{id:'constancias',label:'Constancias'}].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-sky-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'socios' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
              <input type="text" placeholder="Buscar por nombre, email o numero..." className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-sm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-widest">
                  <th className="px-6 py-4">Socio</th>
                  <th className="px-6 py-4">Numero</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">2024</th>
                  <th className="px-6 py-4">2025</th>
                  <th className="px-6 py-4">2026</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtrados.map(socio => (
                  <tr key={socio.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-xs uppercase">{socio.nombre?.slice(0,2)}</div>
                        <span className="font-bold text-slate-800 text-sm">{socio.prefijo} {socio.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{socio.numero}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{socio.email}</td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${socio.cuota2024 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>{socio.cuota2024 ? '✓' : '—'}</span></td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${socio.cuota2025 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>{socio.cuota2025 ? '✓' : '—'}</span></td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${socio.cuota2026 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>{socio.cuota2026 ? '✓' : '—'}</span></td>
                    <td className="px-6 py-4 text-right"><button onClick={() => borrar(socio.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtrados.length === 0 && (
              <div className="text-center py-16">
                <Users className="mx-auto text-slate-200 mb-4" size={48}/>
                <p className="text-slate-400">No hay socios. Importa un archivo CSV.</p>
              </div>
            )}
          </div>
          <div className="p-6 border-t border-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Mostrando {filtrados.length} de {socios.length} socios
          </div>
        </div>
      )}

      {activeTab === 'cuota' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8">
          <h3 className="font-bold text-slate-900 mb-6">Cuota Anual 2026</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Monto</label>
              <input value={montoCuota} onChange={e => { setMontoCuota(e.target.value); guardarCuota(e.target.value, linkCuota); }} placeholder="$3,500.00" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Link de pago</label>
              <input value={linkCuota} onChange={e => { setLinkCuota(e.target.value); guardarCuota(montoCuota, e.target.value); }} placeholder="https://mercadopago.com/..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Socios</p>
              <p className="text-3xl font-bold text-slate-900">{socios.length}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Activos 2026</p>
              <p className="text-3xl font-bold text-emerald-600">{activos}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Inactivos</p>
              <p className="text-3xl font-bold text-rose-500">{socios.length - activos}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cartas' && <ConfiguracionCartas />}
      {activeTab === 'constancias' && <ConstanciasTab />}
    </div>
  );
};

const ConstanciasTab = () => {
  const [data, setData] = React.useState<any>({});
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_socios_constancias');
    if (stored) { try { setData(JSON.parse(stored)); } catch {} }
  }, []);

  const guardar = (newData: any) => {
    const updated = { ...data, ...newData };
    setData(updated);
    localStorage.setItem('cmec_socios_constancias', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Constancias de Sesiones (Mensuales)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meses.map((mes, idx) => (
            <div key={mes}>
              <label className="block text-xs font-bold text-slate-400 mb-2">{mes}</label>
              <input type="text" placeholder="Link Google Drive" value={data.sesiones?.[idx] || ''} 
                onChange={e => guardar({ sesiones: { ...data.sesiones, [idx]: e.target.value } })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm"/>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-4">Constancias Congreso 2026</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">Constancia Congreso</label>
            <input type="text" placeholder="Link Google Drive" value={data.congreso || ''} 
              onChange={e => guardar({ congreso: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">Constancia Precongreso</label>
            <input type="text" placeholder="Link Google Drive" value={data.precongreso || ''} 
              onChange={e => guardar({ precongreso: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2">Constancia Transcongreso</label>
            <input type="text" placeholder="Link Google Drive" value={data.transcongreso || ''} 
              onChange={e => guardar({ transcongreso: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm"/>
          </div>
        </div>
      </div>
    </div>
  );
};
const ConfiguracionCartas = () => {
  const [data, setData] = React.useState<any>({});

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_cartas_config');
    if (stored) { try { setData(JSON.parse(stored)); } catch {} }
  }, []);

  const guardar = (newData: any) => {
    const updated = { ...data, ...newData };
    setData(updated);
    localStorage.setItem('cmec_cartas_config', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Configuración de Cartas y Constancias</h2>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Datos del Presidente</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre del Presidente</label>
            <input value={data.nombrePresidente || ''} onChange={e => guardar({ nombrePresidente: e.target.value })} placeholder="Dr. Nombre Completo" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Firma (Imagen)</label>
            <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50">
              <Upload size={16} className="text-sky-600"/> Subir firma
              <input type="file" accept="image/*" className="hidden" onChange={async e => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => guardar({ firma: reader.result });
                  reader.readAsDataURL(file);
                }
              }}/>
            </label>
            {data.firma && <img src={data.firma} alt="" className="h-12 object-contain"/>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Datos del Colegio</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Domicilio</label>
            <input value={data.domicilio || ''} onChange={e => guardar({ domicilio: e.target.value })} placeholder="Av. Ejército Nacional..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">E-Mail</label>
              <input value={data.email || ''} onChange={e => guardar({ email: e.target.value })} placeholder="info@cmec.com.mx" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Teléfono</label>
              <input value={data.telefono || ''} onChange={e => guardar({ telefono: e.target.value })} placeholder="+52 (55) 7063 55 54" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocioList;