
import { FOLLOWING } from "../variables";

export const addTofollowing = (product) => ({
  type: FOLLOWING.ADD_TO_FOLLOWING,
  product,
});

export const removeFromfollowing = (productId) => ({
  type: FOLLOWING.REMOVE_FROM_FOLLOWING,
  productId,
});

