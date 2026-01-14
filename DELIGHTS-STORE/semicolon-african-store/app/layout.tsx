import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <head>

        <script src="https://js.paystack.co/v1/inline.js" async />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-[80vh]">{children}</main>

        </CartProvider>
      </body>
    </html>
  );
}