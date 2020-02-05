import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario.model';
import { ApiLoginRespuesta } from '../models/api-login-respuesta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  nombre: string;
  contrasenya: string;
  usuario: LoginRequest;
  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit() {
  }
  enviarLogin() {
    this.usuario = new LoginRequest(this.nombre, this.contrasenya);
    console.log(this.usuario);

    let respuesta = this.usuariosService.enviarLogin(this.usuario);

    respuesta.subscribe((apiData: ApiLoginRespuesta) => {
      if (apiData.access_token !== '') {
        localStorage.setItem('Usuario', apiData.access_token);
        this.router.navigate(['/main']);
      }
    });
  }
}

