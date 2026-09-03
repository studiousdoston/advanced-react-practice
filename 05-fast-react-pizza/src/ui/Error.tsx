import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function NotFound() {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>
        {error instanceof Error
          ? error.message
          : typeof error === "object" && error !== null && "data" in error
            ? String(error.data)
            : "Unknown error"}
      </p>

      <LinkButton to="-1">&larr; Go Back</LinkButton>
    </div>
  );
}

export default NotFound;
