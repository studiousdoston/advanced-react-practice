export type Questions = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type Action = {
  type: string;
  payload?: Questions[];
};

export type State = {
  questions: Questions[];
  status: string;
  index: number;
};
