import { Injectable } from '@angular/core';
import { ConfigApi } from '../models/config-api.model';
import { HttpClient } from '@angular/common/http';
import { RespuestaApiPanel } from '../models/respuesta-api-panel';

@Injectable({
  providedIn: 'root'
})
export class CarritosService {
  apiURL: string = new ConfigApi().getApiCarrito();

  constructor(private http: HttpClient) { }

  public getNumCompras() {
    return this.http.get<RespuestaApiPanel>(this.apiURL + '/numeroCompras');
  }
}
