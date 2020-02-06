export class Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;

  constructor(id: number, nombre: string, precio: number, descripcion: string, imagen: string) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }
}
