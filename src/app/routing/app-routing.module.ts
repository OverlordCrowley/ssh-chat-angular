import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "../components/registration/register.component";
import {LogInComponent} from "../components/log-in/log-in.component";
import {ChatListComponent} from "../components/all-chats/chat-list.component";
import {ChatComponent} from "../components/current-chat/chat.component";

const routes: Routes = [
  { path: '', component: ChatListComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'login', component: LogInComponent },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
