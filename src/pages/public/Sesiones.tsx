import React from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, Clock, ExternalLink, Bookmark, Share2 } from 'lucide-react';

const Sesiones = () => {
  const [sesiones, setSesiones] = React.useState([]);

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_sesiones');
    if (stored) { try { setSesiones(JSON.parse(stored)); } catch {} }
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-sky-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Calendar size={300} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Sesiones Académicas</h1>
          <p className="text-xl text-sky-100 max-w-2xl leading-relaxed">
            Nuestras sesiones mensuales son el espacio de actualización y debate científico para la comunidad coloproctológica de México.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {sesiones.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-200">
              <Calendar className="mx-auto text-slate-200 mb-4" size={48}/>
              <p className="text-slate-400 font-medium">No hay sesiones programadas aun.</p>
            </div>
          ) : (
            sesiones.map((sesion, i) => (
              <motion.div
                key={sesion.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden group hover:shadow-2xl hover:shadow-sky-900/5 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 bg-slate-100 p-8 flex flex-col items-center justify-center border-r border-slate-50 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-500 text-slate-800">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2">{sesion.mes}</span>
                    <span className="text-6xl font-serif font-black">{sesion.dia}</span>
                  </div>
                  <div className="flex-grow p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-4 mb-6">
                      <span className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 border border-slate-200">
                        <Clock size={12} /> {sesion.hora} HRS
                      </span>
                      <span className="flex items-center gap-2 px-3 py-1 bg-sky-50 rounded-full text-xs font-bold text-sky-700 border border-sky-100">
                        <Video size={12} /> SESION POR {sesion.tipo}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-sky-700 transition-colors">
                      {sesion.tema}
                    </h3>
                    <div className="space-y-2 mb-8">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Ponentes</p>
                      <div className="flex flex-wrap gap-2">
                        {sesion.ponentes.map(p => (
                          <span key={p} className="text-sm font-semibold text-slate-700 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{p}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 pt-6 border-t border-slate-50">
                      {sesion.link && (
                        <a href={sesion.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-sky-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-800 transition-all">
                          Unirse a Sesion <ExternalLink size={16} />
                        </a>
                      )}
                      <div className="flex gap-2">
                        <button className="p-3 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all"><Bookmark size={20}/></button>
                        <button className="p-3 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all"><Share2 size={20}/></button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Sesiones;