import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { User } from 'src/app/model/user';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { Router } from '@angular/router';
import  Swal  from 'sweetalert2';
import { EncrDecrServiceService } from 'src/app/shared/encr-decr-service.service';

@Component({
  selector: 'app-registrar-user',
  templateUrl: './registrar-user.component.html',
  styleUrls: ['./registrar-user.component.css']
})
export class RegistrarUserComponent implements OnInit {

  passControl = new FormControl('');
  public opciones:string[] = [
    'Cliente',
    'Veterinario'
  ];

  registerForm: FormGroup


  public nombre:string;
  public apellido1:string;
  public apellido2:string;
  public fecha:string;
  public email:string;
  public telefono:string;
  public direccion:string;
  public dni:string;
  public tipoDeUsuario:string;
  public usuario:string;
  public password1:string;
  public password2:string;
  public nColegiado: string;
  public especialidad: string;

  private _success = new Subject<string>();
  public successMessage:string;
  staticAlertClosed = false;
  public mensajeError=false;

  constructor(public usuarioService:UsuariosService, private fb: FormBuilder, private router: Router,private encriptar: EncrDecrServiceService) {
    this.successMessage = '';
    let formControls = {
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      repassword: new FormControl('',[
        Validators.required,
      ])
    }
    this.registerForm = this.fb.group(formControls)
   }
   get password() { return this.registerForm.get('password') }
  get repassword() { return this.registerForm.get('repassword') }

  ngOnInit(): void {
      //Mensaje de alerta
      setTimeout(() => this.staticAlertClosed = true, 20000);

      this._success.subscribe(message => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.successMessage = '');
  }

  public changeSuccessMessage(mensaje:string) {
    this._success.next(`Datos `+mensaje);
  }

  public registrar(){

      this.usuarioService.obtenerUsuario("").subscribe((datos:User[])=>
      {
        let usuarioEncotnrado:boolean = false
        let i:number = 0
        
        while(i<datos.length && usuarioEncotnrado == false)
        {
          if(datos[i].nombre_usuario == this.usuario)
          {
            console.log(datos[i].nombre_usuario);
            
            usuarioEncotnrado = true
            i=datos.length
          }

          else
          {
            i++
          }
        }
            
        
          
        
            if(this.password1== this.password2 && usuarioEncotnrado == false){
             let user:User= new User(0, this.usuario, this.encriptar.set('123456$#@$^@1ERF',this.password1), this.tipoDeUsuario,this.nombre, this.apellido1, this.apellido2, this.fecha, this.dni, this.email, this.telefono, this.direccion, this.nColegiado, this.especialidad, null);
             this.usuarioService.insertarUsuario(user)
             .subscribe((data:any)=>{
               if(data.affectedRows>=1){
                 this.mensajeError=false;
                 // this.changeSuccessMessage("Añadido nuevo usuario");
                 Swal.fire({
                   position: 'center',
                   icon: 'success',
                   title: 'Usuario registrado con éxito',
                   showConfirmButton: false,
                   timer: 2000
                 })
                 this.router.navigateByUrl('/registrarPet');
               }
               else{
                 this.mensajeError=true;
                 this.changeSuccessMessage("No se añadido usuario"); 
               }
             
             })
            }
            else if (this.password1!= this.password2){
             // this.changeSuccessMessage("de Contraseñas no son iguales"); 
             Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Las contraseñas deben coincidir!',
            
             })
            }

            else if (usuarioEncotnrado == true)
            {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El nombre de usuario ya existe!',
             
              })
            }
          
          
          
            console.log(this.nombre+this.apellido1+ this.apellido2+ this.fecha+this.email+this.telefono+this.direccion+this.dni +this.tipoDeUsuario+this.usuario+this.password1+this.password2)
        })
  }

  

}
