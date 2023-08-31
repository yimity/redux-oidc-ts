import { createStore, applyMiddleware, compose } from "redux";
import { loadUser } from "../index.ts";
import {reducer} from "../index.ts";
import userManager from "./user-manager.ts";

const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log("Action type:", action.type);
  console.log("Action payload:", action.payload);
  console.log("State before:", store.getState());
  next(action);
  console.log("State after:", store.getState());
};

const initialState = {user: null, isLoadingUser: false,};

const createStoreWithMiddleware = compose(
  applyMiddleware(loggerMiddleware)
)(createStore);

const store = createStoreWithMiddleware(reducer, initialState);
loadUser(store, userManager);

export default store;
