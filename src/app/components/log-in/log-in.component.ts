import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/Auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]]
    });
  }


  login() {
    if (this.loginForm.valid) {
      this.authService.login({
        email: String(this.loginForm.get('email')?.value),
        password: String(this.loginForm.get('password')?.value)
      }).subscribe({
        next: (response) => {
          this.authService.setData(response)
          this.router.navigate([""])

        },
        error: (error) => {
          console.error('Ошибка при регистрации:', error);
        }
      });
    } else {
      console.log("Форма не валидна. Пожалуйста, проверьте все поля.");
    }
  }
}
