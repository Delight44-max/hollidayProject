// types/cart.ts

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string; // The primary image URL
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;

  // Actions
  addItem: (product: { id: number; title: string; price: number; image: string }) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}