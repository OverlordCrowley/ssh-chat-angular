import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
      return this.http.post<any>('http://localhost:8080/api/user/login', userData);
    }

    setData(user: any) {
    // let date = new Date();
    // date.setHours(date.getMinutes()+1)
      let currentDate = new Date();
      let date = new Date(currentDate.getTime() + 3600000);
    const curUser = {...user, expires: date}
      localStorage.setItem('user', JSON.stringify(curUser));
    }

    getData() {
        const user = localStorage.getItem('user');
        if(user){
          return JSON.parse(user)
        }
        return undefined
    }

}
