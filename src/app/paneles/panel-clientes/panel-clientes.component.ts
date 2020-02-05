import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { RespuestaApiPanel } from 'src/app/models/respuesta-api-panel';

@Component({
  selector: 'app-panel-clientes',
  templateUrl: './panel-clientes.component.html',
  styleUrls: ['./panel-clientes.component.scss']
})
export class PanelClientesComponent implements OnInit {
  numClientes: number;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuariosService.getNumClientes().subscribe((apiData: RespuestaApiPanel) => {
      this.numClientes = apiData.data;
      console.log(this.numClientes);
    });
  }

}
