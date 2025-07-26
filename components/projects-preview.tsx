'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Code, Loader2 } from 'lucide-react';
import { projectService, type Project } from '@/lib/supabase';

export default function ProjectsPreview() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectService.getFeatured(4);
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-muted text-base lg:text-lg max-w-2xl mx-auto">
            Discover the innovative projects built by our talented community
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="ml-2 text-muted">Loading projects...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-accent hover:underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-custom hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Project Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={project.image || 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-accent text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Code className="h-4 w-4" />
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center space-x-2 text-accent text-sm font-medium mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{project.occasion || 'Project'}</span>
                  </div>
                  
                  <h3 className="font-space-grotesk font-bold text-base sm:text-lg text-primary mb-2 group-hover:text-accent transition-colors line-clamp-1">
                    {project.name}
                  </h3>
                  
                  <p className="text-muted text-sm mb-4 line-clamp-2">
                    {project.description || 'No description available'}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3 text-accent" />
                      <span className="text-muted line-clamp-1">
                        <span className="font-medium">Mentor:</span> {project.mentor}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3 text-accent" />
                      <span className="text-muted line-clamp-1">
                        <span className="font-medium">Mentees:</span> {project.mentee}
                      </span>
                    </div>
                    <p className="text-muted">
                      <span className="font-medium">Date:</span> {new Date(project.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        )}

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          {!loading && !error && (
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 bg-accent text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <span>View All Projects</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}