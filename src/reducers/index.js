import { combineReducers } from "redux";

//reducers
import userReducer from "./user";


export const rootReducer = combineReducers({
  user: userReducer,
});
