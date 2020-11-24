import { Mascota } from './mascota';
import { Persona } from './persona';


export class Historial {

    constructor(public id:number, public hist_id:string, public anamnesis:string, public tratamiento:string, public nombre:string, public mascota_id:number, public nombreP:string, public usuario_id:number, public fecha:string)
    {

    }
}
