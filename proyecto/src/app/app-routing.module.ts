import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { HomeClienteComponent } from './pages/home-cliente/home-cliente.component';
import { HomeMedicoComponent } from './pages/home-medico/home-medico.component';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { HistorialesComponent } from './pages/historiales/historiales.component';
import { CitasComponent } from './pages/citas/citas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistrarPetComponent } from './pages/registrar-pet/registrar-pet.component';
import { RegistrarUserComponent } from './pages/registrar-user/registrar-user.component';
import { LadingPageComponent } from './pages/lading-page/lading-page.component';
import { PreHistorialComponent } from './pages/pre-historial/pre-historial.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'homeAdmin', component:HomeAdminComponent},
  {path:'homeCliente', component:HomeClienteComponent},
  {path:'homeMedico', component:HomeMedicoComponent},
  {path:'listaCliente', component:ListaClientesComponent},
  {path:'historiales', component:HistorialesComponent},
  {path:'citas', component:CitasComponent},
  {path:'login', component:LoginComponent},
  {path:'perfil/actual', component:PerfilComponent},
  {path:'perfil', component:PerfilComponent},
  {path:'registrarPet', component:RegistrarPetComponent},
  {path:'resgistrarUser', component:RegistrarUserComponent},
  {path:'historiales/:valor', component:HistorialesComponent},
  {path:'landingPage', component:LadingPageComponent},
  {path: 'pre-historial', component: PreHistorialComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
