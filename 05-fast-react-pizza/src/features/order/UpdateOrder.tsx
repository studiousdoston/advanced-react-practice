import { pizzaApi } from "@/services/apiRestaurant";
import { Order } from "@/types/types";
import Button from "@/ui/Button";
import { type ActionFunctionArgs, useFetcher } from "react-router-dom";
type Props = {
  order: Order;
};
export default function UpdateOrder({ order }: Props) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }: ActionFunctionArgs) {
  const data = { priority: true };
  await pizzaApi.updateOrder(String(params.orderId), data);
  return null;
}
