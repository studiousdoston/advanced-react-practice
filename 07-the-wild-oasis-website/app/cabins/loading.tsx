import Spinner from "../_components/home/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl">Loading cabin data...</p>
    </div>
  );
}
