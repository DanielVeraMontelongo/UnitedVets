import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { Cita } from 'src/app/model/cita';
import { CitasService } from 'src/app/shared/citas.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  public citas: Cita[]; 
  public fecha:string;

  page = 1;
  pageSize = 4;
  collectionSize: number;
  constructor(public usuarioService:UsuariosService, public citaServicio: CitasService){
    console.log("cliente");
    console.log(usuarioService.getUsuario());
    let fechaHoy=new Date();
    this.fecha= this.onDateSelect(fechaHoy);
   console.log(this.fecha);

   this.citaServicio.obtenerCitasCliente(this.usuarioService.usuario.id, this.fecha)
   .subscribe((data: Cita[]) => {
      this.citas=data;
      this.collectionSize = this.citas.length;
   });

 }

  ngOnInit(): void {
  }


 onDateSelect(event:Date):string{
  let year = event.getUTCFullYear();
  let month = (event.getUTCMonth()+1) <= 9 ? '0' + (event.getUTCMonth()+1) : (event.getUTCMonth()+1);
  let day = event.getUTCDate() <= 9 ? '0' + event.getUTCDate() : event.getUTCDate();
   return year + "-" + month + "-" + day;
   
 }

 refreshPaginas() {
  this.citas
    .map((f, i) => ({ id: i + 1, ...f }))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  console.log(this.citas)
}

}
