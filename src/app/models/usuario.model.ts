export class Usuario {
  id: number;
  email: string;
  avatar: File;
  nombre: string;
  apellidos: string;
  nickName: string;
  admin: number;

  constructor(id: number, email: string, avatar: File, nombre: string, apellidos: string, nickName: string, admin: number) {
    this.id = id;
    this.email = email;
    this.avatar = avatar;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.nickName = nickName;
    this.admin = admin;
  }
}
