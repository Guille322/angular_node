import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-options',
  templateUrl: './select-options.component.html',
  styleUrls: ['../styles-elements.scss', './select-options.component.scss'],
})
export class SelectOptionsComponent  implements OnInit {

  constructor() { }

  @Input() options?:{text: string, value: number}[];

  ngOnInit() {
  }

}
