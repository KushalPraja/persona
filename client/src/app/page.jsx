"use client";
import { CodeShowcase } from "@/components/CodeShowcase";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Ripple } from "@/components/magicui/ripple";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/Navbar";
import { useTheme } from "@/components/theme-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Moon,
  Sun,
  GripVertical,
  Shield,
  Zap,
  DollarSign,
  Cloud,
  Users,
  HelpCircle,
  AlertCircle,
  Settings
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";


const capabilities = [
  {
    name: "Natural Language Processing",
    icon: "🧠",
  },
  {
    name: "Machine Learning",
    icon: "🤖",
  },
  {
    name: "Knowledge Graphs",
    icon: "🕸️",
  },
  {
    name: "Workflow Automation",
    icon: "⚡",
  },
  {
    name: "Real-time Analytics",
    icon: "📊",
  },
  {
    name: "Data Intelligence",
    icon: "💡",
  },
  {
    name: "Visual Modeling",
    icon: "🎨",
  },
  {
    name: "API Integration",
    icon: "🔗",
  },
];

const navItems = [
  { name: "Documentation", link: "/documentation" },
  { name: "Pricing", link: "/pricing" },
];

const faqItems = [
  {
    question: "What is Persona?",
    answer:
      "Persona is an AI-powered platform that helps businesses deploy intelligent agents as dynamic knowledge bases. Scale your operations 24/7 with autonomous agents that understand your business data.",
  },
  {
    question: "How do AI agents improve business operations?",
    answer:
      "Persona's AI agents provide instant access to company data, automate workflows, and serve as intelligent knowledge repositories that work continuously to support your business operations.",
  },
  {
    question: "What is the Visual Product Modeling feature?",
    answer:
      "Our interactive flow builder lets you create connected knowledge bases using visual nodes for Overview, Features, Use Cases, Personas, Capabilities, Limitations, and Media components.",
  },
  {
    question: "How do I get started with Persona?",
    answer:
      "You can get started by creating your first knowledge base through our visual flow builder, then deploying AI agents that understand your business data and processes.",
  },
  {
    question: "Is my business data secure with Persona?",
    answer:
      "Yes, Persona employs enterprise-grade security measures to protect your business intelligence and ensure your AI agents operate securely within your data environment.",
  },
  {
    question: "Can I customize the AI agents for my specific business needs?",
    answer:
      "Absolutely. Our flexible component system allows you to add custom fields, configure workflows, and tailor AI agents to match your specific business requirements and industry needs.",
  },
  {
    question: "How does the real-time chat interface work?",
    answer:
      "Our interactive AI-powered chat interface provides instant responses based on your knowledge base, complete with graph visualizations to help you understand data relationships and insights.",
  },
];

const reviews = [
  {
    content:
      "Knowledge management shouldn't be this hard. We're building something that actually understands your business context and grows with you.",
  },
  {
    content:
      "Complex systems should feel simple. That's why we chose visual flows - your business logic should be as clear as a diagram.",
  },
  {
    content:
      "Every manual task is an opportunity for automation. We're not just organizing data - we're reimagining how businesses think.",
  },
  {
    content:
      "Scalability isn't an afterthought. We've seen systems break under growth, so we built Persona to evolve with complexity.",
  },
  {
    content:
      "AI should democratize intelligence, not complicate it. We want every team to have access to the kind of insights that used to require specialists.",
  },
];

function CapabilitiesMarqueeSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-center text-sm text-muted-foreground mb-8">
        Powered by advanced AI capabilities
      </p>
      <div className="w-full">
        <Marquee gradient={false} speed={30} pauseOnHover={true}>
          {capabilities.map((capability, index) => (
            <div key={index} className="mx-12 flex items-center space-x-3">
              <span className="text-2xl">{capability.icon}</span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {capability.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

function CodeShowcaseSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="inline-block rounded-full border border-primary text-primary px-3 py-1 text-sm font-semibold mb-3">
          Platform Integration
        </span>
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Visual Knowledge Modeling
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Build and deploy intelligent AI agents with our intuitive visual interface.
        </p>
      </div>
      <CodeShowcase />
    </div>
  );
}

function MetricsSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="inline-block rounded-full border border-primary text-primary px-3 py-1 text-sm font-semibold mb-3">
          Business Intelligence
        </span>
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Scale Beyond Manual Operations
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Deploy intelligent AI agents as dynamic knowledge bases.
          Automate workflows and provide instant access to business data with 24/7 operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card text-card-foreground rounded-xl border p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-muted/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Knowledge Base</p>
              <h3 className="text-xl font-semibold">
                Active AI Agents
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-3 text-center text-sm text-muted-foreground gap-4">
            <div>
              <p className="font-semibold text-foreground">24</p>
              <p>Active Agents</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">1.2k</p>
              <p>Data Points</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Real-time</p>
              <p>Updates</p>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                RESPONSE TIME
              </p>
              <h3 className="text-4xl font-bold tracking-tight mb-4">
                &lt;2s
              </h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-green-500"></span>
                  <span>
                    Instant Queries{" "}
                    <span className="text-foreground font-semibold">
                      8.5k
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-blue-500"></span>
                  <span>
                    Knowledge Nodes{" "}
                    <span className="text-foreground font-semibold">
                      156
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">
                AUTOMATION
              </p>
              <h3 className="text-4xl font-bold tracking-tight mb-4">
                24/7
              </h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-cyan-400"></span>
                  <span>Active Workflows</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-purple-500"></span>
                  <span>AI Processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Intelligent Knowledge Bases",
      description:
        "Deploy AI agents that serve as dynamic repositories of business intelligence with instant data access.",
      icon: <Shield />,
    },
    {
      title: "24/7 Operations",
      description:
        "Continuous automation and knowledge access with AI agents that work around the clock.",
      icon: <Zap />,
    },
    {
      title: "Visual Flow Builder",
      description:
        "Create connected knowledge bases with our intuitive visual node-based interface.",
      icon: <DollarSign />,
    },
    {
      title: "Real-time Data Access",
      description: "Instant retrieval of company information and insights whenever you need them.",
      icon: <Cloud />,
    },
    {
      title: "Workflow Automation",
      description: "Knowledge-driven process automation that scales with your business operations.",
      icon: <Users />,
    },
    {
      title: "Interactive Chat Interface",
      description:
        "AI-powered chat with graph visualizations for better data understanding and insights.",
      icon: <HelpCircle />,
    },
    {
      title: "Custom Components",
      description:
        "Flexible system with Overview, Features, Use Cases, Personas, Capabilities, and Media nodes.",
      icon: <AlertCircle />,
    },
    {
      title: "CSV Export & Integration",
      description: "Export structured data for external use and seamless integration with existing tools.",
      icon: <Settings />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export function ReviewsSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="inline-block rounded-full border border-primary text-primary px-3 py-1 text-sm font-semibold mb-3">
          Testimonials
        </span>
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          What our users say
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Trusted by the best.
        </p>
      </div>

      <div className="w-full">
        <Marquee gradient={false} speed={30} pauseOnHover={true}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="mx-4 w-[350px] flex-shrink-0 bg-background rounded-xl border p-6"
            >
              <p className="text-muted-foreground italic">{review.content}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="inline-block rounded-full border border-primary text-primary px-3 py-1 text-sm font-semibold mb-3">
          FAQ
        </span>
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Common Questions
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Quick answers to your questions.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl md:text-2xl font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-xl text-muted-foreground">
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function CallToActionSection() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 md:mb-24">
      <div className="max-w-7xl mx-auto">
        <section className="bg-gray-100 text-gray-900 dark:bg-zinc-900 dark:text-gray-100 text-center rounded-2xl py-12 sm:py-16 md:py-20 lg:py-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4">
            AI agents reimagined.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 md:mb-12 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Deploy intelligent knowledge bases today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatsSection() {
  // This handles rendering once the component is mounted (for SSR compatibility)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const stats = [
    {
      value: 95,
      label: "of businesses report improved operational efficiency with AI agent automation",
    },
    {
      value: 75,
      label: "average reduction in response time with intelligent knowledge bases",
    },
    {
      value: 99,
      label: "uptime guarantee for continuous AI agent operations and data access",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background py-24">
      {/* Background ripple effect for the entire section */}
      <div className="absolute inset-0 flex justify-center items-center">
        <Ripple
          mainCircleSize={900}
          mainCircleOpacity={0.22}
          numCircles={15}
          className="opacity-95"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="inline-block px-3 py-1 text-sm font-semibold mb-3 border border-primary text-primary">
            Impact
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-foreground">Measurable business impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Real results from deploying AI-powered knowledge bases and workflow automation.
          </p>
        </div>

        {/* Stats Numbers */}
        <div className="relative mb-12 py-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-8 lg:space-x-16 relative z-10">
            {isMounted &&
              stats.map((stat, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/3 text-center relative"
                >
                  <div className="mb-4 relative">
                    <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground flex justify-center">
                      <NumberTicker
                        value={stat.value}
                        className="tabular-nums"
                      />
                      <span>%</span>
                    </span>
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg mx-auto max-w-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Testimonials - Removed header */}
        <div className="relative">

          <div className="w-full">
            <Marquee gradient={false} speed={30} pauseOnHover={true}>
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="mx-4 w-[350px] flex-shrink-0 bg-background/50 backdrop-blur-sm rounded-xl shadow-lg p-6"
                >
                  <div className="mb-4">
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {review.role}
                    </p>
                  </div>
                  <p className="text-muted-foreground">{review.content}</p>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NavbarSection({ isMobileMenuOpen, setIsMobileMenuOpen, theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Navbar className="top-0 z-50 w-full">
      <NavBody>
        <NavbarLogo>Persona</NavbarLogo>
        <NavItems items={navItems} />
        <div className="flex items-center space-x-2">

          <Link href="/home">
            <NavbarButton variant="primary" className="rounded-full">
              Try Persona
            </NavbarButton>
          </Link>

        </div>
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo>Persona</NavbarLogo>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300 text-center"
            >
              <span className="block">
                {item.name} {">"}
              </span>
            </a>
          ))}
          <div className="flex w-full flex-col items-center gap-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Login
            </NavbarButton>
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Book a call
            </NavbarButton>
            <NavbarButton
              onClick={toggleTheme}
              variant="secondary"
              className="p-2 variant-secondary"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

function HowItWorksSectionComponent() {
  const howItWorksSteps = [
    {
      id: 'how-it-works-step-1',
      number: '01',
      title: 'Build Knowledge Base',
      description:
        'Use our visual flow builder to create comprehensive knowledge bases with interconnected components for your business data and processes.',
      image: '/1.png',
      alt: 'Visual flow builder interface',
      buttonText: 'Try Builder',
    },
    {
      id: 'how-it-works-step-2',
      number: '02',
      title: 'Deploy AI Agents',
      description:
        'Transform your knowledge base into intelligent AI agents that understand your business context and can operate autonomously 24/7.',
      image: '/3.png',
      alt: 'AI agent deployment dashboard',
      buttonText: 'View Agents',
    },
    {
      id: 'how-it-works-step-3',
      number: '03',
      title: 'Automate & Scale',
      description:
        'Your AI agents provide instant responses, automate workflows, and scale your operations without manual intervention.',
      image: '/2.png',
      alt: 'Automation analytics dashboard',
      buttonText: 'See Analytics',
    },
  ];

  return (
    <section className="w-full py-16 bg-background text-foreground mb-16 sm:mb-20 lg:mb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-12">
        <div className="text-center">
          <Badge variant="outline" className="inline-block px-3 py-1 text-sm font-semibold mb-3 border border-primary text-primary">
            How It Works
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-2">
            Deploy AI agents in minutes
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Simple steps to create intelligent knowledge bases
          </p>
        </div>

        <div className="w-full max-w-8xl space-y-8 md:space-y-12">
          {howItWorksSteps.map((step) => (
            <div key={step.id} className="relative flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6 rounded-[1.5rem] border bg-card text-card-foreground shadow-sm">
              <div className="absolute -top-4 left-6 md:-top-4 md:left-8 h-12 w-12 rounded-full bg-background text-green-primary text-lg font-bold border border-gray-secondary/20 flex items-center justify-center">
                {step.number}
              </div>

              <div className="w-full md:w-1/2 text-center md:text-left pt-6 md:pt-4">
                <h3 className="text-xl md:text-2xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground text-base line-clamp-2">{step.description}</p>
                <Button variant="outline" className="mt-2">
                  {step.buttonText}
                </Button>
              </div>

              <div className="w-full md:w-1/2 h-40 md:h-48 rounded-xl overflow-hidden bg-background flex items-center justify-center p-2">
                <img
                  alt={step.alt}
                  className="h-full w-full object-contain rounded-lg"
                  src={step.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSlider() {
  const [inset, setInset] = useState(50);
  const [onMouseDown, setOnMouseDown] = useState(false);

  const onMouseMove = (e) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }

    const percentage = (x / rect.width) * 100;
    setInset(percentage);
  };

  return (
    <section className="w-full py-16 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div>
            <Badge variant="outline" className="inline-block px-3 py-1 text-sm font-semibold mb-3 border border-primary text-primary">
              Comparison
            </Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-4xl tracking-tighter font-bold">
              From Manual to Automated
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground">
              Transform manual business processes into intelligent AI-driven operations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Comparison Slider Column */}
          <div className="w-full h-full">
            <div
              className="relative w-full h-[400px] overflow-hidden rounded-2xl select-none bg-muted/20"
              onMouseMove={onMouseMove}
              onMouseUp={() => setOnMouseDown(false)}
              onTouchMove={onMouseMove}
              onTouchEnd={() => setOnMouseDown(false)}
            >
              <div
                className="bg-primary h-full w-1 absolute z-20 top-0 -ml-1 select-none"
                style={{
                  left: inset + "%",
                }}
              >
                <button
                  className="bg-primary rounded-full hover:scale-110 transition-all w-8 h-8 select-none -translate-y-1/2 absolute top-1/2 -ml-4 z-30 cursor-ew-resize flex justify-center items-center shadow-lg"
                  onTouchStart={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onMouseDown={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onTouchEnd={() => setOnMouseDown(false)}
                  onMouseUp={() => setOnMouseDown(false)}
                >
                  <GripVertical className="h-4 w-4 select-none text-primary-foreground" />
                </button>
              </div>
              <div className="absolute inset-0">
                <img
                  src="/before.png"
                  alt="Manual Knowledge Management"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute left-0 top-0 z-10 w-full h-full select-none border rounded-2xl bg-card overflow-hidden"
                style={{
                  clipPath: "inset(0 0 0 " + inset + "%)",
                }}
              >
                <img
                  src="/after.png"
                  alt="AI-Driven Automation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex justify-between mt-4 text-sm text-muted-foreground">
              <span>Before</span>
              <span>After</span>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="flex flex-col h-full justify-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight">AI Agent Intelligence</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Deploy intelligent AI agents that serve as dynamic knowledge bases, providing instant access to business data and automating complex workflows.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold tracking-tight">Key Capabilities</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg">
                    <div className="mt-0.5">
                      <svg className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-foreground text-sm">24/7 Knowledge Access</span>
                      <p className="text-muted-foreground text-sm mt-0.5">Continuous availability with instant response to business queries</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg">
                    <div className="mt-0.5">
                      <svg className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-foreground text-sm">Visual Flow Builder</span>
                      <p className="text-muted-foreground text-sm mt-0.5">Intuitive node-based interface for creating knowledge architectures</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg">
                    <div className="mt-0.5">
                      <svg className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-foreground text-sm">Real-time Chat Interface</span>
                      <p className="text-muted-foreground text-sm mt-0.5">Interactive AI-powered chat with graph visualizations</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <Button size="sm" className="px-6">Deploy Agent</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarSection
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="flex-grow">
        <div className="w-full">
          <section className="w-full mb-16 sm:mb-20 lg:mb-24">
            <Hero />
            <CapabilitiesMarqueeSection />
          </section>



          <section className="w-full py-16 bg-background text-foreground mb-16 sm:mb-20 lg:mb-24">
            <CodeShowcaseSection />
          </section>


          <section className="w-full">
            <ComparisonSlider />
          </section>


          <section className="w-full py-16 bg-background text-foreground mb-16 sm:mb-20 lg:mb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="outline" className="inline-block px-3 py-1 text-sm font-semibold mb-3 border border-primary text-primary">
                  Features
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight mb-4">
                  Intelligent operations, not manual tasks
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Deploy AI agents that understand your business and automate knowledge workflows.
                </p>
              </div>
            </div>
            <FeaturesSectionWithHoverEffects />
          </section>

          <HowItWorksSectionComponent />
          <StatsSection />

          <section className="w-full py-16 text-foreground mb-16 sm:mb-20 lg:mb-24">
            <FAQSection />
          </section>

          <CallToActionSection />

        </div>
      </main>

      <Footer />
    </div>
  );
}
