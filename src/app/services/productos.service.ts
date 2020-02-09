import { Injectable } from "@angular/core";
import { ConfigApi } from "../models/config-api.model";
import { HttpClient } from "@angular/common/http";
import { RespuestaApi } from "../interfaces/respuesta-api";
import { RespuestaApiPanel } from "../models/respuesta-api-panel";
import { Producto } from "../models/producto.model";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

httpOptions.headers = httpOptions.headers.set(
  "Authorization",
  "my-new-auth-token"
);

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

  public getNumProductos() {
    return this.http.get<RespuestaApiPanel>(this.apiURL + "/numeroProductos");
  }

  public getProductosMasComprados() {
    return this.http.get<RespuestaApiPanel>(
      this.apiURL + "/productosMasComprados"
    );
  }

  public subirProducto(producto: FormData) {
    // console.log("ENTRADO");
    // console.log(producto);
    // console.log(this.http.post<Producto>(this.apiURL + "/nuevo", producto));
    // // return this.http.post<Producto>(this.apiURL + "/nuevo", producto);
    console.log("Producto desde subir producto");
    console.log(producto);
    console.log("Producto");
    this.http.post(this.apiURL + "/nuevo", producto).subscribe(
      response => console.log(response),
      error => console.log(error)
    );

    // return this.http.post<Producto>(
    //   this.apiURL + "/nuevo",
    //   producto,
    //   httpOptions
    // );
  }
}
