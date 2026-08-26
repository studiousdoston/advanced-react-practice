import { createStore } from "redux";

//* TYPES
type State = {
  balance: number;
  loan: number;
  loanPurpose: string;
};
type Action =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { amount: number; purpose: string };
    }
  | { type: "account/payLoan" };

//* INITIAL_STATE
const initialState: State = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

//* REDUCER
function reducer(state = initialState, action: Action) {
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

//* STORE
const store = createStore(reducer);

//* DISPATCH ACTIONS
// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 300 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 5000, purpose: "To get married" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

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

//* DISPATCHING_ACTIONS <-> ACTION_CREATOR_FUNCTIONS
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(40000, "Buy a house"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
