import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/Auth/auth.service";
import {interval, Subscription, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FriendService} from "../../services/Friend/friend.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  burgerIsActive = false;
  email: string;
  firstName :string;
  lastName: string;
  friends: any;
  subscription: Subscription = new Subscription();
  constructor(private router: Router, private auth: AuthService, private http: HttpClient, private friend: FriendService) {
    let usr = this.auth.getData();
    this.email = usr.email;
    this.firstName = usr.firstName;
    this.lastName = usr.lastName;

  }

  ngOnInit() {
    this.subscription = interval(5000)
      .pipe(
        switchMap(() => this.friend.getAllFriends())
      )
      .subscribe(
        (response) => {
          this.friends = response;
          console.log(response)
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  setActiveBurger(){
    this.burgerIsActive = !this.burgerIsActive;
  }
  logOut(){
    localStorage.setItem('user', '')
    this.router.navigate(['login'])
  }


}
