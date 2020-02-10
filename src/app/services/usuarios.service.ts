import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from "../models/usuario.model";
import { LoginRequest } from "../models/login-request.model";
import { ApiLoginRespuesta } from "../models/api-login-respuesta.model";
import { ConfigApi } from "./../models/config-api.model";
import { RespuestaApiPanel } from "../models/respuesta-api-panel";
import { RespuestaApi } from "../interfaces/respuesta-api";

@Injectable({
  providedIn: "root"
})
export class UsuariosService {
  apiURL: string = new ConfigApi().getApiAuth();

  constructor(private http: HttpClient) { }

  public enviarLogin(usuario: LoginRequest) {
    return this.http.post<ApiLoginRespuesta>(this.apiURL + "/login", usuario);
  }
  public getNumClientes() {
    return this.http.get<RespuestaApiPanel>(this.apiURL + "/numeroUsuarios");
  }

  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL + "/usuarios");
  }
  public borrarUsuario(usuario: Usuario) {

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('Usuario')
    });


    return this.http.delete(this.apiURL + '/' + usuario.id, { headers });
  }
  public subirProducto(usuario: FormData) {
    // console.log("ENTRADO");
    // console.log(usuario);
    // console.log(this.http.post<usuario>(this.apiURL + "/nuevo", usuario));
    // // return this.http.post<usuario>(this.apiURL + "/nuevo", usuario);
    console.log("usuario desde subir usuario");
    console.log(usuario);
    console.log("usuario");
    this.http.post(this.apiURL + "/nuevo", usuario).subscribe(
      response => console.log(response),
      error => console.log(error)
    );

    // return this.http.post<usuario>(
    //   this.apiURL + "/nuevo",
    //   producto,
    //   httpOptions
    // );
  }
}
