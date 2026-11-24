import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IncidenciaService } from '../../services/incidencia';
import { Incidencia } from '../../models/incidencia';

@Component({
  selector: 'app-incidencias',
  imports: [FormsModule, RouterLink],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.css'
})
export class Incidencias {

  private servicio = inject(IncidenciaService);

  incidencias: Incidencia[] = this.servicio.listar();

  busqueda = '';
  prioridad = '';
  estado = '';

  incidenciaSeleccionada: Incidencia | null = null;

  // Buscar y filtrar incidencias
  get incidenciasFiltradas(): Incidencia[] {
    return this.incidencias.filter(i => {

      const coincideTitulo = i.titulo.toLowerCase()
        .includes(this.busqueda.trim().toLowerCase());

      const coincidePrioridad =
        !this.prioridad || i.prioridad === this.prioridad;

      const coincideEstado =
        !this.estado || i.estado === this.estado;

      return coincideTitulo &&
             coincidePrioridad &&
             coincideEstado;
    });
  }

  // Limpiar filtros
  limpiarFiltros(): void {
    this.busqueda = '';
    this.prioridad = '';
    this.estado = '';
  }

  // Abrir confirmación
  confirmarEliminar(incidencia: Incidencia): void {
    this.incidenciaSeleccionada = incidencia;
  }

  // Cancelar eliminación
  cancelarEliminar(): void {
    this.incidenciaSeleccionada = null;
  }

  // Eliminar incidencia
  eliminar(): void {
    if (this.incidenciaSeleccionada) {

      this.servicio.eliminar(
        this.incidenciaSeleccionada.codigo
      );

      this.incidencias = this.servicio.listar();
      this.incidenciaSeleccionada = null;
    }
  }
}