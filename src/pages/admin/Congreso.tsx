import React from 'react';
import { Plus, Trash2, FileText, ShoppingBag, CreditCard, Users, Upload } from 'lucide-react';

const AdminCongreso = () => {
  const [activeTab, setActiveTab] = React.useState('programa');
  const [guardado, setGuardado] = React.useState(false);
  const [data, setData] = React.useState({
    programa: [], stands: [], layoutImg: '', inscripciones: [], cartelesBases: '', cartelesEmail: ''
  });

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_congreso');
    if (stored) { try { setData(JSON.parse(stored)); } catch {} }
  }, []);

  const guardar = (newData) => {
    const updated = { ...data, ...newData };
    setData(updated);
    localStorage.setItem('cmec_congreso', JSON.stringify(updated));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Congreso Nacional 2026</h1>
          <p className="text-slate-500">Gestiona el contenido del congreso.</p>
        </div>
        <div className="flex bg-white rounded-2xl p-1 border border-slate-200">
          {[{id:'homenaje',label:'Homenaje'},{id:'programa',label:'Programa'},{id:'comercial',label:'Comercial'},{id:'inscripciones',label:'Inscripciones'},{id:'carteles',label:'Carteles'},{id:'finanzas',label:'Finanzas'}].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-sky-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {guardado && <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm z-50">Guardado</div>}
      {activeTab === 'homenaje' && <HomenajeTAB data={data} guardar={guardar} />}
      {activeTab === 'programa' && <ProgramaTab data={data} guardar={guardar} />}
      {activeTab === 'comercial' && <ComercialTab data={data} guardar={guardar} />}
      {activeTab === 'inscripciones' && <InscripcionesTab data={data} guardar={guardar} />}
      {activeTab === 'carteles' && <CartelesTab data={data} guardar={guardar} />}
      {activeTab === 'finanzas' && <FinanzasTab data={data} guardar={guardar} />}
    </div>
  );
};

const ProgramaTab = ({ data, guardar }) => {
  const [dia, setDia] = React.useState('');
  const [hora, setHora] = React.useState('');
  const [actividad, setActividad] = React.useState('');
  const [tema, setTema] = React.useState('');
  const [salon, setSalon] = React.useState('');
  const [coordinador, setCoordinador] = React.useState('');
  const [patrocinador, setPatrocinador] = React.useState('');

  const agregar = () => {
    if (!dia || !hora || !tema) return;
    guardar({ programa: [{ id: Date.now().toString(), dia, hora, actividad, tema, salon, coordinador, patrocinador }, ...data.programa] });
    setDia(''); setHora(''); setActividad(''); setTema(''); setSalon(''); setCoordinador(''); setPatrocinador('');
  };

  const borrar = (id) => { if (confirm('Eliminar?')) guardar({ programa: data.programa.filter(i => i.id !== id) }); };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Agregar Actividad</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Fecha</label>
  <input value={dia} onChange={e => setDia(e.target.value)} placeholder="8-Agosto" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
</div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Horario</label>
            <input value={hora} onChange={e => setHora(e.target.value)} placeholder="08:00 - 09:30" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Actividad</label>
            <input value={actividad} onChange={e => setActividad(e.target.value)} placeholder="Mesa Redonda" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tema</label>
            <input value={tema} onChange={e => setTema(e.target.value)} placeholder="Tema de la sesion" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Salon</label>
            <input value={salon} onChange={e => setSalon(e.target.value)} placeholder="Salon A" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Coordinador</label>
            <input value={coordinador} onChange={e => setCoordinador(e.target.value)} placeholder="Dr. Nombre" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Logo Patrocinador</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50">
                <Upload size={16} className="text-sky-600"/> Subir logo
                <input type="file" accept="image/*" className="hidden" onChange={async e => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setPatrocinador(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}/>
              </label>
              {patrocinador && <img src={patrocinador} alt="" className="h-10 object-contain border border-slate-100 rounded-lg px-2"/>}
            </div>
          </div>
        </div>
        <button onClick={agregar} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm"><Plus size={16}/> Agregar</button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        {data.programa.length === 0 ? (
          <p className="text-center py-12 text-slate-400">No hay actividades aun.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b">
                <th className="px-6 py-4">Día</th>
                <th className="px-6 py-4">Horario</th>
                <th className="px-6 py-4">Actividad</th>
                <th className="px-6 py-4">Tema</th>
                <th className="px-6 py-4">Salon</th>
                <th className="px-6 py-4">Coordinador</th>
                <th className="px-6 py-4">Patrocinador</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.programa.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4 font-bold bg-emerald-50 text-emerald-700 rounded-lg text-sm">{item.dia}</td>
                  <td className="px-6 py-4 font-bold text-sm">{item.hora}</td>
                  <td className="px-6 py-4 text-sm">{item.actividad}</td>
                  <td className="px-6 py-4 text-sm">{item.tema}</td>
                  <td className="px-6 py-4 text-sm">{item.salon}</td>
                  <td className="px-6 py-4 text-sm">{item.coordinador}</td>
                  <td className="px-6 py-4">{item.patrocinador ? <img src={item.patrocinador} alt="" className="h-8 object-contain"/> : <span className="text-slate-300 text-xs">Sin patrocinador</span>}</td>
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

const InscripcionesTab = ({ data, guardar }) => {
  const [concepto, setConcepto] = React.useState('');
  const [precio, setPrecio] = React.useState('');
  const [link, setLink] = React.useState('');
  const agregar = () => {
    if (!concepto || !precio) return;
    guardar({ inscripciones: [{ id: Date.now().toString(), concepto, precio, link }, ...data.inscripciones] });
    setConcepto(''); setPrecio(''); setLink('');
  };
  const borrar = (id) => { if (confirm('Eliminar?')) guardar({ inscripciones: data.inscripciones.filter(i => i.id !== id) }); };
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Agregar Inscripcion</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Concepto</label><input value={concepto} onChange={e => setConcepto(e.target.value)} placeholder="Socio CMEC" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Precio</label><input value={precio} onChange={e => setPrecio(e.target.value)} placeholder="$3,500.00" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Link de pago</label><input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
        </div>
        <button onClick={agregar} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm"><Plus size={16}/> Agregar</button>
      </div>
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        {data.inscripciones.length === 0 ? <p className="text-center py-12 text-slate-400">No hay inscripciones aun.</p> : (
          <table className="w-full text-left">
            <thead><tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b"><th className="px-6 py-4">Concepto</th><th className="px-6 py-4">Precio</th><th className="px-6 py-4">Link</th><th className="px-6 py-4"></th></tr></thead>
            <tbody className="divide-y divide-slate-50">
              {data.inscripciones.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4 font-bold text-sm">{item.concepto}</td>
                  <td className="px-6 py-4 font-bold text-sky-600">{item.precio}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.link}</td>
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

const CartelesTab = ({ data, guardar }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-3xl border border-slate-200 p-8">
      <h3 className="font-bold text-slate-900 mb-4">Bases del Concurso (PDF)</h3>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50">
          <Upload size={16} className="text-sky-600"/> Subir PDF
          <input type="file" accept=".pdf" className="hidden" onChange={async e => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => guardar({ cartelesBases: reader.result, cartelesBasesNombre: file.name });
              reader.readAsDataURL(file);
            }
          }}/>
        </label>
        {data.cartelesBases && <span className="text-emerald-600 font-bold text-xs">✓ {data.cartelesBasesNombre}</span>}
      </div>
    </div>
    <div className="bg-white rounded-3xl border border-slate-200 p-8">
      <h3 className="font-bold text-slate-900 mb-4">Email para envio de trabajos</h3>
      <input value={data.cartelesEmail} onChange={e => guardar({ cartelesEmail: e.target.value })} placeholder="carteles@cmec.org.mx" type="email" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
    </div>
  </div>
);
const FinanzasTab = ({ data, guardar }) => {
  const ingresos = data.ingresos || [];
  const egresos = data.egresos || [];
  const proveedores = data.proveedores || [];
  const [activeTab, setActiveTab] = React.useState('ingresos');
  const [form, setForm] = React.useState({ concepto: '', monto: '', numero: '' });
  const [formProv, setFormProv] = React.useState({ concepto: '', nombre: '', cotizacion: '', mail: '', telefono: '', observaciones: '' });

  const totalIngresos = ingresos.reduce((acc, i) => acc + (parseFloat(i.monto) || 0), 0);
  const totalEgresos = egresos.reduce((acc, i) => acc + (parseFloat(i.monto) || 0), 0);
  const balance = totalIngresos - totalEgresos;

  const agregarIngreso = () => {
    if (!form.concepto || !form.monto) return;
    guardar({ ingresos: [...ingresos, { id: Date.now().toString(), ...form }] });
    setForm({ concepto: '', monto: '', numero: '' });
  };

  const agregarEgreso = () => {
    if (!form.concepto || !form.monto) return;
    guardar({ egresos: [...egresos, { id: Date.now().toString(), ...form }] });
    setForm({ concepto: '', monto: '', numero: '' });
  };

  const agregarProveedor = () => {
    if (!formProv.concepto) return;
    guardar({ proveedores: [...proveedores, { id: Date.now().toString(), ...formProv }] });
    setFormProv({ concepto: '', nombre: '', cotizacion: '', mail: '', telefono: '', observaciones: '' });
  };

  const borrar = (tipo, id) => {
    if (tipo === 'ingreso') guardar({ ingresos: ingresos.filter(i => i.id !== id) });
    if (tipo === 'egreso') guardar({ egresos: egresos.filter(i => i.id !== id) });
    if (tipo === 'proveedor') guardar({ proveedores: proveedores.filter(i => i.id !== id) });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-emerald-600 rounded-3xl p-6 text-white">
          <p className="text-emerald-100 text-xs font-bold uppercase mb-1">Ingresos Totales</p>
          <p className="text-3xl font-bold">${totalIngresos.toLocaleString('es-MX', {minimumFractionDigits:2})}</p>
        </div>
        <div className="bg-rose-600 rounded-3xl p-6 text-white">
          <p className="text-rose-100 text-xs font-bold uppercase mb-1">Egresos Totales</p>
          <p className="text-3xl font-bold">${totalEgresos.toLocaleString('es-MX', {minimumFractionDigits:2})}</p>
        </div>
        <div className="bg-slate-900 rounded-3xl p-6 text-white">
          <p className="text-slate-400 text-xs font-bold uppercase mb-1">Balance Neto</p>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-sky-400' : 'text-rose-400'}`}>${balance.toLocaleString('es-MX', {minimumFractionDigits:2})}</p>
        </div>
      </div>

      <div className="flex bg-white rounded-2xl p-1 border border-slate-200 w-fit">
        {['ingresos','egresos','avance','proveedores','precios','gastos'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all capitalize ${activeTab === t ? 'bg-sky-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
            {t === 'avance' ? 'Avance Presupuestal' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {activeTab === 'precios' && <ListaPreciosTab data={data} guardar={guardar} />}
      {activeTab === 'gastos' && <ListaGastosTab data={data} guardar={guardar} />}
      {activeTab === 'ingresos' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Agregar Ingreso</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Concepto</label><input value={form.concepto} onChange={e => setForm({...form, concepto: e.target.value})} placeholder="Inscripciones socios" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Monto</label><input value={form.monto} onChange={e => setForm({...form, monto: e.target.value})} placeholder="50000" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Numero</label><input value={form.numero} onChange={e => setForm({...form, numero: e.target.value})} placeholder="10" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
            </div>
            <button onClick={agregarIngreso} className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm"><Plus size={16}/> Agregar</button>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead><tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b"><th className="px-6 py-4">Concepto</th><th className="px-6 py-4">Numero</th><th className="px-6 py-4 text-right">Monto</th><th className="px-6 py-4"></th></tr></thead>
              <tbody className="divide-y divide-slate-50">
                {ingresos.map(i => (
                  <tr key={i.id} className="hover:bg-slate-50 group">
                    <td className="px-6 py-4 font-bold text-sm">{i.concepto}</td>
                    <td className="px-6 py-4 text-sm">{i.numero}</td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600">${parseFloat(i.monto).toLocaleString('es-MX', {minimumFractionDigits:2})}</td>
                    <td className="px-6 py-4 text-right"><button onClick={() => borrar('ingreso', i.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {ingresos.length === 0 && <p className="text-center py-8 text-slate-400">No hay ingresos aun.</p>}
          </div>
        </div>
      )}

      {activeTab === 'egresos' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Agregar Egreso</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Concepto</label><input value={form.concepto} onChange={e => setForm({...form, concepto: e.target.value})} placeholder="Centro de convenciones" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Monto sin IVA</label><input value={form.monto} onChange={e => setForm({...form, monto: e.target.value})} placeholder="100000" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Proveedor</label><input value={form.numero} onChange={e => setForm({...form, numero: e.target.value})} placeholder="Nombre proveedor" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
            </div>
            <button onClick={agregarEgreso} className="flex items-center gap-2 bg-rose-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm"><Plus size={16}/> Agregar</button>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead><tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b"><th className="px-6 py-4">Concepto</th><th className="px-6 py-4">Proveedor</th><th className="px-6 py-4 text-right">Monto</th><th className="px-6 py-4"></th></tr></thead>
              <tbody className="divide-y divide-slate-50">
                {egresos.map(i => (
                  <tr key={i.id} className="hover:bg-slate-50 group">
                    <td className="px-6 py-4 font-bold text-sm">{i.concepto}</td>
                    <td className="px-6 py-4 text-sm">{i.numero}</td>
                    <td className="px-6 py-4 text-right font-bold text-rose-600">${parseFloat(i.monto).toLocaleString('es-MX', {minimumFractionDigits:2})}</td>
                    <td className="px-6 py-4 text-right"><button onClick={() => borrar('egreso', i.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {egresos.length === 0 && <p className="text-center py-8 text-slate-400">No hay egresos aun.</p>}
          </div>
        </div>
      )}

      {activeTab === 'avance' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead><tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b"><th className="px-6 py-4">Concepto</th><th className="px-6 py-4 text-right">Monto</th></tr></thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-bold text-sm">Ingresos Confirmados</td><td className="px-6 py-4 text-right font-bold text-emerald-600">${totalIngresos.toLocaleString('es-MX', {minimumFractionDigits:2})}</td></tr>
              <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-bold text-sm">Gastos Confirmados</td><td className="px-6 py-4 text-right font-bold text-rose-600">${totalEgresos.toLocaleString('es-MX', {minimumFractionDigits:2})}</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-bold text-slate-900">Utilidad / Perdida</td><td className={`px-6 py-4 text-right font-bold text-xl ${balance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>${balance.toLocaleString('es-MX', {minimumFractionDigits:2})}</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'proveedores' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Agregar Proveedor</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Concepto</label><input value={formProv.concepto} onChange={e => setFormProv({...formProv, concepto: e.target.value})} placeholder="Catering" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre Proveedor</label><input value={formProv.nombre} onChange={e => setFormProv({...formProv, nombre: e.target.value})} placeholder="Empresa SA" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cotizacion</label><input value={formProv.cotizacion} onChange={e => setFormProv({...formProv, cotizacion: e.target.value})} placeholder="$50,000" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mail</label><input value={formProv.mail} onChange={e => setFormProv({...formProv, mail: e.target.value})} placeholder="contacto@empresa.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Telefono</label><input value={formProv.telefono} onChange={e => setFormProv({...formProv, telefono: e.target.value})} placeholder="55 0000 0000" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
              <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Observaciones</label><input value={formProv.observaciones} onChange={e => setFormProv({...formProv, observaciones: e.target.value})} placeholder="Notas..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
            </div>
            <button onClick={agregarProveedor} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm"><Plus size={16}/> Agregar</button>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead><tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b"><th className="px-6 py-4">Concepto</th><th className="px-6 py-4">Proveedor</th><th className="px-6 py-4">Cotizacion</th><th className="px-6 py-4">Mail</th><th className="px-6 py-4">Tel</th><th className="px-6 py-4"></th></tr></thead>
              <tbody className="divide-y divide-slate-50">
                {proveedores.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 group">
                    <td className="px-6 py-4 font-bold text-sm">{p.concepto}</td>
                    <td className="px-6 py-4 text-sm">{p.nombre}</td>
                    <td className="px-6 py-4 text-sm font-bold text-sky-600">{p.cotizacion}</td>
                    <td className="px-6 py-4 text-sm">{p.mail}</td>
                    <td className="px-6 py-4 text-sm">{p.telefono}</td>
                    <td className="px-6 py-4 text-right"><button onClick={() => borrar('proveedor', p.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {proveedores.length === 0 && <p className="text-center py-8 text-slate-400">No hay proveedores aun.</p>}
          </div>
        </div>
      )}
    </div>
  );
};
const HomenajeTAB = ({ data, guardar }) => {
  const [nombre, setNombre] = React.useState(data.homenaje?.nombre || '');
  const [reseña, setReseña] = React.useState(data.homenaje?.reseña || '');
  const [foto, setFoto] = React.useState(data.homenaje?.foto || '');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-6">Homenaje al Congreso</h3>
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre del Homenajeado</label>
            <input value={nombre} onChange={e => { setNombre(e.target.value); guardar({ homenaje: { nombre: e.target.value, reseña, foto } }); }} placeholder="Dr. Nombre Completo" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Reseña (200 caracteres max)</label>
            <textarea value={reseña} onChange={e => { setReseña(e.target.value); guardar({ homenaje: { nombre, reseña: e.target.value, foto } }); }} placeholder="Breve descripción..." maxLength={200} rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm resize-none"/>
            <p className="text-xs text-slate-400 text-right mt-1">{reseña.length}/200</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Foto</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50">
                <Upload size={16} className="text-sky-600"/> Subir foto
                <input type="file" accept="image/*" className="hidden" onChange={async e => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => { setFoto(reader.result); guardar({ homenaje: { nombre, reseña, foto: reader.result } }); };
                    reader.readAsDataURL(file);
                  }
                }}/>
              </label>
              {foto && <img src={foto} alt="" className="h-16 w-16 rounded-xl object-cover border border-slate-100"/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const ListaPreciosTab = ({ data, guardar }) => {
  const precios = data.precios || [];
  const [form, setForm] = React.useState({ concepto: '', unitario: '', numero: '' });

  const agregarPrecio = () => {
    if (!form.concepto || !form.unitario || !form.numero) return;
    const unitario = parseFloat(form.unitario) || 0;
    const numero = parseFloat(form.numero) || 0;
    const total = unitario * numero;
    guardar({ precios: [...precios, { id: Date.now().toString(), ...form, unitario, numero, total }] });
    setForm({ concepto: '', unitario: '', numero: '' });
  };

  const borrar = (id) => {
    if (confirm('Eliminar?')) guardar({ precios: precios.filter(p => p.id !== id) });
  };

  const totalGeneral = precios.reduce((acc, p) => acc + (p.total || 0), 0);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Agregar Precio</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Concepto</label><input value={form.concepto} onChange={e => setForm({...form, concepto: e.target.value})} placeholder="Inscripción Socios" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Precio Unitario</label><input value={form.unitario} onChange={e => setForm({...form, unitario: e.target.value})} placeholder="6850" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Número</label><input value={form.numero} onChange={e => setForm({...form, numero: e.target.value})} placeholder="20" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
        </div>
        <button onClick={agregarPrecio} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm"><Plus size={16}/> Agregar</button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead><tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b"><th className="px-6 py-4">Concepto</th><th className="px-6 py-4 text-right">Precio Unitario</th><th className="px-6 py-4 text-right">Número</th><th className="px-6 py-4 text-right">Total</th><th className="px-6 py-4"></th></tr></thead>
          <tbody className="divide-y divide-slate-50">
            {precios.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 group">
                <td className="px-6 py-4 font-bold text-sm">{p.concepto}</td>
                <td className="px-6 py-4 text-right text-sm">${parseFloat(p.unitario).toLocaleString('es-MX', {minimumFractionDigits:2})}</td>
                <td className="px-6 py-4 text-right text-sm">{p.numero}</td>
                <td className="px-6 py-4 text-right font-bold text-sky-600">${p.total.toLocaleString('es-MX', {minimumFractionDigits:2})}</td>
                <td className="px-6 py-4 text-right"><button onClick={() => borrar(p.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {precios.length === 0 && <p className="text-center py-8 text-slate-400">No hay precios aun.</p>}
      </div>

      <div className="bg-sky-900 text-white rounded-3xl p-6">
        <p className="text-sm font-bold uppercase mb-2">Total de Ingresos</p>
        <p className="text-4xl font-bold">${totalGeneral.toLocaleString('es-MX', {minimumFractionDigits:2})}</p>
      </div>
    </div>
  );
};

const ListaGastosTab = ({ data, guardar }) => {
  const gastos = data.gastos || [];
  const [form, setForm] = React.useState({ concepto: '', unitario: '', numero: '', conIva: false });

  const agregarGasto = () => {
    if (!form.concepto || !form.unitario || !form.numero) return;
    const unitario = parseFloat(form.unitario) || 0;
    const numero = parseFloat(form.numero) || 0;
    const totalSinIva = unitario * numero;
    const totalConIva = form.conIva ? totalSinIva * 1.16 : totalSinIva;
    guardar({ gastos: [...gastos, { id: Date.now().toString(), ...form, unitario, numero, totalSinIva, totalConIva }] });
    setForm({ concepto: '', unitario: '', numero: '', conIva: false });
  };

  const borrar = (id) => {
    if (confirm('Eliminar?')) guardar({ gastos: gastos.filter(g => g.id !== id) });
  };

  const totalSinIva = gastos.reduce((acc, g) => acc + (g.totalSinIva || 0), 0);
  const totalConIva = gastos.reduce((acc, g) => acc + (g.totalConIva || 0), 0);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Agregar Gasto</h3>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Concepto</label><input value={form.concepto} onChange={e => setForm({...form, concepto: e.target.value})} placeholder="Catering" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Precio Unitario</label><input value={form.unitario} onChange={e => setForm({...form, unitario: e.target.value})} placeholder="100000" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Número</label><input value={form.numero} onChange={e => setForm({...form, numero: e.target.value})} placeholder="4" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"/></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">¿Con IVA?</label><input type="checkbox" checked={form.conIva} onChange={e => setForm({...form, conIva: e.target.checked})} className="w-4 h-4 mt-3"/></div>
        </div>
        <button onClick={agregarGasto} className="flex items-center gap-2 bg-sky-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm"><Plus size={16}/> Agregar</button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead><tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b"><th className="px-6 py-4">Concepto</th><th className="px-6 py-4 text-right">Unitario</th><th className="px-6 py-4 text-right">Número</th><th className="px-6 py-4 text-right">Total sin IVA</th><th className="px-6 py-4 text-right">Total con IVA</th><th className="px-6 py-4"></th></tr></thead>
          <tbody className="divide-y divide-slate-50">
            {gastos.map(g => (
              <tr key={g.id} className="hover:bg-slate-50 group">
                <td className="px-6 py-4 font-bold text-sm">{g.concepto}</td>
                <td className="px-6 py-4 text-right text-sm">${parseFloat(g.unitario).toLocaleString('es-MX', {minimumFractionDigits:2})}</td>
                <td className="px-6 py-4 text-right text-sm">{g.numero}</td>
                <td className="px-6 py-4 text-right text-sm">${g.totalSinIva.toLocaleString('es-MX', {minimumFractionDigits:2})}</td>
                <td className="px-6 py-4 text-right font-bold text-rose-600">${g.totalConIva.toLocaleString('es-MX', {minimumFractionDigits:2})}</td>
                <td className="px-6 py-4 text-right"><button onClick={() => borrar(g.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-xl opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {gastos.length === 0 && <p className="text-center py-8 text-slate-400">No hay gastos aun.</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-rose-600 text-white rounded-3xl p-6">
          <p className="text-sm font-bold uppercase mb-2">Total Gastos (sin IVA)</p>
          <p className="text-4xl font-bold">${totalSinIva.toLocaleString('es-MX', {minimumFractionDigits:2})}</p>
        </div>
        <div className="bg-rose-700 text-white rounded-3xl p-6">
          <p className="text-sm font-bold uppercase mb-2">Total Gastos (con IVA)</p>
          <p className="text-4xl font-bold">${totalConIva.toLocaleString('es-MX', {minimumFractionDigits:2})}</p>
        </div>
      </div>
    </div>
  );
};
export default AdminCongreso;