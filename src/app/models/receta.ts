export class Receta {
  id: number;
  nombre: string;
  imagen: string;
  enlace: string;
  constructor(id: number, nombre: string, imagen: string, enlace: string) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.enlace = enlace;
  }
}
