import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EncrDecrServiceService } from './encr-decr-service.service';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public usuario:User;
  public userActual:User;
  private url= "http://localhost:3000/";
  //public lista:User[]=[new User(1,"dani","dani01", "Admin" ),new User(2,"tania","tania01", "Cliente" ),new User(3,"paul","paul01", "Cliente"), new User(4,"laura","laura01", "Medico" )];
  constructor(private http: HttpClient,private encriptar: EncrDecrServiceService) { 

    this.usuario=null;

  }

  setUsuario(usuario:User){
    this.usuario=usuario;
  }

  getUsuario(){
    return this.usuario;
  }
  
  buscar(usuario:string):User{
    //recordar para buscar y eliminar
    let user:User;
      console.log (this.obtenerUsuario(usuario));
      return user; 
  }  

  obtenerUsuario(nombre:string){
    return this.http.get(this.url +"usuario/?nombre="+nombre);
  }

  loguearse(nombre:string, passw:string)
  {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),nombre,passw
    };
   

   return this.http.post(this.url+"usuario/datos",httpOptions)  
  }

  usuarioDni(dni:string){ 

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),dni
    };
   
   return this.http.post(this.url+"usuario/dni",httpOptions)  
  }
  
  usuarioIdMascota(id:number){ 

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),id
    };
   
   return this.http.post(this.url+"usuario/mascota",httpOptions)  
  }

  obtenerUsuarios(){
    return this.http.get(this.url+"usuario");
  }

  insertarUsuario(use:User){
    return this.http.post(this.url+"usuario",use);
 }

 actualizarUsuario(use:User){
  return this.http.put(this.url+"usuario", use);
 }

 borrarUsuario(id:number){
  return this.http.delete(this.url +"usuario/?id="+id);
}


  //--------------------------Dani------------------------------

  obtenerUsuarioID(id:number)
  {
    return this.http.get(this.url + "usuario/perfil?id=" + id)
  }

  obtenerClientes()
  {
    return this.http.get(this.url + "cliente" )
  }
  
  public uploadImage( use:User) {
   
    return this.http.put(this.url+"foto",use);
  }



 
}
