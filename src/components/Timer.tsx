import { Dispatch, useEffect } from "react";
import { Action } from "../lib/types";

type TimerProps = {
  dispatch: Dispatch<Action>;
  secondsRemaining: number | null;
};
export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
  const mins = Math.floor(secondsRemaining! / 60);
  const seconds = secondsRemaining! % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {mins < 10 && 0}
      {mins}:{seconds < 10 && 0}
      {seconds}
    </div>
  );
}
