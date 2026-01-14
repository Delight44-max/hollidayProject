'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const REDIRECT_TIME_SECONDS = 10;

export default function NotFound() {
  const [countdown, setCountdown] = useState(REDIRECT_TIME_SECONDS);
  const router = useRouter();

  useEffect(() => {

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);


    const redirectTimeout = setTimeout(() => {

      router.push('/');
    }, REDIRECT_TIME_SECONDS * 1000);


    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-[70vh]">
      <h2 className="text-5xl font-extrabold text-red-600 mb-4">404 - Item Finished</h2>


      <p className="text-xl text-gray-700 max-w-lg mb-8">
        The product has finished in store, but we are bringing new products soon!
      </p>


      <p className="text-gray-500 mb-6">
        Redirecting to the category page in {countdown} seconds...
      </p>

      <Link href="/" className="text-blue-600 hover:underline font-medium">
        Click here to go back immediately
      </Link>
    </div>
  );
}