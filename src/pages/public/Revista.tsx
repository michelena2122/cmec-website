import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download } from 'lucide-react';

const RevistaPublic = () => {
  const [revistas, setRevistas] = React.useState([]);

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_revista');
    if (stored) { try { setRevistas(JSON.parse(stored)); } catch {} }
  }, []);

  const porAnio = revistas.reduce((acc, r) => {
    if (!acc[r.anio]) acc[r.anio] = [];
    acc[r.anio].push(r);
    return acc;
  }, {});

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-sky-900 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-serif font-bold text-white mb-4">Revista CMEC</h1>
          <p className="text-sky-200 text-lg">Ediciones mensuales de la revista oficial del colegio.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          {Object.keys(porAnio).length === 0 ? (
            <div className="text-center py-24 bg-slate-50 rounded-3xl">
              <BookOpen className="mx-auto text-slate-200 mb-4" size={48}/>
              <p className="text-slate-400">No hay ediciones publicadas aun.</p>
            </div>
          ) : (
            Object.keys(porAnio).sort((a,b) => b-a).map(anio => (
              <div key={anio} className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">{anio}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {porAnio[anio].map((r, i) => (
                    <motion.a key={r.id} href={r.pdf} target="_blank" rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-sky-200 hover:bg-white hover:shadow-lg transition-all group">
                      <BookOpen className="text-sky-600 group-hover:scale-110 transition-transform" size={32}/>
                      <span className="font-bold text-slate-800 text-sm">{r.mes}</span>
                      <span className="flex items-center gap-1 text-sky-600 text-xs font-bold"><Download size={12}/> Descargar</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default RevistaPublic;