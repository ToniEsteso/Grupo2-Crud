import { Component, OnInit } from "@angular/core";
import { Categoria } from "../models/categoria.model";
import { CategoriasService } from "../services/categorias.service";
import { RespuestaApi } from "../interfaces/respuesta-api";

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
  styleUrls: ["./categorias.component.scss"]
})
export class CategoriasComponent implements OnInit {
  arrayCategorias: Categoria[];
  nuevo: boolean = false;
  modificar: boolean = false;
  nuevaCategoria: Categoria;
  imagenASubir: FileList;

  constructor(private categoriasService: CategoriasService) {
    this.cargarCategorias();
  }
  cargarCategorias() {
    let respuesta = this.categoriasService.getAll();

    respuesta.subscribe((apiData: RespuestaApi) => {
      this.arrayCategorias = apiData.data;
    });
  }
  ngOnInit() {}

  crearNuevaCategoria() {
    let maxId = 1;
    this.arrayCategorias.forEach(cat => {
      if (cat.id > maxId) {
        maxId = cat.id;
      }
    });

    this.nuevo = true;

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);

    this.nuevaCategoria = new Categoria();
    this.nuevaCategoria.id = maxId + 1;
  }

  modificarCategoria() {
    let formData = new FormData();
    formData.append("id", this.nuevaCategoria.id.toString());
    formData.append("nombre", this.nuevaCategoria.nombre);
    formData.append("icono", this.nuevaCategoria.icono);
    formData.append("imagen", this.nuevaCategoria.imagen);
    console.log("NOMBREEE");
    console.log(formData.get("nombre"));
    this.categoriasService
      .modificarCategoria(formData)
      .subscribe(respuestaApi => {
        this.nuevo = false;
        this.modificar = false;
        this.cargarCategorias();
      });
  }

  mostrarCategoria(cat) {
    this.nuevaCategoria = new Categoria();
    this.nuevaCategoria.id = cat.id;
    this.nuevaCategoria.nombre = cat.nombre;
    this.nuevaCategoria.icono = cat.icono;
    this.nuevaCategoria.imagen = cat.imagen;
    this.modificar = true;
  }

  borrarCategoria(cat) {
    if (confirm("¿Estás seguro de borrar la categoria?")) {
      this.categoriasService.borrarCategoria(cat).subscribe(respuestaApi => {
        console.log("ENTRADO");
        this.cargarCategorias();
      });
    }
  }
  guardarCategoria() {
    let formData = new FormData();
    formData.append("nombre", this.nuevaCategoria.nombre);
    formData.append("icono", this.nuevaCategoria.icono);
    formData.append("imagen", this.nuevaCategoria.imagen);

    console.log("antes de subir categoria en el componente");
    this.categoriasService.subirCategoria(formData).subscribe(respuestaApi => {
      console.log("respuestaApi");
      console.log(respuestaApi);
      this.nuevo = false;
      this.modificar = false;
      this.cargarCategorias();
    });
  }

  obtenerImagen(files: FileList) {
    this.imagenASubir = files;
    this.nuevaCategoria.imagen = files[0];
  }

  cancelar() {
    this.nuevo = false;
    this.modificar = false;
  }
}
