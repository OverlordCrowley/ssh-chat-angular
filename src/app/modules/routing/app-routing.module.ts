import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "../registration/register/register.component";
import {LogInComponent} from "../log-in/log-in/log-in.component";
import {ChatListComponent} from "../all-chats/chat-list/chat-list.component";
import {ChatComponent} from "../current-chat/chat/chat.component";

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
