import Options from "./Options";
import { Questions } from "../lib/types";

type QuestionProps = {
  question: Questions;
};
export default function Question(props: QuestionProps) {
  const { question } = props;
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
