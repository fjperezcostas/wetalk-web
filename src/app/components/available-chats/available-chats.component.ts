import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Chat } from 'src/app/model/chat';
import { ChatType } from 'src/app/model/chat-type';

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
    if (this.chats.length > 0) {
      this.selected = this.chats[0];
    }
  }

  switchChat(chat: Chat) {
    this.selected = chat;
    this.onSwitchChat.emit(chat);
  }

}
