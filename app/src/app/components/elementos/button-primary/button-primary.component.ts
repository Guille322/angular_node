import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['../styles-elements.scss', './button-primary.component.scss'],
})
export class ButtonPrimaryComponent implements OnInit {

  constructor() { }
  
  @Input() text:string = "";

  ngOnInit() {}

  @Input() clickAction = () => {};

}
