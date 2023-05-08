import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../elementos/alert/alert.component';
import { AlertService } from '../../services/alert.service';
import { LanguageService } from '../../services/languague.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  nombre:string = ""
  apellido:string = ""
  segundoApellido:string = ""
  correo:string = ""
  contrasena:string = ""
  confirmarContrasena:string = ""
  fechaNacimiento:string = ""

  constructor(public alertService:AlertService, public languageService:LanguageService) { }

  showAlert = (message:string, type:string = AlertComponent.types.danger) => {
    this.alertService.showAlert(message, type);
  }

  ngOnInit() {}

  registrar = () => {
    this.nombre = this.nombre.trim();
    this.apellido = this.apellido.trim();
    this.segundoApellido = this.segundoApellido.trim();
    this.correo = this.correo.trim();
    this.fechaNacimiento = this.fechaNacimiento.trim();
    if(!this.nombre || !this.apellido || !this.correo || !this.contrasena || !this.confirmarContrasena || !this.fechaNacimiento) {
      this.showAlert(this.languageService.getString('completaTodosCampos'));
      return;
    }
    if (this.contrasena.length < 6) {
      this.showAlert(this.languageService.getString('contrasennaCorta'));
      return;
    }
    if(this.contrasena !== this.confirmarContrasena) {
      this.showAlert(this.languageService.getString('contrasennaNoIguales'));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.correo)) {
      this.showAlert(this.languageService.getString('correoFormatoNoValido'));
      return;
    }
    const dateOfBirth = new Date(this.fechaNacimiento);
    if(dateOfBirth.toString() === "Invalid Date") {
      this.showAlert(this.languageService.getString('fechaNacNoValida'));
      return;
    }
    this.showAlert(this.languageService.getString('registroExitoso'), AlertComponent.types.success);
  }


}
