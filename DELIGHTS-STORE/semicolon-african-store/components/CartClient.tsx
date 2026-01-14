// components/CartClient.tsx
'use client';

import { useCart } from '@/context/CartContext';
import ProductImage from './ProductImage';
import Link from 'next/link';


// Helper function (REQUIRED for rendering prices)
const formatCurrency = (amount: number) =>
    `$${amount.toFixed(2)}`;


// **NOTE: Paystack function has been removed from this version.**


export default function CartClient() {
  const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCart();


  const handleCheckout = () => {
    // This is the placeholder functionality for the button
    if (items.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Proceeding to Checkout is not yet implemented in this version.");
  };


  // Display if the cart is empty
  if (items.length === 0) {
    return (
      <div className="p-12 text-center h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Start exploring our beautiful African products!</p>
        <Link href="/" className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition">
          Go to Products
        </Link>
      </div>
    );
  }


  // Main Cart View
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8">Shopping Cart</h1>

      <div className="md:grid md:grid-cols-3 md:gap-12">

        {/* === Cart Items List (Column 1 & 2) === */}
        <div className="md:col-span-2 space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex items-center border-b pb-4">

              {/* Product Image */}
              <div className="w-24 h-24 flex-shrink-0 mr-4">
                <ProductImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>


              <div className="flex-grow">
                <Link href={`/product/${item.id}`} className="text-lg font-semibold hover:text-blue-600 transition">
                  {item.title}
                </Link>
                <p className="text-gray-600">{formatCurrency(item.price)}</p>
                <p className="text-sm font-medium text-gray-500">
                    Total: {formatCurrency(item.price * item.quantity)}
                </p>
              </div>


              <div className="flex items-center space-x-2 mr-4">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 w-8 h-8 rounded-full text-lg hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="w-8 text-center text-lg">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 w-8 h-8 rounded-full text-lg hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>


              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition"
              >
                Remove
              </button>
            </div>
          ))}


          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-black text-sm font-medium transition mt-4"
          >
            Clear Cart
          </button>

        </div>


        <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md h-fit mt-8 md:mt-0">
          <h2 className="2xl font-bold mb-4 border-b pb-2">Order Summary</h2>

          <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-gray-300">
            <span>Order Total:</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-150"
          >
            Proceed to Checkout
          </button>

        </div>
      </div>
    </div>
  );
}