import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../services/productos.service";
import { RespuestaApi } from "../interfaces/respuesta-api";
import { ApiLoginRespuesta } from "../models/api-login-respuesta.model";
import { Producto } from "../models/producto.model";

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.scss"]
})
export class ProductosComponent implements OnInit {
  arrayProductos: Producto[];
  nuevo: boolean = false;
  nuevoProducto: Producto;
  imagenASubir: FileList;

  constructor(private productosService: ProductosService) {
    let respuesta = productosService.getAll();

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
    this.nuevoProducto = new Producto(0, "", 0, "", null);
    this.nuevoProducto.id = maxId + 1;
  }
  modificarProducto(cat) {
    console.log(cat);
  }
  borrarProducto(cat) {
    console.log(cat);
  }
  guardarProducto() {
    var formData = new FormData();
    formData.append("nombre", this.nuevoProducto.nombre);
    formData.append("precio", this.nuevoProducto.precio.toString());
    formData.append("descripcion", this.nuevoProducto.descripcion);
    formData.append("imagen", this.nuevoProducto.imagen);
    console.log("this.nuevoProducto");
    console.log(this.nuevoProducto);
    console.log("this.nuevoProducto");
    // ESTO LO ESTABA MIRANDO JUSTO ANTES DE IRME
    //    var formData: any = new FormData();
    // formData.append("name", this.form.get('name').value);
    // formData.append("avatar", this.form.get('avatar').value);

    // this.http.post('http://localhost:4000/api/create-user', formData).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // )
    this.productosService
      .subirProducto(formData)
      .subscribe(nuevoProducto => this.arrayProductos.push(nuevoProducto));
    // this.cargandoImagen(this.imagenASubir);
    this.crearNuevoProducto();
  }

  obtenerImagen(files: FileList) {
    this.imagenASubir = files;
    console.log(this.imagenASubir);
    this.nuevoProducto.imagen = files[0];
  }

  // public respuestaImagenEnviada;
  // public resultadoCarga;

  // public cargandoImagen(files: FileList) {
  //   this.productosService.postFileImagen(files[0]).subscribe(
  //     response => {
  //       this.respuestaImagenEnviada = response;
  //       console.log("response");
  //       console.log(response);
  //       console.log("response");
  //       if (this.respuestaImagenEnviada <= 1) {
  //         console.log("Error en el servidor");
  //       } else {
  //         if (
  //           this.respuestaImagenEnviada.code == 200 &&
  //           this.respuestaImagenEnviada.status == "success"
  //         ) {
  //           this.resultadoCarga = 1;
  //         } else {
  //           this.resultadoCarga = 2;
  //         }
  //       }
  //     },
  //     error => {
  //       console.log(<any>error);
  //     }
  //   );
  // }
}
