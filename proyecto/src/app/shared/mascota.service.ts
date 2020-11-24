import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  public mascota:Mascota;
  
  private url= "http://localhost:3000/";
  constructor(private http: HttpClient) { 
    this.mascota=null;
  }
  
  setUsuario(mascota:Mascota){
    this.mascota=mascota;
  }

  getUsuario(){
    return this.mascota;
  }


  postMascota(nuevaMascota:Mascota)
  {
  
    return this.http.post( this.url + "mascota", nuevaMascota )
  }

  obtenerMascotas(id:number)
  {
    return this.http.get(this.url + "mascota/?usuario_id=" + id )
  }

  putMascota(alergia:string,id:number)
  {
    
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),alergia,id
    };
   
   
    console.log(httpOptions);
    return this.http.put(this.url+"mascota",httpOptions) 
  }

  public uploadImageMascota( mascota:Mascota) {
   
    return this.http.put(this.url+"fotoMascota",mascota);
  }

}
