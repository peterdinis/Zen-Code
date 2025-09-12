"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Play } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <motion.div 
            className="space-y-8" 
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="space-y-4" 
              variants={itemVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✨ The Future of Code Editing
              </motion.div>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent leading-tight"
                variants={itemVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Code with
                <br />
                <motion.span 
                  className="gradient-primary bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                >
                  Vibe
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground max-w-lg leading-relaxed"
                variants={itemVariants}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Experience the most intuitive code editor ever built. With intelligent autocomplete, 
                beautiful themes, and lightning-fast performance.
              </motion.p>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-smooth">
                  <Download className="mr-2 h-5 w-5" />
                  Download Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 transition-smooth">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="lg" className="hover:bg-primary/10 transition-smooth">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-8 pt-8 text-sm"
              variants={itemVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="flex flex-col"
                whileHover={{ y: -2 }}
              >
                <motion.span 
                  className="text-2xl font-bold text-primary"
                  animate={{ 
                    textShadow: ["0 0 0px #8b5cf6", "0 0 20px #8b5cf6", "0 0 0px #8b5cf6"] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  50K+
                </motion.span>
                <span className="text-muted-foreground">Developers</span>
              </motion.div>
              <motion.div 
                className="flex flex-col"
                whileHover={{ y: -2 }}
              >
                <span className="text-2xl font-bold text-accent">99.9%</span>
                <span className="text-muted-foreground">Uptime</span>
              </motion.div>
              <motion.div 
                className="flex flex-col"
                whileHover={{ y: -2 }}
              >
                <span className="text-2xl font-bold text-foreground">24/7</span>
                <span className="text-muted-foreground">Support</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div 
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            animate={{
              y: [-20, 20, -20],
              scale: [1, 1.05, 1],
            }}
            style={{
              animationDuration: "6s",
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
            }}
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 gradient-primary blur-xl opacity-30 scale-110"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1.1, 1.2, 1.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              TODO IMAGE
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};