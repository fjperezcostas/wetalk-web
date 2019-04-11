import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Chat } from 'src/app/domains/chat';
import { ChatType } from 'src/app/domains/chat-type';

@Component({
  selector: 'wt-available-chats',
  templateUrl: './available-chats.component.html',
  styleUrls: ['./available-chats.component.css']
})
export class AvailableChatsComponent implements OnInit {
  
  @Input() chats: Chat[];
    
  @Output() onSwitchChat = new EventEmitter();

  selected: Chat;
  
  ChatType = ChatType;
  
  constructor() { }

  ngOnInit() {
    this.selected = (this.chats.length) ? this.chats[0] : null;
  }

  switchChat(chat: Chat) {
    this.selected = chat;
    this.onSwitchChat.emit(chat);
  }

}
