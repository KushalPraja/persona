"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { CallToActionSection, NavbarSection, ReviewsSection, FAQSection } from "../page";
import { useTheme } from "@/components/theme-provider";
import { Slider } from "@/components/ui/slider";
import { Footer } from "@/components/Footer";

export function PricingSection() {
  const [emailType, setEmailType] = useState("transactional");
  // Specific volume values for nodes
  const volumeMarks = [100, 1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000];
  const [emailVolume, setEmailVolume] = useState(volumeMarks[0]);
  const [highlightedIndex, setHighlightedIndex] = useState(0); // State to track highlighted plan index

  const pricingData = {
    transactional: [
      {
        name: "Free",
        price: "$0 / mo",
        volume: volumeMarks[0], // Use volume mark index 0 for Free
        features: [
          { text: "Community Support", included: true },
          { text: "Basic Analytics", included: true },
          { text: "1 Knowledge Base", included: true },
          { text: "100 nodes per flow", included: false },
          { text: "Advanced AI Features", included: false },
          { text: "Priority Support", included: false },
        ],
        cta: "Try Free Demo",
      },
      {
        name: "Pro",
        price: "$20 / mo",
        volume: volumeMarks[1], // Use volume mark index 1 for Pro
        features: [
          { text: "Email Support", included: true },
          { text: "Advanced Analytics", included: true },
          { text: "10 Knowledge Bases", included: true },
          { text: "Unlimited nodes", included: true },
          { text: "Basic AI Features", included: false },
          { text: "Priority Support", included: false },
        ],
        cta: "Get started",
      },
      {
        name: "Scale",
        price: "$90 / mo",
        volume: volumeMarks[2], // Use volume mark index 2 for Scale
        features: [
          { text: "Priority Support", included: true },
          { text: "Real-time Analytics", included: true },
          { text: "Unlimited Knowledge Bases", included: true },
          { text: "Unlimited nodes", included: true },
          { text: "Advanced AI Features", included: true },
          { text: "Custom Integrations", included: true },
        ],
        cta: "Get started",
      },
      {
        name: "Enterprise",
        price: "Custom",
        volume: "A plan based on your specific needs", // Keep custom text for Enterprise
        features: [
          { text: "24/7 Priority Support", included: true },
          { text: "Custom Analytics", included: true },
          { text: "White-label Solution", included: true },
          { text: "Unlimited everything", included: true },
          { text: "Custom AI Models", included: true },
          { text: "Dedicated Account Manager", included: true },
        ],
        cta: "Contact us",
      },
    ],
    marketing: [
      // Add marketing email pricing data here based on the image if available or create placeholders
       {
        name: "Free",
        price: "$0 / mo",
        volume: "X emails / mo", // Placeholder volume
        features: [
          { text: "Feature 1", included: true },
          { text: "Feature 2", included: false },
        ],
        cta: "Get started",
      },
       {
        name: "Pro",
        price: "$Y / mo", // Placeholder price
        volume: "Z emails / mo", // Placeholder volume
        features: [
          { text: "Feature A", included: true },
          { text: "Feature B", included: true },
        ],
        cta: "Get started",
      },
    ]
  };

  const currentPricing = pricingData[emailType];

  // Function to find the closest volume mark to the slider value
  const getClosestVolume = (value) => {
    return volumeMarks.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };

  // Function to update highlighted index based on committed volume
  const updateHighlightedIndex = (committedVolume) => {
    let indexToHighlight = 0; // Default to Free

    if (committedVolume < 100) {
      indexToHighlight = 0; // Free
    } else if (committedVolume < 1000 && committedVolume >= 100) {
      indexToHighlight = 1; // Pro
    } else if (committedVolume < 5000 && committedVolume >= 1000) {
      indexToHighlight = 2; // Scale
    } else if (committedVolume >= 5000) {
      indexToHighlight = 3; // Enterprise
    }

    setHighlightedIndex(indexToHighlight);
  };

  // Function to get the displayed volume based on index and highlighted state
  const getDisplayedVolume = (tier, index) => {
    if (tier.name === "Enterprise") {
      return tier.volume; // Always show custom text for Enterprise
    }
    if (index === highlightedIndex) {
      // Find the volume mark that corresponds to this tier index
      // This assumes a direct mapping between the first few volumeMarks and the first few tiers
      if (index < volumeMarks.length) {
         // Format the volume similar to the labels below the slider
         const volume = volumeMarks[index];
         return `${volume >= 1000 ? `${volume / 1000}K` : volume.toLocaleString()} nodes / mo${volume === volumeMarks[volumeMarks.length - 1] ? "+" : ""}`;
      } else {
        return `${tier.volume} nodes / mo`; // Fallback if index is out of bounds
      }
    } else {
      return `${tier.volume} nodes / mo`; // Default volume for non-highlighted tiers
    }
  };

  return (
    <section className="w-full py-16 bg-background text-foreground flex justify-center">
      <div className="container px-4 md:px-6 text-center max-w-7xl space-y-16">
        {/* Badge */}
        <div className="space-y-4">
          <span className="inline-block rounded-full border border-primary text-primary px-3 py-1 text-sm font-semibold">
            Free Demo Out Now
          </span>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pricing</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Start with our free demo and scale your AI agents as you grow.
          </p>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center  space-x-4">
          <button
            className={cn(
              "px-6 py-2 rounded-full",
              emailType === "transactional" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            )}
            onClick={() => setEmailType("transactional")}
          >
            AI Knowledge Bases
          </button>
          <button
            className={cn(
              "px-6 py-2 rounded-full",
              emailType === "marketing" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            )}
            onClick={() => setEmailType("marketing")}
          >
            Flow Builder Pro
          </button>
        </div>

        {/* Slider */}
        <div className="max-w-2xl mx-auto space-y-4">
          <Slider
            defaultValue={[emailVolume]}
            max={volumeMarks[volumeMarks.length - 1]}
            min={volumeMarks[0]}
            step={1}
            value={[emailVolume]}
            onValueChange={(value) => {
              const newVolume = value[0];
              setEmailVolume(newVolume);
              updateHighlightedIndex(newVolume);
            }}
          />
           <div className="flex justify-between text-sm text-muted-foreground">
             {volumeMarks.map((mark, index) => (
               <span key={index} className="text-xs">
                 {mark >= 1000000 ? `${mark / 1000000}M` : mark.toLocaleString()}{mark === volumeMarks[volumeMarks.length - 1] ? "+" : ""}
               </span>
             ))}
           </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {currentPricing.map((tier, index) => (
            <div key={index} className={cn(
              "flex flex-col rounded-lg bg-card text-card-foreground border p-6 shadow-lg transition-all duration-200",
              index === highlightedIndex ? "border-2 border-primary ring-2 ring-primary" : "border-border"
            )}>
              <h3 className="text-2xl font-bold text-center">{tier.name}</h3>
              <div className="mt-4 text-center">
                <span className="text-4xl font-bold">{tier.price}</span>
                <p className="text-muted-foreground">
                  {getDisplayedVolume(tier, index)}
                </p>
              </div>

              <hr className="mt-4 border-border"/>

              <ul className="mt-4 space-y-2 flex-grow">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    {feature.included ? (
                      <CheckCircle2 className="text-green-500 mr-2 h-5 w-5" />
                    ) : (
                      <XCircle className="text-red-500 mr-2 h-5 w-5" />
                    )}
                    <span className={cn(feature.included ? "" : "text-muted-foreground line-through")}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                 <Button className="w-full" variant={tier.name === "Enterprise" ? "secondary" : "primary"}>
                   {tier.cta}
                 </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Placeholder for FAQ Section


// Placeholder for Testimonials Section
export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Testimonials</h2>
        <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          What our users are saying
        </p>
        {/* Add Testimonials here */}
      </div>
    </section>
  );
}

export default function PricingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <NavbarSection
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="space-y-16">
        <section className="w-full py-16">
          <PricingSection />
        </section>
        <section className="w-full py-16">
          <ReviewsSection/>
        </section>
        <section className="w-full py-16">
          <FAQSection />
        </section>
        <section className="w-full ">
          <CallToActionSection />
        </section>
        <Footer/>
      </div>
    </>
  );
}
