import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-arriba',
  templateUrl: './menu-arriba.component.html',
  styleUrls: ['./menu-arriba.component.css']
})
export class MenuArribaComponent implements OnInit {
  
  public rol:string;
  links = [
    { title: 'One', fragment: 'homeCliente' },
    { title: 'Two', fragment: 'historiales' }
  ];
  constructor(public usuarioService:UsuariosService,public route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit(): void {
  }

  public irPerfil(){
    this.usuarioService.userActual=null;
    this.router.navigateByUrl('/perfil');
  }

  cerrar(){
    this.router.navigateByUrl('/login');
    this.usuarioService.setUsuario(null);
  }

}
