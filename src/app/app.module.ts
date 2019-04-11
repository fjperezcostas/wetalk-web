import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { FormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { ChatroomViewComponent } from './components/chatroom-view/chatroom-view.component';
import { ReceivedMessagesComponent } from './components/received-messages/received-messages.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { AvailableChatsComponent } from './components/available-chats/available-chats.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FilterChatByTypePipe } from './pipes/filter-chat-by-type/filter-chat-by-type.pipe';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    ChatroomViewComponent,
    ReceivedMessagesComponent,
    NewMessageComponent,
    AvailableChatsComponent,
    MainMenuComponent,
    SpinnerComponent,
    FilterChatByTypePipe,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxWebstorageModule.forRoot({ prefix: 'wetalk', separator: '-', caseSensitive: true }),
    NgbModule
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
