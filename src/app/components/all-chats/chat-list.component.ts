import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/Auth/auth.service";
import {FriendService} from "../../services/Friend/friend.service";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  chatForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private friend: FriendService) {
    this.chatForm = this.formBuilder.group({
      searchInput: ['']
    });
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      searchInput: ['']
    });
  }

  onEnter() {
    this.friend.addToFriends(this.chatForm.get("searchInput")?.value).subscribe({
      next: (response) => {
       alert('Пользователь был успешно добавлен в друзья')
      },
      error: (error) => {
        if(error.error.includes("Пользователь с таким email не найден")){
          alert('Пользователь с таким email не найден')
        }
        else if(error.error.includes("Пользователь уже является вашим другом")){
          alert('Пользователь уже является вашим другом')

        }
        else{
          alert('шибка при добавлении друга')
          }
        
      }
    });
  }
}
