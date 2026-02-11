import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg
          className="w-12 h-12 stroke-muted-foreground"
          viewBox="0 0 48 48"
          fill="none"
        >
          <circle cx="24" cy="24" r="20" strokeWidth="1.5" />
          <path d="M24 14v10l7 4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: "Fast Shipping",
      description: "Receive your order anywhere in the world",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 stroke-muted-foreground"
          viewBox="0 0 48 48"
          fill="none"
        >
          <circle cx="24" cy="24" r="20" strokeWidth="1.5" />
          <path
            d="M18 24l4 4 8-8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Return Policy",
      description: "Talk to our experts by chat or e-mail",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 stroke-muted-foreground"
          viewBox="0 0 48 48"
          fill="none"
        >
          <rect x="12" y="16" width="24" height="16" rx="2" strokeWidth="1.5" />
          <path d="M12 22h24" strokeWidth="1.5" />
        </svg>
      ),
      title: "Payment Security",
      description: "Don't worry, all orders are processed securely",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 stroke-muted-foreground"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M14 20l10-6 10 6v12a2 2 0 01-2 2H16a2 2 0 01-2-2V20z"
            strokeWidth="1.5"
          />
        </svg>
      ),
      title: "Free Shipping",
      description: "Collect points and enjoy a host of benefits!",
    },
  ];

  return (
    <div className="w-full py-12 bg-background">
      <div className="container w-11/12 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                flex items-start gap-4
                p-5 rounded-2xl
                bg-muted/40
                border border-border
                hover:bg-muted
                transition
              "
            >
              {/* Icon */}
              <div className="flex-shrink-0">{feature.icon}</div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-semibold text-base text-foreground mb-1">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-b border-border mt-12"></div>
      </div>
    </div>
  );
};

export default FeaturesSection;
