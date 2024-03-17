import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ChatListComponent } from './components/all-chats/chat-list.component';
import { AppRoutingModule } from './routing/app-routing.module';
import {RouterOutlet} from "@angular/router";
import { SearchComponent } from './components/search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./components/registration/register.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LogInComponent} from "./components/log-in/log-in.component";
import { MainPageComponent } from './pages/mainPage/main-page.component';
import { UserComponent } from './components/user/user.component';
import {ChatComponent} from "./components/current-chat/chat.component";
import {NgClass, NgFor, NgIf} from "@angular/common";
import { ChatService } from './services/Chat/chat.service';
import {AuthInterceptor} from "./Interceptors/authInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    SearchComponent,
    RegisterComponent,
    LogInComponent,
    MainPageComponent,
    UserComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgFor,
    NgIf
  ],
  providers: [ChatService,  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
