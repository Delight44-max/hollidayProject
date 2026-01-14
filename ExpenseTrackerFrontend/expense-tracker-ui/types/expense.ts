export interface ExpenseResponse {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}


export interface ExpenseRequest {
  description: string;
  amount: number;
  category: string;
  date: string;
}