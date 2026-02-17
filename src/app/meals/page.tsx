"use client";

import React, { useEffect, useState } from "react";

import { Meal } from "@/type/meal.type";
import { Spinner } from "@/components/ui/spinner";
import TitleTwo from "@/components/TitleTwo";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";



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

  if (loading) return <Spinner />;

  return (
    <section className="py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="group bg-background border border-border rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300"
          >
            <div className="relative">
              {meal.quantity === 0 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
                  Stock Out
                </span>
              )}
              {meal.isFeatured && (
                <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full z-10">
                  Featured
                </span>
              )}
              <span className="absolute bottom-3 left-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full z-10">
                ${meal.price}
              </span>
              <img
                src={FALLBACK_IMAGE}
                alt={meal.title}
                className={`w-full h-48 object-cover transition duration-300 group-hover:scale-105 ${
                  meal.quantity === 0 ? "opacity-60 grayscale" : ""
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p>{meal.title}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  ⭐ {meal.rating}
                </span>
                <span className="flex items-center gap-1">
                  👁 {meal.views}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Quantity
                </span>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    meal.quantity === 0
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {meal.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
