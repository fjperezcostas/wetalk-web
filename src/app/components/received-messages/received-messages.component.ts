import { Component, OnInit, Input, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';

import { Chat } from 'src/app/model/chat';

@Component({
  selector: 'wt-received-messages',
  templateUrl: './received-messages.component.html',
  styleUrls: ['./received-messages.component.css']
})
export class ReceivedMessagesComponent implements OnInit {

  @Input() chat: Chat;

  @ViewChild('receivedMessages') private receivedMessages: ElementRef;

  constructor() { }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  onChange() {
    console.log("model changes")
  }

  scrollToBottom(): void {
    try {
        this.receivedMessages.nativeElement.scrollTop = this.receivedMessages.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
}