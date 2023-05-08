import { Routes } from '@angular/router';
import { HomePage } from './components/home/home.page';
import { ElegirAlumnoProfesorComponent } from './components/elegir-alumno-profesor/elegir-alumno-profesor.component';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { ButtonPrimaryComponent } from './components/elementos/button-primary/button-primary.component';
import { LogoElementosCentradosComponent } from './components/elementos/logo-elementos-centrados/logo-elementos-centrados.component';
import { InputPrimaryComponent } from './components/elementos/input-primary/input-primary.component';
import { FormsModule } from '@angular/forms';
import { SelectOptionsComponent } from './components/elementos/select-options/select-options.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import localeEn from '@angular/common/locales/en';
import { AlertComponent } from './components/elementos/alert/alert.component';
registerLocaleData(localeEn);
// https://youtu.be/2Zjw1zKZnXQ?t=225
const components = [
  ButtonPrimaryComponent,
  InputPrimaryComponent,
  SelectOptionsComponent,
  LoginComponent,
  RegisterComponent,
  AlertComponent,
  LogoElementosCentradosComponent,
  ElegirAlumnoProfesorComponent,
  LoginRegisterComponent,
  HomePage
];


export const routes: Routes = [
  { path: '', component: LoginRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'app', component: HomePage },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  declarations: [components],
  imports: [AppComponent, FormsModule, MatSelectModule, MatAutocompleteModule, CommonModule, NgbModule],
  providers: [],
  bootstrap: []
})
export class AppModule { }