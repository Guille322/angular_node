import { Injectable } from '@angular/core';
import { AlertComponent } from '../components/elementos/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  contentAlert:string = ""
  visibilityAlert:boolean = false
  typeAlert:string = ""
  onClosedExtra:any = () => {}

  showAlert = (message:string, type:string = AlertComponent.types.danger) => {
    this.contentAlert = message;
    this.typeAlert = type;
    this.visibilityAlert = true;
  }

  onClosed = () => {
    this.visibilityAlert = false;
    this.onClosedExtra();
  }
}
