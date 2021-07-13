import { v4 as uuidv4 } from "uuid";

import { USER } from "../variables";

const initialState = {};

export default function userReducer(state = initialState, action) {
  // const cartItem = state.find((item) => item.cartId === action.cartId);
  // const cartItemIndex = cartItem && state.indexOf(cartItem);
  switch (action.type) {
    case USER.SET_USER_DETAILS:
          return {
            ...action.user
          }
    case USER.CLEAR_USER_DETAILS:
            return {}          
    default:
      return state;
  }
}
