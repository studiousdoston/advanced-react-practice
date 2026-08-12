import Options from "./Options";
import { Action, Questions } from "../lib/types";
import { Dispatch } from "react";

type QuestionProps = {
  question: Questions;
  dispatch: Dispatch<Action>;
  answer: null | number;
};

export default function Question(props: QuestionProps) {
  const { question, dispatch, answer } = props;
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
