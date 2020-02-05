import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio.component';
import { ProductosComponent } from '../productos/productos.component';
import { CategoriasComponent } from '../categorias/categorias.component';
import { PanelPrincipalComponent } from '../panel-principal/panel-principal.component';

const routes: Routes = [
  { path: '', component: PanelPrincipalComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'categorias', component: CategoriasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
  ]
})
export class InicioRoutingModule { }
