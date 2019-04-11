import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Chat } from 'src/app/domains/chat';
import { Message } from 'src/app/domains/message';
import { IncomingMessage } from 'src/app/domains/incoming-message';
import { ChatType } from 'src/app/domains/chat-type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'wt-chatroom-view',
  templateUrl: './chatroom-view.component.html',
  styleUrls: ['./chatroom-view.component.css'],
})
export class ChatroomViewComponent implements OnInit {
  
  chats: Chat[];
  
  currentChat: Chat;
  
  username: String;

  constructor(private stompService: RxStompService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.stompService.configure({
      brokerURL: `ws://${environment.wetalkServer}/chat`,
      connectHeaders: {
        Authorization: this.authService.token
      }
    });
    this.username = this.authService.whoAmI();
    this.stompService.stompErrors$.subscribe(error => console.log(error));
    this.stompService.watch('/app/chat/startup').subscribe(response => this.onConnect(response));
    this.stompService.watch('/topic/chat/home').subscribe(response => this.onReceiveBroadcastMessage(response));
    this.stompService.watch('/user/queue/chat/private').subscribe(response => this.onReceivePrivateMessage(response));
    this.stompService.watch('/topic/chat/login').subscribe(response => this.onLoginUser(response));
    this.stompService.watch('/topic/chat/logout').subscribe(response => this.onLogoutUser(response));
    this.stompService.activate();
  }

  onConnect(response) {
    let users:string[] = JSON.parse(response.body);
    this.chats = [];
    this.chats.push(new Chat('home',ChatType.CHANNEL));
    this.currentChat = this.chats[0];
    users.forEach(user => {
      this.chats.push(new Chat(user,ChatType.PRIVATE));
    });
  }

  sendMessage(newMessage: string) {
    let destination: string;

    switch (this.currentChat.type) {
      case ChatType.CHANNEL:
        destination = `/app/chat/${this.currentChat.name}`;
        break;
      case ChatType.PRIVATE:
        destination = `/app/chat/${this.currentChat.name}/private`;
        break;
    }
    this.stompService.publish({ 
      destination: destination, 
      body: newMessage
    });
  }

  onReceiveBroadcastMessage(response) {
    let chat: Chat = this.chats.find(x => x.name === 'home');
    let incomingMessage: IncomingMessage = JSON.parse(response.body);
    chat.messages.push(new Message(incomingMessage.from, incomingMessage.content));
    if (chat !== this.currentChat) {
      chat.pendingToRead++;
    }
  }

  onReceivePrivateMessage(response) {
    let chat: Chat;
    let incomingMessage: IncomingMessage = JSON.parse(response.body);
    if (incomingMessage.from === this.authService.whoAmI()) {
      chat = this.chats.find(x => x.name === incomingMessage.to);
    } else {
      chat = this.chats.find(x => x.name === incomingMessage.from);
    }
    chat.messages.push(new Message(incomingMessage.from, incomingMessage.content));
    if (chat !== this.currentChat) {
      chat.pendingToRead++;
    }
  }
  
  onLoginUser(response) {
    let user = response.body;
    let chat = this.chats.find(x => x.name === user);
    (chat) ? chat.online = true : this.chats.push(new Chat(user,ChatType.PRIVATE));
  }

  onLogoutUser(response) {
    let name = response.body;
    this.chats.find(x => x.name == name).online = false;  
  }

  switchChat(chat: Chat) {
    this.currentChat = chat;
    this.currentChat.pendingToRead = 0;
  }

  logout() {
    this.stompService.deactivate();
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
