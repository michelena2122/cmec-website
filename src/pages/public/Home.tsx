import React from 'react';
import { ArrowRight, Calendar, BookOpen, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CMEC_THEME } from '../../constants';


const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-sky-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Medical background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
              Excelencia en <span className="text-sky-300">Coloproctología</span>
              <div className="flex items-center gap-4 mb-8">
  <img src="/images/logo_sin_fondo.png" alt="CMEC" className="h-20 object-contain filter brightness-0 invert"/>
  <div>
    <p className="text-white font-bold text-lg leading-tight">Colegio Mexicano de Especialistas</p>
    <p className="text-sky-300 font-bold text-lg leading-tight">en Coloproctología, A.C.</p>
  </div>
</div>
            </h1>
            <p className="text-xl text-sky-100 mb-10 leading-relaxed">
              Dedicados a la formación, investigación y práctica clínica de la más alta calidad para especialistas en México.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={CMEC_THEME.routes.CONGRESO} className="bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg hover:shadow-sky-500/20">
  Congreso <ArrowRight size={20} />
</Link>
<Link to={CMEC_THEME.routes.NOSOTROS} className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all">
  Conoce el Colegio
</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Calendar className="text-sky-600" size={32} />}
              title="Próximas Sesiones"
              desc="Consulta el calendario académico y únete a nuestras sesiones mensuales."
              link={CMEC_THEME.routes.SESIONES}
            />
            <FeatureCard 
              icon={<BookOpen className="text-sky-600" size={32} />}
              title="Publicaciones"
              desc="Accede a guías clínicas, protocolos e investigación reciente."
              link={CMEC_THEME.routes.PUBLICACIONES}
            />
            <FeatureCard 
              icon={<Award className="text-sky-600" size={32} />}
              title="Afiliación"
              desc="Forma parte de la comunidad líder de especialistas en coloproctología."
              link="/afiliate"
            />
            <FeatureCard 
  icon={<Users className="text-sky-600" size={32} />}
  title="Directorio"
  desc="Encuentra especialistas certificados en todo el país."
  link="/directorio"
/>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, link }: { icon: React.ReactNode, title: string, desc: string, link: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group"
  >
    <div className="mb-6 p-4 bg-sky-50 rounded-2xl group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
    <p className="text-slate-500 mb-8 leading-relaxed text-sm">{desc}</p>
    <Link to={link} className="mt-auto text-sky-600 font-bold text-sm tracking-wide uppercase flex items-center gap-2 hover:gap-3 transition-all">
      Ver más <ArrowRight size={16} />
    </Link>
  </motion.div>
);

export default Home;
