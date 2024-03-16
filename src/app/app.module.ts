import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChatListComponent } from './components/all-chats/chat-list.component';
import { AppRoutingModule } from './routing/app-routing.module';
import {RouterOutlet} from "@angular/router";
import { SearchComponent } from './components/search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./components/registration/register.component";
import {HttpClientModule} from "@angular/common/http";
import {LogInComponent} from "./components/log-in/log-in.component";

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    SearchComponent,
    RegisterComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
