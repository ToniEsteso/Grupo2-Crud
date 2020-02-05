import { Injectable } from '@angular/core';
import { ConfigApi } from '../models/config-api.model';
import { HttpClient } from '@angular/common/http';
import { RespuestaApi } from '../interfaces/respuesta-api';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  apiURL: string = new ConfigApi().getApiCategorias();

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL);
  }
}
