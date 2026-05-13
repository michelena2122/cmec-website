import React from 'react';
import { Save, Upload, FileText } from 'lucide-react';

const AdminAfiliate = () => {
  const [guardado, setGuardado] = React.useState(false);
  const [data, setData] = React.useState({
    email: '',
    requisitos: '',
    pdfFormato: '',
    pdfEtica: ''
  });

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_afiliate');
    if (stored) { try { setData(JSON.parse(stored)); } catch {} }
  }, []);

  const guardar = (newData) => {
    const updated = { ...data, ...newData };
    setData(updated);
    localStorage.setItem('cmec_afiliate', JSON.stringify(updated));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const toBase64 = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

  const handlePdf = async (key, e) => {
    const file = e.target.files[0];
    if (file) {
      const b64 = await toBase64(file);
      guardar({ [key]: b64 });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900">Afíliate</h1>
        <p className="text-slate-500">Edita el contenido de la página de afiliación.</p>
      </div>

      {guardado && <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm z-50">Guardado</div>}

      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-4">Email de afiliación</h3>
        <input
          value={data.email}
          onChange={e => guardar({ email: e.target.value })}
          placeholder="admisiones@cmec.org.mx"
          type="email"
          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm"
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="font-bold text-slate-900 mb-4">Requisitos de afiliación</h3>
        <textarea
          value={data.requisitos}
          onChange={e => guardar({ requisitos: e.target.value })}
          placeholder="Describe los requisitos para afiliarse al CMEC..."
          rows={6}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="text-sky-600" size={20}/> Formato de Inscripción (PDF)
          </h3>
          <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50 w-fit">
            <Upload size={16} className="text-sky-600"/> Subir PDF
            <input type="file" accept=".pdf" className="hidden" onChange={e => handlePdf('pdfFormato', e)}/>
          </label>
          {data.pdfFormato && <p className="text-emerald-600 font-bold text-xs mt-3">✓ PDF subido</p>}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="text-sky-600" size={20}/> Código de Ética CMEC (PDF)
          </h3>
          <label className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm cursor-pointer hover:bg-slate-50 w-fit">
            <Upload size={16} className="text-sky-600"/> Subir PDF
            <input type="file" accept=".pdf" className="hidden" onChange={e => handlePdf('pdfEtica', e)}/>
          </label>
          {data.pdfEtica && <p className="text-emerald-600 font-bold text-xs mt-3">✓ PDF subido</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminAfiliate;