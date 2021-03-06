import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../services/productos.service";
import { RespuestaApi } from "../interfaces/respuesta-api";
import { ApiLoginRespuesta } from "../models/api-login-respuesta.model";
import { Producto } from "../models/producto.model";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.scss"]
})
export class ProductosComponent implements OnInit {
  protected arrayProductos: Producto[];
  protected nuevo: boolean = false;
  protected modificando: boolean = false;
  protected nuevoProducto: Producto;
  private imagenASubir: FileList;

  constructor(private productosService: ProductosService) {
    this.cargarProductos();
  }

  cargarProductos() {
    let respuesta = this.productosService.getAll();

    respuesta.subscribe((apiData: RespuestaApi) => {
      this.arrayProductos = apiData.data;
    });
  }

  ngOnInit() {}

  crearNuevoProducto() {
    let maxId = 1;
    this.arrayProductos.forEach(prod => {
      if (prod.id > maxId) {
        maxId = prod.id;
      }
    });

    this.nuevo = true;
    this.modificando = false;

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);

    this.nuevoProducto = new Producto(0, "", 0, "", null);
    this.nuevoProducto.id = maxId + 1;
  }

  modificarProducto(prod: Producto) {
    this.nuevoProducto = { ...prod };
    this.nuevo = false;
    this.modificando = true;
  }

  borrarProducto(prod: Producto) {
    if (confirm("¿Estás seguro de borrar el producto?")) {
      this.productosService.borrarProducto(prod).subscribe(respuesta => {
        this.cargarProductos();
      });
    }
  }
  guardarProducto(tipo: string) {
    if (tipo === "nuevo") {
      var formData = new FormData();
      formData.append("nombre", this.nuevoProducto.nombre);
      formData.append("precio", this.nuevoProducto.precio.toString());
      formData.append("descripcion", this.nuevoProducto.descripcion);
      formData.append("imagen", this.nuevoProducto.imagen);

      this.productosService.subirProducto(formData).subscribe(respuesta => {
        this.cargarProductos();
        this.nuevo = false;
      });
    } else if (tipo === "modificando") {
      var formData = new FormData();
      formData.append("nombre", this.nuevoProducto.nombre);
      formData.append("precio", this.nuevoProducto.precio.toString());
      formData.append("descripcion", this.nuevoProducto.descripcion);
      formData.append("imagen", this.nuevoProducto.imagen);

      this.productosService.modificarProducto(formData).subscribe(respuesta => {
        this.cargarProductos();
        this.nuevo = false;
      });
    }
  }

  obtenerImagen(files: FileList) {
    this.imagenASubir = files;
    this.nuevoProducto.imagen = files[0];
  }

  cancelar() {
    this.nuevo = false;
  }
}
