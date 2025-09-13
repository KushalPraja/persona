import React, { useState } from 'react';
import { Terminal, TypingAnimation } from "@/components/magicui/terminal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const codeSnippets = {
  'Flow Definition': `// Product Flow Configuration
export const productFlow = {
  nodes: [
    {
      id: "overview",
      type: "overviewNode",
      position: { x: 100, y: 100 },
      data: {
        productData: {
          name: "AI Knowledge Agent",
          description: "Intelligent business automation",
          extraText: "Deploy 24/7 knowledge bases"
        }
      }
    },
  ],
};`,
  'Node.js Integration': `import { PersonaFlow } from '@persona/flow-builder';

const client = new PersonaFlow({
  apiKey: process.env.PERSONA_API_KEY
});

// Response
{
  "url": "https://chat.persona.ai/agent/abc123",
  "status": "deployed",
  "capabilities": ["instant_queries", "workflow_automation"]
}`
};

// Updated logos for flow builder context
const languageLogos = {
  'Flow Definition': '/logos/workflow.svg',
  'Node.js Integration': '/logos/nodejs-icon.svg',
  'CSV Export': '/logos/database.svg'
};

export function CodeShowcase() {
  const [activeTab, setActiveTab] = useState('Flow Definition');
  const currentCode = codeSnippets[activeTab];

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {Object.keys(codeSnippets).map(lang => (
          <button
            key={lang}
            className={`flex items-center justify-center px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
              activeTab === lang
                ? 'border-primary bg-primary/10 shadow-md scale-105'
                : 'border-transparent opacity-70 hover:opacity-100 hover:bg-muted/50'
            } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
            onClick={() => setActiveTab(lang)}
            aria-label={`Show code for ${lang}`}
          >
            <span className="text-sm font-medium">{lang}</span>
          </button>
        ))}
      </div>

      <Terminal className="max-w-7xl h-[400px] sm:w-full">
        <TypingAnimation duration={50}>
          {currentCode}
        </TypingAnimation>
      </Terminal>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button variant="outline" asChild>
          <a
            href="https://github.com/KushalPraja/persona"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </Button>
        <Button asChild>
          <Link href="/home" className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Try Flow Builder
          </Link>
        </Button>
      </div>
    </div>
  );
}
