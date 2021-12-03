import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { RxStompService } from '@stomp/ng2-stompjs';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvailableChatsComponent } from './components/available-chats/available-chats.component';
import { ChatroomViewComponent } from './components/chatroom-view/chatroom-view.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { ReceivedMessagesComponent } from './components/received-messages/received-messages.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FilterChatByTypePipe } from './pipes/filter-chat-by-type/filter-chat-by-type.pipe';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AvailableChatsComponent,
    ChatroomViewComponent,
    LoginViewComponent,
    MainMenuComponent,
    NewMessageComponent,
    ReceivedMessagesComponent,
    SpinnerComponent,
    FilterChatByTypePipe,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgxWebstorageModule.forRoot({ prefix: 'wetalk', separator: '-', caseSensitive: true }),
    HttpClientModule
  ],
  providers: [
    { 
      provide: RxStompService,
      useClass: RxStompService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
