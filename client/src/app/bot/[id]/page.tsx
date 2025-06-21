"use client";
import { useEffect, useState, useRef } from "react";
import type React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  BarChart3,
  HelpCircle,
  Send,
  Bot,
  User,
  Maximize2,
  Minimize2,
  MoreHorizontal,
} from "lucide-react";
import dynamic from "next/dynamic";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface BotResponse {
  response: string;
  graph: {
    nodes: Array<{ id: string; group: string }>;
    links: Array<{ source: string; target: string }>;
  };
  faqs: Array<{ question: string; response: string }>;
}

interface ProductBot {
  id: string;
  history: Message[];
}

export default function BotPage() {
  const { id } = useParams();
  const [bot, setBot] = useState<ProductBot | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentResponse, setCurrentResponse] = useState<BotResponse | null>(
    null
  );
  const [activeView, setActiveView] = useState("chat");
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch bot data on mount
  useEffect(() => {
    async function fetchBot() {
      try {
        const res = await fetch(`http://localhost:5000/api/bot/${id}`);
        if (!res.ok) throw new Error("Bot not found");
        const data = await res.json();
        setBot(data);

        const lastMessage = data.history?.[data.history.length - 1];
        if (lastMessage?.role === "assistant") {
          try {
            const parsed = JSON.parse(lastMessage.content);
            setCurrentResponse(parsed);
          } catch (e) {
            setCurrentResponse({
              response: lastMessage.content,
              graph: { nodes: [], links: [] },
              faqs: [],
            });
          }
        }
      } catch (e: any) {
        setError(e.message);
      }
    }
    fetchBot();
  }, [id]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bot?.history]);

  // Focus input on mount and view change
  useEffect(() => {
    if (activeView === "chat" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeView]);

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/api/bot/${id}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      const response = await res.json();

      setBot((prev) => (prev ? { ...prev, history: response.history } : null));
      setCurrentResponse(response.reply);
      setInput("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const getNodeColor = (group: string) => {
    const colors: Record<string, string> = {
      product: "#000000",
      feature: "#404040",
      benefit: "#606060",
      specification: "#808080",
      default: "#a0a0a0",
    };
    return colors[group] || colors.default;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-mono text-sm">!</span>
          </div>
          <h2 className="text-black font-medium mb-2">Connection Error</h2>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-black rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-black rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navigation */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white border border-gray-200 rounded-full px-2 py-2 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView("chat")}
              className={`rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                activeView === "chat"
                  ? "bg-black text-white hover:bg-black/90"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView("graph")}
              className={`rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                activeView === "graph"
                  ? "bg-black text-white hover:bg-black/90"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Graph
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView("faq")}
              className={`rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                activeView === "faq"
                  ? "bg-black text-white hover:bg-black/90"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </Button>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-full p-2 text-gray-600 hover:text-black hover:bg-gray-50"
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isExpanded ? "pt-20" : "pt-24"
        }`}
      >
        <div
          className={`mx-auto ${
            isExpanded ? "max-w-7xl px-6" : "max-w-4xl px-6"
          }`}
        >
          {/* Chat View */}
          {activeView === "chat" && (
            <div className="space-y-6">
              {/* Header */}
              {bot.history.length === 0 && (
                <div className="text-center py-16">
                  <h1 className="text-4xl font-medium text-black mb-4">
                    What can I help you build?
                  </h1>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Ask me anything about your product. I can provide insights,
                    generate visualizations, and answer questions.
                  </p>
                </div>
              )}

              {/* Messages */}
              <div className="space-y-8 pb-32">
                {bot.history.map((msg, i) => (
                  <div key={i} className="group">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white">
                        {msg.role === "user" ? (
                          <User className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Bot className="w-4 h-4 text-black" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-500 mb-2 font-medium">
                          {msg.role === "user" ? "You" : "Assistant"}
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-900 leading-relaxed">
                            {msg.role === "assistant"
                              ? (() => {
                                  try {
                                    const parsed = JSON.parse(msg.content);
                                    return parsed.response || msg.content;
                                  } catch {
                                    return msg.content;
                                  }
                                })()
                              : msg.content}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-2"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-6">
                <form onSubmit={sendMessage} className="relative">
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Message Assistant..."
                      disabled={loading}
                      className="border-0 bg-transparent px-6 py-4 text-base placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl bg-black hover:bg-black/90 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-200"
                      size="sm"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Graph View */}
          {activeView === "graph" && (
            <div className="py-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-medium text-black mb-2">
                  Force Graph Visualization
                </h2>
                <p className="text-gray-600">
                  Interactive 3D representation of product relationships
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                {currentResponse?.graph.nodes.length > 0 ? (
                  <div className="h-[600px] relative">
                    <ForceGraph3D
                      graphData={currentResponse.graph}
                      nodeAutoColorBy="group"
                      nodeColor={(node: any) => getNodeColor(node.group)}
                      nodeLabel="id"
                      backgroundColor="rgba(255,255,255,1)"
                      width={undefined}
                      height={600}
                      linkColor={() => "#e5e7eb"}
                      nodeRelSize={6}
                    />
                  </div>
                ) : (
                  <div className="h-[600px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-2 border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-black mb-2">
                        No Graph Data
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Start a conversation to generate interactive
                        visualizations
                      </p>
                      <Button
                        onClick={() => setActiveView("chat")}
                        className="bg-black hover:bg-black/90 text-white rounded-full px-6"
                      >
                        Start Chat
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FAQ View */}
          {activeView === "faq" && (
            <div className="py-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-medium text-black mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                  Quick answers to common product questions
                </p>
              </div>

              {currentResponse?.faqs.length > 0 ? (
                <div className="space-y-4 max-w-3xl mx-auto">
                  {currentResponse.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow"
                    >
                      <h3 className="font-medium text-black mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.response}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 border-2 border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-black mb-2">
                    No FAQs Available
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start a conversation to generate relevant FAQs
                  </p>
                  <Button
                    onClick={() => setActiveView("chat")}
                    className="bg-black hover:bg-black/90 text-white rounded-full px-6"
                  >
                    Start Chat
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
