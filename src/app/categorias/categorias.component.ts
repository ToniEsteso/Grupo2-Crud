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

  constructor(private categoriasService: CategoriasService) {
    let respuesta = categoriasService.getAll();

    respuesta.subscribe((apiData: RespuestaApi) => {
      this.arrayCategorias = apiData.data;
    });
  }

  ngOnInit() {
  }

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
    this.arrayCategorias.push(this.nuevaCategoria);
    this.crearNuevaCategoria();
  }
}
