import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Cita } from '../model/cita';
 
@Injectable({
  providedIn: 'root'
})
export class CitasService {
 
  public cita:Cita;
  public citasHoy:Cita[]
  private url= "http://localhost:3000/";
  constructor(private http: HttpClient) { 
 
    this.cita=null;
    this.citasHoy=[];
   
  }
 
  //mostrar todas las citas 
  
 
  getCitas(id:number){
    return this.http.get(this.url+"citas/?idMedico="+id);
  }
 
  
  getTodasCitas(){
    return this.http.get(this.url + "citas");
  }
  
  
  actualizarCita(cambio:Cita){
    return this.http.put(this.url + "citas", cambio);
   }
   
   
   insertarCita(nuevaCita:Cita){
   
     return this.http.post(this.url + "citas",nuevaCita); 

    }
 
buscaIdMascota(dni:string, mascota:string)
{
  let httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),dni,mascota
  };
 
 return this.http.post(this.url+"mascotaId",httpOptions)  
}

  setUsuario(cita:Cita){
    this.cita=cita;
  }

  borrarCita(id:number){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}), body: {id:id}};
    return this.http.delete(this.url + "citas", httpOptions);

  }


  obtenerListaPaciente(nombre:string){
    return this.http.get(this.url +"citas/listaPacientes/?name="+ nombre);
  }
 
  obtenerCitasHoy(id:number,fecha:string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),id,fecha
    };
   
   return this.http.post(this.url+"citas/listaHoy",httpOptions)  
  }

  obtenerCitasCliente(id:number,fecha:string){
 
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),id,fecha
    };
   
   return this.http.post(this.url+"citas/listaCliente",httpOptions)  
  }

  getCitasMax()
  {
    return this.http.get(this.url +"citas/max")
  }
 
}