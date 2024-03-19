import { createAction, props } from '@ngrx/store';

export enum FriendsActionTypes {
  AddToFriends = '[Friends] Add To Friends',
  AddToFriendsSuccess = '[Friends] Add To Friends Success',
  AddToFriendsFailure = '[Friends] Add To Friends Failure',
  RemoveFromFriends = '[Friends] Remove From Friends',
  RemoveFromFriendsSuccess = '[Friends] Remove From Friends Success',
  RemoveFromFriendsFailure = '[Friends] Remove From Friends Failure',
  BlockFriend = '[Friends] Block Friend',
  BlockFriendSuccess = '[Friends] Block Friend Success',
  BlockFriendFailure = '[Friends] Block Friend Failure',
  GetAllFriends = '[Friends] Get All Friends',
  GetAllFriendsSuccess = '[Friends] Get All Friends Success',
  GetAllFriendsFailure = '[Friends] Get All Friends Failure',
}

export const addToFriends = createAction(
  FriendsActionTypes.AddToFriends,
  props<{ email: string }>()
);
export const addToFriendsSuccess = createAction(
  FriendsActionTypes.AddToFriendsSuccess,
  props<{ email: string }>()
);
export const addToFriendsFailure = createAction(
  FriendsActionTypes.AddToFriendsFailure
);

export const removeFromFriends = createAction(
  FriendsActionTypes.RemoveFromFriends,
  props<{ email: string }>()
);
export const removeFromFriendsSuccess = createAction(
  FriendsActionTypes.RemoveFromFriendsSuccess,
  props<{ email: string }>()
);
export const removeFromFriendsFailure = createAction(
  FriendsActionTypes.RemoveFromFriendsFailure
);

export const blockFriend = createAction(
  FriendsActionTypes.BlockFriend,
  props<{ email: string }>()
);
export const blockFriendSuccess = createAction(
  FriendsActionTypes.BlockFriendSuccess,
  props<{ email: string }>()
);
export const blockFriendFailure = createAction(
  FriendsActionTypes.BlockFriendFailure
);

export const getAllFriends = createAction(
  FriendsActionTypes.GetAllFriends
);
export const getAllFriendsSuccess = createAction(
  FriendsActionTypes.GetAllFriendsSuccess,
  props<{ friends: any[] }>()
);
export const getAllFriendsFailure = createAction(
  FriendsActionTypes.GetAllFriendsFailure
);
