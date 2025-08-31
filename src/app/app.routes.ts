import { Routes } from '@angular/router';
import { Formulario } from './features/formulario/formulario';
import { Teste } from './features/teste/teste';

export const routes: Routes = [
  { path: '', component: Formulario },
  { path: 'teste', component: Teste },
];
