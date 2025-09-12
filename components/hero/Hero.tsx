"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  Github,
  Play,
  Code2,
  Zap,
  Heart,
  Star,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Mock code animation component
const CodeAnimation = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const codeLines = [
    "const vibe = new CodeEditor({",
    "  theme: 'cyberpunk',",
    "  autocomplete: true,",
    "  intelligence: 'ai-powered',",
    "  performance: 'lightning-fast'",
    "});",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % codeLines.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900/90 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 font-mono text-sm shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 text-xs ml-2">vibe-editor.js</span>
      </div>
      {codeLines.map((line, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ${
            index <= currentLine
              ? "text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text opacity-100"
              : "text-gray-600 opacity-50"
          }`}
          style={{
            transform: index === currentLine ? "scale(1.02)" : "scale(1)",
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

// Floating icons component
const FloatingIcons = () => {
  const icons = [
    { Icon: Code2, delay: 0, position: "top-1/4 left-1/4" },
    { Icon: Zap, delay: 1, position: "top-1/3 right-1/3" },
    { Icon: Heart, delay: 2, position: "bottom-1/3 left-1/3" },
    { Icon: Star, delay: 1.5, position: "bottom-1/4 right-1/4" },
  ];

  return (
    <>
      {icons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} text-purple-400/30`}
          style={{
            animation: `float 4s ease-in-out infinite`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon size={24} />
        </div>
      ))}
    </>
  );
};

// Particle effect component
const ParticleField = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-purple-400/20 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `twinkle 3s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .gradient-hero {
          background: linear-gradient(-45deg, #0f0f23, #1a1a3e, #2d1b69, #0f0f23);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        .glow-text {
          text-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
        }
        .shadow-glow {
          box-shadow: 0 0 30px rgba(147, 51, 234, 0.3);
        }
        .glass-effect {
          backdrop-filter: blur(16px) saturate(180%);
          background-color: rgba(17, 25, 40, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.125);
        }
      `}</style>

      <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
        {/* Background Effects */}
        <ParticleField />
        <FloatingIcons />

        {/* Animated background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div
                  className="inline-block px-6 py-3 glass-effect rounded-full text-sm font-semibold text-purple-300 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-glow"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="mr-2">✨</span>
                  The Future of Code Editing is Here
                  <span
                    className={`ml-2 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                  >
                    <ArrowRight className="inline w-4 h-4" />
                  </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black leading-tight">
                  <span className="block text-white glow-text">Code with</span>
                  <span
                    className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent bg-300% animate-gradient"
                    style={{ animation: "gradient-shift 3s ease infinite" }}
                  >
                    Vibe
                  </span>
                </h1>

                <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                  Experience the most intuitive code editor ever built. With
                  AI-powered autocomplete, stunning themes, and performance that
                  will blow your mind.
                </p>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-glow transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="glass-effect border-purple-400/30 text-purple-300 hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="text-gray-300 hover:bg-purple-500/20 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  {
                    value: "100K+",
                    label: "Developers",
                    color: "text-purple-400",
                  },
                  { value: "99.9%", label: "Uptime", color: "text-cyan-400" },
                  { value: "24/7", label: "Support", color: "text-pink-400" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center transform transition-all duration-300 hover:scale-110 cursor-pointer"
                  >
                    <div
                      className={`text-3xl font-bold ${stat.color} glow-text`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Hero Animation */}
            <div className="relative">
              <div className="space-y-6">
                {/* Main Code Editor Window */}
                <div style={{ animation: "float 6s ease-in-out infinite" }}>
                  <CodeAnimation />
                </div>

                {/* Floating Feature Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="glass-effect rounded-xl p-4 transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: "float 4s ease-in-out infinite",
                      animationDelay: "1s",
                    }}
                  >
                    <Zap className="text-yellow-400 mb-2" size={24} />
                    <div className="text-sm text-white font-semibold">
                      Lightning Fast
                    </div>
                    <div className="text-xs text-gray-400">Instant startup</div>
                  </div>

                  <div
                    className="glass-effect rounded-xl p-4 transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: "float 4s ease-in-out infinite",
                      animationDelay: "2s",
                    }}
                  >
                    <Code2 className="text-purple-400 mb-2" size={24} />
                    <div className="text-sm text-white font-semibold">
                      Smart Coding
                    </div>
                    <div className="text-xs text-gray-400">AI-powered</div>
                  </div>

                  <div
                    className="glass-effect rounded-xl p-4 transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: "float 4s ease-in-out infinite",
                      animationDelay: "3s",
                    }}
                  >
                    <Heart className="text-pink-400 mb-2" size={24} />
                    <div className="text-sm text-white font-semibold">
                      Developer Love
                    </div>
                    <div className="text-xs text-gray-400">5★ rated</div>
                  </div>

                  <div
                    className="glass-effect rounded-xl p-4 transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: "float 4s ease-in-out infinite",
                      animationDelay: "4s",
                    }}
                  >
                    <Star className="text-cyan-400 mb-2" size={24} />
                    <div className="text-sm text-white font-semibold">
                      Premium Feel
                    </div>
                    <div className="text-xs text-gray-400">Beautiful UI</div>
                  </div>
                </div>
              </div>

              {/* Glow effect behind the main content */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 blur-3xl -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
