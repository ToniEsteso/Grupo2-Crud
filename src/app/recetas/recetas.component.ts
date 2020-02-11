import { Component, OnInit } from "@angular/core";
import { Receta } from "../models/receta";
import { RespuestaApi } from "../interfaces/respuesta-api";
import { RecetasService } from "../services/recetas.service";

@Component({
  selector: "app-recetas",
  templateUrl: "./recetas.component.html",
  styleUrls: ["./recetas.component.scss"]
})
export class RecetasComponent implements OnInit {
  arrayRecetas: Receta[];
  nuevo: boolean = false;
  nuevaReceta: Receta;
  imagenASubir: FileList;

  constructor(private recetasService: RecetasService) {
    this.cargarRecetas();
  }

  ngOnInit() {}

  cargarRecetas() {
    let respuesta = this.recetasService.getAll();

    respuesta.subscribe((apiData: RespuestaApi) => {
      this.arrayRecetas = apiData.data;
    });
  }

  crearNuevaReceta() {
    let maxId = 1;
    this.arrayRecetas.forEach(cat => {
      if (cat.id > maxId) {
        maxId = cat.id;
      }
    });

    this.nuevo = true;

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);

    this.nuevaReceta = new Receta(0, "", "", null);
    this.nuevaReceta.id = maxId + 1;
  }
  modificarReceta(receta) {
    console.log(receta);
  }
  borrarReceta(receta) {
    if (confirm("¿Estás seguro de borrar la receta?")) {
      this.recetasService.borrarReceta(receta).subscribe(respuesta => {
        this.cargarRecetas();
      });
    }
  }
  guardarReceta() {
    var formData = new FormData();
    formData.append("nombre", this.nuevaReceta.nombre);
    formData.append("enlace", this.nuevaReceta.enlace);
    formData.append("imagen", this.nuevaReceta.imagen);
    this.recetasService.subirReceta(formData).subscribe(respuestaApi => {
      this.nuevo = false;
      this.cargarRecetas();
    });
  }

  obtenerImagen(files: FileList) {
    this.imagenASubir = files;
    console.log(this.imagenASubir);
    this.nuevaReceta.imagen = files[0];
  }
}
