'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Users, Lightbulb, Target } from 'lucide-react';

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const features = [
    {
      icon: Code,
      title: 'Innovation',
      description: 'Cutting-edge technology solutions'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Building together as a community'
    },
    {
      icon: Lightbulb,
      title: 'Learning',
      description: 'Continuous growth and development'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Striving for the highest standards'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-6"
              >
                About Ground Zero Coders
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-muted text-base lg:text-lg leading-relaxed mb-6 lg:mb-8"
              >
                Ground Zero Coders is a premier tech organization dedicated to fostering innovation, 
                collaboration, and excellence in software development.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-muted text-base lg:text-lg leading-relaxed"
              >
                Our mission is to empower the next generation of technologists through mentorship, 
                hands-on projects, and a supportive community.
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-transparent border border-custom p-4 rounded-xl hover:border-accent transition-all duration-300 hover:shadow-lg flex flex-col justify-between min-h-[180px]">

                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-accent mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="font-space-grotesk font-semibold text-primary mb-1 text-sm sm:text-base">
                        {feature.title}
                      </h3>
                      <p className="text-muted text-xs sm:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl p-2 border border-gray-200 dark:border-gray-700">
              <img
                src="/file.jpg"
                alt="Team collaboration"
                className="w-full h-90 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
