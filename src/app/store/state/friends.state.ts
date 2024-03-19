
export interface Friend {
  id: string
  email: string;
  firstName: string;
  lastName: string;
}

export interface FriendsState {
  friends: Friend[];
}

export const initialState: FriendsState = {
  friends: []
};
