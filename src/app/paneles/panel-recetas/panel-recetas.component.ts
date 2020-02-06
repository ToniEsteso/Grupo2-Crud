import { Component, OnInit } from '@angular/core';
import { RecetasService } from 'src/app/services/recetas.service';
import { RespuestaApiPanel } from 'src/app/models/respuesta-api-panel';

@Component({
  selector: 'app-panel-recetas',
  templateUrl: './panel-recetas.component.html',
  styleUrls: ['./panel-recetas.component.scss']
})
export class PanelRecetasComponent implements OnInit {
  numRecetas: number;

  constructor(private recetasService: RecetasService) { }

  ngOnInit() {
    this.recetasService.getNumRecetas().subscribe((apiData: RespuestaApiPanel) => {
      this.numRecetas = apiData.data;
    });
  }

}
