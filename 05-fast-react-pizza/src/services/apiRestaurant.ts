import { MenuItem, Order, NewOrder } from "@/types/types";

export class PizzaApiService {
  private baseUrl: string;

  constructor(baseUrl = "https://react-fast-pizza-api.jonas.io/api") {
    this.baseUrl = baseUrl;
  }

  async getMenu(): Promise<MenuItem[]> {
    const res = await fetch(`${this.baseUrl}/menu`);
    if (!res.ok) throw Error("Failed getting menu");
    const { data } = await res.json();
    return data;
  }

  async getOrder(id: string): Promise<Order> {
    const res = await fetch(`${this.baseUrl}/order/${id}`);
    if (!res.ok) throw Error(`Couldn't find order #${id}`);
    const { data } = await res.json();
    return data;
  }

  async createOrder(newOrder: NewOrder): Promise<Order> {
    try {
      const res = await fetch(`${this.baseUrl}/order`, {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw Error();
      const { data } = await res.json();
      return data;
    } catch {
      throw Error("Failed creating your order");
    }
  }

  async updateOrder(id: string, updateObj: Partial<Order>): Promise<void> {
    try {
      const res = await fetch(`${this.baseUrl}/order/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updateObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw Error();
      // We don't need the data, so we don't return anything
    } catch (err) {
      throw Error("Failed updating your order");
    }
  }
}

export const pizzaApi = new PizzaApiService();
