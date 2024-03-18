import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/Auth/auth.service";
import {
  logBuilderStatusWarnings
} from "@angular-devkit/build-angular/src/builders/browser-esbuild/builder-status-warnings";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private auth: AuthService) {
    let user = this.auth.getData();
    if(!user){
      this.router.navigate(['/login'])
    }

    else{
      if (new Date() > new Date(user.expires)){
        this.auth.setData('')
        this.router.navigate(['login'])
      }
     else{
        this.router.navigate([''])
      }

    }

  }

  title = 'ChatFront';
}
