import { Usuario } from './usuario.model';

export class ApiLoginRespuesta {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  usuario?: Usuario;

  constructor(access_token, token_type, expires_in, usuario) {
    this.access_token = access_token;
    this.token_type = token_type;
    this.expires_in = expires_in;
    this.usuario = usuario;
  }
}
