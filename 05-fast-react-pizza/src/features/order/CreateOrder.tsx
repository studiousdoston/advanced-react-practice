import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import { pizzaApi } from "@/services/apiRestaurant";
import { Cart, inputStyles } from "@/types/types";
import Button from "@/ui/Button";
import store, { AppDispatch, RootState } from "@/store";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "@/utils/helpers";
import { fetchAddress } from "../user/userSlice";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state: RootState) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  const totalCartPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const formErrors = useActionData() as { phone?: string } | undefined;
  const isSubmitting = navigation.state === "submitting";

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  function handleAddress(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  if (!cart.length) return <EmptyCart />;
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
            defaultValue={username}
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
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className={`${inputStyles} w-full`}
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={handleAddress}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing order..."
              : `Order now from  ${formatCurrency(totalPrice)}`}
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
    priority: Boolean(formData.get("priority")),
  };
  console.log(order);

  const errors: { phone?: string } = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Invalid phone number entered, please submit your correct phone number";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await pizzaApi.createOrder(order);

  // DO NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
