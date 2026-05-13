import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Award, Users, Download } from 'lucide-react';

const Nosotros = () => {
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

  const directivaFija = [
    { nombre: 'Dr. Alejandro Silva', cargo: 'Presidente', foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400' },
    { nombre: 'Dra. Elena Martínez', cargo: 'Secretaria', foto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400' },
    { nombre: 'Dr. Luis Ortega', cargo: 'Tesorero', foto: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400' },
  ];

  const directivaFinal = data.directiva.length > 0 ? data.directiva : directivaFija;

  return (
    <div className="bg-white">
      <section className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-8">Nuestra Institución</h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            {data.texto || 'El Colegio Mexicano de Especialistas en Coloproctología es la máxima autoridad académica y rectora de la especialidad en el país.'}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-sky-900 flex items-center gap-3">
                <Shield className="text-sky-600" /> Nuestra Misión
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-sky-100 pl-6">
                Promover la excelencia académica, la investigación científica y la práctica ética de la coloproctología para garantizar la mejor atención a la salud de nuestra sociedad.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-sky-900 flex items-center gap-3">
                <Users className="text-sky-600" /> Nuestra Visión
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-sky-100 pl-6">
                Ser la institución líder y referente internacional en coloproctología por su innovación educativa, rigor científico y compromiso social.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Mesa Directiva</h2>
            <div className="h-1 w-20 bg-sky-500 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {directivaFinal.map((miembro, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}
                className="group relative overflow-hidden rounded-3xl">
                <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={miembro.foto} alt={miembro.nombre} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h4 className="text-xl font-bold mb-1">{miembro.nombre}</h4>
                  <p className="text-sky-400 font-semibold text-sm uppercase tracking-widest">{miembro.cargo}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {data.presidentes.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-12 text-center">Expresidentes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.presidentes.map((p, i) => (
                <div key={i} className="text-center">
                  {p.foto && <img src={p.foto} alt={p.nombre} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-slate-100"/>}
                  <p className="font-bold text-slate-900 text-sm">{p.nombre}</p>
                  <p className="text-slate-400 text-xs">{p.periodo}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-16">Documentos Institucionales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
  { key: 'estatutos', label: 'Estatutos', icon: <FileText /> },
  { key: 'etica', label: 'Código de Ética', icon: <Award /> },
  { key: 'conducta', label: 'Código de Conducta', icon: <Shield /> },
  { key: 'privacidad', label: 'Aviso de Privacidad', icon: <FileText /> },
].map(doc => (
  <button key={doc.key}
    onClick={() => {
  if (data.docs[doc.key]) {
    const ventana = window.open('');
    ventana.document.write(`<iframe src="${data.docs[doc.key]}" width="100%" height="100%" style="border:none;position:fixed;top:0;left:0;bottom:0;right:0;"></iframe>`);
  }
}}
    className={`flex flex-col items-center gap-6 p-10 bg-slate-50 rounded-3xl border border-slate-100 hover:border-sky-300 hover:bg-white transition-all group shadow-sm hover:shadow-xl ${!data.docs[doc.key] ? 'opacity-50 cursor-not-allowed' : ''}`}>
    <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-sm border border-slate-100 group-hover:bg-sky-600 group-hover:text-white transition-all">
      {doc.icon}
    </div>
    <span className="font-bold text-slate-800 text-sm tracking-wide">{doc.label}</span>
  </button>
))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;