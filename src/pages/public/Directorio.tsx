import React from 'react';
import { Users, Search } from 'lucide-react';

const Directorio = () => {
  const [socios, setSocios] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_socios');
    if (stored) { try { setSocios(JSON.parse(stored)); } catch {} }
  }, []);

  const filtrados = socios.filter(s =>
    s.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.prefijo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-sky-900 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-serif font-bold text-white mb-4">Directorio de Socios</h1>
          <p className="text-sky-200 text-lg">Especialistas certificados en coloproctología en México.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
            <input type="text" placeholder="Buscar especialista..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"/>
          </div>
          {filtrados.length === 0 ? (
            <div className="text-center py-24 bg-slate-50 rounded-3xl">
              <Users className="mx-auto text-slate-200 mb-4" size={48}/>
              <p className="text-slate-400">No hay socios registrados aun.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtrados.map(socio => (
                <div key={socio.id} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-sky-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-sm uppercase shrink-0">
                    {socio.nombre?.slice(0,2)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{socio.prefijo} {socio.nombre}</p>
                    <p className="text-slate-400 text-xs">Socio #{socio.numero}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-slate-400 text-sm mt-8 text-center">{filtrados.length} especialistas encontrados</p>
        </div>
      </section>
    </div>
  );
};

export default Directorio;