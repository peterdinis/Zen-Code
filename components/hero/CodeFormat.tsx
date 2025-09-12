"use client";

import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const codeSnippet = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// AI-powered optimization suggestion
const memoizedFib = useMemo(() => {
  const cache = {};
  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}, []);

export default memoizedFib;`;

export const CodePreview = () => {
  const [typedCode, setTypedCode] = useState("");

  // Simulate typing effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < codeSnippet.length) {
        setTypedCode(codeSnippet.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            🚀 Live Preview
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See Vibe in
            <br />
            <span className="gradient-primary bg-clip-text text-transparent">
              action
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience real-time syntax highlighting, intelligent suggestions,
            and seamless code completion as you type.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Card className="bg-code-bg border-primary/20 shadow-card overflow-hidden relative">
            {/* Editor Header */}
            <motion.div
              className="flex items-center justify-between p-4 border-b border-primary/10 bg-secondary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-red-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-yellow-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
                <span className="ml-4 text-sm text-muted-foreground font-mono">
                  fibonacci.js
                </span>
              </div>
              <motion.div
                className="flex items-center gap-2 text-xs text-muted-foreground"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span>AI Assistant Active</span>
              </motion.div>
            </motion.div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <pre className="text-code-variable">
                <code
                  dangerouslySetInnerHTML={{
                    __html: formatCode(typedCode),
                  }}
                />
                <motion.span
                  className="text-accent"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  |
                </motion.span>
              </pre>
            </div>

            {/* AI Suggestion Popup */}
            {typedCode.length > 100 && (
              <motion.div
                className="absolute bottom-20 right-6 max-w-xs"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 2,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <Card className="bg-accent/10 border-accent/30 shadow-glow">
                  <motion.div
                    className="p-4 space-y-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="flex items-center gap-2 text-sm font-medium text-accent"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                      AI Suggestion
                    </motion.div>
                    <p className="text-xs text-muted-foreground">
                      Consider using memoization to optimize recursive
                      fibonacci. Would you like me to refactor this?
                    </p>
                    <div className="flex gap-2">
                      <motion.button
                        className="px-2 py-1 bg-accent/20 hover:bg-accent/30 rounded text-xs text-accent transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Apply
                      </motion.button>
                      <motion.button
                        className="px-2 py-1 hover:bg-secondary/20 rounded text-xs text-muted-foreground transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Ignore
                      </motion.button>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// Simple syntax highlighting
function formatCode(code: string): string {
  return code
    .replace(
      /\b(function|const|return|if|export|default|useMemo)\b/g,
      '<span style="color: hsl(var(--code-keyword))">$1</span>',
    )
    .replace(
      /\b(\d+)\b/g,
      '<span style="color: hsl(var(--code-number))">$1</span>',
    )
    .replace(
      /(\/\/.*$)/gm,
      '<span style="color: hsl(var(--code-comment))">$1</span>',
    )
    .replace(
      /(['"`])(.*?)\1/g,
      '<span style="color: hsl(var(--code-string))">$1$2$1</span>',
    )
    .replace(
      /\b(fibonacci|fib|memoizedFib|cache)\b/g,
      '<span style="color: hsl(var(--code-function))">$1</span>',
    );
}
