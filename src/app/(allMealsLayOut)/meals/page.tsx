"use client";

import React, { useEffect, useState } from "react";
import { Meal } from "@/type/meal.type";
import { Spinner } from "@/components/ui/spinner";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";

export default function AllMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [cuisine, setCuisine] = useState("all");
  const [dietary, setDietary] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [bestSelling, setBestSelling] = useState(false);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [dietaries, setDietaries] = useState<string[]>([]);


  const fetchMeals = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (cuisine !== "all") params.append("search", cuisine);
      if (dietary !== "all") params.append("dietary", dietary);
      params.append("minPrice", String(minPrice));
      params.append("maxPrice", String(maxPrice));
      params.append("bestSelling", String(bestSelling));

      console.log("Params:", params.toString());

      const res = await fetch(
        `http://localhost:5000/api/meals?${params.toString()}`
      );

      const data = await res.json();

      if (data?.success) {
        setMeals(data.data);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [cuisine, dietary, minPrice, maxPrice, bestSelling]);

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => data?.success && setCuisines(data.data));

    fetch("/api/dietary")
      .then((res) => res.json())
      .then((data) => data?.success && setDietaries(data.data));
  }, []);

  if (loading) return <Spinner />;

  return (
    <section className="py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto mb-10 grid gap-4 md:grid-cols-5">
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="px-4 py-2 rounded-xl border bg-background text-foreground"
        >
          <option value="all">All Cuisines</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={dietary}
          onChange={(e) => setDietary(e.target.value)}
          className="px-4 py-2 rounded-xl border bg-background text-foreground"
        >
          <option value="all">All Dietary</option>
          {dietaries.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
<div className="flex flex-col justify-center">
  <label className="text-sm text-muted-foreground mb-1">
    Min Price: ${minPrice}
  </label>
  <input
    type="range"
    min={0}
    max={maxPrice} 
    value={minPrice}
    onChange={(e) => {
      const value = Number(e.target.value);
      if (value <= maxPrice) setMinPrice(value);
    }}
    className="accent-primary cursor-pointer"
  />
</div>
<div className="flex flex-col justify-center">
  <label className="text-sm text-muted-foreground mb-1">
    Max Price: ${maxPrice}
  </label>
  <input
    type="range"
    min={minPrice} 
    max={5000}
    value={maxPrice}
    onChange={(e) => {
      const value = Number(e.target.value);
      if (value >= minPrice) setMaxPrice(value);
    }}
    className="accent-primary cursor-pointer"
  />
</div>


        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={bestSelling}
            onChange={(e) => setBestSelling(e.target.checked)}
            className="accent-primary"
          />
          Best Selling
        </label>
      </div>

      <div className="container w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.length === 0 ? (
          <p className="text-center col-span-full">No meals found.</p>
        ) : (
          meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-background border border-border rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <img
                src={FALLBACK_IMAGE}
                alt={meal.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <p className="font-semibold">{meal.title}</p>
                <p className="text-xs text-muted-foreground">
                  {meal.category} • {meal.dietary}
                </p>
                <p className="text-sm font-medium">${meal.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
