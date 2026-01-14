import { TodoRequest, TodoResponse } from "@/types/todo";

const BASE_URL = "http://localhost:8080/api/todos";

export const todoApi = {

  getAll: async (): Promise<TodoResponse[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch todos");
    return res.json();
  },


  create: async (data: TodoRequest): Promise<TodoResponse> => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create todo");
    return res.json();
  },


  toggle: async (id: number): Promise<TodoResponse> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT"
    });
    if (!res.ok) throw new Error("Failed to toggle todo");
    return res.json();
  },


  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Failed to delete todo");
  }
};