import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  burgerIsActive = false;
  constructor(private router: Router) {
  }
  setActiveBurger(){
    this.burgerIsActive = !this.burgerIsActive;
  }
  logOut(){
    localStorage.setItem('user', '')
    this.router.navigate(['login'])
  }
}
