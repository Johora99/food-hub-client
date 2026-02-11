"use client";

interface TitleType {
  title: string;
  content: string;
}

export default function Title({ title, content }: TitleType) {
  return (
    <section className="py-16 text-center">
      {/* Heading */}
      <h2
        className="
          text-sm md:text-base 
          font-semibold 
          tracking-widest 
          uppercase 
          mb-3
          text-foreground
        "
      >
        {title}
      </h2>

      {/* Accent line */}
      <div className="flex justify-center items-center gap-2 mb-6">
        <div className="w-16 h-[1px] bg-border"></div>

        <div className="w-8 h-[2px] bg-orange-500 rounded-full"></div>

        <div className="w-16 h-[1px] bg-border"></div>
      </div>

      {/* Subtitle */}
      <p
        className="
          text-sm md:text-base 
          max-w-md mx-auto
          text-muted-foreground
        "
      >
        {content}
      </p>
    </section>
  );
}
