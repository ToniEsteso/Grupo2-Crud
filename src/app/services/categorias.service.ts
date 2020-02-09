import { Injectable } from "@angular/core";
import { ConfigApi } from "../models/config-api.model";
import { HttpClient } from "@angular/common/http";
import { RespuestaApi } from "../interfaces/respuesta-api";

@Injectable({
  providedIn: "root"
})
export class CategoriasService {
  apiURL: string = new ConfigApi().getApiCategorias();

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL);
  }

  public getNumProductosCategoria() {
    return this.http.get<RespuestaApi>(this.apiURL + "/productosCategoria");
  }

  public subirCategoria(categoria: FormData) {
    // console.log("ENTRADO");
    // console.log(Categoria);
    // console.log(this.http.post<Categoria>(this.apiURL + "/nuevo", Categoria));
    // // return this.http.post<Categoria>(this.apiURL + "/nuevo", Categoria);
    console.log("Categoria desde subir Categoria");
    console.log(categoria);
    console.log("Categoria");
    this.http.post(this.apiURL + "/nuevo", categoria).subscribe(
      response => console.log(response),
      error => console.log(error)
    );

    // return this.http.post<Categoria>(
    //   this.apiURL + "/nuevo",
    //   Categoria,
    //   httpOptions
    // );
  }
}
