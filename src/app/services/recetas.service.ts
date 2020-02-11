import { Injectable } from "@angular/core";
import { ConfigApi } from "../models/config-api.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RespuestaApi } from "../interfaces/respuesta-api";
import { RespuestaApiPanel } from "../models/respuesta-api-panel";
import { Receta } from "../models/receta";

@Injectable({
  providedIn: "root"
})
export class RecetasService {
  apiURL: string = new ConfigApi().getApiRecetas();
  apiImagenes: string = new ConfigApi().getApiImagenes();

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL);
  }

  public getNumRecetas() {
    return this.http.get<RespuestaApiPanel>(this.apiURL + "/numeroRecetas");
  }

  public subirReceta(receta: FormData) {
    return this.http.post(this.apiURL + "/nueva", receta, {
      responseType: "text"
    });
  }

  public borrarReceta(receta: Receta) {
    return this.http.delete(this.apiURL + "/" + receta.id, {
      responseType: "text"
    });
  }
}
