import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { EncrDecrServiceService } from 'src/app/shared/encr-decr-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public usuario:string;
  public password:string;
  public user;

  private _success = new Subject<string>();
  public successMessage:string;
  staticAlertClosed = false;

  constructor(public usuarioService:UsuariosService,private router: Router,private encriptar: EncrDecrServiceService) {
    this.successMessage = '';
   }

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
  public enviar():void{
  
      let passEncrypt: string
      passEncrypt = this.encriptar.set('123456$#@$^@1ERF',this.password)
      console.log(passEncrypt);
    
      this.usuarioService.loguearse(this.usuario,passEncrypt)
      .subscribe((data:User)=>{
         this.usuarioService.setUsuario(data[0]);
         console.log("Enviar")
         this.user =this.usuarioService.getUsuario();
         console.log(this.user)
  
         if(this.user){
          switch(this.user.rol){
         
            case"Admin":
            console.log("admin")
            this.router.navigateByUrl('/homeAdmin');
        
            break;
     
            case"Cliente":
       
            this.router.navigateByUrl('/homeCliente');
             break;
     
            case"Veterinario":
      
            this.router.navigateByUrl('/homeMedico');
            break; 
            
            default:
            break;
         }
         }
         else{
          this.changeSuccessMessage(" de usuario incorrecto");
         }
         
      });
   
     //console.log(this.encriptar.set('123456$#@$^@1ERF',this.password));
    
  }

  



}
