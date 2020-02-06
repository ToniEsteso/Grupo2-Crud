import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { RespuestaApi } from '../interfaces/respuesta-api';
import { ApiLoginRespuesta } from '../models/api-login-respuesta.model';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  arrayProductos: Producto[];
  nuevo: boolean = false;
  nuevoProducto: Producto;

  constructor(private productosService: ProductosService) {
    let respuesta = productosService.getAll();

    respuesta.subscribe((apiData: RespuestaApi) => {
      this.arrayProductos = apiData.data;
    });
  }

  ngOnInit() {
  }
  crearNuevoProducto() {
    let maxId = 1;
    this.arrayProductos.forEach(prod => {
      if (prod.id > maxId) {
        maxId = prod.id;
      }
    });

    this.nuevo = true;
    this.nuevoProducto = new Producto(0, '', 0, '', '');
    this.nuevoProducto.id = maxId + 1;
  }
  modificarCategoria(cat) {
    console.log(cat);
  }
  borrarCategoria(cat) {
    console.log(cat);
  }
  guardarCategoria() {
    this.arrayProductos.push(this.nuevoProducto);
    this.crearNuevoProducto();
  }

}
