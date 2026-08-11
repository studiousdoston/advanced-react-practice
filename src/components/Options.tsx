import { Questions } from "../lib/types";

type OptionsProps = {
  question: Questions;
};

export default function Options({ question }: OptionsProps) {
  return (
    <div className="options">
      {question.options.map((option) => (
        <button className="btn btn-option" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}
