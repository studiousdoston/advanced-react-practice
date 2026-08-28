import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk, ThunkMiddleware } from "redux-thunk";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

//* COMBINE_REDUCERS
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//* STORE
const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunk as ThunkMiddleware),
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export default store;
