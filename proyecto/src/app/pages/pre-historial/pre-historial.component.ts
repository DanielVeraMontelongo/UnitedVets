import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from '../../model/mascota';
import { Persona } from './../../model/persona';
import { Historial } from 'src/app/model/historial';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { ClienteService } from 'src/app/shared/cliente.service';
import { MascotaService } from 'src/app/shared/mascota.service';
import { HistorialService } from 'src/app/shared/historial.service';

@Component({
  selector: 'app-pre-historial',
  templateUrl: './pre-historial.component.html',
  styleUrls: ['./pre-historial.component.css']
})
export class PreHistorialComponent implements OnInit {

  page = 1;
  pageSize = 5;
  collectionSize: number;
  public seleccionado: string;
  public clienteBuscado: Boolean = false;
  public historiales: Historial [] = [];
  public today: Date = new Date();
  public diaActual: string;
  public mesActual: string;
  public anyoActual: string;
  public fechaActual: string;
  public nuevoHistorial: Historial = null;
  public nombre:string;
  
  constructor(public usuarioService:UsuariosService,private router: Router, private clienteService: ClienteService, private mascotaService: MascotaService, private historialService: HistorialService) { 
    this.historialService.historial=null;
    this.nombre=null;
    console.log("PreHistoriales")
    this.historialService.obtenerHistoriales()
    .subscribe((data: Historial[]) => {
      this.historialService.historiales = data;
     this.historiales =this.historialService.historiales;
     this.collectionSize = this.historiales.length;
      console.log(data)
    });



    if(this.today.getDate().toString().length !=2)
    {
      this.diaActual = 0 + this.today.getDate().toString();
    }
    else
    {
      this.diaActual = this.today.getDate().toString();
    }
    

    if((this.today.getMonth()+1).toString().length !=2 )
    {
      this.mesActual = 0 + (this.today.getMonth()+1).toString();
    }
    else
    {
      this.mesActual =  (this.today.getMonth()+1).toString();
    }
    

    this.anyoActual = this.today.getFullYear().toString();
    this.fechaActual =  this.anyoActual + "-" + this.mesActual + "-" +this.diaActual  ;
    this.nuevoHistorial = new Historial (0, "0","","","",0,"",0,this.fechaActual);
    this.historialService.fechaActual = this.fechaActual
    
    
    
    
  }

  ngOnInit(): void {
  }

  verHistorial(historial:Historial)
  {
    this.historialService.historial=historial;
    console.log(historial);
    this.router.navigateByUrl('/historiales/')
    this.historialService.editarBoton = false
  }


  buscarCliente()
  {
    let clientesFiltrados: Historial [] = []
    
    for(let i: number = 0; i< this.historiales.length; i++)
    {
      if(this.historiales[i].nombreP === this.nombre)
      {
        clientesFiltrados.push(this.historiales[i])
      }
    }


    console.log("******  "+this.nombre)
    console.log(clientesFiltrados)
    if (clientesFiltrados.length!=0)
      {
        this.historiales = clientesFiltrados
        console.log("******  si")
        this.clienteBuscado = true
      }
      else{
        this.historiales = this.historialService.historiales
        console.log("******  no")
        this.clienteBuscado = false
      }  

      this.collectionSize = this.historiales.length
  }

  filtrarFecha()
  {
    let fechaFiltrada: Historial [] = []
    
    for (let i: number = 0; i< this.historiales.length; i++)
    {
      if (this.seleccionado == this.historiales[i].fecha)
      {
        fechaFiltrada.push(this.historiales[i])
      }
    }

    if (fechaFiltrada.length!=0)
      {
        this.historiales = fechaFiltrada
        console.log("******  si")
      }
      else{
        this.historiales = this.historialService.historiales
        console.log("******  no")
        this.clienteBuscado = false
      }  
  }

  crearHistorial(historial:Historial)
  {
    this.historialService.historial=historial;
    console.log(historial);
    this.router.navigateByUrl('/historiales/')
    this.historialService.editarBoton = true
  }

  refreshPaginas() {
    this.historiales
      .map((f, i) => ({ id: i + 1, ...f }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    console.log(this.historiales)
  }
}
