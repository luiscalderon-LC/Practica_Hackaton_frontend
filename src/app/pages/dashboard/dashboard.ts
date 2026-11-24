import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IncidenciaService } from '../../services/incidencia';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private servicio = inject(IncidenciaService);

  incidencias = this.servicio.listar();

  total = this.incidencias.length;

  pendientes = this.incidencias.filter(
    i => i.estado === 'Pendiente'
  ).length;

  enProceso = this.incidencias.filter(
    i => i.estado === 'En proceso'
  ).length;

  resueltas = this.incidencias.filter(
    i => i.estado === 'Resuelta'
  ).length;

  recientes = [...this.incidencias]
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, 5);

}