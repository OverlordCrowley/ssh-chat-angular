import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/Auth/auth.service";
import {FriendsService} from "../../services/Friends/friends.service";
import {interval, Observable, tap} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectFriends} from "../../store/selectors/friends.selectors";
import {getAllFriends} from "../../store/actions/friends.actions";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  chatForm: FormGroup;
  friends$: Observable<any[]> = new Observable<any[]>();
  @Output() dataEvent = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private friend: FriendsService, private store: Store) {
    this.chatForm = this.formBuilder.group({
      searchInput: ['']
    });
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      searchInput: ['']
    });
    this.friends$ = this.store.pipe(
      select(selectFriends)
    );

  }

  sendFriendId(friend: any){
    this.dataEvent.emit(friend)
  }

  onEnter() {
    this.friend.addToFriends(this.chatForm.get("searchInput")?.value).subscribe({
      next: (response) => {
       alert('Пользователь был успешно добавлен в друзья')
        this.store.dispatch(getAllFriends());
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
