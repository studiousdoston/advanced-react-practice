import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import { pizzaApi } from "@/services/apiRestaurant";
import { Cart, inputStyles } from "@/types/types";
import Button from "@/ui/Button";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart: Cart[] = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const formErrors = useActionData() as { phone?: string } | undefined;
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input className={inputStyles} type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input className={inputStyles} type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input className={inputStyles} name="address" required />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

type ActionProps = {
  request: Request;
};
interface FormData {
  address: string;
  cart: string;
  customer: string;
  phone: string;
  priority: boolean;
}
type Order = Omit<FormData, "cart"> & { cart: Cart[] };

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: ActionProps) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as FormData;

  const order: Order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: (data.priority as unknown as string) === "on",
  };
  console.log(order);

  const errors: { phone?: string } = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Invalid phone number entered, please submit your correct phone number";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await pizzaApi.createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
