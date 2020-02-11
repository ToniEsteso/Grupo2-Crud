import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  constructor(private router: Router, private usuariosService: UsuariosService) { }

  ngOnInit() {
  }
  logout() {
    this.router.navigate(['/login']);
    this.usuariosService.logout();
  }
}
