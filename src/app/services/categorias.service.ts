import { Injectable } from '@angular/core';
import { ConfigApi } from '../models/config-api.model';
import { HttpClient } from '@angular/common/http';
import { RespuestaApi } from '../interfaces/respuesta-api';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiURL: string = new ConfigApi().getApiCategorias();

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL);
  }

  public getNumProductosCategoria() {
    return this.http.get<RespuestaApi>(this.apiURL + '/productosCategoria');
  }

  public subirCategoria(categoria: FormData) {
    return this.http.post(this.apiURL + '/nueva', categoria);
  }

  public borrarCategoria(categoria: Categoria) {
    return this.http.delete(this.apiURL + '/' + categoria.nombre);
  }
}
