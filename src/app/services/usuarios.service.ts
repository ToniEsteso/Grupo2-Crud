import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { LoginRequest } from '../models/login-request.model';
import { ApiLoginRespuesta } from '../models/api-login-respuesta.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiURL: string = 'http://127.0.0.1:8000/api/auth'

  constructor(private http: HttpClient) { }

  public enviarLogin(usuario: LoginRequest) {
    return this.http.post<ApiLoginRespuesta>(this.apiURL + '/login', usuario);
  }
}
