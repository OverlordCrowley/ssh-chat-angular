import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/Auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]]
    });
  }


  register() {
    if (this.registrationForm.valid) {
        this.authService.register({
          firstName: this.registrationForm.get('firstName')?.value,
          lastName: this.registrationForm.get('lastName')?.value,
          email: this.registrationForm.get('email')?.value,
          password: this.registrationForm.get('password')?.value
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
