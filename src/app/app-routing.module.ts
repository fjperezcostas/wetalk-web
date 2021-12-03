import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { ChatroomViewComponent } from './components/chatroom-view/chatroom-view.component';
import { ChatGuard } from './guards/chat/chat.guard';
import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginViewComponent, canActivate: [LoginGuard] },
  { path: 'chat', component: ChatroomViewComponent, canActivate: [ChatGuard] },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
