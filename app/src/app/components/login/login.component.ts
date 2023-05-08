import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../elementos/alert/alert.component';
import { AlertService } from '../../services/alert.service';
import { LanguageService } from '../../services/languague.service';
import { Router } from '@angular/router';
import { MongoDbService } from '../../services/mongo-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  nombre_correo:string = ""
  contrasena:string = ""

  constructor(private router: Router, public alertService:AlertService, public languageService:LanguageService, public mongoDbService:MongoDbService) { }

  showAlert = (message:string, type:string = AlertComponent.types.danger) => {
    this.alertService.showAlert(message, type);
  }

  entrar = async () => {
    this.nombre_correo = this.nombre_correo.trim();
    if (!this.nombre_correo) {
      this.showAlert(this.languageService.getString('completarNombreCorreo'))
    }
    if (this.contrasena.length < 6) {
      this.showAlert(this.languageService.getString('contrasennaCorta'));
      return;
    }
    const token = await this.mongoDbService.login(this.nombre_correo, this.contrasena);
    if (!token) {
      this.showAlert(this.languageService.getString('usuContraIncorrecta'))
      return;
    }
  
    //this.mongoDbService.prueba();
    this.router.navigate(['/app']);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.mongoDbService.createImage(file);
    /*.subscribe(
      (response) => {
        console.log('Imagen subida exitosamente', response);
      },
      (error) => {
        console.error('Error al subir imagen', error);
        this.showAlert(this.languageService.getString('errorSubirImagen'));
      }
    );*/
  }

  ngOnInit() {}

}