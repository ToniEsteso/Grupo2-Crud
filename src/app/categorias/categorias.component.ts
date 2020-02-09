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
  nuevaCategoria: Categoria;
  imagenASubir: FileList;

  constructor(private categoriasService: CategoriasService) {
    let respuesta = categoriasService.getAll();

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
    this.nuevaCategoria = new Categoria();
    this.nuevaCategoria.id = maxId + 1;
  }
  modificarCategoria(cat) {
    console.log(cat);
  }
  borrarCategoria(cat) {
    console.log(cat);
  }
  guardarCategoria() {
    var formData = new FormData();
    formData.append("nombre", this.nuevaCategoria.nombre);
    formData.append("icono", this.nuevaCategoria.icono);
    formData.append("imagen", this.nuevaCategoria.imagen);
    console.log("this.nuevaCategoria");
    console.log(this.nuevaCategoria);
    console.log("this.nuevaCategoria");
    // ESTO LO ESTABA MIRANDO JUSTO ANTES DE IRME
    //    var formData: any = new FormData();
    // formData.append("name", this.form.get('name').value);
    // formData.append("avatar", this.form.get('avatar').value);

    this.categoriasService.subirCategoria(formData);
    // .subscribe(nuevaCategoria => this.arraycATsubirCategorias.push(nuevaCategoria));
    this.arrayCategorias.push(this.nuevaCategoria);
    // this.cargandoImagen(this.imagenASubir);
    this.crearNuevaCategoria();
  }

  obtenerImagen(files: FileList) {
    this.imagenASubir = files;
    console.log(this.imagenASubir);
    this.nuevaCategoria.imagen = files[0];
  }
}
