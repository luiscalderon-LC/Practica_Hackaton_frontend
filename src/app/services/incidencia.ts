
import { Injectable } from '@angular/core';
import { Incidencia } from '../models/incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  private storageKey = 'incidencias';

  private incidencias: Incidencia[] = [
    {
      codigo: 'INC-001',
      titulo: 'Falla de red en laboratorio',
      descripcion: 'Las computadoras no tienen conexión a Internet.',
      responsable: 'Carlos Mendoza',
      prioridad: 'Alta',
      estado: 'En proceso',
      fecha: '2026-11-23'
    },
    {
      codigo: 'INC-002',
      titulo: 'Error de acceso al portal',
      descripcion: 'Los estudiantes no pueden iniciar sesión.',
      responsable: 'Maria Torres',
      prioridad: 'Media',
      estado: 'Pendiente',
      fecha: '2026-11-23'
    },
    {
      codigo: 'INC-003',
      titulo: 'Actualización de Office',
      descripcion: 'Actualizar los programas del laboratorio.',
      responsable: 'Juan Ramirez',
      prioridad: 'Baja',
      estado: 'Resuelta',
      fecha: '2026-11-22'
    }
  ];

  constructor() {
    const datos = localStorage.getItem(this.storageKey);

    if (datos) {
      this.incidencias = JSON.parse(datos);
    } else {
      this.guardarDatos();
    }
  }

  // Guardar datos en LocalStorage
  private guardarDatos(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.incidencias)
    );
  }

  // Listar incidencias
  listar(): Incidencia[] {
    return this.incidencias.map(i => ({ ...i }));
  }

  // Buscar incidencia por código
  obtenerPorCodigo(codigo: string): Incidencia | undefined {
    const incidencia = this.incidencias.find(
      i => i.codigo === codigo
    );
    return incidencia ? { ...incidencia } : undefined;
  }

  // Registrar incidencia
  registrar(incidencia: Incidencia): void {
    if (this.obtenerPorCodigo(incidencia.codigo)) {
      throw new Error('El código ya existe');
    }

    this.incidencias.push({ ...incidencia });
    this.guardarDatos();
  }

  // Actualizar incidencia
  actualizar(codigo: string, incidencia: Incidencia): void {
    const index = this.incidencias.findIndex(
      i => i.codigo === codigo
    );

    if (index !== -1) {
      this.incidencias[index] = {
        ...incidencia,
        codigo
      };
      this.guardarDatos();
    }
  }

  // Eliminar incidencia
  eliminar(codigo: string): void {
    this.incidencias = this.incidencias.filter(
      i => i.codigo !== codigo
    );

    this.guardarDatos();
  }

  // Generar código automático
  generarCodigo(): string {
    const ultimo = Number(
      localStorage.getItem('ultimoCodigoIncidencia') || '0'
    );

    const numeros = this.incidencias.map(
      i => Number(i.codigo.split('-')[1]) || 0
    );

    const siguiente = Math.max(ultimo, 0, ...numeros) + 1;

    localStorage.setItem(
      'ultimoCodigoIncidencia',
      String(siguiente)
    );

    return 'INC-' + String(siguiente).padStart(3, '0');
  }
}
