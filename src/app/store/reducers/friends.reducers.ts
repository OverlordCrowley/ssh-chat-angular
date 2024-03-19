import { Action, createReducer, on } from "@ngrx/store";
import { FriendsState, initialState } from "../state/friends.state";
import * as FriendsActions from '../actions/friends.actions';

export const friendsReducers = createReducer(
  initialState,

  on(FriendsActions.addToFriendsSuccess, (state, { email }) => ({
    ...state,
    friends: [...state.friends, { id: state.friends.length.toString(), email, firstName: '', lastName: '' }]
  })),

  on(FriendsActions.removeFromFriendsSuccess, (state, { email }) => ({
    ...state,
    friends: state.friends.filter(friend => friend.email !== email)
  })),

  on(FriendsActions.blockFriendSuccess, (state, { email }) => ({
    ...state,
    friends: state.friends.map(friend =>
      friend.email === email ? { ...friend, blocked: true } : friend
    )
  })),

  on(FriendsActions.getAllFriendsSuccess, (state, { friends }) => ({
    ...state,
    friends: friends
  }))
);

export function reducer(state: FriendsState | undefined, action: Action) {
  return friendsReducers(state, action);
}
