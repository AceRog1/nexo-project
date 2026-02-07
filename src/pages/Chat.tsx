import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  BarChart3,
  Lightbulb,
  ChevronRight,
  Loader2
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { chatResponses, salesData } from "@/data/mockData";
import type { ChatMessage } from "@/types/nexo";

const suggestedQuestions = [
  "¿Por qué los tacos vendieron más el viernes?",
  "¿Qué ingredientes tienen stock bajo?",
  "¿Cuál es la predicción de ventas para esta semana?",
  "Muéstrame los top 5 platillos del mes",
  "¿Qué proveedor tiene mejor calificación?",
  "¿Cuánto margen tengo en promedio?",
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "¡Hola! Soy tu copiloto de negocio. Puedo ayudarte a analizar ventas, revisar inventario, ver predicciones y mucho más. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = (query: string): { textAnswer: string; explanationSteps: string[]; showChart?: boolean } => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("viernes") || lowerQuery.includes("venta")) {
      return { ...chatResponses["ventas viernes"], showChart: true };
    }
    if (lowerQuery.includes("stock") || lowerQuery.includes("inventario") || lowerQuery.includes("bajo")) {
      return chatResponses["stock bajo"];
    }
    if (lowerQuery.includes("predicción") || lowerQuery.includes("prediccion") || lowerQuery.includes("semana")) {
      return chatResponses["predicción"];
    }
    
    return chatResponses["default"];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simular delay de respuesta
    await new Promise(resolve => setTimeout(resolve, 1500));

    const response = getAIResponse(input);
    
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.textAnswer,
      timestamp: new Date().toISOString(),
      explanationSteps: response.explanationSteps,
      visualization: response.showChart ? { type: "chart", data: salesData } : undefined,
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-4rem)] lg:h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Chat IA</h1>
              <p className="text-sm text-muted-foreground">Pregunta en lenguaje natural sobre tu negocio</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 lg:p-6" ref={scrollRef}>
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[80%] space-y-3 ${message.role === "user" ? "order-first" : ""}`}>
                  <Card className={`border-0 ${
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-card shadow-card"
                  }`}>
                    <CardContent className="p-4">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </CardContent>
                  </Card>

                  {/* Visualization */}
                  {message.visualization?.type === "chart" && (
                    <Card className="border-0 shadow-card animate-scale-in">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <BarChart3 className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Ventas por día</span>
                        </div>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={message.visualization.data as typeof salesData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                              <XAxis dataKey="date" axisLine={false} tickLine={false} />
                              <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                              <Tooltip 
                                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--card))', 
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }}
                              />
                              <Bar dataKey="ventas" fill="hsl(217, 91%, 50%)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Explanation Steps */}
                  {message.explanationSteps && message.explanationSteps.length > 0 && (
                    <Card className="border-0 bg-primary-light/50 animate-fade-in">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-primary">Razonamiento</span>
                        </div>
                        <ol className="space-y-1">
                          {message.explanationSteps.map((step, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary font-medium">{index + 1}.</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <Card className="border-0 shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Analizando...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="px-4 lg:px-6 pb-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm text-muted-foreground mb-2">Prueba preguntar:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 4).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(question)}
                    className="text-xs"
                  >
                    {question}
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 lg:p-6 border-t bg-card">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button type="submit" variant="hero" disabled={!input.trim() || isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
