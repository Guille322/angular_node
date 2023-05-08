import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  entrar = () => {
    this.router.navigate(['../login']);
  }

  registrarse = () => {
    this.router.navigate(['../register']); 
  }
  
}