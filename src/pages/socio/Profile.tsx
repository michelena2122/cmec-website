import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CreditCard, FileText, LogOut, CheckCircle, XCircle } from 'lucide-react';

const SocioProfile = () => {
  const [socio, setSocio] = React.useState(null);
  const [editando, setEditando] = React.useState(false);
  const [datosEdit, setDatosEdit] = React.useState(null);
  const [passwordForm, setPasswordForm] = React.useState({ actual: '', nueva: '', confirmar: '' });
  const navigate = useNavigate();

  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_socio_session');
    if (!stored) { navigate('/login'); return; }
    try { setSocio(JSON.parse(stored)); setDatosEdit(JSON.parse(stored)); } catch { navigate('/login'); }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('cmec_socio_session');
    navigate('/login');
  };

  const generarConstancia = (imprimir = false) => {
    const config = JSON.parse(localStorage.getItem('cmec_cartas_config') || '{}');
    const hoy = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    const html = `<html><head><meta charset="UTF-8"><style>body { font-family: 'Times New Roman', serif; padding: 40px; color: #1e293b; line-height: 1.6; }.header { text-align: center; border-bottom: 3px solid #0c4a6e; padding-bottom: 20px; margin-bottom: 30px; }.logo { font-size: 24px; font-weight: bold; color: #0c4a6e; }.subtitle { font-size: 12px; color: #475569; margin-top: 4px; }.fecha { text-align: right; color: #475569; font-size: 12px; margin-bottom: 30px; }h1 { font-size: 20px; text-align: center; color: #0c4a6e; margin: 40px 0; text-transform: uppercase; letter-spacing: 2px; }.body { font-size: 14px; text-align: justify; }.nombre { font-weight: bold; font-size: 16px; text-align: center; margin: 30px 0; color: #0c4a6e; }.firma { margin-top: 60px; text-align: center; }.firma img { max-height: 40px; margin-bottom: 8px; }.linea { border-top: 1px solid #1e293b; width: 180px; margin: 0 auto 8px; }.numero { text-align: center; color: #475569; font-size: 12px; margin-top: 20px; }.info { font-size: 11px; color: #475569; text-align: center; margin-top: 20px; line-height: 1.4; }</style></head><body><div class="header"><div class="logo">CMEC</div><div class="subtitle">Colegio Mexicano de Especialistas en Coloproctología, A.C.</div></div><div class="fecha">Ciudad de México, ${hoy}</div><h1>Constancia de Afiliación</h1><div class="body"><p>El Colegio Mexicano de Especialistas en Coloproctología, A.C., por medio de la presente hace constar que:</p></div><div class="nombre">${socio.prefijo} ${socio.nombre}</div><div class="body"><p>Es miembro activo de esta institución desde el año <strong>${socio.fechaIngreso?.split('-')[0] || '2020'}</strong>, habiendo cumplido con todos los requisitos establecidos en los estatutos del colegio.</p><p>Durante su pertenencia a nuestro colegio, ${socio.nombre} ha demostrado un compromiso continuo con la actualización médica en el campo de la coloproctología, participando en diversas actividades académicas y científicas organizadas por el colegio.</p><p>Se expide la presente constancia a petición del interesado para los fines que estime convenientes.</p></div><div class="numero">Número de socio: ${socio.numero}</div><div class="firma">${config.firma ? `<img src="${config.firma}" alt="Firma"/>` : ''}<div class="linea"></div><p style="font-weight: bold; margin: 8px 0;">${config.nombrePresidente || 'Presidente CMEC'}</p><p style="font-size: 11px;">Presidente</p></div><div class="info"><p><strong>Colegio Mexicano de Especialistas en Coloproctología, A.C.</strong></p>${config.domicilio ? `<p>${config.domicilio}</p>` : ''}${config.email ? `<p>E-Mail: ${config.email}</p>` : ''}${config.telefono ? `<p>Teléfono: ${config.telefono}</p>` : ''}</div></body></html>`;
    const ventana = window.open('', '_blank');
    ventana.document.write(html);
    ventana.document.close();
    if (imprimir) setTimeout(() => ventana.print(), 500);
  };

  const generarInvitacion = (imprimir = false) => {
    const config = JSON.parse(localStorage.getItem('cmec_cartas_config') || '{}');
    const hoy = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    const html = `<html><head><meta charset="UTF-8"><style>body { font-family: 'Times New Roman', serif; padding: 40px; color: #1e293b; line-height: 1.6; }.header { text-align: center; border-bottom: 3px solid #0c4a6e; padding-bottom: 20px; margin-bottom: 30px; }.logo { font-size: 24px; font-weight: bold; color: #0c4a6e; }.subtitle { font-size: 12px; color: #475569; margin-top: 4px; }.fecha { text-align: right; color: #475569; font-size: 12px; margin-bottom: 30px; }h1 { font-size: 20px; text-align: center; color: #0c4a6e; margin: 40px 0; text-transform: uppercase; letter-spacing: 2px; }.body { font-size: 14px; text-align: justify; }.nombre { font-weight: bold; font-size: 16px; text-align: center; margin: 30px 0; color: #0c4a6e; }.firma { margin-top: 60px; text-align: center; }.firma img { max-height: 40px; margin-bottom: 8px; }.linea { border-top: 1px solid #1e293b; width: 180px; margin: 0 auto 8px; }.numero { text-align: center; color: #475569; font-size: 12px; margin-top: 20px; }.info { font-size: 11px; color: #475569; text-align: center; margin-top: 20px; line-height: 1.4; }</style></head><body><div class="header"><div class="logo">CMEC</div><div class="subtitle">Colegio Mexicano de Especialistas en Coloproctología, A.C.</div></div><div class="fecha">Ciudad de México, ${hoy}</div><h1>Carta de Invitación</h1><div class="body"><p>El Colegio Mexicano de Especialistas en Coloproctología, A.C., tiene el honor de invitar a:</p></div><div class="nombre">${socio.prefijo} ${socio.nombre}</div><div class="body"><p>Al <strong>Congreso Nacional de Coloproctología 2026</strong>, evento científico de mayor relevancia en nuestra especialidad, donde se reunirán los principales expertos nacionales e internacionales para compartir los avances más recientes en la materia.</p><p>Su participación como miembro activo del colegio es fundamental para el éxito de este importante evento académico que realiza nuestro colegio en pro de la permanente labor de educación continua que establece nuestro estatuto y nuestra misión y visión institucional.</p><p>Sin otro en particular, quedo de usted.</p></div><div class="numero">Número de socio: ${socio.numero}</div><div class="firma">${config.firma ? `<img src="${config.firma}" alt="Firma"/>` : ''}<div class="linea"></div><p style="font-weight: bold; margin: 8px 0;">${config.nombrePresidente || 'Presidente CMEC'}</p><p style="font-size: 11px;">Presidente</p></div><div class="info"><p><strong>Colegio Mexicano de Especialistas en Coloproctología, A.C.</strong></p>${config.domicilio ? `<p>${config.domicilio}</p>` : ''}${config.email ? `<p>E-Mail: ${config.email}</p>` : ''}${config.telefono ? `<p>Teléfono: ${config.telefono}</p>` : ''}</div></body></html>`;
    const ventana = window.open('', '_blank');
    ventana.document.write(html);
    ventana.document.close();
    if (imprimir) setTimeout(() => ventana.print(), 500);
  };

  const generarGafete = () => {
    const html = `<html><head><meta charset="UTF-8"><style>body { margin: 0; padding: 20px; font-family: Arial, sans-serif; background: #f0f0f0; }.gafete { width: 350px; height: 500px; background: linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%); border-radius: 20px; padding: 30px; color: white; box-shadow: 0 10px 30px rgba(0,0,0,0.3); position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }.gafete::before { content: ''; position: absolute; top: -50%; right: -50%; width: 300px; height: 300px; background: rgba(255,255,255,0.1); border-radius: 50%; }.header { text-align: center; position: relative; z-index: 1; }.logo { font-size: 32px; font-weight: bold; margin-bottom: 20px; }.titulo { font-size: 12px; opacity: 0.9; }.content { text-align: center; position: relative; z-index: 1; }.nombre { font-size: 22px; font-weight: bold; margin-bottom: 15px; }.info { font-size: 13px; background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; line-height: 1.8; }.info p { margin: 5px 0; }.footer { text-align: center; font-size: 10px; opacity: 0.8; position: relative; z-index: 1; }</style></head><body><div class="gafete"><div class="header"><div class="logo">CMEC</div><div class="titulo">COLEGIO MEXICANO DE ESPECIALISTAS<br>EN COLOPROCTOLOGÍA</div></div><div class="content"><div class="nombre">${socio.prefijo} ${socio.nombre}</div><div class="info"><p><strong>Socio #${socio.numero}</strong></p><p>${socio.email}</p><p>${socio.telefono}</p></div></div><div class="footer">Válido para el año 2026</div></div></body></html>`;
    const ventana = window.open('', '_blank');
    ventana.document.write(html);
    ventana.document.close();
    ventana.print();
  };

  const guardarDatos = () => {
    const socios = JSON.parse(localStorage.getItem('cmec_socios') || '[]');
    const actualizado = socios.map(s => s.id === socio.id ? datosEdit : s);
    localStorage.setItem('cmec_socios', JSON.stringify(actualizado));
    localStorage.setItem('cmec_socio_session', JSON.stringify(datosEdit));
    setSocio(datosEdit);
    setEditando(false);
  };

  const cambiarPassword = () => {
    if (passwordForm.actual !== socio.password) {
      alert('Contraseña actual incorrecta');
      return;
    }
    if (passwordForm.nueva !== passwordForm.confirmar) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const socios = JSON.parse(localStorage.getItem('cmec_socios') || '[]');
    const actualizado = socios.map(s => s.id === socio.id ? { ...s, password: passwordForm.nueva } : s);
    localStorage.setItem('cmec_socios', JSON.stringify(actualizado));
    setSocio({ ...socio, password: passwordForm.nueva });
    setPasswordForm({ actual: '', nueva: '', confirmar: '' });
    alert('Contraseña actualizada');
  };

  if (!socio) return null;

  const cuotas = [
    { anio: '2020', pagado: socio.cuota2020 },
    { anio: '2021', pagado: socio.cuota2021 },
    { anio: '2022', pagado: socio.cuota2022 },
    { anio: '2023', pagado: socio.cuota2023 },
    { anio: '2024', pagado: socio.cuota2024 },
    { anio: '2025', pagado: socio.cuota2025 },
    { anio: '2026', pagado: socio.cuota2026 },
  ];

  const alCorriente = socio.cuota2026;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-sky-900 rounded-3xl p-8 text-white flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-sky-700 rounded-2xl flex items-center justify-center text-2xl font-bold">
              {socio.nombre?.slice(0,2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold">{socio.prefijo} {socio.nombre}</h1>
              <p className="text-sky-300 text-sm">Socio #{socio.numero}</p>
              <p className="text-sky-300 text-sm">{socio.email}</p>
            </div>
          </div>
          <button onClick={cerrarSesion} className="flex items-center gap-2 px-4 py-2 bg-sky-800 rounded-xl text-sm font-bold hover:bg-sky-700 transition-all">
            <LogOut size={16}/> Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-8">
            <h2 className="font-bold text-slate-900 text-xl mb-6 flex items-center gap-2">
              <CreditCard className="text-sky-600" size={20}/> Estado de Cuenta
            </h2>
            <div className="space-y-3">
              {cuotas.map(c => (
                <div key={c.anio} className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="font-bold text-slate-700 text-sm">Cuota {c.anio}</span>
                  {c.pagado ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs"><CheckCircle size={14}/> Pagado</span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-400 font-bold text-xs"><XCircle size={14}/> Pendiente</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <h2 className="font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                <FileText className="text-sky-600" size={20}/> Documentos
              </h2>
              <div className="space-y-3">
                <button onClick={generarGafete} className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${alCorriente ? 'bg-sky-900 text-white hover:bg-sky-800' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`} disabled={!alCorriente}>
                  {alCorriente ? 'Descargar Gafete' : 'Gafete — Cuota pendiente'}
                </button>
                <div className="flex gap-2">
                  <button onClick={() => generarConstancia(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">Ver Constancia</button>
                  <button onClick={() => generarConstancia(true)} className="flex-1 py-3 bg-sky-900 text-white rounded-xl font-bold text-sm hover:bg-sky-800 transition-all">Imprimir</button>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => generarInvitacion(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">Ver Invitación</button>
                  <button onClick={() => generarInvitacion(true)} className="flex-1 py-3 bg-sky-900 text-white rounded-xl font-bold text-sm hover:bg-sky-800 transition-all">Imprimir</button>
                </div>
              </div>
            </div>
              <div className="space-y-3 border-t border-slate-100 pt-4 mt-4">
  <h3 className="font-bold text-slate-700 text-sm">Constancias de Sesiones y Congreso</h3>
  
  <button onClick={() => {
    const mesActual = new Date().getMonth();
    const constancias = JSON.parse(localStorage.getItem('cmec_socios_constancias') || '{}');
    const link = constancias.sesiones?.[mesActual];
    if (link) window.open(link, '_blank');
    else alert('Constancia de sesión no disponible');
  }} className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">
    📥 Descargar Constancia Sesión
  </button>
  
  <button onClick={() => {
    const constancias = JSON.parse(localStorage.getItem('cmec_socios_constancias') || '{}');
    const links = [
      { label: 'Congreso', url: constancias.congreso },
      { label: 'Precongreso', url: constancias.precongreso },
      { label: 'Transcongreso', url: constancias.transcongreso }
    ];
    const disponibles = links.filter(l => l.url);
    if (disponibles.length === 0) { alert('No hay constancias disponibles'); return; }
    if (disponibles.length === 1) { window.open(disponibles[0].url, '_blank'); return; }
    const selected = prompt(`Elige constancia:\n${disponibles.map((l,i) => `${i+1}. ${l.label}`).join('\n')}`);
    if (selected) window.open(disponibles[parseInt(selected)-1]?.url, '_blank');
  }} className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">
    📥 Descargar Constancia Congreso
  </button>
</div>
            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <h2 className="font-bold text-slate-900 text-xl mb-4">Mis Datos</h2>
              {!editando ? (
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-slate-500">Nombre:</span><span className="font-bold">{socio.nombre}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Email:</span><span className="font-bold">{socio.email}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Teléfono:</span><span className="font-bold">{socio.telefono}</span></div>
                  <button onClick={() => { setEditando(true); setDatosEdit({...socio}); }} className="w-full mt-4 py-2 bg-sky-100 text-sky-900 rounded-xl font-bold text-sm hover:bg-sky-200">Editar Datos</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div><label className="text-xs font-bold text-slate-400">Nombre</label><input value={datosEdit.nombre} onChange={e => setDatosEdit({...datosEdit, nombre: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm"/></div>
                  <div><label className="text-xs font-bold text-slate-400">Email</label><input value={datosEdit.email} onChange={e => setDatosEdit({...datosEdit, email: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm"/></div>
                  <div><label className="text-xs font-bold text-slate-400">Teléfono</label><input value={datosEdit.telefono} onChange={e => setDatosEdit({...datosEdit, telefono: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm"/></div>
                  <div className="flex gap-2">
                    <button onClick={guardarDatos} className="flex-1 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-500">Guardar</button>
                    <button onClick={() => setEditando(false)} className="flex-1 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-300">Cancelar</button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <h2 className="font-bold text-slate-900 text-xl mb-4">Cambiar Contraseña</h2>
              <div className="space-y-3">
                <div><label className="text-xs font-bold text-slate-400">Contraseña Actual</label><input type="password" value={passwordForm.actual} onChange={e => setPasswordForm({...passwordForm, actual: e.target.value})} placeholder="••••••" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm"/></div>
                <div><label className="text-xs font-bold text-slate-400">Nueva Contraseña</label><input type="password" value={passwordForm.nueva} onChange={e => setPasswordForm({...passwordForm, nueva: e.target.value})} placeholder="••••••" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm"/></div>
                <div><label className="text-xs font-bold text-slate-400">Confirmar Contraseña</label><input type="password" value={passwordForm.confirmar} onChange={e => setPasswordForm({...passwordForm, confirmar: e.target.value})} placeholder="••••••" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm"/></div>
                <button onClick={cambiarPassword} className="w-full py-2 bg-sky-900 text-white rounded-xl font-bold text-sm hover:bg-sky-800">Actualizar Contraseña</button>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8">
              <h2 className="font-bold text-slate-900 text-xl mb-4">Pagar Cuota</h2>
              <p className="text-slate-500 text-sm mb-4">Mantén tu membresía al corriente para acceder a todos los beneficios.</p>
              <PagarCuota />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PagarCuota = () => {
  const [cuota, setCuota] = React.useState({ monto: '', link: '' });
  React.useEffect(() => {
    const stored = localStorage.getItem('cmec_cuota');
    if (stored) { try { setCuota(JSON.parse(stored)); } catch {} }
  }, []);
  return cuota.link ? (
    <a href={cuota.link} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-500 transition-all text-center">
      Pagar Cuota 2026 {cuota.monto && `— ${cuota.monto}`}
    </a>
  ) : (
    <button disabled className="w-full py-3 bg-slate-100 text-slate-400 rounded-xl font-bold text-sm cursor-not-allowed">
      Pago no disponible aún
    </button>
  );
};

export default SocioProfile;