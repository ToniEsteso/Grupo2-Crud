export class ConfigApi {
  // private url = "http://172.16.205.54";
  private url = "http://www.api.veganfood.pve2.fpmislata.com/public";
  // private url = "http://127.0.0.1:8000";
  private apiRoot = this.url + "/api";
  private apiImagenes: string = this.url + "/imagenes";
  private apiAuth: string = this.apiRoot + "/auth";
  private apiProductos: string = this.apiRoot + "/productos";
  private apiCategorias: string = this.apiRoot + "/categorias";
  private apiCarritos: string = this.apiRoot + "/carrito";
  private apiRecetas: string = this.apiRoot + "/recetas";
  private apiRedesSociales: string = this.apiRoot + "/redessociales";

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
