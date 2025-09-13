"use client";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";
import { useState } from "react";
import { CallToActionSection, FAQSection, NavbarSection, ReviewsSection } from "../page";

export function DocumentationSection() {
  const [activeTab, setActiveTab] = useState("quickstart");

  const tabs = [
    { id: "quickstart", label: "Quick Start" },
    { id: "flow-builder", label: "Flow Builder" },
    { id: "api", label: "API Reference" },
  ];

  const terminalContent = {
    quickstart: `# Create your first knowledge base
1. Open Persona Visual Flow Builder
2. Add Overview node with business context
3. Connect Features and Use Cases nodes
4. Deploy AI agent

# Start building flows
const knowledgeBase = {
  overview: "Customer support knowledge base",
  features: ["Chat interface", "Auto-responses", "Analytics"],
  useCases: ["24/7 support", "FAQ automation", "Escalation handling"]
};

# Deploy your AI agent
await persona.deploy(knowledgeBase);`,
    "flow-builder": `# Visual Flow Builder Guide

## Creating Nodes
- Overview: Define your business context
- Features: List key capabilities
- Use Cases: Specify applications
- Personas: Target user types
- Capabilities: AI agent skills
- Limitations: Known constraints
- Media: Supporting content

## Connecting Flows
graph.connect(overview, features);
graph.connect(features, useCases);
graph.connect(useCases, personas);

## Export Options
- JSON format for data processing
- CSV export for external tools
- Visual diagrams for presentations`,
    api: `# Persona API Reference

## Knowledge Base Management
persona.createKnowledgeBase() - Create new knowledge base
persona.updateKnowledgeBase() - Update existing base
persona.deleteKnowledgeBase() - Remove knowledge base

## AI Agent Operations
persona.deployAgent() - Deploy AI agent from knowledge base
persona.getAgentStatus() - Check agent operational status
persona.stopAgent() - Pause agent operations

## Flow Operations
persona.exportFlow() - Export flow as JSON/CSV
persona.importFlow() - Import existing flow
persona.validateFlow() - Check flow integrity`
  };

  return (
    <section className="w-full py-16 bg-background text-foreground flex justify-center">
      <div className="container px-4 md:px-6 text-center max-w-7xl space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <span className="inline-block rounded-full border border-primary text-primary px-3 py-1 text-sm font-semibold">
            Documentation
          </span>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Documentation</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Build intelligent AI agents with Persona's visual flow builder.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base whitespace-nowrap",
                activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Terminal */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-card rounded-lg p-4 text-left border">
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Terminal</span>
            </div>
            <pre className="text-sm text-primary font-mono whitespace-pre-wrap">
              {terminalContent[activeTab]}
            </pre>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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
                className="text-primary"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quick Start</h3>
            <p className="text-muted-foreground">
              Create your first AI agent in minutes with our visual flow builder.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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
                className="text-primary"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Flow Builder</h3>
            <p className="text-muted-foreground">
              Design intelligent knowledge bases with our intuitive visual interface.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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
                className="text-primary"
              >
                <path d="m7 8 3-3 3 3" />
                <path d="m7 16 3 3 3-3" />
                <path d="M3 12h18" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">API Reference</h3>
            <p className="text-muted-foreground">
              Complete API documentation for building and managing AI agents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DocumentationPage() {
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
        <section className="w-full ">
          <DocumentationSection />
        </section>
        <section className="w-full ">
          <ReviewsSection/>
        </section>
        <section className="w-full ">
          <FAQSection />
        </section>
        <section className="w-full">
          <CallToActionSection />
        </section>
        <Footer/>
      </div>
    </>
  );
}
