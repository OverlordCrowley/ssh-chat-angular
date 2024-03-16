import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import {stripBom} from "@angular-devkit/build-angular/src/utils/strip-bom";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any

  constructor(  ) {
    this.socket = '';
  }
  sendMessage(message: string) {
    io.connect('http://localhost:8080').emit('message', message);
  }

  onMessageReceived(callback: (message: string) => void) {
    io.connect('http://localhost:8080').on('message', (data: any) => {
      callback(data);
    });
  }

}
