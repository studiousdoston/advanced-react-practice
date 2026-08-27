import { useSelector } from "react-redux";
import { RootState } from "../../store";

function formatCurrency(value: string | number | bigint) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(typeof value === "string" ? Number(value) : value);
}

function BalanceDisplay() {
  const { balance } = useSelector((store: RootState) => store.account);

  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
