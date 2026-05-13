import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, FileText, ShoppingBag, CreditCard, Mail } from 'lucide-react';

const CongresoPublic = () => {
  const [activeTab, setActiveTab] = React.useState('programa');
  const [data, setData] = React.useState<any>({
    programa: [],
    stands: [],
    layoutImg: '',
    inscripciones: [],
    cartelesBases: '',
    cartelesEmail: '',
    homenaje: {}
  });
  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_congreso');
    if (stored) { try { setData(JSON.parse(stored)); } catch {} }
  }, []);

 const tabs = [
  {id:'homenaje',label:'Homenaje', icon: <Users size={16}/>},
  { id: 'programa', label: 'Programa Científico', icon: <FileText size={16}/> },
  { id: 'comercial', label: 'Área Comercial', icon: <ShoppingBag size={16}/> },
  { id: 'inscripciones', label: 'Inscripciones', icon: <CreditCard size={16}/> },
  { id: 'carteles', label: 'Carteles y Trabajos', icon: <Users size={16}/> },
];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-sky-900 py-24 relative overflow-hidden"> {/* cambiar py-20 a py-24 */}
  <div className="max-w-7xl mx-auto px-8 relative z-10">
    <div className="flex items-center gap-8 mb-6">
      <img src="/images/congreso.jpeg" alt="Congreso" className="h-36 object-contain rounded-2xl shadow-xl"/>
      <div>
        <h1 className="text-5xl font-serif font-bold text-white mb-2">Congreso Nacional</h1>
        <p className="text-sky-200 text-lg">El evento magno de la coloproctología mexicana.</p>
      </div>
    </div>
  </div>
