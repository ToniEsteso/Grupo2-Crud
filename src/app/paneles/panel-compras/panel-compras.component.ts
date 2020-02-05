import { Component, OnInit } from '@angular/core';
import { CarritosService } from 'src/app/services/carritos.service';
import { RespuestaApiPanel } from 'src/app/models/respuesta-api-panel';

@Component({
  selector: 'app-panel-compras',
  templateUrl: './panel-compras.component.html',
  styleUrls: ['./panel-compras.component.scss']
})
export class PanelComprasComponent implements OnInit {
  numCompras: number;

  constructor(private carritoService: CarritosService) { }

  ngOnInit() {
    this.carritoService.getNumCompras().subscribe((apiData: RespuestaApiPanel) => {
      this.numCompras = apiData.data;
      console.log(this.numCompras);
    });
  }

}
