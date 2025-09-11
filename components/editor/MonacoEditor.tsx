"use client";

import { useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Copy,
  Download,
  RotateCcw,
  Undo2,
  Redo2,
  Search,
  WrapText,
} from "lucide-react";
import { toast } from "sonner";

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  theme?: string;
}

const supportedLanguages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "html",
  "css",
  "json",
  "markdown",
  "sql",
  "php",
  "go",
  "rust",
];

// 🔹 Default template codes per language
const defaultSnippets: Record<string, string> = {
  javascript: `// JavaScript Example
console.log("Hello, World!");`,

  typescript: `// TypeScript Example
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));`,

  python: `# Python Example
print("Hello, World!")`,

  java: `// Java Example
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,

  cpp: `// C++ Example
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}`,

  html: `<!-- HTML Example -->
<!DOCTYPE html>
<html>
  <head><title>Hello</title></head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>`,

  css: `/* CSS Example */
body {
  font-family: sans-serif;
  background: #111;
  color: white;
}`,

  json: `{
  "message": "Hello, World!",
  "success": true
}`,

  markdown: `# Hello World
This is **Markdown** example.`,

  sql: `-- SQL Example
SELECT 'Hello, World!' AS greeting;`,

  php: `<?php
echo "Hello, World!";
?>`,

  go: `// Go Example
package main
import "fmt"

func main() {
  fmt.Println("Hello, World!")
}`,

  rust: `// Rust Example
fn main() {
    println!("Hello, World!");
}`,
};

export function MonacoEditor({
  value,
  onChange,
  language,
  theme = "vs-dark",
}: MonacoEditorProps) {
  const editorRef = useRef<any>(null);
  const [currentLang, setCurrentLang] = useState(language);
  const [wrapEnabled, setWrapEnabled] = useState(true);

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
    toast.success("Code copied!");
  };

  const handleDownload = () => {
    const fileExtension = getFileExtension(currentLang);
    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("File downloaded!");
  };

  const handleFormat = () => {
    editorRef.current?.trigger("source", "editor.action.formatDocument");
    toast.success("Code formatted!");
  };

  const handleUndo = () => editorRef.current?.trigger("source", "undo");
  const handleRedo = () => editorRef.current?.trigger("source", "redo");
  const handleFind = () => editorRef.current?.trigger("source", "actions.find");
  const toggleWordWrap = () => {
    setWrapEnabled((prev) => !prev);
    editorRef.current?.updateOptions({ wordWrap: wrapEnabled ? "off" : "on" });
  };

  const getFileExtension = (lang: string) => {
    const extensions: { [key: string]: string } = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      java: "java",
      cpp: "cpp",
      html: "html",
      css: "css",
      json: "json",
      markdown: "md",
      sql: "sql",
      php: "php",
      go: "go",
      rust: "rs",
    };
    return extensions[lang] || "txt";
  };

  return (
    <Card className="h-full glass border-primary/20">
      {/* --- Toolbar --- */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* MacOS style dots */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
          </div>

          {/* Language Selector */}
          <Select
            value={currentLang}
            onValueChange={(lang) => {
              setCurrentLang(lang);
              onChange(defaultSnippets[lang] || "");
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {supportedLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleUndo}>
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRedo}>
            <Redo2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleFind}>
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleWordWrap}>
            <WrapText className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCopyCode}>
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleFormat}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={handleRunCode}>
            <Play className="w-4 h-4" />
            Run
          </Button>
        </div>
      </div>

      {/* --- Editor --- */}
      <div className="h-[calc(100%-73px)]">
        <Editor
          value={value}
          language={currentLang}
          theme="vibeCoding"
          onChange={(newValue) => onChange(newValue || "")}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: wrapEnabled ? "on" : "off",
            bracketPairColorization: { enabled: true },
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            contextmenu: true,
            mouseWheelZoom: true,
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: "on",
          }}
        />
      </div>
    </Card>
  );
}
