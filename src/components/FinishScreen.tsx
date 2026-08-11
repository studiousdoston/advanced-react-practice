type Props = {
  points: number;
  maxPossiblePoints: number;
  highscore: number;
};

export default function FinishScreen(props: Props) {
  const { points, maxPossiblePoints, highscore } = props;
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 60) emoji = "😀";
  else if (percentage >= 30) emoji = "😢";
  else if (percentage >= 10) emoji = "🤕";
  else emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.round(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}
