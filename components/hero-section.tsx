'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';

const upcomingEvents = [
  {
    title: 'AI/ML Hackathon 2024',
    date: '2024-02-15',
    location: 'Tech Hub',
    participants: '200+',
  },
  {
    title: 'Web Development Workshop',
    date: '2024-02-28',
    location: 'Online',
    participants: '150+',
  },
  {
    title: 'Open Source Contribution Drive',
    date: '2024-03-10',
    location: 'Campus',
    participants: '100+',
  },
];

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Redirect to Google Form with pre-filled data
      const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSe_placeholder_form_id/viewform?usp=pp_url&entry.123456789=${encodeURIComponent(formData.name)}&entry.987654321=${encodeURIComponent(formData.email)}`;
      window.open(googleFormUrl, '_blank');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8"
          >
            <div>
              <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                Upcoming Events
              </h2>
              <p className="text-muted text-base lg:text-lg">
                Join us in our journey of innovation and collaboration
              </p>
            </div>

            <div className="space-y-4 lg:space-y-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg border border-custom hover:shadow-xl transition-all duration-300 group"
                >
                  <h3 className="font-space-grotesk font-semibold text-lg sm:text-xl text-primary mb-3 group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-muted">
                    <div className="flex items-center space-x-2 text-sm sm:text-base">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm sm:text-base">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm sm:text-base">
                      <Users className="h-4 w-4 text-accent" />
                      <span>{event.participants} Expected</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Join Us */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 lg:mt-12"
          >
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 sm:p-8 rounded-3xl border-2 border-accent/20 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
                  JOIN US
                </h2>
                <p className="text-muted text-base lg:text-lg">
                  Be part of something extraordinary. Start your coding journey with Ground Zero Coders.
                </p>
              </div>

              {/* Form-like UI */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full h-10 sm:h-12 px-4 bg-secondary/50 rounded-lg border transition-colors focus:outline-none text-sm sm:text-base ${
                      errors.name ? 'border-red-500' : 'border-custom focus:border-accent'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full h-10 sm:h-12 px-4 bg-secondary/50 rounded-lg border transition-colors focus:outline-none text-sm sm:text-base ${
                      errors.email ? 'border-red-500' : 'border-custom focus:border-accent'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Preferred Domain
                  </label>
                  <select className="w-full h-10 sm:h-12 px-4 bg-secondary/50 rounded-lg border border-custom focus:border-accent transition-colors focus:outline-none text-sm sm:text-base">
                    <option value="">Select your preferred domain</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="ai-ml">AI/ML</option>
                    <option value="data-science">Data Science</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-accent text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Submit Application</span>
                  <ExternalLink className="h-5 w-5" />
                </motion.button>

                <p className="text-sm text-muted text-center">
                  This will redirect you to our Google Form to complete your application.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}