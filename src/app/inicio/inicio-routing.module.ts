import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from '../productos/productos.component';
import { CategoriasComponent } from '../categorias/categorias.component';

const routes: Routes = [
  { path: '', component: ProductosComponent },
  { path: 'articulos', component: ProductosComponent },
  { path: 'categorias', component: CategoriasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
