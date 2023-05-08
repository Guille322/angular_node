import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  constructor() { }

  static types: {success: string, info: string, primary: string, secondary: string, warning: string, danger: string, light: string, dark: string} = 
  {
      success: 'success',
      info: 'info',
      primary: 'primary',
      secondary: 'secondary',
      warning: 'warning',
      danger: 'danger',
      light: 'light',
      dark: 'dark'
  };

  @Input() typeAlert: string = AlertComponent.types.danger;
  @Input() content: string = '';

  @Input() visible: boolean = true;
  @Input() closed:any = () => {};

  ngOnInit() {}

  onClosed() {
    this.visible = false;
    this.closed()
  }
}