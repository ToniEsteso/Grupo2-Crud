import { Injectable } from '@angular/core';
import { ConfigApi } from '../models/config-api.model';
import { HttpClient } from '@angular/common/http';
import { RespuestaApi } from '../interfaces/respuesta-api';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  apiURL: string = new ConfigApi().getApiProductos();

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL);
  }
}
