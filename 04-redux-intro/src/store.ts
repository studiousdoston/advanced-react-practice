import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

//* COMBINE_REDUCERS
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//* STORE
const store = createStore(rootReducer);

export default store;
