
export interface Incidencia {
  codigo: string;
  titulo: string;
  descripcion: string;
  responsable: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  estado: 'Pendiente' | 'En proceso' | 'Resuelta';
  fecha: string;
}
