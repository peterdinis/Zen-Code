"use client"

import { useState } from "react";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Code, 
  Brain, 
  Send, 
  Sparkles,
  Settings,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { MonacoEditor } from "./MonacoEditor";
import { PreviewPanel } from "./PreviewEditor";
import { Terminal } from "./Terminal";
import { EditorSidebar } from "./EditorSidebar";
import TemplateSection from "./TemplateSelection";

const models = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI", color: "bg-primary" },
  { id: "claude", name: "Claude", provider: "Anthropic", color: "bg-accent" },
  { id: "gpt-3.5", name: "GPT-3.5 Turbo", provider: "OpenAI", color: "bg-electric-blue" },
  { id: "gemini", name: "Gemini Pro", provider: "Google", color: "bg-neon-pink" },
];

export function EditorLayout() {
  const [activePanel, setActivePanel] = useState("editor");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [code, setCode] = useState(`// Welcome to VibeCoding Editor!
// Choose a template from the sidebar or start coding

function greetUser(name) {
  return \`Hello \${name}, ready to code with AI vibes?\`;
}

const message = greetUser("Developer");
console.log(message);

// Try some React code:
import React from 'react';

function App() {
  return <h1>Hello VibeCoding!</h1>;
}`);
  
  const [language, setLanguage] = useState("javascript");
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Welcome to VibeCoding! I'm here to help you code with AI vibes. What would you like to build today?"
    }
  ]);

  const handleTemplateSelect = (templateCode: string, templateLanguage: string) => {
    setCode(templateCode);
    setLanguage(templateLanguage);
    setActivePanel("editor");
  };

  const handleSendPrompt = () => {
    if (!prompt.trim()) return;
    
    const userMessage = { role: "user", content: prompt };
    setChatHistory(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const aiResponse = {
        role: "assistant", 
        content: `Great question! Here's how I can help you with "${prompt.slice(0, 50)}..."\n\nI can help you improve this code, add new features, or explain how it works.`
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
    
    setPrompt("");
    toast("Sent to " + models.find(m => m.id === selectedModel)?.name);
  };

  const renderMainContent = () => {
    switch (activePanel) {
      case "editor":
        return <MonacoEditor value={code} onChange={setCode} language={language} />;
      case "templates":
        return <TemplateSection onTemplateSelect={handleTemplateSelect} />;
      case "preview":
        return <PreviewPanel code={code} language={language} />;
      case "terminal":
        return <Terminal />;
      case "packages":
        return <Terminal />;
      default:
        return <MonacoEditor value={code} onChange={setCode} language={language} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
        
        <div className="flex flex-col w-full relative z-10">
          {/* Header */}
          <header className="border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="hover:bg-muted/50" />
                  <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <Code className="w-6 h-6 text-primary" />
                    <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      VibeCoding
                    </span>
                  </Link>
                  <Separator orientation="vertical" className="h-6" />
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Editor
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-48 glass border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      {models.map(model => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${model.color}`} />
                            <span>{model.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {model.provider}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-1">
            {/* Sidebar */}
            <EditorSidebar 
              activePanel={activePanel} 
              onPanelChange={setActivePanel}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex">
              {/* Code/Content Panel */}
              <div className="flex-1 p-6">
                {renderMainContent()}
              </div>

              {/* AI Chat Panel */}
              <div className="w-96 p-6 border-l border-border">
                <Card className="h-full glass flex flex-col">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-accent" />
                      <span className="font-semibold">AI Assistant</span>
                      <Badge className="bg-accent/20 text-accent">
                        {models.find(m => m.id === selectedModel)?.name}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {chatHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex space-x-2">
                      <Input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask AI for help..."
                        className="glass"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendPrompt()}
                      />
                      <Button 
                        size="icon" 
                        onClick={handleSendPrompt}
                        className="shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons */}
          <div className="fixed bottom-6 right-6 space-y-3 z-50">
            <Button size="icon" className="animate-float shadow-lg">
              <Settings className="w-5 h-5" />
            </Button>
            <Button size="icon" className="animate-float shadow-lg" style={{ animationDelay: "1s" }}>
              <Zap className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}