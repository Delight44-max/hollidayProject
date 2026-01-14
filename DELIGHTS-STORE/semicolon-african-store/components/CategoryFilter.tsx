'use client'

import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
}

export default function CategoryFilter({ onSelectCategory }: { onSelectCategory: (categoryId: number | null) => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {

    const fetchCategories = async () => {
      const res = await fetch('https://api.escuelajs.co/api/v1/categories');
      const data: Category[] = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number | null) => {

    const newActiveCategory = categoryId === activeCategory ? null : categoryId;
    setActiveCategory(newActiveCategory);

    onSelectCategory(newActiveCategory);
  };

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          activeCategory === null
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Products
      </button>

      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            activeCategory === category.id
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}