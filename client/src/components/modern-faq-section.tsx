"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  MessageCircle,
  ChevronRight,
  Sparkles,
  Zap,
  Target,
  Lightbulb,
} from "lucide-react";

interface FAQ {
  question: string;
  response: string;
}

interface ModernFAQSectionProps {
  faqs: FAQ[];
  setActiveView: (view: string) => void;
}

export default function ModernFAQSection({
  faqs,
  setActiveView,
}: ModernFAQSectionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const getIconForIndex = (index: number) => {
    const icons = [Lightbulb, Target, Zap, Sparkles];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="py-12 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-4 py-2 rounded-full mb-6 border border-indigo-100">
          <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            SMART FAQS
          </span>
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        </div>

        <h2 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Got Questions?
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            We've Got Answers
          </span>
        </h2>
      </div>

      {faqs.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {faqs.map((faq, index) => {
              const isExpanded = expandedItems.has(index);
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out ${
                    isExpanded
                      ? "border-indigo-200 shadow-lg shadow-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20"
                      : "border-gray-200 bg-white hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/30"
                  }`}
                >
                  {/* Animated background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-500 ${
                      isExpanded ? "opacity-100" : "group-hover:opacity-50"
                    }`}
                  />

                  {/* Question Header */}
                  <button
                    onClick={() => toggleItem(index)}
                    className="relative w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isExpanded
                            ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg"
                            : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:from-indigo-100 group-hover:to-purple-100 group-hover:text-indigo-600"
                        }`}
                      >
                        {getIconForIndex(index)}
                      </div>

                      {/* Question Text */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold text-lg leading-tight transition-colors duration-300 ${
                            isExpanded
                              ? "text-gray-900"
                              : "text-gray-800 group-hover:text-indigo-700"
                          }`}
                        >
                          {faq.question}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <div
                            className={`text-xs font-medium px-2 py-1 rounded-full transition-all duration-300 ${
                              isExpanded
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-gray-100 text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                            }`}
                          >
                            FAQ #{index + 1}
                          </div>
                          <div
                            className={`text-xs transition-colors duration-300 ${
                              isExpanded ? "text-indigo-600" : "text-gray-500"
                            }`}
                          >
                            {isExpanded
                              ? "Click to collapse"
                              : "Click to expand"}
                          </div>
                        </div>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isExpanded
                            ? "bg-indigo-100 text-indigo-600 rotate-90"
                            : "bg-gray-100 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Answer Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="ml-14 pt-2">
                        <div className="relative">
                          {/* Decorative line */}
                          <div className="absolute -left-6 top-0 w-0.5 h-full bg-gradient-to-b from-indigo-200 to-purple-200 rounded-full" />

                          <div className="bg-gradient-to-br from-white to-indigo-50/50 rounded-xl p-6 border border-indigo-100/50 shadow-sm">
                            <p className="text-gray-700 leading-relaxed text-base">
                              {faq.response}
                            </p>

                            {/* Action buttons */}
                            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-indigo-100">
                              <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                                Was this helpful?
                              </button>
                              <div className="flex gap-1">
                                <button className="w-6 h-6 rounded-full bg-green-100 hover:bg-green-200 text-green-600 text-xs transition-colors">
                                  ✓
                                </button>
                                <button className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 text-red-600 text-xs transition-colors">
                                  ✗
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-6">
              <MessageCircle className="w-4 h-4" />
              <span>Still need help? Our AI assistant is here for you</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setActiveView("chat")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask Our AI Assistant
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-700 rounded-full px-8 py-3 font-medium transition-all duration-300 hover:bg-indigo-50"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 animate-pulse" />
              <HelpCircle className="w-16 h-16 text-indigo-500 relative z-10" />

              {/* Floating icons */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <h3 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              No FAQs Generated Yet
            </span>
          </h3>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
            Start a conversation with our AI to automatically generate
            personalized FAQs based on your specific questions and needs
          </p>

          <div className="space-y-6">
            <Button
              onClick={() => setActiveView("chat")}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-full px-10 py-4 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Start Your First Conversation
            </Button>

            {/* Feature highlights */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 mt-12">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-medium">AI-Powered Responses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Instant Answers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Always Learning</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
