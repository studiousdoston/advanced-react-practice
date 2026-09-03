import SearchOrder from "@/features/order/SearchOrder";
import Username from "@/features/user/Username";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-amber-400 px-4 py-3 uppercase">
      <Link to={"/"} className="tracking-widest">
        Fast React Pizza Co.
      </Link>

      <SearchOrder />

      <Username />
    </header>
  );
}
