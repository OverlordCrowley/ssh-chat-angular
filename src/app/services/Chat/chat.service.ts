import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, Subject} from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;
  userEmail: string;
  private encryptedMessageSubject = new Subject<string>();

  constructor() {
    this.userEmail = '';
    this.setupSocketConnection();
  }

  private setupSocketConnection(): void {
    this.socket = io.connect('http://localhost:8080');
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('encryptedMessage', (message: string) => {
      console.log('Encrypted message received:', message);
      const bytes = CryptoJS.AES.decrypt(message, this.userEmail);
      const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
      console.log('Decrypted message:', decryptedMessage);
      this.encryptedMessageSubject.next(decryptedMessage);
    });
  }

  sendMessage(message: string, recipientEmail: string): void {
    const encryptedMessage = CryptoJS.AES.encrypt(message, recipientEmail).toString();
    this.socket.emit('encryptedMessage', encryptedMessage);
  }

  getEncryptedMessages(): Observable<string> {
    return this.encryptedMessageSubject.asObservable();
  }

}
