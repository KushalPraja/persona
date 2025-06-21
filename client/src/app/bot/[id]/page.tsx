"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  BarChart3,
  HelpCircle,
  Send,
  Bot,
  User,
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import ForceGraph3D to avoid SSR issues
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

interface Bot {
  id: string;
  history: Message[];
}

export default function BotPage() {
  const { id } = useParams();
  const [bot, setBot] = useState<Bot | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentResponse, setCurrentResponse] = useState<BotResponse | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch bot data on mount
  useEffect(() => {
    async function fetchBot() {
      try {
        const res = await fetch(`http://localhost:5000/api/bot/${id}`);
        if (!res.ok) throw new Error("Bot not found");
        const data = await res.json();
        setBot(data);

        // If there's a last assistant message, try to parse it for tabs
        const lastMessage = data.history?.[data.history.length - 1];
        if (lastMessage?.role === "assistant") {
          try {
            const parsed = JSON.parse(lastMessage.content);
            setCurrentResponse(parsed);
          } catch (e) {
            // If parsing fails, create a simple response object
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

  // Scroll to bottom on new message
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bot?.history]);

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

      // Update bot history
      setBot((prev) => (prev ? { ...prev, history: response.history } : null));

      // Set current response for tabs
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
      product: "#3b82f6",
      feature: "#10b981",
      benefit: "#f59e0b",
      specification: "#8b5cf6",
      default: "#6b7280",
    };
    return colors[group] || colors.default;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Product Assistant
            </h1>
            <p className="text-slate-600">
              AI-powered product support and insights
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Section */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Chat with Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 mb-4 p-4 bg-slate-50 rounded-lg">
                    {bot.history.length === 0 && (
                      <div className="text-center text-slate-500 mt-8">
                        <Bot className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                        <p>Start a conversation with your product assistant</p>
                      </div>
                    )}
                    {bot.history.map((msg, i) => (
                      <div
                        key={i}
                        className={`mb-4 flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex items-start gap-2 max-w-[80%] ${
                            msg.role === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <div
                            className={`p-2 rounded-full ${
                              msg.role === "user"
                                ? "bg-blue-500"
                                : "bg-slate-500"
                            }`}
                          >
                            {msg.role === "user" ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              msg.role === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-slate-900 border"
                            }`}
                          >
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
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </ScrollArea>

                  <form onSubmit={sendMessage} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about the product..."
                      disabled={loading}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={loading || !input.trim()}>
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Insights Panel */}
            <div className="space-y-6">
              {currentResponse && (
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="chat" className="text-xs">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Response
                    </TabsTrigger>
                    <TabsTrigger value="graph" className="text-xs">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Graph
                    </TabsTrigger>
                    <TabsTrigger value="faqs" className="text-xs">
                      <HelpCircle className="h-3 w-3 mr-1" />
                      FAQs
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="chat" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Main Answer</CardTitle>
                        <CardDescription>Immediate user answer</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-700">
                          {currentResponse.response}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="graph" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          3D Force Graph
                        </CardTitle>
                        <CardDescription>
                          Interactive product insights
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        {currentResponse.graph.nodes.length > 0 ? (
                          <div className="h-64 relative">
                            <ForceGraph3D
                              graphData={currentResponse.graph}
                              nodeAutoColorBy="group"
                              nodeColor={(node: any) =>
                                getNodeColor(node.group)
                              }
                              nodeLabel="id"
                              width={300}
                              height={250}
                              backgroundColor="rgba(0,0,0,0)"
                            />
                          </div>
                        ) : (
                          <div className="h-64 flex items-center justify-center text-slate-500">
                            <div className="text-center">
                              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                              <p className="text-sm">No graph data available</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="faqs" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">FAQs</CardTitle>
                        <CardDescription>
                          Quick problem-solving guide
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {currentResponse.faqs.length > 0 ? (
                          currentResponse.faqs.map((faq, index) => (
                            <div key={index} className="space-y-2">
                              <h4 className="text-sm font-medium text-slate-900">
                                {faq.question}
                              </h4>
                              <p className="text-xs text-slate-600 pl-3 border-l-2 border-slate-200">
                                {faq.response}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-slate-500 py-4">
                            <HelpCircle className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                            <p className="text-sm">No FAQs available</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}

              {!currentResponse && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-slate-500">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm">Send a message to see insights</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
