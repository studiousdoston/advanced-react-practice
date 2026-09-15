"use client";

import { T } from "@/types/common";
import { useState } from "react";

export default function Counter({ users }: T) {
  const [count, setCount] = useState(0);
  console.log(users);
  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count} </button>
    </div>
  );
}
