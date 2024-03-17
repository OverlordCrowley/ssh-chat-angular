import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "../components/registration/register.component";
import {LogInComponent} from "../components/log-in/log-in.component";
import {ChatListComponent} from "../components/all-chats/chat-list.component";
import {ChatComponent} from "../components/current-chat/chat.component";
import {MainPageComponent} from "../pages/mainPage/main-page.component";

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'login', component: LogInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
