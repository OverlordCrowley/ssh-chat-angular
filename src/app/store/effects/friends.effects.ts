import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as FriendsActions from '../actions/friends.actions';
import { FriendsService } from '../../services/Friends/friends.service';

@Injectable()
export class FriendsEffects {
  addToFriends$ = createEffect(() => this.actions$.pipe(
    ofType(FriendsActions.addToFriends),
    switchMap(({ email }) => this.friendsService.addToFriends(email)
      .pipe(
        map(() => FriendsActions.addToFriendsSuccess({ email })),
        catchError(() => of(FriendsActions.addToFriendsFailure()))
      ))
  ));

  removeFromFriends$ = createEffect(() => this.actions$.pipe(
    ofType(FriendsActions.removeFromFriends),
    switchMap(({ email }) => this.friendsService.removeFromFriends(email)
      .pipe(
        map(() => FriendsActions.removeFromFriendsSuccess({ email })),
        catchError(() => of(FriendsActions.removeFromFriendsFailure()))
      ))
  ));

  blockFriend$ = createEffect(() => this.actions$.pipe(
    ofType(FriendsActions.blockFriend),
    switchMap(({ email }) => this.friendsService.blockFriend(email)
      .pipe(
        map(() => FriendsActions.blockFriendSuccess({ email })),
        catchError(() => of(FriendsActions.blockFriendFailure()))
      ))
  ));

  getAllFriends$ = createEffect(() => this.actions$.pipe(
    ofType(FriendsActions.getAllFriends),
    switchMap(() => this.friendsService.getAllFriends()
      .pipe(
        map(friends => FriendsActions.getAllFriendsSuccess({ friends })),
        catchError(() => of(FriendsActions.getAllFriendsFailure()))
      ))
  ));

  constructor(
    private actions$: Actions,
    private friendsService: FriendsService
  ) {}
}
