"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContainerTextFlip } from "@/components/magicui/textcontainer";
import { ContainerScroll } from "./magicui/container-scroll";
import { Spotlight } from "./magicui/spotlight";
import { cn } from "@/lib/utils";

export function Hero({ className }) {
  return (
    <div className={cn("flex flex-col -mt-20 overflow-hidden relative", className)}>
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="black"
      />
      <ContainerScroll
        titleComponent={
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Scale Your Business with    <ContainerTextFlip
                words={["AI Agents", "Smart Workflows", "Knowledge Bases", "Automation"]}
                interval={2500}
              />
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 mb-16">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/home">
                  Try Flow Builder <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="link" size="lg" className="w-full sm:w-auto" asChild>
                <Link
                  href="https://github.com/KushalPraja/persona"
                  className="text-muted-foreground hover:text-primary flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        }
      >
        <video
          src="/dashboard.mp4"
          loop
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </ContainerScroll>
    </div>
  );
}
