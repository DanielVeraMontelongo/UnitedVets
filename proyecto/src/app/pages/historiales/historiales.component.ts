import { Component, OnInit } from '@angular/core';
import { Data, ActivatedRoute } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { Historial } from 'src/app/model/historial';
import { HistorialService } from 'src/app/shared/historial.service';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { MascotaService } from 'src/app/shared/mascota.service';
import { Mascota } from 'src/app/model/mascota';
import  Swal  from 'sweetalert2';



@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.css']
})
export class HistorialesComponent implements OnInit {

  
  public fromDate:string;
  public fecha:string;
  public nombreP:string;
  public nombreM:string;
  public nombreCB:string;
  public nombreMB:string;
  public tratamiento:string;
  public ananmnesis:string;
  public editBoton:boolean;
  public editBotonF:boolean;
  public fechaH:string;

  public opciones:string[] = [];
  public opcionesF:string[] = [];

  
  private _success = new Subject<string>();
  public successMessage:string;
  staticAlertClosed = false;

  constructor(public usuarioService:UsuariosService,private rutaActiva: ActivatedRoute, private historialService: HistorialService, private mascotaService: MascotaService) { 
    this.successMessage = '';
    this.fromDate = this.historialService.fechaActual
    this.editBoton = this.historialService.editarBoton

    if(this.usuarioService.usuario.rol!="Cliente"){
     
  
      console.log(this.historialService.historial);
       let historial:Historial;
       historial=this.historialService.historial;
       this.nombreP = historial.nombreP;
       this.nombreM = historial.nombre;
       this.ananmnesis = historial.anamnesis;
       this.tratamiento = historial.tratamiento;
       this.fecha = historial.fecha;
       if(this.editBoton){
        console.log("historial nuevo");
        this.opciones=[];
      }
      else{
        console.log("historial pasado");
        console.log(historial.usuario_id);
        this.historialService.historialesIdUsuario(historial.usuario_id) 
        .subscribe((dataH: Historial[]) => {
 
          this.mascotaService.obtenerMascotas(historial.usuario_id)
          .subscribe((data: Mascota[]) => {
           this.historialService.historialesCliente = dataH;
           for (let index = 0; index < data.length; index++) {
             this.opciones.push(data[index].nombre);
           }
           this.opcionesF=this.historialService.fechaMascota(historial.nombre);
         });
          console.log(dataH)
        });
      }
 
    }
    else{
      console.log("historial de rol cliente")
      let usuariCliente=this.usuarioService.usuario;
      this.nombreP = usuariCliente.nombre;
      this.historialService.historialesIdUsuario(usuariCliente.id) 
      .subscribe((dataH: Historial[]) => {
        this.mascotaService.obtenerMascotas(usuariCliente.id)
         .subscribe((data: Mascota[]) => {
          this.historialService.historialesCliente = dataH;
          for (let index = 0; index < data.length; index++) {
            this.opciones.push(data[index].nombre);
          }
          this.opcionesF=[]; 
        });
        console.log(dataH)
      });
    }
    
  
  }

  ngOnInit(): void {

    this.rutaActiva.params.subscribe(routeParams => {
   
    });

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');

  }

  onDateSelect(event) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this.fecha = year + "-" + month + "-" + day;
  
    
   }

  buscar(){

    this.historialService.historial=  this.historialService.buscarFecha(this.fecha, this.nombreM);
    console.log(this.historialService.historial)
    if(this.historialService.historial){
      this.ananmnesis = this.historialService.historial.anamnesis;
      this.tratamiento = this.historialService.historial.tratamiento;
    }
    else{
      this.ananmnesis = null;
      this.tratamiento = null;
    }
 
   }

  anadir(){
  
     console.log(this.ananmnesis +"   "+this.tratamiento)
     Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Datos guardados con éxito',
      showConfirmButton: false,
      timer: 2000
    })
    
     this.historialService.getUsuarioMascota(this.nombreM,this.nombreP)
     .subscribe((dataUM:any) =>{
       console.log(dataUM)

        this.historialService.getHistorialMax().subscribe((dataM)=>{
          console.log(dataM)
            this.historialService.crearHistorial(new Historial(0,"HIST0" + (dataM[0].max + 1),this.ananmnesis,this.tratamiento,this.nombreM,dataUM[0].id_mascota,this.nombreP,dataUM[0].id_usuario,this.fromDate))
            .subscribe((data:Historial[])  =>{
              console.log(data)
            })
        })
     })
  }

  modificar(){
    this.historialService.historial.anamnesis= this.ananmnesis;
    this.historialService.historial.tratamiento= this.tratamiento;

    this.historialService.modificarHistorial(this.historialService.historial)
    .subscribe((data: any) => {
      if (data.affectedRows >= 1) {
        console.log("Usuario modificado");

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Datos Modificados con éxito',
          showConfirmButton: false,
          timer: 2000
        })
      }
      else {
        console.log("No se ha modificado usuario");
        this.changeSuccessMessage("No se ha Modificado");
        
      }
    });
    

  }


  public changeSuccessMessage(mensaje:string) {
    this._success.next(`Datos `+mensaje);
  }

  public eleccionMascota(mascota:string){
    this.opcionesF=this.historialService.fechaMascota(mascota);
    console.log(this.opcionesF)
    if(this.opcionesF.length==0){
      this.editBotonF=true;
    }
    else{
      this.editBotonF=false;
    }
  }

}
