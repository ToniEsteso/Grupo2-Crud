export class ConfigApi {
  private apiRoot = 'http://127.0.0.1:8000/api';
  private apiAuth: string = this.apiRoot + '/auth';
  private apiProductos: string = this.apiRoot + '/productos';
  private apiCategorias: string = this.apiRoot + '/categorias';
  private apiCarritos: string = this.apiRoot + '/carrito';
  private apiRecetas: string = this.apiRoot + '/recetas';
  private apiRedesSociales: string = this.apiRoot + '/redessociales';
  private apiImagenes: string = 'http://127.0.0.1:8000/imagenes';

  getApiAuth() {
    return this.apiAuth;
  }
  getApiProductos() {
    return this.apiProductos;
  }
  getApiCategorias() {
    return this.apiCategorias;
  }
  getApiImagenes() {
    return this.apiImagenes;
  }
  getApiCarrito() {
    return this.apiCarritos;
  }
  getApiRecetas() {
    return this.apiRecetas;
  }
  getApiRedesSociales() {
    return this.apiRedesSociales;
  }
}
