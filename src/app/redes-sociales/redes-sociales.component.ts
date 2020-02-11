import { Component, OnInit } from "@angular/core";
import { RedSocial } from "../models/red-social";
import { RedesSocialesService } from "../services/redes-sociales.service";
import { RespuestaApi } from "../interfaces/respuesta-api";
@Component({
  selector: "app-redes-sociales",
  templateUrl: "./redes-sociales.component.html",
  styleUrls: ["./redes-sociales.component.scss"]
})
export class RedesSocialesComponent implements OnInit {
  arrayRedesSociales: RedSocial[];
  nueva: boolean = false;
  modificando: boolean = false;
  nuevaRed: RedSocial;
  redModificable: RedSocial;

  constructor(private redesSocialesService: RedesSocialesService) {
    this.cargarRedesSociales();
  }

  ngOnInit() {}

  cargarRedesSociales() {
    this.redesSocialesService.getAll().subscribe((apiData: RespuestaApi) => {
      this.arrayRedesSociales = apiData.data;
    });
  }
  crearNuevaRedSocial() {
    let maxId = 1;
    this.arrayRedesSociales.forEach(prod => {
      if (prod.id > maxId) {
        maxId = prod.id;
      }
    });

    this.nueva = true;

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);

    this.nuevaRed = new RedSocial(0, "", "", "");
    this.nuevaRed.id = maxId + 1;
  }
  borrarRedSocial(red) {
    if (confirm("¿Estás seguro de borrar la red social?")) {
      this.redesSocialesService.borrarRedSocial(red).subscribe(api => {
        this.nueva = false;
        this.cargarRedesSociales();
      });
    }
  }
  modificarRedSocial(red) {
    this.nuevaRed = red;
    this.nueva = true;
    this.modificando = true;
  }
  guardarRedSocial() {
    if (this.modificando) {
      this.redesSocialesService
        .modificarRedSocial(this.nuevaRed)
        .subscribe(api => {
          this.nueva = false;
          this.modificando = false;
          this.cargarRedesSociales();
        });
    } else {
      this.redesSocialesService.crearRedSocial(this.nuevaRed).subscribe(api => {
        this.nueva = false;
        this.cargarRedesSociales();
      });
    }
  }
}
