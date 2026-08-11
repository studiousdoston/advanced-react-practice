export type Questions = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type Action =
  | { type: "dataReceived"; payload: Questions[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" };

export type State = {
  questions: Questions[];
  status: string;
  index: number;
  answer: null | number;
  points: number;
};
