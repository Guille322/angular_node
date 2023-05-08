import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MongoDbService {

  private token = null;

  private base_url = 'http://localhost:3000/';

  private axios = require('axios');

  constructor() {}

  public async login(usuarioCorreo: string, password: string) {
    try {
      const response = await this.axios.post(`${this.base_url}login`, {
        username: usuarioCorreo,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.token = response.data.token;
      return true;
    } catch (error) {
     // console.error(error);
      return false; 
    }
  }

  createImage(image: File): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    console.log(headers)
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    return  this.axios.post(`${this.base_url}image`, formData, { headers });
  }

  prueba() {
    const axios = require('axios');
    const token = this.token;
    axios.get(`${this.base_url}protegido`, this.getHeaders())
      .then((response: { data: any; }) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  getHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    }
  }
  
}
