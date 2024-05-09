import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVeiculoComponent } from './components/add-veiculo/add-veiculo.component';
import { VeiculosListComponent } from './components/veiculos-list/veiculos-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'veiculos', pathMatch: 'full' },
  { path: 'veiculos', component: VeiculosListComponent },
  { path: 'veiculo-add', component: AddVeiculoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
