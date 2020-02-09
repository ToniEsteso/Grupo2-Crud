export class Receta {
  id: number;
  nombre: string;
  imagen: File;
  enlace: string;
  constructor(id: number, nombre: string, enlace: string, imagen: File) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.enlace = enlace;
  }
}
