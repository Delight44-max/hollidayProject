// components/ProductImage.tsx
'use client';

import React, { useState } from 'react';

// Path to your local fallback image (used as a last resort)
const DEFAULT_FALLBACK_IMAGE = '/images/placeholder-african.png';

// 💡 NEW RELIABLE PLACEHOLDER: Simple, fast, and clearly labeled
const RELIABLE_PLACEHOLDER_URL = 'https://dummyimage.com/400x300/eeeeee/000000&text=Product+Image';


interface ProductImageProps {
  src: string;
  alt: string;
  className: string;
}

// Function to proactively fix known broken URLs
const sanitizeImageUrl = (url: string): string => {
  // Check if the URL is empty or points to the known-broken 'placeimg.com' host
  if (!url || url.includes('placeimg.com')) {
    // Substitute the simple, reliable dummyimage URL
    return RELIABLE_PLACEHOLDER_URL;
  }
  return url;
};


export default function ProductImage({ src, alt, className }: ProductImageProps) {

  const [hasError, setHasError] = useState(false);

  // 1. Sanitize the URL first (proactive check)
  const sanitizedSrc = sanitizeImageUrl(src);

  // 2. Determine final URL: local fallback if error, otherwise sanitized source
  const imageUrl = hasError ? DEFAULT_FALLBACK_IMAGE : sanitizedSrc;

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}

      // The onError handler captures network failures or 404s
      onError={() => {
        if (!hasError) {
            setHasError(true);
        }
      }}
    />
  );
}