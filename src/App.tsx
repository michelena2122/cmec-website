import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/shared/Navbar';
import { Footer } from './components/shared/Footer';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Afiliate from './pages/public/Afiliate';
import Nosotros from './pages/public/Nosotros';
import Sesiones from './pages/public/Sesiones';
import NoticiasPublic from './pages/public/Noticias';
import CongresoPublic from './pages/public/Congreso';
import PublicacionesPublic from './pages/public/Publicaciones';
import RevistaPublic from './pages/public/Revista';
import AliadosPublic from './pages/public/Aliados';
import Directorio from './pages/public/Directorio';
import SocioProfile from './pages/socio/Profile';
import { AdminLayout } from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import SocioList from './pages/admin/SocioList';
import AdminNoticias from './pages/admin/Noticias';
import AdminCongreso from './pages/admin/Congreso';
import AdminSesiones from './pages/admin/Sesiones';
import AdminNosotros from './pages/admin/Nosotros';
import AdminPublicaciones from './pages/admin/Publicaciones';
import AdminRevista from './pages/admin/Revista';
import AdminAliados from './pages/admin/Aliados';
import AdminHeader from './pages/admin/Header';
import AdminAfiliate from './pages/admin/Afiliate';
import { CMEC_THEME } from './constants';

export default function App() {
  return (
    <Router basename="/">
      <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="socios" element={<SocioList />} />
            <Route path="noticias" element={<AdminNoticias />} />
            <Route path="sesiones" element={<AdminSesiones />} />
            <Route path="congreso" element={<AdminCongreso />} />
            <Route path="nosotros" element={<AdminNosotros />} />
            <Route path="publicaciones" element={<AdminPublicaciones />} />
            <Route path="revista" element={<AdminRevista />} />
            <Route path="aliados" element={<AdminAliados />} />
            <Route path="header" element={<AdminHeader />} />
            <Route path="afiliate" element={<AdminAfiliate />} />
          </Route>

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path={CMEC_THEME.routes.NOSOTROS} element={<Nosotros />} />
            <Route path={CMEC_THEME.routes.NOTICIAS} element={<NoticiasPublic />} />
            <Route path={CMEC_THEME.routes.CONGRESO} element={<CongresoPublic />} />
            <Route path={CMEC_THEME.routes.SESIONES} element={<Sesiones />} />
            <Route path={CMEC_THEME.routes.LOGIN} element={<Login />} />
            <Route path={CMEC_THEME.routes.PUBLICACIONES} element={<PublicacionesPublic />} />
            <Route path={CMEC_THEME.routes.REVISTA} element={<RevistaPublic />} />
            <Route path={CMEC_THEME.routes.ALIADOS} element={<AliadosPublic />} />
            <Route path="afiliate" element={<Afiliate />} />
            <Route path="directorio" element={<Directorio />} />
            <Route path={CMEC_THEME.routes.SOCIO_DASHBOARD} element={<SocioProfile />} />
            <Route path="*" element={<div className="py-20 text-center container mx-auto">Página en construcción</div>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

const PublicLayout = () => (
  <>
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </>
);