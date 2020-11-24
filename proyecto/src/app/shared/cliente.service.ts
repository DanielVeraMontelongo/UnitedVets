import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../model/persona';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
 
  public cliente:Persona;
  private url= "http://localhost:3000/";
  constructor(private http: HttpClient) {
    this.cliente=null;
  }
   
  setUsuario(cliente:Persona){
    this.cliente=cliente;
  }

  getUsuario(){
    return this.cliente;
  }

  // buscar(usuario:string):Persona{
  //   let user:Persona;
  //   let i:number=0;
  //   let encontrado:boolean;

  //     while(i<this.listaPersona.length && !encontrado){
  //       if(this.listaPersona[i].name.toLocaleLowerCase()== usuario.toLocaleLowerCase()){
  //          user=this.listaPersona[i];
  //          encontrado=true;
  //       }
  //       i++;
  //     }
  //     return user; 
  // }

  putCliente(use:User){
    return this.http.put(this.url+"cliente", use);
   }

}
