import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Grupo2-Crud';

  constructor(private usuariosService: UsuariosService, private router: Router) {

  }
  ngOnInit() {
    if (localStorage.getItem('Usuario') !== null) {
      this.checkToken();
    }
  }

  checkToken() {
    this.usuariosService.checkToken().subscribe(
      (usuario) => {
        if (usuario.admin === 0) {
          this.router.navigate(['/login']);
          alert('Tienes que ser administrador para acceder a la administración.');
        }
      },
      (error) => {
        this.router.navigate(['/login']);
        alert('El token ha expirado.');
      }
    );
  }
}
