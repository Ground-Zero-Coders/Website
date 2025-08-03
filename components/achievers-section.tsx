'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { achieverService, type Achiever } from '@/lib/supabase';

export default function AchieversSection() {
  const [achievers, setAchievers] = useState<Achiever[]>([]);
  const [uniqueEvents, setUniqueEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<string>('');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [achieversData, eventsData] = await Promise.all([
          achieverService.getAll(),
          achieverService.getUniqueEvents()
        ]);
        
        setAchievers(achieversData);
        setUniqueEvents(eventsData);
        
        // Set first event as default if available
        if (eventsData.length > 0) {
          setSelectedEvent(eventsData[0]);
        }
      } catch (error) {
        console.error('Error fetching achievers data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Don't render if no achievers
  if (!loading && achievers.length === 0) {
    return null;
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <Trophy className="h-6 w-6 text-cyan-400" />;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30';
      case 2:
        return 'from-gray-400/20 to-gray-500/10 border-gray-400/30';
      case 3:
        return 'from-amber-600/20 to-amber-700/10 border-amber-600/30';
      default:
        return 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30';
    }
  };

  const getPositionText = (position: number) => {
    switch (position) {
      case 1:
        return '1st Place';
      case 2:
        return '2nd Place';
      case 3:
        return '3rd Place';
      default:
        return `${position}th Place`;
    }
  };

  const filteredAchievers = achievers.filter(achiever => achiever.event_name === selectedEvent);

  if (loading) {
    return (
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-800 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-800 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-white mb-4">
            🏆 Achievers
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Celebrating our champions and their outstanding achievements
          </p>
        </motion.div>

        {/* Event Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {uniqueEvents.map((event, index) => (
            <button
              key={index}
              onClick={() => setSelectedEvent(event)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedEvent === event
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {event}
            </button>
          ))}
        </motion.div>

        {/* Winners Display */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievers.map((achiever, index) => (
            <motion.div
              key={achiever.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="group relative"
            >
              <div className={`bg-gradient-to-br ${getPositionColor(achiever.position)} backdrop-blur-sm rounded-2xl p-6 shadow-lg border hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                {/* Position Badge */}
                {/* <div className="absolute top-4 right-4 flex items-center space-x-2">
                  {getPositionIcon(achiever.position)}
                  <span className="text-white font-bold text-sm">
                    #{achiever.position}
                  </span>
                </div> */}

                {/* Winner Photo */}
                <div className="relative text-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:scale-110">
                      <img
                        src={achiever.winner_photo || '/placeholder-avatar.jpg'}
                        alt={achiever.winner_name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {achiever.position <= 3 && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {achiever.position}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Winner Name */}
                  <h3 className="font-space-grotesk font-bold text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {achiever.winner_name}
                  </h3>

                  {/* Position Text */}
                  <p className="text-gray-300 font-medium text-sm mb-2">
                    {getPositionText(achiever.position)}
                  </p>

                  {/* Event Name */}
                  <p className="text-gray-400 text-sm">
                    {achiever.event_name}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAchievers.length === 0 && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Trophy className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No winners found for {selectedEvent}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}