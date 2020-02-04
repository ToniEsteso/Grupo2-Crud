import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { InicioModule } from './inicio/inicio.module';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: InicioModule, children: [
      {
        path: '',
        loadChildren: './inicio/inicio.module#InicioModule'
      },
      {
        path: 'productos',
        loadChildren: './inicio/inicio.module#InicioModule'
      },
      {
        path: 'categorias',
        loadChildren: './inicio/inicio.module#InicioModule'
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
