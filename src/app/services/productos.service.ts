import { Injectable } from '@angular/core';
import { ConfigApi } from '../models/config-api.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaApi } from '../interfaces/respuesta-api';
import { RespuestaApiPanel } from '../models/respuesta-api-panel';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  apiURL: string = new ConfigApi().getApiProductos();
  apiImagenes: string = new ConfigApi().getApiImagenes();

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL);
  }

  public getNumProductos() {
    return this.http.get<RespuestaApiPanel>(this.apiURL + '/numeroProductos');
  }

  public getProductosMasComprados() {
    return this.http.get<RespuestaApiPanel>(
      this.apiURL + '/productosMasComprados'
    );
  }

  public subirProducto(producto: FormData) {
    return this.http.post<Producto>(this.apiURL + '/nuevo', producto);
  }

  public modificarProducto(producto: FormData) {
    return this.http.patch(this.apiURL + '/' + producto.get('id'), producto);
    // return this.http.post(this.apiURL + '/')
  }

  public borrarProducto(producto: Producto) {
    // const headers = new HttpHeaders({
    //   Authorization: 'Bearer ' + localStorage.getItem('Usuario')
    // });
    return this.http.delete(this.apiURL + '/' + producto.id, {
      responseType: 'text'
    });
  }
}
