import { Injectable } from "@angular/core";
import { ConfigApi } from "../models/config-api.model";
import { HttpClient } from "@angular/common/http";
import { RespuestaApi } from "../interfaces/respuesta-api";
import { RespuestaApiPanel } from "../models/respuesta-api-panel";

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
    // console.log("ENTRADO");
    // console.log(receta);
    // console.log(this.http.post<receta>(this.apiURL + "/nuevo", receta));
    // // return this.http.post<receta>(this.apiURL + "/nuevo", receta);
    console.log("receta desde subir receta");
    console.log(receta);
    console.log("receta");
    this.http.post(this.apiURL + "/nueva", receta).subscribe(
      response => console.log(response),
      error => console.log(error)
    );

    // return this.http.post<receta>(
    //   this.apiURL + "/nuevo",
    //   receta,
    //   httpOptions
    // );
  }
}
