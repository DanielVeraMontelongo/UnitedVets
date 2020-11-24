import { Injectable } from '@angular/core';
import { Historial } from '../model/historial';
import { ClienteService } from './cliente.service';
import { MascotaService } from './mascota.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  public historial: Historial;
  public historiales: Historial[];
  public historialesCliente: Historial[];
  public fechaActual: string;
  public editarBoton: boolean;

  private url = "http://localhost:3000/";
  constructor(private clienteService: ClienteService, private mascotaService: MascotaService, private http: HttpClient) {
    this.historial = null;
    this.historiales = [];
    this.historialesCliente = [];
    this.editarBoton = false
  }

  public buscar(codigo: string): Historial {

    let hist: Historial;
    let i: number = 0;
    let encontrado: boolean;

    while (i < this.historiales.length && !encontrado) {
      if (this.historiales[i].hist_id.toLocaleLowerCase() == codigo.toLocaleLowerCase()) {
        hist = this.historiales[i];
        encontrado = true;
      }
      i++;
    }
    return hist;
  }

  public buscarFecha(fecha: string, nombreM: string): Historial {
    let hist: Historial;
    let i: number = 0;
    let encontrado: boolean = false;

    while (i < this.historialesCliente.length && !encontrado) {
      console.log(this.historialesCliente[i].fecha + this.historialesCliente.length + "==" + fecha + " " + nombreM)
      if (this.historialesCliente[i].fecha === fecha && this.historialesCliente[i].nombre === nombreM) {
        hist = this.historialesCliente[i];
        encontrado = true;
        console.log("anamesis   " + hist.anamnesis)
      }
      i++;
    }
    return hist;
  }

  public fechaMascota(nombreM: string): string[] {
    let fechas: string[] = [];

    for (let i = 0; i < this.historialesCliente.length; i++) {

      if (this.historialesCliente[i].nombre === nombreM) {
        fechas.push(this.historialesCliente[i].fecha);

      }

    }
    return fechas;
  }




  obtenerHistoriales() {
    return this.http.get(this.url + "historial");
  }

  modificarHistorial(historial: Historial) {
    return this.http.put(this.url + "historial", historial);
  }

  historialesIdUsuario(id: number) {
    console.log("Service historialesIdUsuario " + id)
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), id
    };

    return this.http.post(this.url + "historial/usuarioId", httpOptions)
  }


  historialUltimoId(id: number) {
    console.log("Service historialUltimoId " + id)
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), id
    };

    return this.http.post(this.url + "historial/ultimoId", httpOptions)
  }

  crearHistorial(historial: Historial) {
    return this.http.post(this.url + "historial", historial)
  }

  getUsuarioMascota(mascota_nombre: string, usuario_nombre: string) {
    console.log(mascota_nombre, usuario_nombre);

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), mascota_nombre, usuario_nombre
    }

    return this.http.post(this.url + "mascota/id", httpOptions)
  }

  getHistorialMax() {
    return this.http.get(this.url + "historial/max")
  }

}
