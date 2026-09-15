import { T } from "@/types/common";
import Counter from "../components/Counter";

export default async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log("data", data);
  return (
    <div>
      <h1>Cabins Page</h1>
      <ul>
        {data.map((user: T) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <Counter users={data} />
    </div>
  );
}
