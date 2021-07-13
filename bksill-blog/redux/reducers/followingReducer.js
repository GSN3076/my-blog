import { v4 as uuidv4 } from "uuid";

import { FOLLOWING } from "../variables";

const initialState = [];

export default function followingReducer(state = initialState, action) {
  const followingItem = state.find((item) => item.id === action.productId);
  const followingItemIndex = followingItem && state.indexOf(followingItem);
  switch (action.type) {
    case FOLLOWING.ADD_TO_FOLLOWING:
      const addedfollowingItem = state.find(
        (item) => item.id === action.product.id
      );
      const addedfollowingItemIndex =
        addedfollowingItem && state.indexOf(addedfollowingItem);
      if (!addedfollowingItem) {
          return [
            ...state,
            {
              ...action.product,
            },
          ];
      } else {
        return [
          ...state.slice(0, addedfollowingItemIndex),
          ...state.slice(addedfollowingItemIndex + 1),
        ];
      }
    case FOLLOWING.REMOVE_FROM_FOLLOWING:
      return [
        ...state.slice(0, followingItemIndex),
        ...state.slice(followingItemIndex + 1),
      ];
    default:
      return state;
  }
}
