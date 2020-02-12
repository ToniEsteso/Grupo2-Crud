import { Injectable } from "@angular/core";
import { ConfigApi } from "../models/config-api.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RespuestaApi } from "../interfaces/respuesta-api";
import { Categoria } from "../models/categoria.model";

@Injectable({
  providedIn: "root"
})
export class CategoriasService {
  private apiURL: string = new ConfigApi().getApiCategorias();

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL);
  }

  public getNumProductosCategoria() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("Usuario")
    });
    return this.http.get<RespuestaApi>(this.apiURL + "/productosCategoria", {
      headers
    });
  }

  public subirCategoria(categoria: FormData) {
    return this.http.post(this.apiURL + "/nueva", categoria);
  }

  public modificarCategoria(categoria: FormData) {
    console.log("DESDE SERVICE");
    console.log(categoria.get("nombre"));
    return this.http.post(this.apiURL + "/" + categoria.get("id"), categoria, {
      responseType: "text"
    });
  }

  public borrarCategoria(categoria: Categoria) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("Usuario")
    });
    return this.http.delete(this.apiURL + "/" + categoria.nombre, {
      headers
    });
  }
}
