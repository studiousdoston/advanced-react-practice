import { Dispatch } from "react";
import { Action } from "../lib/types";

type Props = {
  dispatch: Dispatch<Action>;
  answer: null | number;
  index: number;
  numQuestions: number;
};

export default function NextButton(props: Props) {
  const { dispatch, answer, index, numQuestions } = props;
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}
