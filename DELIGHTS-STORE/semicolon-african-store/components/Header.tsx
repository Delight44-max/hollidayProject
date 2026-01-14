import Link from 'next/link';
import CartIcon from './CartIcon';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

        <Link href="/" className="text-2xl font-extrabold text-gray-900 hover:text-gray-700 transition">
          Semicolon Store
        </Link>


        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-black font-medium transition">
            Products
          </Link>

          <CartIcon />
        </nav>
      </div>
    </header>
  );
}