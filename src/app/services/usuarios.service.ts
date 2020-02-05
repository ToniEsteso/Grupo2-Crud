import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { LoginRequest } from '../models/login-request.model';
import { ApiLoginRespuesta } from '../models/api-login-respuesta.model';
import { ConfigApi } from './../models/config-api.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiURL: string = new ConfigApi().getApiAuth();

  constructor(private http: HttpClient) { }

  public enviarLogin(usuario: LoginRequest) {
    return this.http.post<ApiLoginRespuesta>(this.apiURL + '/login', usuario);
  }
}
