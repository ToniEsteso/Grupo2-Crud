import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario.model';
import { ApiLoginRespuesta } from '../models/api-login-respuesta.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  nombre: string;
  contrasenya: string;
  usuario: LoginRequest;
  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
  }
  enviarLogin() {
    this.usuario = new LoginRequest(this.nombre, this.contrasenya);
    console.log(this.usuario);

    let respuesta = this.usuariosService.enviarLogin(this.usuario);

    respuesta.subscribe((apiData: ApiLoginRespuesta) => {
      localStorage.setItem('Usuario', apiData.access_token);
    });
  }
}

