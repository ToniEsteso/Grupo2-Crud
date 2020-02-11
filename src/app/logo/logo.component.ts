import { Component, OnInit } from '@angular/core';
import { ConfigApi } from '../models/config-api.model';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  private configApi: ConfigApi = new ConfigApi();
  protected rutaImagen: string = this.configApi.getApiImagenes() + '/logo.png';
  constructor() { }

  ngOnInit() {
  }

}
