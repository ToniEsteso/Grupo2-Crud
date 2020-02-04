export class Usuario {
  id: number;
  email: string;
  avatar: string;
  nombre: string;
  apellidos: string;
  admin: number;


  constructor(id: number, email: string, avatar: string, nombre: string, apellidos: string, admin: number) {
    this.id = id;
    this.email = email;
    this.avatar = avatar;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.admin = admin;
  }
}
