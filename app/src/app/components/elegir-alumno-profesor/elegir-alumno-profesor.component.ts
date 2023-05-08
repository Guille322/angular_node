import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elegir-alumno-profesor',
  templateUrl: './elegir-alumno-profesor.component.html',
  styleUrls: ['./elegir-alumno-profesor.component.scss'],
})
export class ElegirAlumnoProfesorComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  inputVal:string = ""

  funcion = () => {
    alert(this.inputVal)
  }

}
