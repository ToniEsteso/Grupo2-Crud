import { Injectable } from '@angular/core';
import { ConfigApi } from '../models/config-api.model';
import { HttpClient } from '@angular/common/http';
import { RespuestaApi } from '../interfaces/respuesta-api';
import { RespuestaApiPanel } from '../models/respuesta-api-panel';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  apiURL: string = new ConfigApi().getApiRecetas();
  apiImagenes: string = new ConfigApi().getApiImagenes();

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL);
  }

  public getNumRecetas() {
    return this.http.get<RespuestaApiPanel>(this.apiURL + '/numeroRecetas');
  }
}
