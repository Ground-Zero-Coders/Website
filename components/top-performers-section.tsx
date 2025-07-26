'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { topPerformers } from '@/data/topPerformers';

export default function TopPerformersSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="py-20 bg-secondary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-primary mb-4">
            Top Performers
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Celebrating excellence and dedication in our community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {topPerformers.map((performer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-custom hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-accent/20 group-hover:border-accent transition-all duration-500 group-hover:scale-110">
                      <img
                        src={performer.image}
                        alt={performer.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-accent/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <h3 className="font-space-grotesk font-bold text-xl text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                    {performer.name}
                  </h3>
                  
                  {/* Domain reveal on hover */}
                  <div className="relative h-16 overflow-hidden">
                    <motion.div
                      initial={{ y: 0 }}
                      animate={{ y: 0 }}
                      className="absolute inset-0 flex flex-col justify-center"
                    >
                      <motion.p
                        className="text-muted font-medium group-hover:opacity-0 group-hover:-translate-y-full transition-all duration-500"
                      >
                        Hover to reveal details
                      </motion.p>
                      <motion.div
                        className="opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                      >
                        <p className="text-accent font-semibold text-sm mb-1">
                          {performer.group}
                        </p>
                        <p className="text-primary font-medium text-base mb-1">
                          {performer.domain}
                        </p>
                        <p className="text-muted text-sm">
                          {performer.achievement}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}