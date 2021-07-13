import { combineReducers } from "redux";
import wishlistReducer from "./wishlistReducer";
import userReducer from "./userReducer"
import followingReducer from "./followingReducer";
import topicReducer from "./topicReducer";

const rootReducer = combineReducers({
  wishlistReducer,
  userReducer,
  followingReducer,
  topicReducer
});

export default rootReducer;
