'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code } from 'lucide-react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentText, setCurrentText] = useState('');
  
  const fullText = 'Welcome to Ground Zero Coders';

  useEffect(() => {
    // Typing animation
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setCurrentText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        // Wait a bit then fade out
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#0f172a]"
        >
          <div className="text-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: 'easeOut',
                type: 'spring',
                bounce: 0.3
              }}
              className="mb-8"
            >
              <div className="relative">
                <Code className="h-16 w-16 text-[#00bcd4] dark:text-[#14b8a6] mx-auto" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 bg-[#00bcd4] dark:bg-[#14b8a6] rounded-full blur-xl"
                />
              </div>
            </motion.div>

            {/* Typing Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-space-grotesk text-2xl md:text-3xl font-bold text-black dark:text-white"
            >
              {currentText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-[#00bcd4] dark:text-[#14b8a6]"
              >
                |
              </motion.span>
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-center space-x-2 mt-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut'
                  }}
                  className="w-3 h-3 bg-[#00bcd4] dark:bg-[#14b8a6] rounded-full"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}