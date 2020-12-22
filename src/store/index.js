import { createStore } from "redux";
import { composeWithDevTools } from "../middleware";
import {rootReducer} from '../reducers'
export const store = createStore(rootReducer, composeWithDevTools());
