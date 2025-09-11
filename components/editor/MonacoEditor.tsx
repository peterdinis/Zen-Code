"use client";

import { useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Copy, Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: string;
}

const languageTemplates: { [key: string]: string } = {
  javascript: `// JavaScript starter code
console.log("Hello JavaScript!");`,
  typescript: `// TypeScript starter code
const greet = (name: string) => \`Hello, \${name}!\`;
console.log(greet("TypeScript"));`,
  python: `# Python starter code
def greet(name):
    return f"Hello, {name}!"

print(greet("Python"))`,
  java: `// Java starter code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}`,
  cpp: `// C++ starter code
#include <iostream>
int main() {
    std::cout << "Hello C++!" << std::endl;
    return 0;
}`,
  html: `<!-- HTML starter code -->
<!DOCTYPE html>
<html>
<body>
    <h1>Hello HTML!</h1>
</body>
</html>`,
  css: `/* CSS starter code */
body {
    background-color: #f0f0f0;
    color: #333;
}`,
  json: `{
  "message": "Hello JSON"
}`,
};

export function MonacoEditor({ value, onChange, language = "javascript", theme = "vs-dark" }: MonacoEditorProps) {
  const editorRef = useRef<any>(null);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    monaco.editor.defineTheme("vibeCoding", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955", fontStyle: "italic" },
        { token: "keyword", foreground: "C586C0" },
        { token: "string", foreground: "CE9178" },
        { token: "number", foreground: "B5CEA8" },
        { token: "function", foreground: "DCDCAA" },
        { token: "variable", foreground: "9CDCFE" },
      ],
      colors: {
        "editor.background": "#0F0F0F",
        "editor.foreground": "#FFFFFF",
        "editorLineNumber.foreground": "#6A5ACD",
        "editorCursor.foreground": "#00FFFF",
        "editor.selectionBackground": "#6A5ACD40",
        "editor.lineHighlightBackground": "#1A1A1A",
      },
    });

    monaco.editor.setTheme("vibeCoding");
  };

  const handleRunCode = () => toast.success("Code executed! ⚡");
  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(value);
    toast.success("Code copied to clipboard!");
  };
  const handleDownload = () => {
    const blob = new Blob([value], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `code.${currentLanguage}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("File downloaded!");
  };
  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.trigger("source", "editor.action.formatDocument");
      toast.success("Code formatted!");
    }
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    onChange(languageTemplates[lang] || "");
  };

  return (
    <Card className="h-full glass border-primary/20 flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
          </div>

          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(languageTemplates).map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Badge variant="secondary" className="bg-primary/20 text-primary">
            {currentLanguage}
          </Badge>
        </div>

        <div className="flex items-center space-x-2 flex-wrap">
          <Button variant="ghost" size="sm" onClick={handleCopyCode}><Copy className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm" onClick={handleFormat}><RotateCcw className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm" onClick={handleDownload}><Download className="w-4 h-4" /></Button>
          <Button size="sm" onClick={handleRunCode}><Play className="w-4 h-4 mr-1" />Run</Button>
        </div>
      </div>

      <div className="flex-1">
        <Editor
          value={value}
          language={currentLanguage}
          theme="vibeCoding"
          onChange={(newValue) => onChange(newValue || "")}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>
    </Card>
  );
}
