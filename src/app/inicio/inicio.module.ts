import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { CategoriasComponent } from '../categorias/categorias.component';
import { ProductosComponent } from '../productos/productos.component';
import { PanelPrincipalComponent } from '../panel-principal/panel-principal.component';
import { FormsModule } from '@angular/forms';
import { PanelComprasComponent } from '../paneles/panel-compras/panel-compras.component';
import { PanelClientesComponent } from '../paneles/panel-clientes/panel-clientes.component';
import { PanelProductosComponent } from '../paneles/panel-productos/panel-productos.component';
import { PanelRecetasComponent } from '../paneles/panel-recetas/panel-recetas.component';
import { PanelIngresosComponent } from '../paneles/panel-ingresos/panel-ingresos.component';
import { PanelProductosCompradosComponent } from '../paneles/panel-productos-comprados/panel-productos-comprados.component';
import { PanelComprasCategoriaComponent } from '../paneles/panel-compras-categoria/panel-compras-categoria.component';
import { RedesSocialesComponent } from '../redes-sociales/redes-sociales.component';
import { RecetasComponent } from '../recetas/recetas.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';

@NgModule({
  declarations: [
    CategoriasComponent,
    ProductosComponent,
    PanelPrincipalComponent,
    PanelComprasComponent,
    PanelClientesComponent,
    PanelProductosComponent,
    PanelRecetasComponent,
    PanelIngresosComponent,
    PanelProductosCompradosComponent,
    PanelComprasCategoriaComponent,
    RedesSocialesComponent,
    RecetasComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    FormsModule
  ]
})
export class InicioModule { }
