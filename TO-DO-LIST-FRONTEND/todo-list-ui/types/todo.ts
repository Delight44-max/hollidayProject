export interface TodoResponse {
  id: number;
  text: string;
  completed: boolean;
  createdAt?: string;
}

export interface TodoRequest {
  text: string;
}