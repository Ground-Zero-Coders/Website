  'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Users, Trophy, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { projectService } from '@/lib/supabase';

const terminalLines = [
  { command: '$ whoami', output: 'ground-zero-coders' },
  
  { command: '$ cat about.txt', output: 'Premier tech organization ' },
  { command: '$ grep -r "members" stats/', output: '600+ active developers & designers' },

];

export default function LandingPage() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await projectService.getAll();
        setProjectCount(projects.length);
      } catch (error) {
        console.error('Error fetching project count:', error);
      }
    };
    fetchProjects();
  }, []);

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

  const stats = [
    { label: 'Active Members', value: '600+', icon: Users },
    { label: 'Projects Completed', value: `${projectCount}+`, icon: Code },
    { label: 'Hackathons Organized', value: '5+', icon: Trophy },
  ];

    return (
      <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/3 to-transparent rounded-full"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Side - Welcome Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
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
  {[
    "Premier tech organization since June 2025",
    "600+ active developers and designers",
    `${projectCount}+ innovative projects completed`,
    "5+ hackathons participations by teams",
  ].map((item, i) => (
    <div key={i} className="flex items-center space-x-3 text-gray-300">
      <ChevronRight className="h-5 w-5 text-primarine" />
      <span>{item}</span>
    </div>
  ))}
</motion.div>

              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex"
              >
                <Link
                  href="/projects"
                  className="group bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8">
              {/* Terminal Window */}
              <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <Icon className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                    <div className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">{stat.value}</div>
                    <div className="text-gray-400 text-sm md:text-base mt-1">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

              {/* Floating Elements */}
              <div className="absolute -z-10">
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-10 -left-10 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 backdrop-blur-sm border border-cyan-500/20 p-4 rounded-2xl"
                >
                  <Code className="h-8 w-8 text-cyan-400" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="absolute -bottom-5 -right-5 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-teal-500/20 p-3 rounded-xl"
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
