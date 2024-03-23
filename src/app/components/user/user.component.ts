import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/Auth/auth.service";
import {interval, Observable, Subscription, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FriendsService} from "../../services/Friends/friends.service";
import {select, Store} from "@ngrx/store";
import {blockFriend, getAllFriends, removeFromFriends} from "../../store/actions/friends.actions";
import {selectFriends} from "../../store/selectors/friends.selectors";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  burgerIsActive = false;
  email: string;
  firstName :string;
  lastName: string;
  friends$: Observable<any[]> = new Observable<any[]>();
  private intervalSubscription: Subscription = new Subscription();
  constructor(private router: Router, private auth: AuthService, private http: HttpClient, private friend: FriendsService, private store: Store) {
    let usr = this.auth.getData();
    this.email = usr.email;
    this.firstName = usr.firstName;
    this.lastName = usr.lastName;

  }

  ngOnInit() {
    this.friends$ = this.store.pipe(
      select(selectFriends)
    );
    this.store.dispatch(getAllFriends());
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  remove(email: string){
    this.store.dispatch(removeFromFriends({email: email}))
    this.store.dispatch(getAllFriends());
  }

  block(email: string){
    this.store.dispatch(blockFriend({email: email}))
    this.store.dispatch(getAllFriends());
  }

  setActiveBurger(){
    this.burgerIsActive = !this.burgerIsActive;
  }
  logOut(){
    localStorage.setItem('user', '')
    this.friends$.subscribe(friends => {
      friends.forEach(friend => {
        localStorage.setItem(friend.email, '')
      });
    });

    this.router.navigate(['login'])
  }


}
