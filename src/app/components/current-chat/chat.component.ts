import { Component } from '@angular/core';
import {ChatService} from "../../services/Chat/chat.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.component.scss']
})
export class ChatComponent {
  chatForm: FormGroup;

  constructor(private fb: FormBuilder, private chatService: ChatService) {
    // this.chatService.sendMessage('Hello from Angular!');
    // this.chatService.onMessageReceived((message: string) => {
    //   console.log('Message received from server:', message);
    // });

    this.chatForm = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(450)]]
    });
  }

  onSubmit(): void {
    if (this.chatForm.valid) {
      const message = this.chatForm.value.message;
      this.chatService.sendMessage(message);
      this.chatForm.reset();
    }
  }

}
