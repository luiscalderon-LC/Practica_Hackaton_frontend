
import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Incidencias } from './pages/incidencias/incidencias';
import { Registrar } from './pages/registrar/registrar';
import { Editar } from './pages/editar/editar';
import { Detalle } from './pages/detalle/detalle';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'incidencias',
    component: Incidencias
  },
  {
    path: 'registrar',
    component: Registrar
  },
  {
    path: 'editar/:codigo',
    component: Editar
  },
  {
    path: 'detalle/:codigo',
    component: Detalle
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
