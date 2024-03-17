import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/Auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private auth: AuthService) {
    let user = this.auth.getData();
    if(!user){
      console.log(user)
      this.router.navigate(['/login'])
    }

    else{
      console.log(user)
      this.router.navigate([''])

    }

  }

  title = 'ChatFront';
}
