import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wt-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  @Output() onSendMessage = new EventEmitter();
  newMessage: string;

  constructor() { }

  ngOnInit() {
  }

  sendMessage() {
    this.onSendMessage.emit(this.newMessage);
    this.newMessage = '';
  }
}
