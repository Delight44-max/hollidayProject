import { ExpenseRequest, ExpenseResponse } from "@/types/expense";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const expenseApi = {

  async getAll(): Promise<ExpenseResponse[]> {
    const res = await fetch(`${BASE_URL}`);
    if (!res.ok) throw new Error("Failed to fetch expenses");
    return res.json();
  },


  async create(data: ExpenseRequest): Promise<ExpenseResponse> {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },


  async delete(id: number): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  }
};