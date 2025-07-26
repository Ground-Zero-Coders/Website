'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Code, Trophy } from 'lucide-react';
import { projectService } from '@/lib/supabase';

function AnimatedCounter({ number, suffix = '', duration = 2 }: { number: number; suffix?: string; duration?: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {inView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration }}
        >
          <motion.span
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration,
              type: "spring",
              bounce: 0.3
            }}
          >
            {Math.round(number)}
          </motion.span>
          {suffix}
        </motion.span>
      )}
    </motion.span>
  );
}

export default function StatsSection() {
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const projects = await projectService.getAll();
        setProjectCount(projects.length);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      icon: Users,
      number: 500,
      label: 'Total Members',
      suffix: '+',
    },
    {
      icon: Code,
      number: projectCount,
      label: 'Projects',
      suffix: '',
    },
    {
      icon: Trophy,
      number: 25,
      label: 'Hackathons',
      suffix: '+',
    },
  ];

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent"></div>
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-muted text-base lg:text-lg max-w-2xl mx-auto">
            Building a community of passionate developers and innovators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
                  </div>
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                </div>
                
                <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {loading && stat.label === 'Projects' ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <AnimatedCounter number={stat.number} suffix={stat.suffix} />
                  )}
                </div>
                
                <p className="text-muted font-medium text-base lg:text-lg">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}