"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Terminal as TerminalIcon,
  Play,
  Trash2,
  Download,
  Package,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

interface Command {
  id: string;
  input: string;
  output: string;
  timestamp: Date;
  status: "success" | "error" | "running";
}

interface PackageInfo {
  name: string;
  description: string;
  category: string;
  devDependency?: boolean;
}

interface TemplatePackages {
  [key: string]: PackageInfo[];
}

// Template-specific packages
const templatePackages: TemplatePackages = {
  // React Templates
  "react-component": [
    {
      name: "react",
      description: "JavaScript library for building user interfaces",
      category: "core",
    },
    {
      name: "react-dom",
      description: "React package for working with the DOM",
      category: "core",
    },
    {
      name: "@types/react",
      description: "TypeScript definitions for React",
      category: "types",
      devDependency: true,
    },
    {
      name: "@types/react-dom",
      description: "TypeScript definitions for React DOM",
      category: "types",
      devDependency: true,
    },
    {
      name: "react-router-dom",
      description: "Declarative routing for React",
      category: "routing",
    },
    {
      name: "axios",
      description: "HTTP client for the browser and node.js",
      category: "http",
    },
  ],
  "react-hooks": [
    {
      name: "react",
      description: "JavaScript library for building user interfaces",
      category: "core",
    },
    {
      name: "react-dom",
      description: "React package for working with the DOM",
      category: "core",
    },
    {
      name: "@types/react",
      description: "TypeScript definitions for React",
      category: "types",
      devDependency: true,
    },
    {
      name: "@types/react-dom",
      description: "TypeScript definitions for React DOM",
      category: "types",
      devDependency: true,
    },
    {
      name: "react-query",
      description: "Hooks for fetching, caching and updating asynchronous data",
      category: "data",
    },
    {
      name: "react-hook-form",
      description: "Performant, flexible forms with easy-to-use validation",
      category: "forms",
    },
  ],

  // Vue Templates
  "vue-composition": [
    {
      name: "vue",
      description: "The Progressive JavaScript Framework",
      category: "core",
    },
    {
      name: "@vitejs/plugin-vue",
      description: "Vite plugin for Vue",
      category: "build",
      devDependency: true,
    },
    {
      name: "vue-router",
      description: "Official router for Vue.js",
      category: "routing",
    },
    {
      name: "pinia",
      description: "Intuitive, type safe store for Vue",
      category: "state",
    },
    {
      name: "vueuse",
      description: "Collection of essential Vue Composition Utilities",
      category: "utilities",
    },
  ],

  // Backend Templates
  "express-api": [
    {
      name: "express",
      description: "Fast, unopinionated, minimalist web framework",
      category: "core",
    },
    {
      name: "@types/express",
      description: "TypeScript definitions for Express",
      category: "types",
      devDependency: true,
    },
    {
      name: "cors",
      description: "Express middleware to enable CORS",
      category: "middleware",
    },
    {
      name: "helmet",
      description: "Help secure Express apps with various HTTP headers",
      category: "security",
    },
    {
      name: "mongoose",
      description: "MongoDB object modeling for Node.js",
      category: "database",
    },
    {
      name: "jsonwebtoken",
      description: "JSON Web Token implementation",
      category: "auth",
    },
  ],

  "fastapi-crud": [
    {
      name: "fastapi",
      description: "Modern, fast web framework for building APIs",
      category: "core",
    },
    {
      name: "uvicorn",
      description: "Lightning-fast ASGI server",
      category: "server",
      devDependency: true,
    },
    {
      name: "pydantic",
      description: "Data validation using Python type hints",
      category: "validation",
    },
    {
      name: "sqlalchemy",
      description: "Database Toolkit for Python",
      category: "database",
    },
    {
      name: "alembic",
      description: "Database migration tool for SQLAlchemy",
      category: "database",
      devDependency: true,
    },
    {
      name: "python-jose",
      description: "JOSE implementation in Python",
      category: "auth",
    },
  ],

  // Default packages (shown when no template is selected)
  default: [
    {
      name: "react",
      description: "JavaScript library for building user interfaces",
      category: "frontend",
    },
    {
      name: "vue",
      description: "The Progressive JavaScript Framework",
      category: "frontend",
    },
    {
      name: "express",
      description: "Fast, unopinionated, minimalist web framework",
      category: "backend",
    },
    {
      name: "typescript",
      description: "Typed superset of JavaScript",
      category: "language",
      devDependency: true,
    },
    {
      name: "lodash",
      description: "Utility library for JavaScript",
      category: "utilities",
    },
    {
      name: "axios",
      description: "HTTP client for the browser and node.js",
      category: "http",
    },
  ],
};

