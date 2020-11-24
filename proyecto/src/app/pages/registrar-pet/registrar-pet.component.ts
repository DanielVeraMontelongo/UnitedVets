import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Mascota } from 'src/app/model/mascota';
import { User } from 'src/app/model/user';
import { MascotaService } from 'src/app/shared/mascota.service';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import  Swal  from 'sweetalert2';



@Component({
  selector: 'app-registrar-pet',
  templateUrl: './registrar-pet.component.html',
  styleUrls: ['./registrar-pet.component.css']
})
export class RegistrarPetComponent implements OnInit {
  form: FormGroup;
  mascota: Mascota;
  keyword = 'nombre_usuario';
  public usuarios: User [];
  public usuario_id:number;
  public initialValue:string
  constructor(public usuarioService:UsuariosService,public mascotaService:MascotaService) { 
    
    this.usuarioService.obtenerClientes()
    .subscribe((data:User[])=>{
       this.usuarios=data;
       this.initialValue=this.usuarios[0].nombre
       console.log(this.usuarios)
    });
  }

  ngOnInit(): void {
  }
  
  selectEvent(item) {
    this.usuario_id = item.id
    console.log("selectEvent "+this.usuario_id)
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log("onChangeSearch "+ val)
  }

  crearMascota(nombre:HTMLInputElement,chip:HTMLInputElement,especie:HTMLInputElement,raza:HTMLInputElement,fechaNacimiento:HTMLInputElement,alergias:HTMLInputElement)
  {
    this.mascotaService.postMascota(new Mascota(0,nombre.value,chip.value,especie.value,raza.value,this.usuario_id,fechaNacimiento.value,alergias.value,"")).subscribe((data)=>
    {
      nombre.value= '';
      chip.value= '';
      especie.value= '';
      raza.value= '';
      fechaNacimiento.value= '';
      alergias.value= '';
      
      console.log(data)
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Mascota registrada con éxito',
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

 
}


