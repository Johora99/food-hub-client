"use client";

import React, { useEffect, useState } from "react";
import TitleTwo from "../TitleTwo";

// Fallback image if no meal image
const FALLBACK_IMAGE = "/images/meal-placeholder.png"; // Add a placeholder in your public folder

interface Meal {
  id: string;
  title: string;
  content: string;
  category: string;
  price: number;
  image?: string;
  isFeatured: boolean;
  isAvailable: boolean;
  views: number;
  rating: number;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

export default function AllMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("/api/meals");
        const data = await res.json();
        if (data?.success) setMeals(data.data);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  if (loading) return <p className="text-center py-10">Loading meals...</p>;

  return (
    <section className="py-12 px-6 md:px-12">
      <TitleTwo title="Our Best Selling Products" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="  bg-muted/40
                border border-border
                hover:bg-muted
                transition shadow rounded-xl overflow-hidden hover:shadow-lg  cursor-pointer"
          >
            <img
              src={meal.image || FALLBACK_IMAGE}
              alt={meal.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-200">
                {meal.title}
              </h4>
              <p className="text-orange-500 font-medium mt-2">${meal.price}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {meal.category}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Rating: {meal.rating} ⭐ | Views: {meal.views}
              </p>
              {meal.isFeatured && (
                <span className="inline-block mt-2 px-2 py-1 text-xs text-white bg-orange-500 rounded">
                  Featured
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
