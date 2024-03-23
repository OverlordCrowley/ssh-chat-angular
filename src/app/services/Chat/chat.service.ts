import {Injectable, OnInit} from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {Observable, Subject} from 'rxjs';
import * as CryptoJS from 'crypto-js';
import {AuthService} from "../Auth/auth.service";
import {select, Store} from "@ngrx/store";
import {selectFriends} from "../../store/selectors/friends.selectors";


@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit{
  private socket!: Socket;
  userEmail: string;
  private encryptedMessageSubject = new Subject<string>();
  friends$: Observable<any> = new Observable<any>()
  // @ts-ignore
  globalMessages: any;
  isActive = false
  constructor(private auth: AuthService, private store: Store) {
    this.userEmail = '';

    this.setupSocketConnection();
    this.connectToFriendsRooms();

  }
  ngOnInit() {
    this.friends$ = this.store.pipe(
      select(selectFriends)
    );

  }

  connectToFriendsRooms(): void {
    this.store.pipe(
      select(selectFriends)
    ).subscribe((friends: any) => {
      friends.forEach((friendEmail: any) => {
        this.joinRoom(friendEmail.email);
      });
    });
  }

  private setupSocketConnection(): void {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', () => {
      // console.log('Connected to server');
    });

    this.socket.on('ReceivedEncryptedMessage', (data: any) => {
      // console.log('Encrypted message received:', data.message);
      const { message, key, userEmail } = data;
      console.log(userEmail)
      if (message && key) {
        const bytes = CryptoJS.AES.decrypt(message, key);
        const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
        // console.log('Decrypted message:', decryptedMessage);
        this.encryptedMessageSubject.next(JSON.stringify({
          decryptedMessage: decryptedMessage,
          email: userEmail
        }));
      }
    });

    this.socket.on('disconnect', () => {
      // console.log('Disconnected from server. Attempting to reconnect...');
      this.setupSocketConnection();
      this.connectToFriendsRooms();
    });
  }

  sendMessage(message: string, recipientEmail: string, timestamp: any): void {
    const key = CryptoJS.lib.WordArray.random(16).toString();
    const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
    let userEmail = this.auth.getData().email;
    this.socket.emit('encryptedMessage', { message: encryptedMessage, key: key, recipientEmail: recipientEmail, userEmail: userEmail, timestamp: timestamp });
  }

  getEncryptedMessages(): Observable<string> {
    return this.encryptedMessageSubject.asObservable();
  }

  joinRoom(room: string): void {
    this.socket.emit('joinRoom', room);
  }
  saveMessagesToLocalStorage(email: string, message: any): void {

    let obj: any = {
      email: email,
      messages: []
    };

    let savedMessages = this.getMessagesFromLocalStorage(email);

    if (savedMessages != null) {
      obj.messages = savedMessages.messages;
      obj.messages.push(message);

      localStorage.setItem(email, JSON.stringify(obj));


      this.globalMessages = obj;
    }
    else{
      obj.messages.push(message);

      localStorage.setItem(email, JSON.stringify(obj));


      this.globalMessages = obj;
    }



  }

  getMessagesFromLocalStorage(email: string) {
    const messages = localStorage.getItem(email);
    return messages ? JSON.parse(messages) : null;
  }
}
