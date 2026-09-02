import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomertState } from "../../libs/types/store.types";

const initialStateCustomer: CustomertState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare(fullName: string, nationalId: string) {
        return {
          payload: { fullName, nationalId }, ////createdAt: new Date().toISOString(),
        };
      },

      reducer(
        state,
        action: PayloadAction<{ fullName: string; nationalId: string }>, //  createdAt: string;
      ) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        //  state.createdAt = action.payload.createdAt;
      },
    },

    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

/*
//*         CUSTOMER_REDUCER
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
*/
