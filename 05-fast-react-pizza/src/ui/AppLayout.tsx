import CartOverview from "@/features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import LoaderComp from "./LoaderComp";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <LoaderComp />}

      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
