import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-primary',
  templateUrl: './input-primary.component.html',
  styleUrls: ['../styles-elements.scss', './input-primary.component.scss'],
})
export class InputPrimaryComponent  implements OnInit {

  constructor() { }

  @Input() type:string = "text"
  @Input() value: string = '';
  @Input() placeholder: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: any) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }

  ngOnInit() {}
}
