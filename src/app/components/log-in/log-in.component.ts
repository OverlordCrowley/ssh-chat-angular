import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/Auth/auth.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]]
    });
  }


  login() {
    console.log('sign')
    if (this.loginForm.valid) {
      console.log('valid')
      this.authService.login({
        email: String(this.loginForm.get('email')?.value),
        password: String(this.loginForm.get('password')?.value)
      }).subscribe({
        next: (response) => {
          console.log('Регистрация прошла успешно:', response);
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
