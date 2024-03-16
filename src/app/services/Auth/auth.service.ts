import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

    register(userData: any): Observable<any> {
      const hashedPassword = bcrypt.hashSync(userData.password, 10);

      const dataToSend = {
        ...userData,
        password: hashedPassword
      };
      return this.http.post<any>('http://localhost:8080/api/user/registration', dataToSend);
    }

  login(userData: any): Observable<any> {
    const hashedPassword = bcrypt.hashSync(userData.password, 10);

    const dataToSend = {
      ...userData,
      password: hashedPassword
    };
    console.log(dataToSend)
    return this.http.post<any>('http://localhost:8080/api/user/login', dataToSend);
  }

  logout(): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/user/logout', {});
  }
}
