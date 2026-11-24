import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Incidencia } from '../../models/incidencia';
import { IncidenciaService } from '../../services/incidencia';

@Component({
  selector: 'app-registrar',
  imports: [FormsModule, RouterLink],
  templateUrl: './registrar.html',
  styleUrl: './registrar.css'
})
export class Registrar {

  private servicio = inject(IncidenciaService);
  private router = inject(Router);

  incidencia: Incidencia = {
    codigo: '',
    titulo: '',
    descripcion: '',
    responsable: '',
    prioridad: 'Media',
    estado: 'Pendiente',
    fecha: new Date().toLocaleDateString('en-CA')
  };

  mensajeError = '';

  guardar(formulario: NgForm): void {

    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      return;
    }

    if (
      !this.incidencia.titulo.trim() ||
      !this.incidencia.descripcion.trim() ||
      !this.incidencia.responsable.trim()
    ) {
      this.mensajeError = 'Completa correctamente todos los campos.';
      return;
    }

    try {

      this.incidencia.codigo = this.servicio.generarCodigo();

      this.servicio.registrar({
        ...this.incidencia,
        titulo: this.incidencia.titulo.trim(),
        descripcion: this.incidencia.descripcion.trim(),
        responsable: this.incidencia.responsable.trim()
      });

      this.router.navigate(['/incidencias']);

    } catch {
      this.mensajeError = 'No se pudo registrar la incidencia.';
    }
  }
}