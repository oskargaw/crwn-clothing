import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null
};

// state = INITIAL_STATE is a "default parameter" feature
// if state is undefined, it will be populated with the INITIAL_STATE
// ""...state" means the state from the moment when the action gets fired
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // if the return value is the same in both cases we can write it like that
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
