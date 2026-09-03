import CartOverview from "@/features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import LoaderComp from "./LoaderComp";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <LoaderComp />}

      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
