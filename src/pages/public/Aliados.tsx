import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText } from 'lucide-react';

const AliadosPublic = () => {
  const [aliados, setAliados] = React.useState([]);

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_aliados');
    if (stored) { try { setAliados(JSON.parse(stored)); } catch {} }
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-sky-900 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-serif font-bold text-white mb-4">Aliados</h1>
          <p className="text-sky-200 text-lg">Instituciones y organizaciones aliadas al CMEC.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          {aliados.length === 0 ? (
            <div className="text-center py-24 bg-slate-50 rounded-3xl">
              <Users className="mx-auto text-slate-200 mb-4" size={48}/>
              <p className="text-slate-400">No hay aliados publicados aun.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aliados.map((aliado, i) => (
                <motion.div key={aliado.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl hover:border-sky-200 transition-all">
                  {aliado.foto && <img src={aliado.foto} alt={aliado.nombre} className="w-full h-48 object-cover"/>}
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-xl mb-3">{aliado.nombre}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{aliado.resumen}</p>
                    {aliado.convenio && (
                      <a href={aliado.convenio} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sky-600 font-bold text-sm hover:underline">
                        <FileText size={16}/> Ver Convenio
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AliadosPublic;