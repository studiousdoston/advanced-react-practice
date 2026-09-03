import { Link } from "react-router-dom";

type ButtonProps = {
  disabled?: boolean;
  children: React.ReactNode;
  to?: string;
};

export default function Button({ disabled, children, to }: ButtonProps) {
  const className =
    "hover: focus: inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 ring-offset-2 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 disabled:cursor-not-allowed sm:px-6 sm:py-4";
  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}
