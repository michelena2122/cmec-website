import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { CMEC_THEME } from '../../constants';

export const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Encabezado', icon: <Settings size={20} />, path: '/admin/header' },
    { name: 'Afíliate', icon: <Award size={20} />, path: '/admin/afiliate' },
    { name: 'Nosotros', icon: <Users size={20} />, path: '/admin/nosotros' },
    { name: 'Noticias', icon: <Megaphone size={20} />, path: '/admin/noticias' },
    { name: 'Sesiones', icon: <Calendar size={20} />, path: '/admin/sesiones' },
    { name: 'Congreso', icon: <Stethoscope size={20} />, path: '/admin/congreso' },
    { name: 'Publicaciones', icon: <BookOpen size={20} />, path: '/admin/publicaciones' },
    { name: 'Revista', icon: <FileText size={20} />, path: '/admin/revista' },
    { name: 'Aliados', icon: <Users size={20} />, path: '/admin/aliados' },
    { name: 'Socios', icon: <Users size={20} />, path: '/admin/socios' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isCollapsed ? 'w-20' : 'w-64'
        } bg-slate-900 text-white transition-all duration-300 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          {!isCollapsed && <span className="font-serif font-bold text-xl tracking-tight">CMEC Admin</span>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-grow py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <div className="shrink-0">{item.icon}</div>
              {!isCollapsed && <span className="font-medium text-sm">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            {!isCollapsed && <span className="text-sm font-medium">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <header className="bg-white h-16 border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
          <h2 className="text-slate-800 font-bold">Panel de Administración</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border">
              <div className="w-8 h-8 rounded-full bg-sky-900 flex items-center justify-center text-white text-xs font-bold">AD</div>
              <span className="text-sm font-semibold text-slate-700">Administrador</span>
            </div>
          </div>
        </header>
        
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const Award = ({ size }: { size: number }) => <AwardIcon size={size} />;
import { Award as AwardIcon } from 'lucide-react';
