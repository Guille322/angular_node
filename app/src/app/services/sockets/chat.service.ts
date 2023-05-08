import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { SocketsService } from './sockets.service';
import { socketData } from './socketData';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends SocketsService {

  constructor() {
    super();
    this.setType('chat');
  }

  public sendMessage(message:string) {
    this.emit('message', message);
  }


}