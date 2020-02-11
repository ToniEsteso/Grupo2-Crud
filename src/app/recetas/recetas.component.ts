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
    let respuesta = recetasService.getAll();

    respuesta.subscribe((apiData: RespuestaApi) => {
      this.arrayRecetas = apiData.data;
    });
  }

  ngOnInit() { }

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
    console.log("receta en el component");

    console.log(receta);
    this.recetasService.borrarReceta(receta);
  }
  guardarReceta() {
    var formData = new FormData();
    formData.append("nombre", this.nuevaReceta.nombre);
    formData.append("enlace", this.nuevaReceta.enlace);
    formData.append("imagen", this.nuevaReceta.imagen);
    console.log("this.nuevaReceta");
    console.log(this.nuevaReceta);
    console.log("this.nuevaReceta");
    // ESTO LO ESTABA MIRANDO JUSTO ANTES DE IRME
    //    var formData: any = new FormData();
    // formData.append("name", this.form.get('name').value);
    // formData.append("avatar", this.form.get('avatar').value);

    this.recetasService.subirReceta(formData);
    // .subscribe(nuevaReceta => this.arraycATsubirCategorias.push(nuevaReceta));
    this.arrayRecetas.push(this.nuevaReceta);
    // this.cargandoImagen(this.imagenASubir);
    this.crearNuevaReceta();
  }

  obtenerImagen(files: FileList) {
    this.imagenASubir = files;
    console.log(this.imagenASubir);
    this.nuevaReceta.imagen = files[0];
  }
}
