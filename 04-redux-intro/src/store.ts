import { combineReducers, createStore } from "redux";
import { AccountState, Action, CustomertState } from "./libs/types/store.types";

//* INITIAL_STATES
const initialStateAccount: AccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer: CustomertState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

//* ACCOUNT_REDUCER
function accountReducer(state = initialStateAccount, action: Action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

//* CUSTOMER_REDUCER
function customerReducer(state = initialStateCustomer, action: Action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

//* COMBINE_REDUCERS
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//* STORE
const store = createStore(rootReducer);

//* DISPATCH ACTIONS
/*
store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch({ type: "account/withdraw", payload: 300 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 5000, purpose: "To get married" },
});
console.log(store.getState());

store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
*/

//* ACTION_CREATOR_FUNCTIONS
function deposit(amount: number): Action {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount: number): Action {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount: number, purpose: string): Action {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan(): Action {
  return { type: "account/payLoan" };
}

//* DISPATCH_ACTIONS <-> ACTION_CREATOR_FUNCTIONS
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(40000, "Buy a house"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

//*--------------------------------------------------------------------

//* ACTION_CREATOR_FUNCTIONS
function createCustomer(fullName: string, nationalId: string): Action {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}
function updateName(fullName: string): Action {
  return { type: "customer/updateName", payload: fullName };
}

console.log("\n --------------------------------------------\n ");

//* DISPATCH_ACTIONS <-> ACTION_CREATOR_FUNCTIONS
store.dispatch(createCustomer("Deen Yusuf", "200170403AD"));
console.log(store.getState());
store.dispatch(deposit(450));
store.dispatch(updateName("Deen Jonas"));
console.log(store.getState());
