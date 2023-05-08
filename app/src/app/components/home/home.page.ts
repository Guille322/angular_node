import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatService } from '../../services/sockets/chat.service';
import { socketData } from '../../services/sockets/socketData';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // standalone: true,
  // imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {

  newMessage: string = "";
  messageList: string[] = [];

  constructor(private chatService: ChatService){
    
  }

  ngOnInit(){
    this.chatService.on((data: socketData) => {
      if (data.type.toString() != 'chat') return;
      switch (data.subtype.toString()) {
        case 'message':
          this.messageList.push(data.data);
          break;
      }
    })
  }

  sendMessage = () => {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