const commonCommands = [
  { name: "npm install", description: "Install all dependencies" },
  { name: "npm run dev", description: "Start development server" },
  { name: "npm run build", description: "Build for production" },
  { name: "npm test", description: "Run tests" },
  { name: "git status", description: "Check git status" },
  { name: "git add .", description: "Stage all changes" },
];

const packages = [
  {
    name: "react",
    description: "JavaScript library for building user interfaces",
  },
  { name: "lodash", description: "Utility library for JavaScript" },
  { name: "axios", description: "HTTP client for the browser and node.js" },
  { name: "moment", description: "Parse, validate, manipulate dates" },
  {
    name: "express",
    description: "Fast, unopinionated, minimalist web framework",
  },
  { name: "typescript", description: "Typed superset of JavaScript" },
];

export function Terminal({
  selectedTemplate,
  onPackageInstall,
}: TerminalProps) {
  const [currentInput, setCurrentInput] = useState("");
  const [commands, setCommands] = useState<Command[]>([
    {
      id: "1",
      input: "Welcome to VibeCoding Terminal!",
      output: selectedTemplate
        ? `Template selected: ${selectedTemplate}\nType commands below or install packages for your template.`
        : "Select a template to see relevant packages. Type commands below or click on common commands.",
      timestamp: new Date(),
      status: "success",
    },
  ]);
  const [activeTab, setActiveTab] = useState<"terminal" | "packages">(
    "terminal",
  );
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  useEffect(() => {
    if (selectedTemplate) {
      const welcomeCommand: Command = {
        id: Date.now().toString(),
        input: `template selected: ${selectedTemplate}`,
        output: `Template "${selectedTemplate}" loaded. You can now install packages specific to this template.`,
        timestamp: new Date(),
        status: "success",
      };
      setCommands((prev) => [...prev, welcomeCommand]);
    }
  }, [selectedTemplate]);

  const executeCommand = (input: string) => {
    const newCommand: Command = {
      id: Date.now().toString(),
      input,
      output: "",
      timestamp: new Date(),
      status: "running",
    };

    setCommands((prev) => [...prev, newCommand]);

    // Simulate command execution
    setTimeout(() => {
      let output = "";
      let status: "success" | "error" = "success";

      if (input.startsWith("npm install")) {
        output = `✓ Installing packages...\n✓ Package installed successfully!`;
        toast.success("Package installed!");
      } else if (input.startsWith("npm run")) {
        output = `✓ Running script...\n✓ Script executed successfully!`;
        toast.success("Script executed!");
      } else if (input.startsWith("git")) {
        output = `✓ Git command executed\n✓ Repository updated!`;
        toast.success("Git command executed!");
      } else if (input === "clear") {
        setCommands([]);
        return;
      } else if (input === "help") {
        output = `Available commands:
- npm install [package]  : Install npm package
- npm run [script]       : Run npm script
- git [command]          : Git operations
- clear                  : Clear terminal
- help                   : Show this help`;
      } else if (input.trim() === "") {
        return;
      } else {
        output = `Command '${input}' not found. Type 'help' for available commands.`;
        status = "error";
      }

      setCommands((prev) =>
        prev.map((cmd) =>
          cmd.id === newCommand.id ? { ...cmd, output, status } : cmd,
        ),
      );
    }, 1000);

    setCurrentInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
    }
  };

  const installPackage = (packageName: string, isDev: boolean = false) => {
    const command = `npm install ${packageName}${isDev ? " --save-dev" : ""}`;
    executeCommand(command);
  };

  const clearTerminal = () => {
    setCommands([]);
    toast.success("Terminal cleared!");
  };

  const getCurrentPackages = () => {
    if (selectedTemplate && templatePackages[selectedTemplate]) {
      return templatePackages[selectedTemplate];
    }
    return templatePackages["default"];
  };

  const getPackageCategories = () => {
    const packages = getCurrentPackages();
    const categories: { [key: string]: PackageInfo[] } = {};

    packages.forEach((pkg) => {
      if (!categories[pkg.category]) {
        categories[pkg.category] = [];
      }
      categories[pkg.category].push(pkg);
    });

    return categories;
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex space-x-2">
        <Button
          variant={activeTab === "terminal" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("terminal")}
          className="flex items-center space-x-2"
        >
          <TerminalIcon className="w-4 h-4" />
          <span>Terminal</span>
        </Button>
        <Button
          variant={activeTab === "packages" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("packages")}
          className="flex items-center space-x-2"
        >
          <Package className="w-4 h-4" />
          <span>Packages</span>
          {selectedTemplate && (
            <Badge variant="secondary" className="ml-1">
              {getCurrentPackages().length}
            </Badge>
          )}
        </Button>
      </div>

      {activeTab === "terminal" ? (
        <Card className="glass">
          {/* Terminal Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-accent"></div>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <TerminalIcon className="w-3 h-3 mr-1" />
                {selectedTemplate || "bash"}
              </Badge>
              {selectedTemplate && (
                <Badge variant="outline" className="text-xs">
                  {selectedTemplate}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={clearTerminal}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Terminal Output */}
          <div
            ref={terminalRef}
            className="h-64 p-4 font-mono text-sm bg-background/50 overflow-y-auto"
          >
            {commands.map((command) => (
              <div key={command.id} className="mb-2">
                <div className="flex items-center space-x-2 text-accent">
                  <span>$</span>
                  <span>{command.input}</span>
                  {command.status === "running" && (
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  )}
                </div>
                {command.output && (
                  <pre
                    className={`mt-1 whitespace-pre-wrap ${
                      command.status === "error"
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {command.output}
                  </pre>
                )}
              </div>
            ))}
          </div>

          {/* Terminal Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <span className="text-accent font-mono">$</span>
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a command..."
                className="font-mono bg-transparent border-0 focus:ring-1 focus:ring-primary"
              />
              <Button size="sm" onClick={() => executeCommand(currentInput)}>
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Common Commands */}
          <div className="p-4 border-t border-border">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Common Commands:
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {commonCommands.map((cmd) => (
                <Button
                  key={cmd.name}
                  variant="outline"
                  size="sm"
                  onClick={() => executeCommand(cmd.name)}
                  className="justify-start text-xs"
                  title={cmd.description}
                >
                  {cmd.name}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      ) : (
        <Card className="glass p-4">
          <h3 className="font-semibold mb-4 flex items-center space-x-2">
            <Package className="w-5 h-5 text-primary" />
            <span>Popular Packages</span>
          </h3>
          <div className="grid gap-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:border-primary/50 transition-colors"
              >
                <div>
                  <h4 className="font-medium">{pkg.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {pkg.description}
                  </p>
                </div>
                <Button size="sm" onClick={() => installPackage(pkg.name)}>
                  <Download className="w-4 h-4 mr-1" />
                  Install
                </Button>
              </div>
            ))}
          </div>

          {!selectedTemplate ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select a template to see relevant packages</p>
              <p className="text-sm mt-1">
                Choose a template from the sidebar to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(getPackageCategories()).map(
                ([category, packages]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium mb-2 text-muted-foreground capitalize">
                      {category}
                    </h4>
                    <div className="grid gap-2">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.name}
                          className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{pkg.name}</h4>
                              {pkg.devDependency && (
                                <Badge variant="outline" className="text-xs">
                                  dev
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {pkg.description}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() =>
                              installPackage(pkg.name, pkg.devDependency)
                            }
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Install
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
