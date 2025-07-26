'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, User, Lock, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { mentorService, type Mentor } from '@/lib/supabase';
import { mentorResources, type Resource } from '@/data/resources';
import Navbar from '@/components/navbar'; 
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentMentor, setCurrentMentor] = useState<Mentor | null>(null);
  const [loginData, setLoginData] = useState({
    mentorId: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const mentor = await mentorService.authenticate(loginData.mentorId, loginData.password);

      if (mentor) {
        setCurrentMentor(mentor);
        setIsLoggedIn(true);
      } else {
        setLoginError('Invalid Mentor ID or Password');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentMentor(null);
    setLoginData({ mentorId: '', password: '' });
  };

  if (!isLoggedIn) {
    return (
      <>
      <Navbar />
      <main className="bg-white dark:bg-[#0f172a] min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00bcd4]/5 dark:from-[#14b8a6]/5 to-transparent"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-md w-full mx-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Shield className="h-10 w-10 text-[#00bcd4] dark:text-[#14b8a6]" />
                <h1 className="font-space-grotesk text-2xl font-bold text-black dark:text-white">
                  Mentor Portal
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Please login to access your mentor dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Mentor ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    value={loginData.mentorId}
                    onChange={(e) => setLoginData({ ...loginData, mentorId: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
                    placeholder="Enter your mentor ID"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#00bcd4] dark:hover:text-[#14b8a6] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                  {loginError}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00bcd4] dark:bg-[#14b8a6] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Login to Portal'}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Demo credentials: mentor-001 / sarah2024
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      </>
    );
  }

  return (
    <main className="bg-white dark:bg-[#0f172a] min-h-screen">
      {/* Import the dashboard component */}
      <MentorDashboard mentor={currentMentor} onLogout={handleLogout} />
    </main>
  );
}

// Mentor Dashboard Component
function MentorDashboard({ mentor, onLogout }: { mentor: Mentor; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-white dark:bg-[#0f172a]">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-[#00bcd4] dark:text-[#14b8a6]" />
            <div>
              <h2 className="font-space-grotesk font-bold text-black dark:text-white">Mentor Portal</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.name}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'teams', label: 'Teams', icon: '👥' },
            { id: 'projects', label: 'Projects', icon: '🚀' },
            { id: 'updates', label: 'Updates', icon: '📅' },
            { id: 'resources', label: 'Resources', icon: '📚' },
            { id: 'feedback', label: 'Feedback', icon: '💬' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-[#00bcd4] dark:bg-[#14b8a6] text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-[#00bcd4] dark:hover:text-[#14b8a6] hover:bg-[#00bcd4]/10 dark:hover:bg-[#14b8a6]/10'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button at bottom of sidebar */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onLogout}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="bg-gradient-to-r from-[#00bcd4]/10 to-[#00bcd4]/5 dark:from-[#14b8a6]/10 dark:to-[#14b8a6]/5 p-4 rounded-lg mb-4">
            <h1 className="font-space-grotesk text-xl font-bold text-[#00bcd4] dark:text-[#14b8a6]">
              Welcome, {mentor.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ready to mentor and inspire the next generation of coders?
            </p>
          </div>
          <h2 className="font-space-grotesk text-2xl font-bold text-black dark:text-white">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'teams' && 'My Teams'}
            {activeTab === 'projects' && 'My Projects'}
            {activeTab === 'updates' && 'Updates & Meetings'}
            {activeTab === 'resources' && 'Resources'}
            {activeTab === 'feedback' && 'Weekly Feedback'}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'dashboard' && <DashboardContent mentor={mentor} />}
          {activeTab === 'teams' && <TeamsContent mentor={mentor} />}
          {activeTab === 'projects' && <ProjectsContent mentor={mentor} />}
          {activeTab === 'updates' && <UpdatesContent />}
          {activeTab === 'resources' && <ResourcesContent />}
          {activeTab === 'feedback' && <FeedbackContent mentor={mentor} />}
        </div>
      </div>
    </div>
  );
}

// Dashboard Content
function DashboardContent({ mentor }: { mentor: Mentor }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-black dark:text-white mb-2">Total Teams</h3>
          <p className="text-3xl font-bold text-[#00bcd4] dark:text-[#14b8a6]">4</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-black dark:text-white mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-[#00bcd4] dark:text-[#14b8a6]">6</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-black dark:text-white mb-2">Mentees</h3>
          <p className="text-3xl font-bold text-[#00bcd4] dark:text-[#14b8a6]">16</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="font-space-grotesk text-xl font-semibold text-black dark:text-white mb-4">
          Welcome to Your Mentor Dashboard
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Here you can manage your teams, track project progress, and stay updated with the latest announcements.
        </p>
        <div className="space-y-2 text-sm">
          <p><strong>Department:</strong> {mentor.department}</p>
          <p><strong>Join Date:</strong> {new Date(mentor.join_date).toLocaleDateString()}</p>
          <p><strong>Email:</strong> {mentor.email}</p>
        </div>
      </div>
    </div>
  );
}

// Teams Content
function TeamsContent({ mentor }: { mentor: Mentor }) {
  // For now, show a placeholder since we don't have teams table yet

  return (
    <div className="text-center py-12">
      <p className="text-gray-600 dark:text-gray-400 mb-4">Teams management coming soon!</p>
      <p className="text-sm text-gray-500">This feature will be available once the teams table is implemented.</p>
    </div>
  );
}

// Projects Content
function ProjectsContent({ mentor }: { mentor: Mentor }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { projectService } = await import('@/lib/supabase');
        const data = await projectService.getByMentorId(mentor.id);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching mentor projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [mentor.id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No projects assigned yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project: any) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <img
                src={project.image || 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'}
                alt={project.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-space-grotesk text-lg font-semibold text-black dark:text-white mb-2">
                {project.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{project.description || 'No description available'}</p>
              <div className="space-y-1 text-sm">
                <p><strong>Occasion:</strong> {project.occasion}</p>
                <p><strong>Date:</strong> {new Date(project.date).toLocaleDateString()}</p>
                <p><strong>Mentees:</strong> {project.mentee}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Updates Content
function UpdatesContent() {
  // For now, show placeholder updates since we don't have updates table yet
  const updates = [
    {
      id: 'update-001',
      title: 'Weekly Mentor-Core Team Sync',
      date: '2024-02-28',
      time: '10:00 AM',
      description: 'Regular sync meeting to discuss mentee progress and upcoming projects',
      priority: 'high',
      location: 'Conference Room A',
      participants: ['Core Team', 'All Mentors']
    },
    {
      id: 'update-002',
      title: 'Project Submission Deadline',
      date: '2024-03-05',
      time: '11:59 PM',
      description: 'Final submission deadline for Q1 2024 projects',
      priority: 'high'
    }
  ];

  return (
    <div className="space-y-4">
      {updates.map((update: any) => (
        <div key={update.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-space-grotesk text-lg font-semibold text-black dark:text-white">
              {update.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              update.priority === 'high' ? 'bg-red-100 text-red-800' :
              update.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {update.priority}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-3">{update.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>📅 {new Date(update.date).toLocaleDateString()}</span>
            <span>🕒 {update.time}</span>
            {update.location && <span>📍 {update.location}</span>}
          </div>
          {update.participants && (
            <div className="mt-2 text-sm text-gray-500">
              <strong>Participants:</strong> {update.participants.join(', ')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Resources Content
function ResourcesContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'guidelines', label: 'Guidelines' },
    { id: 'templates', label: 'Templates' },
    { id: 'assessment', label: 'Assessment' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'training', label: 'Training' },
    { id: 'tools', label: 'Tools' }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? mentorResources 
    : mentorResources.filter(resource => resource.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-accent text-white shadow-lg'
                : 'bg-card text-muted hover:text-accent hover:bg-accent/10 border border-custom'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-card p-6 rounded-xl border border-custom shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-space-grotesk text-lg font-semibold text-primary mb-2 line-clamp-2">
                {resource.title}
              </h3>
              <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                {resource.type}
              </span>
            </div>
            
            <p className="text-muted mb-4 text-sm line-clamp-3 leading-relaxed">
              {resource.description}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs text-muted capitalize bg-secondary/10 px-2 py-1 rounded">
                {resource.category.replace('-', ' ')}
              </span>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 text-sm font-medium shadow-sm hover:shadow-md"
              >
                <span className="hidden sm:inline">Open</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No resources found in this category.</p>
        </div>
      )}
    </div>
  );
}

// Feedback Content
function FeedbackContent({ mentor }: { mentor: Mentor }) {
  const [feedback, setFeedback] = useState({
    weekOf: '',
    teamProgress: '',
    challenges: '',
    achievements: '',
    nextWeekPlans: '',
    additionalNotes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    console.log('Feedback submitted by', mentor.name, ':', feedback);
    alert('Weekly feedback submitted successfully!');
    // Reset form
    setFeedback({
      weekOf: '',
      teamProgress: '',
      challenges: '',
      achievements: '',
      nextWeekPlans: '',
      additionalNotes: ''
    });
  };

  return (
    <div className="max-w-4xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="font-space-grotesk text-xl font-semibold text-black dark:text-white mb-6">
          Weekly Feedback Report
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Week Of
            </label>
            <input
              type="date"
              value={feedback.weekOf}
              onChange={(e) => setFeedback({ ...feedback, weekOf: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Team Progress Summary
            </label>
            <textarea
              value={feedback.teamProgress}
              onChange={(e) => setFeedback({ ...feedback, teamProgress: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors resize-none text-black dark:text-white"
              placeholder="Describe the overall progress of your teams this week..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Challenges Faced
            </label>
            <textarea
              value={feedback.challenges}
              onChange={(e) => setFeedback({ ...feedback, challenges: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors resize-none text-black dark:text-white"
              placeholder="What challenges did your mentees face this week?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Key Achievements
            </label>
            <textarea
              value={feedback.achievements}
              onChange={(e) => setFeedback({ ...feedback, achievements: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors resize-none text-black dark:text-white"
              placeholder="Highlight the major achievements and milestones..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Next Week Plans
            </label>
            <textarea
              value={feedback.nextWeekPlans}
              onChange={(e) => setFeedback({ ...feedback, nextWeekPlans: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors resize-none text-black dark:text-white"
              placeholder="What are the plans and goals for next week?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Additional Notes
            </label>
            <textarea
              value={feedback.additionalNotes}
              onChange={(e) => setFeedback({ ...feedback, additionalNotes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors resize-none text-black dark:text-white"
              placeholder="Any additional feedback or concerns..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#00bcd4] dark:bg-[#14b8a6] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Submit Weekly Feedback
          </motion.button>
        </form>
      </div>
    </div>
  );
}