</section>
<div className="sticky top-16 bg-white border-b border-slate-100 z-40 shadow-sm">
      
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-1 py-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-sky-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {activeTab === 'homenaje' && (
  <div>
    <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Homenaje</h2>
    {data.homenaje ? (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 flex items-center gap-8">
        {data.homenaje.foto && <img src={data.homenaje.foto} alt="" className="h-48 w-48 rounded-2xl object-cover"/>}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{data.homenaje.nombre}</h3>
          <p className="text-slate-600 whitespace-pre-wrap">{data.homenaje.reseña}</p>
        </div>
      </div>
    ) : (
      <p className="text-slate-400">Información del homenaje próximamente.</p>
    )}
  </div>
)}
        {activeTab === 'programa' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Programa Científico</h2>
            {data.programa.length === 0 ? (
              <div className="text-center py-24 bg-slate-50 rounded-3xl">
                <FileText className="mx-auto text-slate-200 mb-4" size={48}/>
                <p className="text-slate-400">Programa en construcción. Próximamente.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b border-slate-100">
                      <th className="px-6 py-4">Día</th>
                      <th className="px-6 py-4">Horario</th>
                      <th className="px-6 py-4">Actividad / Tema</th>
                      <th className="px-6 py-4">Salón</th>
                      <th className="px-6 py-4">Coordinador</th>
                      <th className="px-6 py-4">Patrocinador</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.programa.map((item: any) => (
                    <tr key={item.id} className="hover:bg-slate-50">
  <td className="px-6 py-4 font-bold bg-emerald-500 text-white rounded-lg text-sm">{item.dia}</td>
  <td className="px-6 py-4 font-bold text-slate-800 text-sm">{item.hora}</td>
  <td className="px-6 py-4">
    <p className="font-bold text-slate-800 text-sm">{item.tema}</p>
    <p className="text-xs text-slate-400">{item.actividad}</p>
  </td>
  <td className="px-6 py-4"><span className="px-3 py-1 bg-sky-50 text-sky-700 rounded-lg text-xs font-bold">{item.salon}</span></td>
  <td className="px-6 py-4 text-sm text-slate-600">{item.coordinador}</td>
  <td className="px-6 py-4">
    {item.patrocinador 
      ? <img src={item.patrocinador} alt="Patrocinador" className="h-8 object-contain"/>
      : <a href="mailto:congreso@cmec.org.mx" className="text-xs text-sky-600 font-bold hover:underline">Solicitar informes</a>
    }
  </td>
</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comercial' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Área Comercial</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-3xl p-8 flex items-center justify-center min-h-64">
                {data.layoutImg ? (
  data.layoutTipo === 'application/pdf' ? (
    <a href={data.layoutImg} download={data.layoutNombre} className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl border border-slate-200 hover:border-sky-300 transition-all">
      <FileText className="text-sky-600" size={48}/>
      <span className="font-bold text-slate-800">{data.layoutNombre}</span>
      <span className="text-sky-600 font-bold text-sm">Descargar PDF</span>
    </a>
  ) : (
    <img src={data.layoutImg} alt="Layout" className="w-full rounded-2xl"/>
  )
) : (
  <p className="text-slate-400 text-center">Layout del área comercial próximamente.</p>
)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Disponibilidad de Stands</h3>
                {data.stands.length === 0 ? (
                  <p className="text-slate-400">Información de stands próximamente.</p>
                ) : (
                  <div className="space-y-3">
                    {data.stands.map((stand: any) => (
                      <div key={stand.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">Stand #{stand.numero}</p>
                          <p className="text-xs text-slate-400">{stand.medidas}</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${stand.asignado ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                          {stand.asignado || 'Disponible'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <a href="mailto:congreso@cmec.org.mx" className="mt-6 flex items-center gap-2 text-sky-600 font-bold text-sm">
                  <Mail size={16}/> Solicitar informes de stands
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inscripciones' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Inscripciones</h2>
            {data.inscripciones.length === 0 ? (
              <div className="text-center py-24 bg-slate-50 rounded-3xl">
                <CreditCard className="mx-auto text-slate-200 mb-4" size={48}/>
                <p className="text-slate-400">Información de inscripciones próximamente.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.inscripciones.map((item: any) => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:border-sky-200 transition-all">
                    <h3 className="font-bold text-slate-900 text-xl mb-2">{item.concepto}</h3>
                   <p className="text-3xl font-bold text-sky-600 mb-6">
  {isNaN(parseFloat(item.precio)) ? item.precio : `$${parseFloat(item.precio).toLocaleString('es-MX', {minimumFractionDigits:2})}`}
</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer"
                        className="block w-full text-center py-3 bg-sky-900 text-white rounded-xl font-bold text-sm hover:bg-sky-800 transition-all">
                        Inscribirse
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'carteles' && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Carteles y Trabajos Libres</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-3xl p-8 flex items-center justify-center min-h-64">
  {data.cartelesBases ? (
    <button onClick={() => {
      const base64 = data.cartelesBases.split(',')[1];
      const byteChars = atob(base64);
      const byteArrays = [];
      for (let i = 0; i < byteChars.length; i += 512) {
        const slice = byteChars.slice(i, i + 512);
        const byteNumbers = new Array(slice.length);
        for (let j = 0; j < slice.length; j++) {
          byteNumbers[j] = slice.charCodeAt(j);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }
      const blob = new Blob(byteArrays, { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.cartelesBasesNombre;
      link.click();
    }} className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl border border-slate-200 hover:border-sky-300 transition-all cursor-pointer">
      <FileText className="text-sky-600" size={48}/>
      <span className="font-bold text-slate-800">{data.cartelesBasesNombre}</span>
      <span className="text-sky-600 font-bold text-sm">Descargar PDF</span>
    </button>
  ) : (
    <p className="text-slate-400">Bases del concurso próximamente.</p>
  )}
</div>
              <div className="bg-sky-900 rounded-3xl p-8 text-white">
                <h3 className="font-bold mb-4">Envío de Trabajos</h3>
                <p className="text-sky-200 text-sm mb-6">Para enviar tu trabajo o cartel, escríbenos al correo oficial del congreso.</p>
                {data.cartelesEmail && (
                  <a href={`mailto:${data.cartelesEmail}`}
                    className="flex items-center gap-2 bg-white text-sky-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-50 transition-all">
                    <Mail size={16}/> {data.cartelesEmail}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CongresoPublic;
