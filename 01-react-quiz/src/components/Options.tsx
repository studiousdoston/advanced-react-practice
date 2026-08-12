import { Dispatch } from "react";
import { Action, Questions } from "../lib/types";

type OptionsProps = {
  question: Questions;
  dispatch: Dispatch<Action>;
  answer: null | number;
};

export default function Options(props: OptionsProps) {
  const { question, dispatch, answer } = props;
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} 
          ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }
          `}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
