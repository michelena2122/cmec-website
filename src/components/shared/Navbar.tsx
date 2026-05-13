import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CMEC_THEME } from '../../constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const headerData = JSON.parse(localStorage.getItem('cmec_header') || '{}');

  const navLinks = [
    { name: 'Nosotros', path: CMEC_THEME.routes.NOSOTROS },
    { name: 'Noticias', path: CMEC_THEME.routes.NOTICIAS },
    { name: 'Sesiones', path: CMEC_THEME.routes.SESIONES },
    { name: 'Congreso', path: CMEC_THEME.routes.CONGRESO },
    { name: 'Publicaciones', path: CMEC_THEME.routes.PUBLICACIONES },
    { name: 'Revista', path: CMEC_THEME.routes.REVISTA },
    { name: 'Aliados', path: CMEC_THEME.routes.ALIADOS },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img src={headerData.logo1 || '/images/logo_sin_fondo.png'} alt="CMEC" className="h-16 object-contain" />
              <div className="hidden md:block">
                <p className="font-bold text-sky-900 leading-tight" style={{fontSize:'8px'}}>COLEGIO MEXICANO</p>
                <p className="font-bold text-sky-900 leading-tight" style={{fontSize:'8px'}}>DE ESPECIALISTAS</p>
                <p className="font-bold text-sky-900 leading-tight" style={{fontSize:'8px'}}>EN COLOPROCTOLOGÍA, A.C.</p>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-sky-700 ${
                    isActive ? 'text-sky-900 border-b-2 border-sky-900 py-1' : 'text-slate-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex items-center gap-2 border-l pl-6 ml-2">
              <Link
                to={CMEC_THEME.routes.LOGIN}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-sky-900 text-sky-900 hover:bg-sky-50 transition-all font-medium text-sm"
              >
                <User size={16} />
                Área de Socios
              </Link>
              <Link
                to="/afiliate"
                className="bg-sky-900 text-white px-5 py-2 rounded-full hover:bg-sky-800 transition-all font-medium text-sm shadow-sm"
              >
                Afíliate
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-sky-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to={CMEC_THEME.routes.LOGIN}
                  className="w-full text-center py-3 border border-sky-900 text-sky-900 rounded-xl font-semibold"
                >
                  Área de Socios
                </Link>
                <Link
                  to="/afiliate"
                  className="w-full text-center py-3 bg-sky-900 text-white rounded-xl font-semibold shadow-lg"
                >
                  Afíliate
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};