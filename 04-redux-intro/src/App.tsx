import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const fullname = useSelector((state: RootState) => state.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullname === "" ? (
        <CreateCustomer />
      ) : (
        <>
          {" "}
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
