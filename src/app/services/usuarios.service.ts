import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { LoginRequest } from '../models/login-request.model';
import { ApiLoginRespuesta } from '../models/api-login-respuesta.model';
import { ConfigApi } from './../models/config-api.model';
import { RespuestaApiPanel } from '../models/respuesta-api-panel';
import { RespuestaApi } from '../interfaces/respuesta-api';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiURL: string = new ConfigApi().getApiAuth();

  constructor(private http: HttpClient) { }

  public enviarLogin(usuario: LoginRequest) {
    return this.http.post<ApiLoginRespuesta>(this.apiURL + '/login', usuario);
  }

  public checkToken() {
    console.log('check token en usuarios service');
    console.log('Bearer ' + localStorage.getItem('Usuario'));

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('Usuario')
    });

    return this.http.post(this.apiURL + '/me', { headers });
  }
  public getNumClientes() {
    return this.http.get<RespuestaApiPanel>(this.apiURL + '/numeroUsuarios');
  }

  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL + '/usuarios');
  }
  public borrarUsuario(usuario: Usuario) {

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('Usuario')
    });

    return this.http.delete(this.apiURL + '/' + usuario.id, { headers });
  }
}
