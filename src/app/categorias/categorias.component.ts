import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { CategoriasService } from '../services/categorias.service';
import { RespuestaApi } from '../interfaces/respuesta-api';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  arrayCategorias: Categoria[];
  nuevo: boolean = false;
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
  ngOnInit() { }

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
    console.log('borrar en el componente');

    this.categoriasService.borrarCategoria(cat).subscribe((respuestaApi) => {
      this.cargarCategorias();
    });
  }
  guardarCategoria() {
    let formData = new FormData();
    formData.append('nombre', this.nuevaCategoria.nombre);
    formData.append('icono', this.nuevaCategoria.icono);
    formData.append('imagen', this.nuevaCategoria.imagen);

    console.log('antes de subir categoria en el componente');
    this.categoriasService.subirCategoria(formData).subscribe(respuestaApi => {
      console.log('respuestaApi');
      console.log(respuestaApi);
      this.nuevo = false;
      this.cargarCategorias();
    });
    // this.crearNuevaCategoria();
  }

  obtenerImagen(files: FileList) {
    this.imagenASubir = files;
    this.nuevaCategoria.imagen = files[0];
  }
}
