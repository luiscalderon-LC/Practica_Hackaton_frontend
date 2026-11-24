import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IncidenciaService } from '../../services/incidencia';
import { Incidencia } from '../../models/incidencia';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle {

  private servicio = inject(IncidenciaService);
  private route = inject(ActivatedRoute);

  codigo = this.route.snapshot.paramMap.get('codigo') || '';

  incidencia: Incidencia | undefined =
    this.servicio.obtenerPorCodigo(this.codigo);

}