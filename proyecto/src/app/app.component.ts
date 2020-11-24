import { Component } from '@angular/core';
import { UsuariosService } from './shared/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto';

  constructor(public usuarioService:UsuariosService){
     console.log(usuarioService)
  }

  ngOnInit(): void {
    console.log("inicio")
  }
}
