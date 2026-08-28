import { Action, CustomertState } from "../../libs/types/store.types";

const initialStateCustomer: CustomertState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

//* CUSTOMER_REDUCER
export default function customerReducer(
  state = initialStateCustomer,
  action: Action,
) {
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

//------------------------------------------------------------
//*               ACTION_CREATOR_FUNCTIONS
//------------------------------------------------------------
export function createCustomer(fullName: string, nationalId: string): Action {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}
export function updateName(fullName: string): Action {
  return { type: "customer/updateName", payload: fullName };
}
