import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import * as bcrypt from "bcryptjs";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private http: HttpClient) { }


  addToFriends(email: string): Observable<any> {
    const user = localStorage.getItem('user');

    return this.http.post<any>(`http://localhost:8080/api/friends/addToFriends`, email);

  }
  removeFromFriends(email: string): Observable<any> {
    const user = localStorage.getItem('user');

    if (user) {
      const token = JSON.parse(user);
      const headers = new HttpHeaders().set('Authorization', token.accessToken);
      const data = {
        "headers": headers,
        "email": email
      }
      return this.http.post<any>(`http://localhost:8080/api/friends/removeFromFriends`, data);
    }
    return this.http.post<any>(`http://localhost:8080/api/friends/removeFromFriends`, {});
  }

  blockFriend(email: string): Observable<any> {
    const user = localStorage.getItem('user');

    if(user){
      const token = JSON.parse(user);
      const headers = new HttpHeaders().set('Authorization', token.accessToken);
      const data = {
        "headers": headers,
        "email": email
      }
      return this.http.post<any>(`http://localhost:8080/api/friends/blockFriend`, data);
    }
    return this.http.post<any>(`http://localhost:8080/api/friends/removeFromFriends`, {});
  }

  getAllFriends(): Observable<any> {
    const user = localStorage.getItem('user');
   if(user){
     const token = JSON.parse(user);

     const headers = new HttpHeaders().set('Authorization', token.accessToken);
     return this.http.post<any>(`http://localhost:8080/api/friends/getFriends`, { headers });
   }
    return this.http.post<any>(`http://localhost:8080/api/friends/removeFromFriends`, {});
  }
}
