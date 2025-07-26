'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Calendar, User, Search, Filter, Code, ExternalLink, Loader2 } from 'lucide-react';
import { projectService, type Project } from '@/lib/supabase';

const categories = [
  'All',
  'Web Development',
  'Mobile Development',
  'Artificial Intelligence',
  'Blockchain',
  'Data Science',
  'IoT',
  'Data Visualization',
  'AR/VR',
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectService.getAll();
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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.mentor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.group === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold text-primary mb-6">
              Our Projects Portfolio
            </h1>
            <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto">
              Explore the innovative projects created by our talented community of developers, designers, and tech enthusiasts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-custom rounded-lg focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 flex-wrap">
              <Filter className="h-5 w-5 text-muted" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-accent text-white shadow-lg'
                        : 'bg-card text-muted hover:text-accent hover:bg-accent/10 border border-custom'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <p className="text-muted">
                  Showing {filteredProjects.length} of {projects.length} projects
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                      {project.group}
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
                        <User className="h-3 w-3 text-accent flex-shrink-0" />
                        <span className="text-muted line-clamp-1">
                          <span className="font-medium">Mentor:</span> {project.mentor}
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <User className="h-3 w-3 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted line-clamp-1">
                          <span className="font-medium">Mentees:</span> {project.mentee}
                        </span>
                      </div>
                      <p className="text-muted">
                        <span className="font-medium">Date:</span> {new Date(project.date).toLocaleDateString()}
                      </p>
                    </div>

                    {/* View Project Button */}
                    <div className="mt-4 pt-4 border-t border-custom">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center space-x-2 text-accent hover:text-white hover:bg-accent transition-all duration-300 py-2 rounded-lg border border-accent/20 hover:border-accent text-sm font-medium"
                        >
                          <span className="hidden sm:inline">View on GitHub</span>
                          <span className="sm:hidden">GitHub</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <button className="w-full flex items-center justify-center space-x-2 text-muted cursor-not-allowed py-2 rounded-lg border border-custom text-sm">
                          <span>No Repository</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
                ))}
              </div>

              {filteredProjects.length === 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <Code className="h-16 w-16 text-muted mx-auto mb-4" />
                  <h3 className="font-space-grotesk text-xl font-semibold text-primary mb-2">
                    No projects found
                  </h3>
                  <p className="text-muted">
                    Try adjusting your search terms or filter selection.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}