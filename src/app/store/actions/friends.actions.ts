import { createAction, props } from '@ngrx/store';

export const addToFriends = createAction(
  '[Friends] Add To Friends',
  props<{ email: string }>()
);

export const removeFromFriends = createAction(
  '[Friends] Remove From Friends',
  props<{ email: string }>()
);

export const blockFriend = createAction(
  '[Friends] Block Friend',
  props<{ email: string }>()
);

export const getAllFriends = createAction(
  '[Friends] Get All Friends'
);
