import { Injectable } from '@angular/core';
import { URL_SERVER } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token = null;

  constructor() {

  }

  public async login(usuarioCorreo: string, password: string) {
    const axios = require('axios');
    try {
      const response = await axios.post(`${URL_SERVER}login`, {
        username: usuarioCorreo,
        password: password
      }, {
        headers: this.getHeaders(false)
      });
      this.token = response.data.token;
      return true;
    } catch (error) {
     // console.error(error);
      return false; 
    }
  }

  public async post(path:string, data:any, authorization:boolean = true) {
    const axios = require('axios');
    try {
      const response = await axios.post(URL_SERVER + path, data, {
        headers: this.getHeaders(authorization)
      });
      this.token = response.data.token;
      return true;
    } catch (error) {
     // console.error(error);
      return false; 
    }
  }
  
  public get(path:string, functionResponse:any = null, functionError:any = null) {
    const axios = require('axios');
    const token = this.token;
    axios.get(`${URL_SERVER + path}`, {
      headers: this.getHeaders()
      })
      .then((response: { data: any; }) => {
        if (functionResponse !== null) {
          functionResponse(response.data);
        }
      })
      .catch((error: any) => {
        if (functionError !== null) {
          functionError(error);
        }
      });
  }

  prueba() {
    const axios = require('axios');
    const token = this.token;
    axios.get(`${URL_SERVER}protegido`, {
      headers: this.getHeaders()
      })
      .then((response: { data: any; }) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  private getHeaders(authorization:boolean = true) {
    return authorization ? 
    {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    } : 
    {
      'Content-Type': 'application/json'
    };
  }

}
