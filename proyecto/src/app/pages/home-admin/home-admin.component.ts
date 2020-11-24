import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { User } from 'src/app/model/user';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home-admin.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class HomeAdminComponent implements OnInit {

  page = 1;
  pageSize = 12;
  collectionSize: number;
  closeResult = '';
  public usuarios: User[];
  private _success = new Subject<string>();
  public successMessage: string;
  staticAlertClosed = false;
  public nombre:string;
  public apellido1:string;
  public apellido2:string;
  public fecha:string;
  public email:string;
  public telefono:string;
  public direccion:string;
  public dni:string;
  public user:User;

  constructor(public usuarioService: UsuariosService, private modalService: NgbModal,  private router: Router) {
    console.log("admin")
    console.log(usuarioService.usuario);
    this.successMessage = '';
    this.usuarioService.obtenerUsuarios()
      .subscribe((data: User[]) => {
        this.usuarios = data;
        this.collectionSize = this.usuarios.length;
        console.log("Todos los usuarios guardados")
      });

  }

  ngOnInit(): void {


    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  confirmar(use: User) {

    // let valor = confirm("¿Desea borrar el usuario X?");
    // if (valor) {

      Swal.fire({
        title: 'Seguro que desea borrar este usuario?',
        text: "Si acepta no se podrá revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.borrarUsuario(use.id)
        .subscribe((data: any) => {
          if (data.affectedRows >= 1) {
            this.usuarioService.obtenerUsuarios()
            .subscribe((data: User[]) => {
              this.usuarios = data;
              console.log("Todos los usuarios guardados")
            });
            console.log("Eliminado usuario");
          }
          else {
            console.log("No se ha eliminado usuario");
          }
        });
          Swal.fire(
            'Borrado!',
            'El usuario ha sido borrado.',
            'success'
          )
        }
      })
      // this.usuarioService.borrarUsuario(use.id)
      //   .subscribe((data: any) => {
      //     if (data.affectedRows >= 1) {
      //       this.usuarioService.obtenerUsuarios()
      //       .subscribe((data: User[]) => {
      //         this.usuarios = data;
      //         console.log("Todos los usuarios guardados")
      //       });
      //       console.log("Eliminado usuario");
      //     }
      //     else {
      //       console.log("No se ha eliminado usuario");
      //     }
      //   });
    
  }

  

  open(content, user:User) {
     this.user= user;    
     this.nombre= this.user.nombre;
     this.apellido1= this.user.apellido1;
     this.apellido2= this.user.apellido2;
     this.dni= this.user.dni;
     this.fecha= this.user.fechaNacimiento;
     this.email =this.user.email;
     this.telefono =this.user.telefono;
     this.direccion= this.user.direccion;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'dark-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  guardar() {
     this.user.nombre=this.nombre;
     this.user.apellido1=this.apellido1;
     this.user.apellido2=this.apellido2;
     this.user.dni=this.dni;
     this.user.fechaNacimiento=this.fecha;
     this.user.email=this.email;
     this.user.telefono=this.telefono;
     this.user.direccion=this.direccion;
   
    this.usuarioService.actualizarUsuario(this.user)
    .subscribe((data: any) => {
      if (data.affectedRows >= 1) {
        console.log("Usuario modificado");
        this.changeSuccessMessage("Modificado Datos");
      }
      else {
        console.log("No se ha modificado usuario");
        this.changeSuccessMessage("No se ha Modificado");
      }
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Datos guardados con éxito',
      showConfirmButton: false,
      timer: 2000
    })

  }

  public changeSuccessMessage(mensaje: string) {
    this._success.next(`Datos ` + mensaje);
  }

  public buscarUsuario(nombre:string)
  {
    console.log(nombre)
    if(nombre !="")
    {
      let clientesBuscados: User [] = []
      console.log(clientesBuscados)
      for(let i:number = 0; i<this.usuarios.length; i++)
      { 
        if(this.usuarios[i].nombre == nombre)
        {console.log("bucle funciona")
          clientesBuscados.push(this.usuarios[i])
        }
      }
      console.log(clientesBuscados)
      this.usuarios = clientesBuscados
    }

    else
    {
      this.usuarioService.obtenerUsuario("")
    .subscribe((data:User[])=>{
       this.usuarios=data;
      
       console.log(this.usuarios)
    });
    }
  }

 public  enviarMascota(){
  this.router.navigateByUrl('/registrarPet')
 }

 refreshPaginas() {
  this.usuarios
    .map((f, i) => ({ id: i + 1, ...f }))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  
  }
}