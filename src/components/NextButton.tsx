import { Dispatch } from "react";
import { Action } from "../lib/types";

type Props = {
  dispatch: Dispatch<Action>;
  answer: null | number;
};

export default function NextButton({ dispatch, answer }: Props) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}
