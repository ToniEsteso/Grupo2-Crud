import { Injectable } from '@angular/core';
import { ConfigApi } from '../models/config-api.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaApiPanel } from '../models/respuesta-api-panel';

@Injectable({
  providedIn: 'root'
})
export class CarritosService {
  apiURL: string = new ConfigApi().getApiCarrito();

  constructor(private http: HttpClient) { }

  public getNumCompras() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('Usuario')
    });
    return this.http.get<RespuestaApiPanel>(this.apiURL + '/numeroCompras', { headers });
  }
  public getResumenAnualIngresos() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('Usuario')
    });
    return this.http.get<RespuestaApiPanel>(this.apiURL + '/resumenIngresos', { headers });
    // return this.http.get<RespuestaApiPanel>(this.apiURL + '/ResumenIngresos?token=' + localStorage.getItem('Usuario'));
  }
}
