// Test ID: IIDSAT
import { pizzaApi } from "@/services/apiRestaurant";
import type { Order } from "@/types/types";
import { calcMinutesLeft, formatCurrency, formatDate } from "@/utils/helpers";
import { useLoaderData } from "react-router-dom";

function Order() {
  const order = useLoaderData() as Order;

  const { status, priority, priorityPrice, orderPrice, estimatedDelivery } =
    order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

type LoaderProp = {
  params: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderProp) {
  const order = await pizzaApi.getOrder(params);
  return order;
}

export default Order;
