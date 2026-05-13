import React from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp, 
  ArrowUpRight,
  CreditCard,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">Bienvenido, Admin</h1>
        <p className="text-slate-500">Resumen general de las operaciones del colegio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Socios Activos" 
          value="452" 
          change="+12 este mes" 
          icon={<Users className="text-sky-600" />} 
          color="bg-sky-50"
        />
        <StatCard 
          title="Próximas Sesiones" 
          value="3" 
          change="Próxima: 15 May" 
          icon={<Calendar className="text-emerald-600" />} 
          color="bg-emerald-50"
        />
        <StatCard 
          title="Ingresos Congreso" 
          value="$1.2M" 
          change="65% del objetivo" 
          icon={<CreditCard className="text-amber-600" />} 
          color="bg-amber-50"
        />
        <StatCard 
          title="Carteles Recibidos" 
          value="24" 
          change="8 pendientes" 
          icon={<FileText className="text-purple-600" />} 
          color="bg-purple-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Actividad Reciente</h3>
            <button className="text-sky-600 text-sm font-semibold hover:underline">Ver todo</button>
          </div>
          <div className="space-y-6">
            <ActivityItem 
              title="Nuevo Socio Registrado" 
              desc="Dr. Carlos Ruiz ha completado su registro." 
              time="Hace 2 horas"
              icon={<CheckCircle className="text-emerald-500" size={16} />}
            />
            <ActivityItem 
              title="Pago Recibido" 
              desc="Anualidad 2026 - Dra. María Lopez" 
              time="Hace 4 horas"
              icon={<CreditCard className="text-sky-500" size={16} />}
            />
            <ActivityItem 
              title="Error en Webhook" 
              desc="Mercado Pago reportó un fallo de comunicación." 
              time="Hace 6 horas"
              isWarning
              icon={<AlertCircle className="text-rose-500" size={16} />}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 gap-4">
            <QuickActionBtn label="Importar Socios (Excel)" />
            <QuickActionBtn label="Nueva Noticia" />
            <QuickActionBtn label="Programar Sesión" />
            <QuickActionBtn label="Reporte de Ingresos" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        {icon}
      </div>
      <ArrowUpRight className="text-slate-300" size={20} />
    </div>
    <div className="space-y-1">
      <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs font-semibold text-emerald-600">{change}</p>
    </div>
  </div>
);

const ActivityItem = ({ title, desc, time, icon, isWarning }: any) => (
  <div className="flex gap-4">
    <div className={`mt-1 h-3 w-3 rounded-full ${isWarning ? 'bg-rose-500' : 'bg-emerald-500'}`} />
    <div className="flex-grow">
      <div className="flex items-center justify-between mb-1">
        <h5 className="text-sm font-bold text-slate-900">{title}</h5>
        <span className="text-xs text-slate-400">{time}</span>
      </div>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  </div>
);

const QuickActionBtn = ({ label }: { label: string }) => (
  <button className="w-full text-left px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-200 hover:bg-sky-50 transition-all text-slate-700 font-medium text-sm">
    {label}
  </button>
);
  
export default AdminDashboard;
