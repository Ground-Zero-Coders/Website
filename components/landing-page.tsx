'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Users, Trophy, ArrowRight, ChevronRight } from 'lucide-react';

const terminalLines = [
  { command: '$ whoami', output: 'ground-zero-coders' },
  { command: '$ ls -la projects/', output: 'total 500+ innovative projects' },
  { command: '$ cat about.txt', output: 'Premier tech organization since 2023' },
  { command: '$ grep -r "members" stats/', output: '500+ active developers & designers' },
  { command: '$ find . -name "*.hackathon"', output: '25+ successful hackathons organized' },
  { command: '$ git log --oneline', output: 'Building the future, one commit at a time' },
];

const stats = [
  { label: 'Active Members', value: '500+', icon: Users },
  { label: 'Projects Completed', value: '150+', icon: Code },
  { label: 'Hackathons Organized', value: '25+', icon: Trophy },
];

export default function LandingPage() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) return;

    const currentLine = terminalLines[currentLineIndex];
    const fullText = `${currentLine.command}\n${currentLine.output}`;
    
    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if (currentLineIndex < terminalLines.length - 1) {
          setCurrentLineIndex(currentLineIndex + 1);
          setDisplayedText('');
        } else {
          setIsTyping(false);
        }
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, currentLineIndex]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/3 to-transparent rounded-full"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Terminal Window */}
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-gray-800/50 px-4 py-3 flex items-center space-x-2 border-b border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-gray-400 text-sm font-mono">ground-zero-coders — zsh</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 h-80 overflow-hidden">
                <div className="font-mono text-sm space-y-2">
                  {terminalLines.slice(0, currentLineIndex).map((line, index) => (
                    <div key={index} className="space-y-1">
                      <div className="text-cyan-400">
                        <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> {line.command}
                      </div>
                      <div className="text-gray-300 pl-4">{line.output}</div>
                    </div>
                  ))}
                  
                  {currentLineIndex < terminalLines.length && (
                    <div className="space-y-1">
                      <div className="text-cyan-400">
                        <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> 
                        {displayedText.split('\n')[0]}
                      </div>
                      {displayedText.includes('\n') && (
                        <div className="text-gray-300 pl-4">
                          {displayedText.split('\n')[1]}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Cursor */}
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-2 h-5 bg-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <Icon className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-lg">{stat.value}</div>
                    <div className="text-gray-400 text-xs">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side - Welcome Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h1 className="font-space-grotesk text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                  Welcome to
                  <span className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
                    Ground Zero Coders
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-gray-300 text-xl leading-relaxed max-w-2xl"
              >
                Where innovation meets collaboration. Join our community of passionate developers, 
                designers, and tech enthusiasts building the future of technology.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 text-gray-300">
                  <ChevronRight className="h-5 w-5 text-cyan-400" />
                  <span>Premier tech organization since 2023</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <ChevronRight className="h-5 w-5 text-cyan-400" />
                  <span>500+ active developers and designers</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <ChevronRight className="h-5 w-5 text-cyan-400" />
                  <span>150+ innovative projects completed</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <ChevronRight className="h-5 w-5 text-cyan-400" />
                  <span>25+ successful hackathons organized</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="group bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                <span>Explore Projects</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-cyan-500/50 transition-all duration-300 hover:bg-gray-800/70">
                Join Community
              </button>
            </motion.div>

            {/* Floating Elements */}
            <div className="absolute -z-10">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute -top-10 -right-10 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 backdrop-blur-sm border border-cyan-500/20 p-4 rounded-2xl"
              >
                <Code className="h-8 w-8 text-cyan-400" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2
                }}
                className="absolute -bottom-5 -left-5 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-teal-500/20 p-3 rounded-xl"
              >
                <Terminal className="h-6 w-6 text-teal-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}