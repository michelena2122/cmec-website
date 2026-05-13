/**
 * CMEC Platform Types
 */

export enum UserRole {
  ADMIN = 'admin',
  SOCIO = 'socio',
  VISITANTE = 'visitante'
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: number;
}

export interface Socio extends UserProfile {
  numeroSocio: string;
  prefijo: string;
  apellidos: string;
  puesto: string;
  telefono: string;
  cuotas: Record<string, boolean>; // e.g., { '2024': true, '2025': false }
  statusSocio: 'activo' | 'inactivo' | 'pendiente';
}

export interface Noticia {
  id: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  createdAt: number;
}

export interface Sesion {
  id: string;
  mes: string;
  dia: string;
  hora: string;
  tema: string;
  ponentes: string[];
  link: string;
  tipo: 'Zoom' | 'YouTube' | 'Meet' | 'Presencial';
}

export interface Congreso {
  id: string;
  year: number;
  nombre: string;
  programaCientifico: any[];
  areaComercial: {
    layoutUrl?: string;
    stands: Stand[];
  };
  presupuesto: {
    ingresos: Transaccion[];
    egresos: Transaccion[];
  };
}

export interface Stand {
  id: string;
  numero: string;
  medidas: string;
  asignadoA?: string;
  logotipoSponsor?: string;
}

export interface Transaccion {
  id: string;
  fecha: string;
  concepto: string;
  proveedor?: string;
  monto: number;
  iva: number;
  total: number;
  tipo: 'ingreso' | 'egreso';
}

export interface Publicacion {
  id: string;
  categoria: string;
  titulo: string;
  autores: string;
  pdfUrl: string;
  emailContacto: string;
}
