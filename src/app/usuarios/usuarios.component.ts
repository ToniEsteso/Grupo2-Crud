import { Component, OnInit } from "@angular/core";
import { UsuariosService } from "../services/usuarios.service";
import { Usuario } from "../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { RespuestaApi } from "../interfaces/respuesta-api";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.scss"]
})
export class UsuariosComponent implements OnInit {
  arrayUsuarios: Usuario[];
  nuevo: boolean = false;
  nuevoUsuario: Usuario;
  imagenASubir: FileList;
  private http: HttpClient;

  constructor(private usuariosService: UsuariosService) {
    let respuesta = usuariosService.getAll();

    respuesta.subscribe((apiData: RespuestaApi) => {
      this.arrayUsuarios = apiData.data;
    });
  }

  ngOnInit() {}

  crearNuevoUsuario() {
    let maxId = 1;
    this.arrayUsuarios.forEach(prod => {
      if (prod.id > maxId) {
        maxId = prod.id;
      }
    });

    this.nuevo = true;
    this.nuevoUsuario = new Usuario(0, "", null, "", "", "", 0);
    this.nuevoUsuario.id = maxId + 1;
  }
  modificarUsuario(user) {
    console.log(user);
  }
  borrarUsuario(cat) {
    console.log(cat);
  }
  guardarUsuario() {
    var formData = new FormData();
    formData.append("email", this.nuevoUsuario.email);
    formData.append("nombre", this.nuevoUsuario.nombre);
    formData.append("apellidos", this.nuevoUsuario.apellidos);
    formData.append("nickname", this.nuevoUsuario.nickname);
    formData.append("admin", this.nuevoUsuario.admin.toString());
    formData.append("imagen", this.nuevoUsuario.avatar);
    console.log("this.nuevoUsuario");
    console.log(this.nuevoUsuario);
    console.log("this.nuevoUsuario");

    this.usuariosService.subirProducto(formData);
    this.arrayUsuarios.push(this.nuevoUsuario);
    this.crearNuevoUsuario();
  }

  obtenerImagen(files: FileList) {
    this.imagenASubir = files;
    console.log(this.imagenASubir);
    this.nuevoUsuario.avatar = files[0];
  }
}
