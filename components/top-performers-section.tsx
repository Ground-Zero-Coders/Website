'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { topPerformers } from '@/data/topPerformers';

export default function TopMentorsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-white mb-4">
            Top Mentors
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Celebrating excellence and dedication in our community
          </p>
        </motion.div>

        {/* Mentor Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {topPerformers.map((performer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="bg-[#111] rounded-2xl p-8 shadow-lg border border-gray-800 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Profile Image */}
                <div className="relative text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-cyan-500/20 group-hover:border-cyan-400 transition-all duration-500 group-hover:scale-110">
                      <img
                        src={performer.image}
                        alt={performer.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="font-space-grotesk font-bold text-xl text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {performer.name}
                  </h3>

                  {/* Reveal on hover */}
{/* Reveal on hover */}
<div className="relative h-20 overflow-hidden">
  <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center">
    
    {/* Hover to reveal text (disappears) */}
    <div className="transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:-translate-y-4">
      <p className="text-gray-500 font-medium"></p>
    </div>

    {/* Actual reveal info (appears smoothly) */}
    <div className="absolute opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
      <p className="text-cyan-400 font-semibold text-sm mb-1">{performer.group}</p>
      <p className="text-white font-medium text-base mb-1">{performer.domain}</p>
      <p className="text-gray-400 text-sm">{performer.achievement}</p>
    </div>
  </div>
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
