import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Chat } from 'src/app/model/chat';
import { Message } from 'src/app/model/message';
import { IncomingMessage } from 'src/app/model/incoming-message';
import { ChatType } from 'src/app/model/chat-type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'wt-chatroom-view',
  templateUrl: './chatroom-view.component.html',
  styleUrls: ['./chatroom-view.component.css'],
})
export class ChatroomViewComponent implements OnInit {
  
  chats: Chat[];  
  currentChat: Chat;  
  username: string;

  constructor(private stompService: RxStompService, private authService: AuthService, private router: Router) {
    this.chats = []
    this.currentChat = new Chat();
    this.username = "";
  }

  ngOnInit() {
    this.chats = [];
    this.chats.push(new Chat('home',ChatType.CHANNEL));
    this.currentChat = this.chats[0];
    this.stompService.configure({
      brokerURL: `ws://${environment.WETALK_API}/api/chat`,
      connectHeaders: {
        Authorization: this.authService.token
      }
    });
    this.username = this.authService.whoAmI();
    this.stompService.stompErrors$.subscribe(error => console.log(error));
    this.stompService.watch('/app/chat.users').subscribe(response => this.onReceiveOnlineUsers(response));
    this.stompService.watch('/topic/chat.home').subscribe(response => this.onReceiveBroadcastMessage(response));
    this.stompService.watch('/user/queue/chat.private').subscribe(response => this.onReceivePrivateMessage(response));
    this.stompService.watch('/topic/chat.login').subscribe(response => this.onLoginUser(response));
    this.stompService.watch('/topic/chat.logout').subscribe(response => this.onLogoutUser(response));
    this.stompService.activate();
  }

  onReceiveOnlineUsers(response: any) {
    let users:string[] = JSON.parse(response.body);
    users.forEach(user => {
      this.chats.push(new Chat(user,ChatType.PRIVATE));
    });
  }

  sendMessage(newMessage: string) {  
    if (newMessage !== '') {
      let destination: string;
      switch (this.currentChat.type) {
        case ChatType.CHANNEL:
          destination = `/app/chat.${this.currentChat.name}`;
          break;
        case ChatType.PRIVATE:
          destination = `/app/chat.${this.currentChat.name}.private`;
          break;
      }
      this.stompService.publish({ 
        destination: destination, 
        body: newMessage
      });
    }
  }

  onReceiveBroadcastMessage(response: any) {    
    let homeChat = this .chats.find(chat => chat.name === 'home')
    let incomingMessage: IncomingMessage = JSON.parse(response.body);
    if (homeChat !== undefined) {
      homeChat.messages.push(new Message(incomingMessage.from, incomingMessage.content));
      if (homeChat !== this.currentChat) {
        homeChat.pendingToRead++;
      }
    }
  }

  onReceivePrivateMessage(response: any) {
    let privateChat;
    let incomingMessage: IncomingMessage = JSON.parse(response.body);
    if (incomingMessage.from === this.authService.whoAmI()) {
      privateChat = this.chats.find(x => x.name === incomingMessage.to);
    } else {
      privateChat = this.chats.find(x => x.name === incomingMessage.from);
    }
    if (privateChat !== undefined) {
      privateChat.messages.push(new Message(incomingMessage.from, incomingMessage.content));
      if (privateChat !== this.currentChat) {
        privateChat.pendingToRead++;
      }
    }
  }
  
  onLoginUser(response: any) {
    let user = response.body;
    let chat = this.chats.find(x => x.name === user);
    (chat) ? chat.online = true : this.chats.push(new Chat(user,ChatType.PRIVATE));
  }

  onLogoutUser(response: any) {
    let name = response.body;
    let logoutChat = this.chats.find(x => x.name == name);
    if (logoutChat !== undefined) {
      logoutChat.online = false;  
    }
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
