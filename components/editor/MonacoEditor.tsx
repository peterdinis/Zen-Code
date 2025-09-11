"use client";

import { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Copy, 
  Download, 
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  theme?: string;
}

export function MonacoEditor({ value, onChange, language, theme = "vs-dark" }: MonacoEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // ✅ defineTheme na monaco.editor, nie na editor
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

  const handleRunCode = () => {
    toast.success("Code executed! ⚡");
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(value);
    toast.success("Code copied to clipboard!");
  };

  const handleDownload = () => {
    const fileExtension = getFileExtension(language);
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
    if (editorRef.current) {
      editorRef.current.trigger("source", "editor.action.formatDocument");
      toast.success("Code formatted!");
    }
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
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
          </div>
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            {language}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
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

      <div className="h-[calc(100%-73px)]">
        <Editor
          value={value}
          language={language}
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
            wordWrap: "on",
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
