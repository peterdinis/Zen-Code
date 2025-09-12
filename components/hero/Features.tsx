"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Palette,
  Code2,
  GitBranch,
  Terminal,
  Sparkles,
  Shield,
  Puzzle,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized for speed with instant startup and real-time syntax highlighting.",
  },
  {
    icon: Palette,
    title: "Beautiful Themes",
    description:
      "Choose from dozens of carefully crafted themes or create your own.",
  },
  {
    icon: Code2,
    title: "Smart IntelliSense",
    description: "AI-powered autocomplete and suggestions for faster coding.",
  },
  {
    icon: GitBranch,
    title: "Git Integration",
    description:
      "Built-in Git support with visual diff and merge conflict resolution.",
  },
  {
    icon: Terminal,
    title: "Integrated Terminal",
    description:
      "Access your shell directly within the editor for seamless workflow.",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    description:
      "Get code suggestions, explanations, and debugging help from AI.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your code stays on your machine. No cloud dependencies required.",
  },
  {
    icon: Puzzle,
    title: "Extensible",
    description: "Thousands of extensions to customize your coding experience.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Handle large codebases with ease. Optimized for massive projects.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent mb-4">
            ⚡ Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything you need to
            <br />
            <span className="gradient-accent bg-clip-text text-transparent">
              code efficiently
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vibe comes packed with features that modern developers love. From
            intelligent autocomplete to seamless Git integration.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              <Card className="group bg-card/50 border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-glow shadow-card backdrop-blur-sm h-full">
                <CardContent className="p-6 space-y-4">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
