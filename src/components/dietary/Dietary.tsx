"use client";

import React, { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import Image from "next/image";
import Title from "../Title";



export default function Dietary() {
  const [dietary, setDietary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDietary = async () => {
      try {
        const res = await fetch("/api/dietary");
        const data = await res.json();

        if (data?.success) {
          setDietary(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dietary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDietary();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );

  return (
    <section className="pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <Title title="Dietary Preferences" content="Explore meals tailored to your dietary lifestyle and health needs."/>
        
        </div>

        {/* Grid */}
        <div className="flex flex-wrap gap-8 justify-center ">

          {dietary.map((item, indx) => (
            <div
              key={indx + 1}
              className="
                group w-[170px] relative rounded-2xl border
                bg-card text-card-foreground
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
                cursor-pointer p-6
              "
            >
              {/* Glow Hover Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-primary/10 via-transparent to-primary/10" />
              {/* Title */}
              <h3 className="text-center text-orange-500 opacity-80 font-semibold text-lg">
                {item}
              </h3>

          
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
