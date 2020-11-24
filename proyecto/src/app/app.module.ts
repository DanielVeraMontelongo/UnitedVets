import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { HomeClienteComponent } from './pages/home-cliente/home-cliente.component';
import { HomeMedicoComponent } from './pages/home-medico/home-medico.component';
import { FooterComponent } from './pages/footer/footer.component';
import { RegistrarUserComponent } from './pages/registrar-user/registrar-user.component';
import { RegistrarPetComponent } from './pages/registrar-pet/registrar-pet.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HistorialesComponent } from './pages/historiales/historiales.component';
import { CitasComponent } from './pages/citas/citas.component';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { MenuArribaComponent } from './pages/menu-arriba/menu-arriba.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LadingPageComponent } from './pages/lading-page/lading-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {HttpClientModule} from '@angular/common/http';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PreHistorialComponent } from './pages/pre-historial/pre-historial.component';
import {EncrDecrServiceService} from '../app/shared/encr-decr-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeAdminComponent,
    HomeClienteComponent,
    HomeMedicoComponent,
    FooterComponent,
    RegistrarUserComponent,
    RegistrarPetComponent,
    PerfilComponent,
    HistorialesComponent,
    CitasComponent,
    ListaClientesComponent,
    MenuArribaComponent,
    LadingPageComponent,
    PreHistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    AutocompleteLibModule
  ],
  providers: [EncrDecrServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }


