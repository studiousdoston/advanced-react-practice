function formatCurrency(value: string | number | bigint) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(typeof value === "string" ? Number(value) : value);
}

function BalanceDisplay() {
  return <div className="balance">{formatCurrency(123456)}</div>;
}

export default BalanceDisplay;
   