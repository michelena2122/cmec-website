import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, Download } from 'lucide-react';

const temasFijos = [
  'Cancer Colorrectal',
  'Colonoscopia diagnostica y terapeutica',
  'Patologia anorrectal',
  'Enfermedad de Crohn y Colitis ulcerosa',
  'Cirugia colorrectal',
  'Piso pelvico e incontinencia',
  'Estomas y colostomias',
  'Urgencias colorrectales',
  'Diverticulosis y diverticulitis',
  'Microbiota intestinal',
  'Inteligencia artificial aplicada a coloproctologia',
];

const PublicacionesPublic = () => {
  const [data, setData] = React.useState({ publicaciones: [], email: '' });
  const [temaActivo, setTemaActivo] = React.useState('Todos');

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_publicaciones');
    if (stored) { try { setData(JSON.parse(stored)); } catch {} }
  }, []);

  const filtradas = temaActivo === 'Todos'
    ? data.publicaciones
    : data.publicaciones.filter(p => p.tema === temaActivo);

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-sky-900 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-serif font-bold text-white mb-4">Publicaciones</h1>
          <p className="text-sky-200 text-lg">Investigacion y guias clinicas para la comunidad coloproctologica.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setTemaActivo('Todos')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${temaActivo === 'Todos' ? 'bg-sky-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              Todos
            </button>
            {temasFijos.map(t => (
              <button key={t} onClick={() => setTemaActivo(t)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${temaActivo === t ? 'bg-sky-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {t}
              </button>
            ))}
          </div>

          {filtradas.length === 0 ? (
            <div className="text-center py-24 bg-slate-50 rounded-3xl">
              <FileText className="mx-auto text-slate-200 mb-4" size={48}/>
              <p className="text-slate-400">No hay publicaciones en esta categoria aun.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtradas.map((pub, i) => (
                <motion.div key={pub.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:border-sky-200 transition-all">
                  <span className="inline-block px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-bold mb-4">{pub.tema}</span>
                  <h3 className="font-bold text-slate-800 text-lg leading-snug mb-3">{pub.titulo}</h3>
                  {pub.autores && <p className="text-slate-500 text-sm mb-4 italic">{pub.autores}</p>}
                  {pub.pdf && (
                    <a href={pub.pdf} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sky-600 font-bold text-sm hover:underline">
                      <Download size={16}/> Descargar PDF
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {data.email && (
            <div className="mt-16 bg-sky-900 rounded-3xl p-8 text-white text-center">
              <h3 className="font-bold text-xl mb-2">Enviar una publicacion</h3>
              <p className="text-sky-200 text-sm mb-6">Para enviar tu investigacion o articulo contactanos.</p>
              <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 bg-white text-sky-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-50 transition-all">
                <Mail size={16}/> {data.email}
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PublicacionesPublic;