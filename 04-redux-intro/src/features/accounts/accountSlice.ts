import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "../../libs/types/store.types";

import { AccountState } from "../../libs/types/store.types";
import { Dispatch } from "react";
import { RootState } from "../../store";

//*       INITIAL_STATES
const initialStateAccount: AccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: true,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(
        state,
        action: PayloadAction<{ amount: number; purpose: string }>,
      ) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },

    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

//* DEPOSIT
export function deposit(
  amount: number,
  currency: string,
):Action | ((dispatch: Dispatch<Action>, getState: () => RootState) => Promise<void>) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch({ type: "account/convertingCurrency" });

    // API call
    const res = await fetch(
      `https://api.frankfurter.dev/v1asyn/latest?amount=${amount}&from=${currency}&to=USD`,
    );
    const data = await res.json();
    const convertedData = data.rates.USD;
    //return action
    dispatch({ type: "account/deposit", payload: convertedData });
  };
}

export default accountSlice.reducer;
