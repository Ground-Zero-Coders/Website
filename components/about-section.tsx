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
    <section id="about" className="py-20 bg-white dark:bg-[#0f172a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00bcd4]/5 dark:bg-[#14b8a6]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00bcd4]/10 dark:bg-[#14b8a6]/10 rounded-full blur-3xl"></div>
      
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
                collaboration, and excellence in software development. We bring together passionate 
                developers, designers, and tech enthusiasts to create cutting-edge solutions and 
                build the future of technology.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-muted text-base lg:text-lg leading-relaxed"
              >
                Our mission is to empower the next generation of technologists through mentorship, 
                hands-on projects, and a supportive community that encourages continuous learning 
                and professional growth.
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
                    <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-custom hover:border-accent transition-all duration-300 hover:shadow-lg">
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
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 bg-gradient-to-br from-[#00bcd4]/10 to-[#00bcd4]/5 dark:from-[#14b8a6]/10 dark:to-[#14b8a6]/5 rounded-3xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute -top-4 -right-4 bg-[#00bcd4] dark:bg-[#14b8a6] text-white p-4 rounded-2xl shadow-xl z-20"
              >
                <Code className="h-8 w-8" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 text-[#00bcd4] dark:text-[#14b8a6] p-4 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-20"
              >
                <Users className="h-8 w-8" />
              </motion.div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00bcd4]/20 to-transparent dark:from-[#14b8a6]/20 rounded-3xl blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}