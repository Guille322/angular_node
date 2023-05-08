import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from "socket.io-client";
import { socketData } from './socketData';
import { URL_SERVER } from '../constants';


@Injectable({
  providedIn: 'root',
})

export class SocketsService {

  public data$: BehaviorSubject<socketData> = new BehaviorSubject({type:'', subtype: '', data:null});
  socket = io(URL_SERVER);
  type:string = "";

  constructor() {}
  
  setType(type:string) {
    this.type = type;
  }

  public emit(subtype:string, data:any) {
    this.socket.emit('data', {type: this.type, subtype: subtype, data: data} as socketData);
  }

  public on(callbackFunction:any) {
    this.socket.on('data', (data) =>{
      this.data$.next(data);
    });
    this.data$.asObservable().subscribe((data: socketData) => {
      callbackFunction(data);
    });
  };

}
/*
export class SocketsService {

  protected socket: Socket;

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  
  constructor() {
    this.socket = io('http://localhost:3000');
    //this.onConnect();
    //this.onDisconnect();
  }

  

  //usuario conectado
  /*
  public onConnect = () => {
    this.socket.on('connect', () => {
      console.log('Bienvenido')
    });
  };

  public onDisconnect = () => {
    this.socket.on('disconnect', () => {
      console.log('Se fue un usuario');
      this.socket.emit('message', 'Se fue un usuario');
    });
  };
  


  // chat
  public sendMessage(message:any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };

}*/