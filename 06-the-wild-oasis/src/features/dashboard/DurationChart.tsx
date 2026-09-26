/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { T } from "../../libs/common.type";

interface StartData {
  duration: string;
  value: number;
  color: string;
}
const startDataLight: StartData[] = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
];

const startDataDark: StartData[] = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

// Step 1: given a number of nights, which bucket does it belong to?
function getDurationLabel(numNights: number): string {
  if (numNights === 1) return "1 night";
  if (numNights === 2) return "2 nights";
  if (numNights === 3) return "3 nights";
  if (numNights <= 5) return "4-5 nights";
  if (numNights <= 7) return "6-7 nights";
  if (numNights <= 14) return "8-14 nights";
  if (numNights <= 21) return "15-21 nights";
  return "21+ nights";
}
// Step 2: count how many stays fall into each bucket
function prepareData(template: StartData[], stays: T[]) {
  const counts: Record<string, number> = {};
  
  stays.forEach((stay: T) => {
    const label = getDurationLabel(stay.numNights);
    counts[label] = (counts[label] || 0) + 1;
  });

  return template
    .map((bucket) => ({ ...bucket, value: counts[bucket.duration] || 0 }))
    .filter((bucket) => bucket.value > 0);
}

function DurationChart({ confirmedStays }: T) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  const backgroundColor = isDarkMode ? "#18212f" : "#fff";
  const text = isDarkMode ? "#e5e7eb" : "#374151";
  return (
    <ChartBox>
      <Heading as={"h2"}>Stay duration summary</Heading>
      <ResponsiveContainer width={"100%"} height={270}>
        <PieChart>
          <Pie
            data={data}
            nameKey={"duration"}
            dataKey={"value"}
            innerRadius={85}
            outerRadius={110}
            cx={"45%"}
            cy={"45%"}
            paddingAngle={5}
          >
            {data.map((entry: StartData) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: backgroundColor }}
            labelStyle={{ color: text }}
            itemStyle={{ color: text }}
          />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconSize={16}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;
