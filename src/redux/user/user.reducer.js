import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null
};

// state = INITIAL_STATE is a "default parameter" feature
// if state is undefined, it will be populated with the INITIAL_STATE
// ""...state" means the state from the moment when the action gets fired
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
