"use client";

import React, { useEffect, useState } from "react";
import Title from "../Title";
import Link from "next/link";
import { Spinner } from "../ui/spinner";

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();

        if (data?.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Spinner />;

  return (
    <section className="pb-30">
      <Title
        title="MAIN CATEGORIES WE PROVIDE"
        content="Our food are the best in town, we provide great quality baked food"
      />

      {/* 🔥 Designed Flex Layout */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-8 justify-center mt-10">
        {categories.map((category: string, indx) => (
          <Link
            href={``}
            key={indx + 1}
            className="
              group w-[170px] h-[140px] rounded-2xl 
              bg-background border border-border shadow-md
              flex flex-col items-center justify-center
              transition-all duration-300
              hover:shadow-lg hover:-translate-y-2
              hover:border-primary
            "
          >
            {/* 🔶 Icon Circle */}
            <div
              className="
                w-14 h-14 rounded-full 
                bg-orange-500 opacity-80
                flex items-center justify-center
                text-background text-xl font-bold
                mb-3
                group-hover:scale-110
                transition
              "
            >
              🍽️
            </div>

            {/* 🔤 Title */}
            <p
              className="
                font-semibold text-foreground text-center
                group-hover:text-primary transition
              "
            >
              {category}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
