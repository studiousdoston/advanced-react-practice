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
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className={`${inputStyles} grow`}
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className={`${inputStyles} w-full`}
              type="tel"
              name="phone"
              required
            />
            {formErrors?.phone && <p>{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className={`${inputStyles} w-full`}
              name="address"
              required
            />
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
          <Button disabled={isSubmitting} type="primary">
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
