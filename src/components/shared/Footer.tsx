import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CMEC_THEME } from '../../constants';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
  <img src="/images/logo_sin_fondo.png" alt="CMEC" className="h-16 object-contain filter brightness-0 invert"/>
  <div>
    <p className="font-serif text-lg font-bold leading-tight">CMEC</p>
    <p className="text-slate-400 text-xs leading-tight">Colegio Mexicano de Especialistas<br/>en Coloproctología, A.C.</p>
  </div>
</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Colegio Mexicano de Especialistas en Coloproctología. Excelencia en la práctica, educación e investigación de la coloproctología en México.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-sky-600 transition-colors"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-sky-600 transition-colors"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-sky-600 transition-colors"><Twitter size={18} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-sky-600 transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to={CMEC_THEME.routes.NOSOTROS} className="hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link to={CMEC_THEME.routes.SESIONES} className="hover:text-white transition-colors">Sesiones Académicas</Link></li>
              <li><Link to={CMEC_THEME.routes.PUBLICACIONES} className="hover:text-white transition-colors">Publicaciones</Link></li>
              <li><Link to="/afiliate" className="hover:text-white transition-colors">Afiliación</Link></li>
              <li><Link to="/aviso-privacidad" className="hover:text-white transition-colors">Aviso de Privacidad</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-sky-500 shrink-0" size={18} />
                <span>CDMX, México</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-sky-500 shrink-0" size={18} />
                <span>+52 (55) 0000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-sky-500 shrink-0" size={18} />
                <span>contacto@cmec.org.mx</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Aliados</h3>
            <div className="grid grid-cols-2 gap-4">
  <div className="h-12 bg-white rounded flex items-center justify-center p-2"><img src="/images/janssen.png" alt="Janssen" className="h-full object-contain"/></div>
  <div className="h-12 bg-white rounded flex items-center justify-center p-2"><img src="/images/alfasigma.png" alt="Alfasigma" className="h-full object-contain"/></div>
  <div className="h-12 bg-white rounded flex items-center justify-center p-2"><img src="/images/medtronic.png" alt="Medtronic" className="h-full object-contain"/></div>
  <div className="h-12 bg-white rounded flex items-center justify-center p-2"><img src="/images/shwabe.png" alt="Shwabe" className="h-full object-contain"/></div>
</div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} CMEC - Colegio Mexicano de Especialistas en Coloproctología. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
