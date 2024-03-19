import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import * as bcrypt from "bcryptjs";
import {
  logBuilderStatusWarnings
} from "@angular-devkit/build-angular/src/builders/browser-esbuild/builder-status-warnings";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  constructor(private http: HttpClient) { }


  addToFriends(email: string): Observable<any> {
    const data = {
      email: email
    }

    return this.http.post<any>(`http://localhost:8080/api/friends/addToFriends`, data);

  }
  removeFromFriends(email: string): Observable<any> {

    return this.http.post<any>(`http://localhost:8080/api/friends/removeFromFriends`, {email: email});
  }

  blockFriend(email: string): Observable<any> {

      return this.http.post<any>(`http://localhost:8080/api/friends/blockFriend`, {email: email});
  }

  getAllFriends(): Observable<any> {

     return this.http.post<any>(`http://localhost:8080/api/friends/getFriends`, {});

  }
}
