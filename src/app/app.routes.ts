import { Routes } from '@angular/router';
import { ListagemComponent } from './components/listagem/listagem.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full' },
  { path: 'listagem', component: ListagemComponent },
  { path: 'detalhes/:id', component: DetalhesComponent },
];
