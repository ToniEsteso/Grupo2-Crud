import { Component, OnInit } from '@angular/core';
import { Receta } from '../models/receta';
import { RespuestaApi } from '../interfaces/respuesta-api';
import { RecetasService } from '../services/recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent implements OnInit {

  arrayRecetas: Receta[];
  nuevo: boolean = false;
  nuevaReceta: Receta;

  constructor(private categoriasService: RecetasService) {
    let respuesta = categoriasService.getAll();

    respuesta.subscribe((apiData: RespuestaApi) => {
      this.arrayRecetas = apiData.data;
    });
  }

  ngOnInit() {
  }

  crearNuevaReceta() {
    let maxId = 1;
    this.arrayRecetas.forEach(cat => {
      if (cat.id > maxId) {
        maxId = cat.id;
      }
    });

    this.nuevo = true;
    this.nuevaReceta = new Receta(0, '', '', '');
    this.nuevaReceta.id = maxId + 1;
  }
  modificarReceta(cat) {
    console.log(cat);
  }
  borrarReceta(cat) {
    console.log(cat);
  }
  guardarReceta() {
    this.arrayRecetas.push(this.nuevaReceta);
    this.crearNuevaReceta();
  }
}
