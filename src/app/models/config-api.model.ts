export class ConfigApi {
  private apiRoot = 'http://127.0.0.1:8000/api';
  private apiAuth: string = this.apiRoot + '/auth';
  private apiProductos: string = this.apiRoot + '/productos';
  private apiCategorias: string = this.apiRoot + '/categorias';

  getApiAuth() {
    return this.apiAuth;
  }
  getApiProductos() {
    return this.apiProductos;
  }
  getApiCategorias() {
    return this.apiCategorias;
  }
}
