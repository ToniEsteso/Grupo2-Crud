import { Injectable } from '@angular/core';
import { ConfigApi } from '../models/config-api.model';
import { HttpClient } from '@angular/common/http';
import { RespuestaApi } from '../interfaces/respuesta-api';
import { RedSocial } from '../models/red-social';

@Injectable({
  providedIn: 'root'
})
export class RedesSocialesService {
  private apiURL: string = new ConfigApi().getApiRedesSociales();
  private apiImagenes: string = new ConfigApi().getApiImagenes();

  constructor(private http: HttpClient) { }


  public getAll() {
    return this.http.get<RespuestaApi>(this.apiURL);
  }

  public crearRedSocial(red: RedSocial) {
    return this.http.post(this.apiURL, red);
  }

  public borrarRedSocial(red: RedSocial) {
    return this.http.delete(this.apiURL + '/' + red.id);
  }

  public modificarRedSocial(red: RedSocial) {
    return this.http.put(this.apiURL + '/' + red.id, red);
  }
}
