import { Producto } from './producto.model';

export class ProductoMasComprado {
  producto: Producto;
  cantidad: number;

  constructor(producto: Producto, cantidad: number) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
}
