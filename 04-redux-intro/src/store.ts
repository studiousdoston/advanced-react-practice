import { configureStore } from "@reduxjs/toolkit";
import type { Reducer } from "redux";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

/*
//*          COMBINE_REDUCERS
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
*/

//*       STORE V-1
/*
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware)),
);
*/

//*       STORE
const store = configureStore({
  reducer: {
    account: accountReducer as Reducer,
    customer: customerReducer as Reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export default store;
