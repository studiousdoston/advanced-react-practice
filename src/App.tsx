import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

type Questions = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};
type State = {
  questions: Questions[];
  status: string;
};
type Action = {
  type: string;
  payload?: Questions[];
};

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
};

function reducer(state: State, action: Action): State {
  console.log("state:", state, "action:", action);

  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload!, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };

    default:
      throw new Error("Unknown error");
  }
} 

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;

  useEffect(() => {
    fetch("http://localhost:8010/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
