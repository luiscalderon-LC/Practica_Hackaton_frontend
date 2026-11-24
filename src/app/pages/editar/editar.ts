import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Incidencia } from '../../models/incidencia';
import { IncidenciaService } from '../../services/incidencia';

@Component({
  selector: 'app-editar',
  imports: [FormsModule, RouterLink],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class Editar {

  private servicio = inject(IncidenciaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  codigo = this.route.snapshot.paramMap.get('codigo') || '';

  incidencia: Incidencia | undefined =
    this.servicio.obtenerPorCodigo(this.codigo);

  mensajeError = '';

  actualizar(formulario: NgForm): void {

    if (!this.incidencia) {
      return;
    }

    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      return;
    }

    if (
      this.incidencia.titulo.trim().length < 5 ||
      this.incidencia.descripcion.trim().length < 10 ||
      this.incidencia.responsable.trim().length < 3
    ) {
      this.mensajeError = 'Completa correctamente todos los campos.';
      return;
    }

    try {

      this.servicio.actualizar(this.codigo, {
        ...this.incidencia,
        titulo: this.incidencia.titulo.trim(),
        descripcion: this.incidencia.descripcion.trim(),
        responsable: this.incidencia.responsable.trim()
      });

      this.router.navigate(['/incidencias']);

    } catch {
      this.mensajeError = 'No se pudo actualizar la incidencia.';
    }
  }
}