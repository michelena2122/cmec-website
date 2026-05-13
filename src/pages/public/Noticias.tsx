import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Megaphone } from 'lucide-react';
interface Noticia { id: string; titulo: string; fecha: string; }
const NoticiasPublic = () => {
  const [noticias, setNoticias] = React.useState<Noticia[]>([]);
  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_noticias');
    if (stored) { try { setNoticias(JSON.parse(stored)); } catch {} }
  }, []);
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-sky-900 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-serif font-bold text-white mb-4">Noticias</h1>
          <p className="text-sky-200 text-lg">Avisos e informacion para la comunidad.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          {noticias.length === 0 ? (
            <div className="text-center py-24">
              <Megaphone className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-400">No hay noticias publicadas aun.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {noticias.map((n, i) => (
                <motion.div key={n.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:border-sky-200 transition-all">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-4"><Calendar size={11} />{n.fecha}</span>
                  <h3 className="font-bold text-slate-800 text-lg">{n.titulo}</h3>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default NoticiasPublic;
