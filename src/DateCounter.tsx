import { useReducer } from "react";

type State = {
  count: number;
  step: number;
};

type Action = {
  type: string;
  payload?: number;
};

const initialState = { count: 0, step: 1 };

function reducer(state: State, action: Action): State {
  console.log(state, action);

  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload! };
    case "setStep":
      return { ...state, step: action.payload! };
    case "reset":
      return initialState;
  }

  throw new Error("Unknown action");
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date("june 21 2027");

  const dec = function () {
    dispatch({ type: "dec" });
  };
  const inc = function () {
    dispatch({ type: "inc" });
  };

  //* HANDLERS
  const handleCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };
  const handleStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const handleReset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={handleStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={handleCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
