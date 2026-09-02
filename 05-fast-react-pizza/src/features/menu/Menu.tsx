import { pizzaApi } from "@/services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";
import { Pizza } from "@/types/cart.types";

function Menu() {
  const menu = useLoaderData() as Pizza[];
  console.log(menu);
  return (
    <ul>
      {menu.map((pizza: Pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = await pizzaApi.getMenu();
  return menu;
}

export default Menu;
