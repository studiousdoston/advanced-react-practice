//* TYPES
export type AccountState = {
  balance: number;
  loan: number;
  loanPurpose: string;
};
export type CustomertState = {
  fullName: string;
  nationalId: string;
  createdAt: string;
};
export type Action =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { amount: number; purpose: string };
    }
  | { type: "account/payLoan" }
  | { type: "customer/createCustomer"; payload: CustomertState }
  | { type: "customer/updateName"; payload: string };
