import { Injectable } from "@angular/core";
import { ConfigApi } from "../models/config-api.model";
import { HttpClient } from "@angular/common/http";
import { RespuestaApi } from "../interfaces/respuesta-api";
import { RespuestaApiPanel } from '../models/respuesta-api-panel';

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  apiURL: string = new ConfigApi().getApiProductos();
  apiImagenes: string = new ConfigApi().getApiImagenes();

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL);
  }

  public postFileImagen(imagenParaSubir: File) {
    const formData = new FormData();
    formData.append("imagenPropia", imagenParaSubir, imagenParaSubir.name);
    return this.http.post(this.apiImagenes, formData);
  }

  public getNumProductos() {
    return this.http.get<RespuestaApiPanel>(this.apiURL + '/numeroProductos');
  }
}
