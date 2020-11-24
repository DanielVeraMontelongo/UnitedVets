import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/model/cita';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CitasService } from 'src/app/shared/citas.service';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import  Swal  from 'sweetalert2';
// import { threadId } from 'worker_threads';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']

})
export class CitasComponent implements OnInit {
  public fromDate: string;
  public fecha: string;
  public citas: Cita[];
  public listaCitas: Cita[];
  page = 1;
  pageSize = 4;
  collectionSize: number;
  closeResult = '';
  private _success = new Subject<string>();
  public successMessage: string;
  staticAlertClosed = false;
  public opciones: string[] = [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00'
  ];
  public opcionS: string;
  public nombreC: string;
  public apellidosC: string;
  public dniC: string;
  public nombreM: string;
  public fechaC: string;
  public editBoton: boolean;
  public btnEdit: boolean;
  public citasEdit: Cita;
  public citaNueva: Cita;
  public dniCN: string;
  public nombreMN: string;
  public citaAux: Cita;
  constructor(private modalService: NgbModal, public citaServicio: CitasService, public usuarioService: UsuariosService) {


    this.citaServicio.getCitas(this.usuarioService.getUsuario().id)
      .subscribe((data: Cita[]) => {
        this.citas = data;
        this.listaCitas = data;
        this.collectionSize = this.citas.length;
        this.refreshPaginas();
        this.successMessage = '';
      });


  }

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  onDateSelect(event){
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this.fecha = year + "-" + month + "-" + day;
     
   }

  refreshPaginas() {
    this.citas
      .map((f, i) => ({ id: i + 1, ...f }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    console.log(this.citas)
  }


  confirmar(cita: Cita) {
    console.log(cita.id)
    // if (confirm("¿Desea borrar la cita de: " + cita.nombreP)) {
      // this.citaServicio.borrarCita(cita.id)
      //   .subscribe((data) => {
      //     console.log("cita eliminada");
      //     console.log(data);

      //     this.citaServicio.getCitas(this.usuarioService.getUsuario().id)
      //       .subscribe((data: Cita[]) => {
      //         this.citas = data;
      //         this.collectionSize = this.citas.length;
      //         this.refreshPaginas();
      //         this.successMessage = '';
      //       });

      //   });
      Swal.fire({
        title: 'Seguro que desea borrar esta cita?',
        text: "Si acepta no se podrá revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.citaServicio.borrarCita(cita.id)
          .subscribe((data) => {
            console.log("cita eliminada");
            console.log(data);
  
            this.citaServicio.getCitas(this.usuarioService.getUsuario().id)
              .subscribe((data: Cita[]) => {
                this.citas = data;
                this.collectionSize = this.citas.length;
                this.refreshPaginas();
                this.successMessage = '';
              });
  
        
        });
          Swal.fire(
            'Borrada!',
            'La cita ha sido borrada.',
            'success'
          )
        }
      })
    }
    // Swal.fire({
    //   title: 'Seguro que desea borrar este usuario?',
    //   text: "Si acepta no se podrá revertir esta acción!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si, borrar!'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.citaServicio.borrarCita(cita.id)
    //     .subscribe((data) => {
    //       console.log("cita eliminada");
    //       console.log(data);

    //       this.citaServicio.getCitas(this.usuarioService.getUsuario().id)
    //         .subscribe((data: Cita[]) => {
    //           this.citas = data;
    //           this.collectionSize = this.citas.length;
    //           this.refreshPaginas();
    //           this.successMessage = '';
    //         });

      
    //   });
    //     Swal.fire(
    //       'Borrado!',
    //       'El usuario ha sido borrado.',
    //       'success'
    //     )
    //   }
    // })

  

  open(content, valor: string, cita: Cita) {
    console.log(cita);
    if (valor == "anadir") {
      this.opcionS = "";
      this.nombreC = "";
      this.apellidosC = "";
      this.dniC = "";
      this.nombreM = "";
      this.fechaC = "";
      this.editBoton = false;
      this.btnEdit = false;
      this.citasEdit = null;
      let idVet = this.usuarioService.getUsuario().id;
      this.citaNueva = new Cita(0, null, null, null, null, idVet, "", null,null);
      this.dniCN = "";
      this.nombreMN = "";
    }
    else {
      this.citaAux=cita;
      this.nombreC = cita.nombreP;
      this.apellidosC = cita.nombre;
      this.fechaC = cita.fecha;
      this.opcionS = cita.hora;
      this.citasEdit = cita;
      this.editBoton = true;
      this.btnEdit = true;
    }


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'dark-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  editar() {
    let citaA = new Cita(this.citasEdit.id, this.citasEdit.mascota_id, this.citasEdit.nombre, this.fechaC, this.opcionS, this.citasEdit.vet_id, this.citasEdit.cita_id, this.citasEdit.nombreP,this.citasEdit.especie)
    console.log(this.nombreC + this.apellidosC + this.fechaC + this.opcionS);
    this.citaServicio.actualizarCita(citaA)
      .subscribe((data: any) => {
        if (data.affectedRows >= 1) {
           let encontrado:boolean=false;
           let i:number=0;
            while(i<this.citas.length && !encontrado){
                if(this.citas[i]==this.citaAux){
                   this.citas[i].fecha=this.fechaC;
                   this.citas[i].hora=this.opcionS;
                   encontrado=true;
                }
              i++;
            }

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cita modificada con éxito',
            showConfirmButton: false,
            timer: 2000
          })
        }
      });
      

  }



  anadir() {
    this.citaServicio.buscaIdMascota(this.dniCN, this.nombreMN)
      .subscribe((data: any) => {

        if(data.error == true)
        {
          this.changeSuccessMessage("Datos incorrectos" );
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Datos incorrectos',
            showConfirmButton: false,
            timer: 2000
          })
        }
        this.citaNueva.mascota_id = data[0].id;
       
        this.citaServicio.getCitasMax().subscribe((dataC)=>{
          console.log(dataC) 
          this.citaNueva.cita_id="CITA0" + (dataC[0].max + 1);
     
        this.citaServicio.insertarCita(this.citaNueva)
          .subscribe((data: any) => {
            if (data.affectedRows >= 1) {
              this.citaServicio.getCitas(this.usuarioService.getUsuario().id)
                .subscribe((data: Cita[]) => {
                  this.citas = data;
                  this.listaCitas = data;
                  this.collectionSize = this.citas.length;
                  this.refreshPaginas();
                  this.successMessage = '';
                });
              this.changeSuccessMessage("Cita añadida con Exito " + this.nombreC);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cita añadida con éxito',
                showConfirmButton: false,
                timer: 2000
              })
            }

          });

        });

      });
      

  }

  public buscar() {
  
    let busqueda: Cita[] = [];
    if (this.fromDate) {
      this.onDateSelect(this.fromDate);
        console.log("****** fecha  "+this.citas[0].fecha+ this.fecha)
      for (let index = 0; index < this.citas.length; index++) {
        if (this.citas[index].fecha == this.fecha) {
          busqueda.push(this.citas[index]);
        }

      }

      this.citas = busqueda;
      this.collectionSize = this.citas.length;
    }
    else {
      this.citas = this.listaCitas;
      this.collectionSize = this.citas.length;

    }


  }



  public changeSuccessMessage(mensaje: string) {
    this._success.next(`Datos ` + mensaje);
  }
}