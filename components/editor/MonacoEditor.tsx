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

// Šablóny pre viacero jazykov
const languageTemplates: { [key: string]: string } = {
  javascript: `console.log("Hello JavaScript!");`,
  typescript: `const greet = (name: string) => \`Hello, \${name}!\`;\nconsole.log(greet("TypeScript"));`,
  python: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Python"))`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java!");\n    }\n}`,
  cpp: `#include <iostream>\nint main() {\n    std::cout << "Hello C++!" << std::endl;\n    return 0;\n}`,
  html: `<!DOCTYPE html>\n<html>\n<body>\n    <h1>Hello HTML!</h1>\n</body>\n</html>`,
  css: `body {\n    background-color: #f0f0f0;\n    color: #333;\n}`,
  json: `{\n  "message": "Hello JSON"\n}`,
  php: `<?php\nfunction greet($name) {\n    return "Hello $name!";\n}\n\necho greet("PHP");\n?>`,
  go: `package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello Go!")\n}`,
  rust: `fn main() {\n    println!("Hello Rust!");\n}`,
  sql: `SELECT 'Hello SQL!' AS greeting;`,
  markdown: `# Hello Markdown\n\nThis is a **bold** text and this is *italic*.\n\n- Item 1\n- Item 2`,
};

export function MonacoEditor({ value, onChange, language = "javascript", theme = "vs-dark" }: MonacoEditorProps) {
  const editorRef = useRef<any>(null);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  // uchováva kód pre každý jazyk, aby undo/redo fungovalo
  const [codeHistory, setCodeHistory] = useState<{ [lang: string]: string }>({
    [language]: value,
  });

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
    try {
      await navigator.clipboard.writeText(codeHistory[currentLanguage]);
      toast.success("Code copied to clipboard!");
    } catch {
      toast.error("Failed to copy code!");
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([codeHistory[currentLanguage]], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `code.${getFileExtension(currentLanguage)}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("File downloaded!");
    } catch {
      toast.error("Failed to download file!");
    }
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument")?.run();
      toast.success("Code formatted!");
    }
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    // inicializuj kód ak je prvýkrát prepnutý jazyk
    if (!codeHistory[lang]) {
      setCodeHistory(prev => ({ ...prev, [lang]: languageTemplates[lang] || "" }));
    }
    onChange(codeHistory[lang] || languageTemplates[lang] || "");
  };

  const handleEditorChange = (newValue: string | undefined) => {
    const valueToUse = newValue ?? "";
    setCodeHistory(prev => ({ ...prev, [currentLanguage]: valueToUse }));
    onChange(valueToUse);
  };

  const getFileExtension = (lang: string) => {
    const map: Record<string, string> = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      java: "java",
      cpp: "cpp",
      html: "html",
      css: "css",
      json: "json",
      php: "php",
      go: "go",
      rust: "rs",
      sql: "sql",
      markdown: "md",
    };
    return map[lang] || "txt";
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
              {Object.keys(languageTemplates).map(lang => (
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
          value={codeHistory[currentLanguage] || ""}
          language={currentLanguage}
          theme="vibeCoding"
          onChange={handleEditorChange}
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
