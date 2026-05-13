import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Download, HelpCircle, Send } from 'lucide-react';

const Afiliate = () => {
  const [data, setData] = React.useState({
    email: 'admisiones@cmec.org.mx',
    requisitos: '',
    pdfFormato: '',
    pdfEtica: ''
  });

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_afiliate');
    if (stored) { try { setData(JSON.parse(stored)); } catch {} }
  }, []);

  return (
    <div className="bg-white">
      <section className="bg-sky-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Únete al Colegio</h1>
          <p className="text-xl text-sky-100 max-w-3xl mx-auto leading-relaxed">
            Forma parte de la red más importante de especialistas en coloproctología en México.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <CheckCircle className="text-sky-600" /> Requisitos
                </h2>
                {data.requisitos ? (
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{data.requisitos}</p>
                ) : (
                  <div className="space-y-6">
                    <RequirementItem title="Título de Medicina" desc="Copia del título profesional legalmente expedido." />
                    <RequirementItem title="Cédula de Especialista" desc="Cédula profesional de especialista en Coloproctología." />
                    <RequirementItem title="Certificación Vigente" desc="Certificado vigente por el Consejo Mexicano de Especialistas en Coloproctología." />
                    <RequirementItem title="Currículum Vitae" desc="Resumen curricular actualizado con fotografía." />
                  </div>
                )}
              </div>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <Download className="text-sky-600" /> Descargables
                </h3>
                <div className="space-y-4">
                  {data.pdfFormato ? (
                    <a href={data.pdfFormato} download className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl hover:border-sky-300 hover:bg-sky-50 transition-all font-semibold text-slate-700 text-sm">
                      Formato de Inscripción (PDF) <Download size={18} className="text-sky-600" />
                    </a>
                  ) : (
                    <div className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl opacity-50 font-semibold text-slate-700 text-sm">
                      Formato de Inscripción (PDF) <Download size={18} className="text-slate-300" />
                    </div>
                  )}
                  {data.pdfEtica ? (
                    <a href={data.pdfEtica} download className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl hover:border-sky-300 hover:bg-sky-50 transition-all font-semibold text-slate-700 text-sm">
                      Código de Ética CMEC <Download size={18} className="text-sky-600" />
                    </a>
                  ) : (
                    <div className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl opacity-50 font-semibold text-slate-700 text-sm">
                      Código de Ética CMEC <Download size={18} className="text-slate-300" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl border-2 border-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 bg-sky-50 rounded-bl-3xl">
                <HelpCircle className="text-sky-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Proceso de Afiliación</h2>
              <div className="space-y-10 relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 -z-10" />
                <ProcessStep number="01" title="Envía tus documentos" desc={`Escanea y envía los requisitos al correo oficial: ${data.email}`} />
                <ProcessStep number="02" title="Validación Institucional" desc="La mesa directiva revisará tu expediente en un lapso de 15 días hábiles." />
                <ProcessStep number="03" title="Pago de Anualidad" desc="Una vez aceptado, recibirás las instrucciones para el pago de tu primera cuota." />
                <ProcessStep number="04" title="Activación de Cuenta" desc="Recibirás tus accesos al Área de Socios para descargar tu gafete y constancias." />
              </div>

              <div className="mt-12 bg-sky-900 p-8 rounded-2xl text-white">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Send size={18} /> ¿Tienes dudas?
                </h4>
                <p className="text-sky-200 text-sm mb-6 leading-relaxed">
                  Contáctanos por Mail para asistencia inmediata en tu proceso de registro.
                </p>
                <a href={`mailto:${data.email}`} className="block w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-center">
                  Contactar Administrador
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const RequirementItem = ({ title, desc }) => (
  <div className="flex gap-4 p-4 hover:bg-slate-50 border-l-4 border-transparent hover:border-sky-600 transition-all rounded-r-2xl">
    <div className="shrink-0 h-10 w-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600">
      <FileText size={20} />
    </div>
    <div>
      <h4 className="font-bold text-slate-800">{title}</h4>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  </div>
);

const ProcessStep = ({ number, title, desc }) => (
  <div className="flex gap-6">
    <div className="shrink-0 h-12 w-12 bg-white border-2 border-sky-600 rounded-full flex items-center justify-center text-sky-600 font-bold">
      {number}
    </div>
    <div>
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Afiliate;