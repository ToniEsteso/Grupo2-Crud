import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { CategoriasComponent } from '../categorias/categorias.component';
import { ProductosComponent } from '../productos/productos.component';
import { PanelPrincipalComponent } from '../panel-principal/panel-principal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriasComponent,
    ProductosComponent,
    PanelPrincipalComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    FormsModule
  ]
})
export class InicioModule { }
