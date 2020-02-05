import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { RespuestaApiPanel } from 'src/app/models/respuesta-api-panel';

@Component({
  selector: 'app-panel-productos',
  templateUrl: './panel-productos.component.html',
  styleUrls: ['./panel-productos.component.scss']
})
export class PanelProductosComponent implements OnInit {
  numProductos: number;

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.getNumProductos().subscribe((apiData: RespuestaApiPanel) => {
      this.numProductos = apiData.data;
      console.log(this.numProductos);
    });
  }

}
