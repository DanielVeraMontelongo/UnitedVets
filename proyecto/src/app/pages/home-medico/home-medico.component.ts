import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/model/cita';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { CitasService } from 'src/app/shared/citas.service';
import { HistorialService } from 'src/app/shared/historial.service';
import { Historial } from 'src/app/model/historial';
import  Swal  from 'sweetalert2';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit {

 public citas: Cita [] = [];
 public fecha:string;
 private _success = new Subject<string>();
 public successMessage: string;
 staticAlertClosed = false;
 page = 1;
 pageSize = 4;
 collectionSize: number;
  constructor(public usuarioService:UsuariosService, private router: Router,  public citaServicio: CitasService, private historialService: HistorialService){
    console.log("medico")
    console.log(usuarioService)
    let fechaHoy=new Date();
     this.fecha= this.onDateSelect(fechaHoy);
    console.log(this.fecha);
    
    this.citaServicio.obtenerCitasHoy(this.usuarioService.usuario.id, this.fecha)
    .subscribe((data: Cita[]) => {
       this.citas=data;
       this.citaServicio.citasHoy=data;
       this.collectionSize = this.citas.length;
    });
 }

 onDateSelect(event:Date):string{
  let year = event.getUTCFullYear();
  let month = (event.getUTCMonth()+1) <= 9 ? '0' + (event.getUTCMonth()+1) : (event.getUTCMonth()+1);
  let day = event.getUTCDate() <= 9 ? '0' + event.getUTCDate() : event.getUTCDate();
   return year + "-" + month + "-" + day;
   
 }

  ngOnInit(): void {
  }

  verHistorial(cita:Cita)
  { 
    console.log(cita)
     this.historialService.historialUltimoId(cita.mascota_id)
     .subscribe((data:Historial) => {
       
       if (data[0] == undefined)
       {
        this.changeSuccessMessage("No existen historiales" );
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No esxisten historiales',
          showConfirmButton: false,
          timer: 2000
        })
       }

       else
       {
        this.historialService.historial=data[0];
        console.log("Ultimo historial de cita ")
        console.log(data);
        this.router.navigateByUrl('/historiales/')
       }

    });

   
  }

  buscarCliente(nombre:string){
    let clientesFiltrados: Cita [] = []
 
    for(let i: number = 0; i< this.citas.length; i++)
    {
      if(this.citas[i].nombreP === nombre)
      {
        clientesFiltrados.push(this.citas[i])
      }
    }


    console.log("******  "+nombre)
    console.log(clientesFiltrados)
    if (clientesFiltrados.length!=0)
      {
        this.citas = clientesFiltrados
        console.log("******  si")
      }
      else{
        this.citas = this.citaServicio.citasHoy; 
        console.log("******  no")
      }
      this.collectionSize = this.citas.length;
  }

  refreshPaginas() {
    this.citas
      .map((f, i) => ({ id: i + 1, ...f }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    console.log(this.citas)
  }

  public changeSuccessMessage(mensaje: string) {
    this._success.next(`Datos ` + mensaje);
  }

}