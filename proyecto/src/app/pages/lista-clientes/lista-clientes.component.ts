import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuariosService } from 'src/app/shared/usuarios.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  page = 1;
  pageSize = 12;
  collectionSize: number;
  public usuario:string;
  usuarios: User [] = []
  constructor(public usuarioService:UsuariosService,private router: Router) 
  {
    this.usuarioService.obtenerClientes()
    .subscribe((data:User[])=>{
       this.usuarios=data;
       this.collectionSize = this.usuarios.length;
       console.log(this.usuarios)
    });
  }

  ngOnInit(): void {
  }

  refreshPaginas() {
    this.usuarios
      .map((f, i) => ({ id: i + 1, ...f }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    
    }

  public mostrarPerfil(usuario:User){
    this.usuarioService.userActual=null;

    this.usuarioService.obtenerUsuarioID(usuario.id)
    .subscribe((data: User) => {
      console.log("Perfil a pasar")
      console.log(data[0]);
      this.usuarioService.userActual = data[0];
      this.router.navigateByUrl('/perfil/actual');
    });

  }

  public buscarCliente(nombre:string)
  {
    console.log(nombre)
    if(nombre !="")
    {
      let clientesBuscados: User [] = []
      console.log(clientesBuscados)
      for(let i:number = 0; i<this.usuarios.length; i++)
      {
        if(this.usuarios[i].nombre == nombre)
        {
          clientesBuscados.push(this.usuarios[i])
        }
      }
      console.log(clientesBuscados)
      this.usuarios = clientesBuscados
    }

    else
    {
      this.usuarioService.obtenerClientes()
    .subscribe((data:User[])=>{
       this.usuarios=data;
      
       console.log(this.usuarios)
    });
    }
  }
}