import { Dispatch } from "redux";
import { AccountState, Action } from "../../libs/types/store.types";
import { RootState } from "../../store";

//*       INITIAL_STATES
const initialStateAccount: AccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

//*       ACCOUNT_REDUCER
export default function accountReducer(
  state = initialStateAccount,
  action: Action,
) {
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

//------------------------------------------------------------
//*               ACTION_CREATOR_FUNCTIONS
//------------------------------------------------------------

//*                  DEPOSIT
export function deposit(
  amount: number,
  currency: string,
): Action | ((dispatch: Dispatch, getState: () => RootState) => Promise<void>) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({ type: "account/convertingCurrency" });

    // API call
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`,
    );
    const data = await res.json();
    const convertedData = data.rates.USD;
    //return action
    dispatch({ type: "account/deposit", payload: convertedData });
  };
}

//*                  WITHDRAW
export function withdraw(amount: number): Action {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount: number, purpose: string): Action {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
export function payLoan(): Action {
  return { type: "account/payLoan" };
}
