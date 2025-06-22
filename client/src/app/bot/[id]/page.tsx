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
import Image from "next/image";
import dynamic from "next/dynamic";
import QRCodeSVG from "@/components/qr-code";
import ModernFAQSection from "@/components/modern-faq-section";
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface GraphNode {
  id: string;
  group: string;
  category: string;
  description: string;
  insights: string[];
  color: string;
}

interface GraphLink {
  source: string;
  target: string;
  relationship: string;
}

interface BotResponse {
  response: string;
  graph: {
    nodes: GraphNode[];
    links: GraphLink[];
  };
  faqs: Array<{ question: string; response: string }>;
}

interface ProductBot {
  id: string;
  history: Message[];
  graph: {
    nodes: GraphNode[];
    links: GraphLink[];
  };
  faqs: Array<{ question: string; response: string }>;
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
  const [showQR, setShowQR] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  console.log(backendUrl);
  useEffect(() => {
    async function fetchBot() {
      try {
        const res = await fetch(`${backendUrl}/api/bot/${id}`, {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });
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
        } else {
          setCurrentResponse({
            response: "Welcome! Explore the graph and FAQ tabs.",
            graph: data.graph,
            faqs: data.faqs,
          });
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
      const res = await fetch(`${backendUrl}/api/bot/${id}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" , 
          "ngrok-skip-browser-warning": "69420"
        },
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

  // Helper to download QR code as SVG
  const downloadQR = () => {
    const svg = document.getElementById("bot-qr-svg");
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bot-qr.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
      {/* Responsive Floating Navigation */}
      <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-full sm:w-auto sm:px-0">
        <div className="bg-white border border-gray-200 rounded-full px-2 py-2 shadow-lg backdrop-blur-sm max-w-full overflow-hidden">
          <div className="flex items-center gap-1 justify-center">
            {/* Chat Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView("chat")}
              className={`rounded-full px-2 sm:px-4 py-2 text-xs sm:text-sm transition-all duration-200 ${
                activeView === "chat"
                  ? "bg-black text-white hover:bg-black/90"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
            >
              <MessageCircle className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Chat</span>
            </Button>

            {/* Graph Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView("graph")}
              className={`rounded-full px-2 sm:px-4 py-2 text-xs sm:text-sm transition-all duration-200 ${
                activeView === "graph"
                  ? "bg-black text-white hover:bg-black/90"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
            >
              <BarChart3 className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Graph</span>
            </Button>

            {/* FAQ Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveView("faq")}
              className={`rounded-full px-2 sm:px-4 py-2 text-xs sm:text-sm transition-all duration-200 ${
                activeView === "faq"
                  ? "bg-black text-white hover:bg-black/90"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
            >
              <HelpCircle className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">FAQ</span>
            </Button>

            {/* Divider - hidden on mobile */}
            <div className="hidden sm:block w-px h-6 bg-gray-200 mx-2" />

            {/* Expand/Minimize Button */}
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

            {/* QR Code Button - hidden on mobile, shown as icon only on tablet */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQR(true)}
              className="hidden sm:flex rounded-full px-2 lg:px-4 py-2 text-xs lg:text-sm transition-all duration-200 text-gray-600 hover:text-black hover:bg-gray-50"
            >
              <span className="lg:hidden">📱</span>
              <span className="hidden lg:inline">QR Code</span>
            </Button>
          </div>
        </div>
      </div>

      {/* QR Code Dialog */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-black"
              onClick={() => setShowQR(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-medium mb-4">Scan to open this page</h2>
            <div className="flex justify-center mb-4">
              <QRCodeSVG
                id="bot-qr-svg"
                value={
                  typeof window !== "undefined" ? window.location.href : ""
                }
                size={200}
                bgColor="#fff"
                fgColor="#000"
                level="M"
                includeMargin={true}
              />
            </div>
            <Button
              onClick={downloadQR}
              className="bg-black text-white rounded-full px-6"
            >
              Download QR
            </Button>
          </div>
        </div>
      )}

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
                    What can I help you with?
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
                {/* Powered by Persona */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xs text-gray-500">Powered by</span>
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/logo.svg"
                      alt="Persona"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    <span className="text-xs font-medium text-gray-700">
                      Persona
                    </span>
                  </div>
                </div>

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
                  Interactive 3D representation of features and insights
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm relative">
                {bot && bot.graph && bot.graph.nodes.length > 0 ? (
                  <>
                    <div className="h-[600px] relative flex items-center justify-center">
                      <ForceGraph3D
                        graphData={bot.graph}
                        nodeColor={(node: any) => node.color || "#888"}
                        nodeLabel={(node: any) => `${node.id} (${node.group})`}
                        backgroundColor="rgba(255,255,255,1)"
                        height={600}
                        linkColor={() => "#000000"}
                        nodeRelSize={6}
                        onNodeClick={(node: any) => setSelectedNode(node)}
                      />
                    </div>
                    {selectedNode && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                        <div className="relative max-w-md w-full animate-in fade-in-0 zoom-in-95 duration-300">
                          {/* Floating Card */}
                          <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                            {/* Header with gradient */}
                            <div className="relative p-6 pb-4 bg-gradient-to-br from-gray-50 to-white">
                              <button
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-gray-600 transition-all duration-200 shadow-sm"
                                onClick={() => setSelectedNode(null)}
                                aria-label="Close"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>

                              {/* Node Icon */}
                              <div className="flex items-center gap-4 mb-4">
                                <div
                                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                                  style={{
                                    backgroundColor:
                                      selectedNode.color || "#888",
                                  }}
                                >
                                  <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                    {selectedNode.id}
                                  </h3>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Node Details
                                  </p>
                                </div>
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                                  {selectedNode.group}
                                </span>
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                                  {selectedNode.category}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 pt-4 space-y-5">
                              {/* Description */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                  <svg
                                    className="w-4 h-4 mr-2 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                  Description
                                </h4>
                                <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-xl p-3 border border-gray-100">
                                  {selectedNode.description}
                                </p>
                              </div>

                              {/* Insights */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                  <svg
                                    className="w-4 h-4 mr-2 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                  </svg>
                                  Key Insights
                                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    {selectedNode.insights.length}
                                  </span>
                                </h4>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                  {selectedNode.insights.map((insight, i) => (
                                    <div
                                      key={i}
                                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-sm transition-all duration-200"
                                    >
                                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-sm text-gray-700 leading-relaxed">
                                        {insight}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 pb-6">
                              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  Click anywhere to close
                                </div>
                                <button
                                  onClick={() => setSelectedNode(null)}
                                  className="px-4 py-2 bg-black text-white text-xs font-medium rounded-full hover:bg-gray-800 transition-colors duration-200"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Decorative elements */}
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
                          <div
                            className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-pulse"
                            style={{ animationDelay: "1s" }}
                          ></div>
                        </div>

                        {/* Click outside to close */}
                        <div
                          className="absolute inset-0 -z-10"
                          onClick={() => setSelectedNode(null)}
                        ></div>
                      </div>
                    )}
                  </>
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

          {/* FAQ View - Now using the modern component */}
          {activeView === "faq" && (
            <ModernFAQSection
              faqs={bot?.faqs || []}
              setActiveView={setActiveView}
            />
          )}
        </div>
      </div>
    </div>
  );
}
