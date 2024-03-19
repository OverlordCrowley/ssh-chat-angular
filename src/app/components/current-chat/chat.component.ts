import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ChatService} from "../../services/Chat/chat.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/Auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.component.scss']
})

export class ChatComponent implements OnChanges, OnInit, OnDestroy{
  chatForm: FormGroup;
  email: string;
  lastName: string;
  firstName: string;
  userEmail: string;
  private messageSubscription: Subscription = new Subscription();
  messages: any[] = [];
  @Input() currentFriend: any;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentFriend']) {
      this.firstName = this.currentFriend.firstName;
      this.email = this.currentFriend.email;
      this.lastName = this.currentFriend.lastName;
    }
  }

  ngOnInit(): void {
    this.messageSubscription = this.chatService.getEncryptedMessages().subscribe((message: string) => {
      this.messages.push({ content: message, fromMe: false });
    });
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  constructor(private fb: FormBuilder, private chatService: ChatService, private auth: AuthService) {
    let usr = this.auth.getData();
    this.userEmail = ''
    if(usr){
      this.userEmail = usr.email
    }
    this.firstName = '';
    this.lastName = '';
    this.email = '';


    this.chatForm = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(450)]]
    });
  }

  onSubmit(): void {
    if (this.chatForm.valid && this.currentFriend) {
      this.chatService.userEmail = this.userEmail
      const message = this.chatForm.value.message;
      this.chatService.sendMessage(message, this.email);
      this.chatForm.reset();
    }
  }

}
