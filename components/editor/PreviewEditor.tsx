"use client"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  Smartphone, 
  Monitor, 
  RefreshCw, 
  ExternalLink,
  Code,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

interface PreviewPanelProps {
  code: string;
  language: string;
}

export function PreviewPanel({ code, language }: PreviewPanelProps) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Preview refreshed!");
    }, 1000);
  };

  const getPreviewContent = () => {
    if (language === 'html' || language === 'javascript') {
      // For HTML/JS, create a live preview
      return (
        <iframe
          srcDoc={`
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Preview</title>
              <style>
                body {
                  font-family: system-ui, -apple-system, sans-serif;
                  margin: 20px;
                  background: #f5f5f5;
                }
                .container {
                  max-width: 800px;
                  margin: 0 auto;
                  background: white;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
              </style>
            </head>
            <body>
              <div class="container">
                ${language === 'html' ? code : `<div id="root"></div><script>${code}</script>`}
              </div>
            </body>
            </html>
          `}
          className="w-full h-full border-0"
          sandbox="allow-scripts"
        />
      );
    }

    // For other languages, show formatted code
    return (
      <div className="p-6 h-full overflow-auto">
        <div className="bg-muted/20 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Code className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Code Output</span>
            <Badge variant="outline">{language}</Badge>
          </div>
          <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
            {code || "// No code to preview"}
          </pre>
        </div>
      </div>
    );
  };

  const previewSizes = {
    desktop: { width: '100%', height: '100%', icon: Monitor },
    tablet: { width: '768px', height: '1024px', icon: Monitor },
    mobile: { width: '375px', height: '667px', icon: Smartphone },
  };

  return (
    <Card className="h-full glass flex flex-col">
      {/* Preview Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Eye className="w-5 h-5 text-primary" />
          <span className="font-semibold">Preview</span>
          <Badge variant="secondary" className="bg-accent/20 text-accent">
            {language}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Device Size Selector */}
          <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
            {Object.entries(previewSizes).map(([mode, config]) => {
              const Icon = config.icon;
              return (
                <Button
                  key={mode}
                  variant={previewMode === mode ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewMode(mode as any)}
                  className="px-2"
                >
                  <Icon className="w-4 h-4" />
                </Button>
              );
            })}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 bg-background/50">
        <Tabs defaultValue="preview" className="h-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="responsive">
              <Globe className="w-4 h-4 mr-2" />
              Responsive
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="h-[calc(100%-48px)]">
            <div className="h-full flex items-center justify-center">
              <div 
                className="border border-border/50 rounded-lg overflow-hidden bg-white transition-all duration-300 shadow-lg"
                style={{
                  width: previewSizes[previewMode].width,
                  height: previewMode === 'desktop' ? '100%' : previewSizes[previewMode].height,
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              >
                {getPreviewContent()}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="responsive" className="h-[calc(100%-48px)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              {Object.entries(previewSizes).map(([mode, config]) => {
                const Icon = config.icon;
                return (
                  <div key={mode} className="flex flex-col">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium capitalize">{mode}</span>
                      <Badge variant="outline" className="text-xs">
                        {mode === 'desktop' ? '100%' : `${config.width} × ${config.height}`}
                      </Badge>
                    </div>
                    <div className="flex-1 border border-border/50 rounded-lg overflow-hidden bg-white">
                      <div 
                        className="origin-top-left transform scale-50 w-[200%] h-[200%]"
                        style={{ 
                          width: mode === 'desktop' ? '100%' : config.width,
                          height: mode === 'desktop' ? '100%' : config.height
                        }}
                      >
                        {getPreviewContent()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}