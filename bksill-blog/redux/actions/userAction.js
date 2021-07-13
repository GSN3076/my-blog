import { USER } from "../variables";

export const setUser = (user) => ({
  type: USER.SET_USER_DETAILS,
  user,
});

export const clearUser = (userID = user.user.id) => ({
  type: USER.CLEAR_USER_DETAILS,
  userID,
});
