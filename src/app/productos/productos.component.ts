import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { RespuestaApi } from '../interfaces/respuesta-api';
import { ApiLoginRespuesta } from '../models/api-login-respuesta.model';
import { Producto } from '../models/producto.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  protected arrayProductos: Producto[];
  protected nuevo: boolean = false;
  protected nuevoProducto: Producto;
  private imagenASubir: FileList;
  private http: HttpClient;

  constructor(private productosService: ProductosService) {
    this.cargarProductos();
  }

  cargarProductos() {
    let respuesta = this.productosService.getAll();

    respuesta.subscribe((apiData: RespuestaApi) => {
      this.arrayProductos = apiData.data;
    });
  }

  ngOnInit() { }
  crearNuevoProducto() {
    let maxId = 1;
    this.arrayProductos.forEach(prod => {
      if (prod.id > maxId) {
        maxId = prod.id;
      }
    });

    this.nuevo = true;

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);

    this.nuevoProducto = new Producto(0, '', 0, '', null);
    this.nuevoProducto.id = maxId + 1;
  }

  modificarProducto(cat) {
    console.log(cat);
  }

  borrarProducto(prod) {
    this.productosService.borrarProducto(prod).subscribe(respuesta => {
      this.cargarProductos();
    });
  }
  guardarProducto() {
    var formData = new FormData();
    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('precio', this.nuevoProducto.precio.toString());
    formData.append('descripcion', this.nuevoProducto.descripcion);
    formData.append('imagen', this.nuevoProducto.imagen);

    this.productosService.subirProducto(formData).subscribe(respuesta => {
      this.cargarProductos();
      this.crearNuevoProducto();
    });
  }

  obtenerImagen(files: FileList) {
    this.imagenASubir = files;
    this.nuevoProducto.imagen = files[0];
  }
}
