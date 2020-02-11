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
  imagenASubir: FileList;
  private http: HttpClient;

  constructor(private usuariosService: UsuariosService) {
    this.cargarUsuarios();
  }

  ngOnInit() {}

  cargarUsuarios() {
    let respuesta = this.usuariosService.getAll();

    respuesta.subscribe((apiData: RespuestaApi) => {
      this.arrayUsuarios = apiData.data;
    });
  }

  borrarUsuario(user) {
    if (confirm("¿Estás seguro de borrar al usuario?")) {
      this.usuariosService.borrarUsuario(user).subscribe(respuestaApi => {
        this.cargarUsuarios();
      });
    }
  }
}
