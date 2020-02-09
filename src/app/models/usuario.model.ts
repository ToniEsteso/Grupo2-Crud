export class Usuario {
  id: number;
  email: string;
  avatar: File;
  nombre: string;
  apellidos: string;
  nickname: string;
  admin: number;

  constructor(
    id: number,
    email: string,
    avatar: File,
    nombre: string,
    apellidos: string,
    nickname: string,
    admin: number
  ) {
    this.id = id;
    this.email = email;
    this.avatar = avatar;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.nickname = nickname;
    this.admin = admin;
  }
}
