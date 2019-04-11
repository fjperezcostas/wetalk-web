import { Component, OnInit, Input } from '@angular/core';

import { Chat } from 'src/app/domains/chat';

@Component({
  selector: 'wt-received-messages',
  templateUrl: './received-messages.component.html',
  styleUrls: ['./received-messages.component.css']
})
export class ReceivedMessagesComponent implements OnInit {

  @Input() chat: Chat;

  constructor() { }

  ngOnInit() {
  }

}