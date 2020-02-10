import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Grupo2-Crud';

  constructor(private usuariosService: UsuariosService) {

  }
  ngOnInit() {
    this.checkToken();
  }

  checkToken() {
    this.usuariosService.checkToken().subscribe(respuestaApi => {
      console.log(respuestaApi);
    });
  }
}
