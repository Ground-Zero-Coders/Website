'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Lock, Eye, EyeOff, Plus, MessageSquare, FolderPlus, Users, Calendar, Settings, LogOut } from 'lucide-react';
import { adminService, feedbackService, projectService, mentorService, type Admin, type Feedback, type Project, type Mentor } from '@/lib/supabase';

export default function AdminDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [loginData, setLoginData] = useState({
    adminId: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const admin = await adminService.authenticate(loginData.adminId, loginData.password);

      if (admin) {
        setCurrentAdmin(admin);
        setIsLoggedIn(true);
      } else {
        setLoginError('Invalid Admin ID or Password');
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
    setCurrentAdmin(null);
    setLoginData({ adminId: '', password: '' });
  };

  if (!isLoggedIn) {
    return (
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
                  Admin Portal
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Please login to access the admin dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Admin ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    value={loginData.adminId}
                    onChange={(e) => setLoginData({ ...loginData, adminId: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
                    placeholder="Enter your admin ID"
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
                {isLoading ? 'Logging in...' : 'Login to Admin Portal'}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Demo credentials: admin-001 / admin2024
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-white dark:bg-[#0f172a] min-h-screen">
      <AdminDashboard admin={currentAdmin} onLogout={handleLogout} />
    </main>
  );
}

// Admin Dashboard Component
function AdminDashboard({ admin, onLogout }: { admin: Admin; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-white dark:bg-[#0f172a]">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-[#00bcd4] dark:text-[#14b8a6]" />
            <div>
              <h2 className="font-space-grotesk font-bold text-black dark:text-white">Admin Portal</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{admin.name}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'feedback', label: 'Feedback Panel', icon: '💬' },
            { id: 'projects', label: 'Project Manager', icon: '🚀' },
            { id: 'teams', label: 'Team Manager', icon: '👥', disabled: true },
            { id: 'meetings', label: 'Meeting Scheduler', icon: '📅', disabled: true },
            { id: 'mentors', label: 'Mentor Assignment', icon: '🎓', disabled: true },
            { id: 'settings', label: 'Settings', icon: '⚙️', disabled: true },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => !item.disabled && setActiveTab(item.id)}
              disabled={item.disabled}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-[#00bcd4] dark:bg-[#14b8a6] text-white'
                  : item.disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-400 hover:text-[#00bcd4] dark:hover:text-[#14b8a6] hover:bg-[#00bcd4]/10 dark:hover:bg-[#14b8a6]/10'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {item.disabled && <span className="text-xs">(Soon)</span>}
            </button>
          ))}
        </nav>

        {/* Logout Button at bottom of sidebar */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onLogout}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="bg-gradient-to-r from-[#00bcd4]/10 to-[#00bcd4]/5 dark:from-[#14b8a6]/10 dark:to-[#14b8a6]/5 p-4 rounded-lg mb-4">
            <h1 className="font-space-grotesk text-xl font-bold text-[#00bcd4] dark:text-[#14b8a6]">
              Welcome, {admin.name}! 🛡️
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Manage Ground Zero Coders with full administrative control
            </p>
          </div>
          <h2 className="font-space-grotesk text-2xl font-bold text-black dark:text-white">
            {activeTab === 'dashboard' && 'Admin Dashboard'}
            {activeTab === 'feedback' && 'Feedback Panel'}
            {activeTab === 'projects' && 'Project Manager'}
            {activeTab === 'teams' && 'Team Manager'}
            {activeTab === 'meetings' && 'Meeting Scheduler'}
            {activeTab === 'mentors' && 'Mentor Assignment'}
            {activeTab === 'settings' && 'Settings'}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'dashboard' && <AdminDashboardContent admin={admin} />}
          {activeTab === 'feedback' && <FeedbackPanelContent />}
          {activeTab === 'projects' && <ProjectManagerContent />}
          {activeTab === 'teams' && <ComingSoonContent feature="Team Manager" />}
          {activeTab === 'meetings' && <ComingSoonContent feature="Meeting Scheduler" />}
          {activeTab === 'mentors' && <ComingSoonContent feature="Mentor Assignment" />}
          {activeTab === 'settings' && <ComingSoonContent feature="Settings" />}
        </div>
      </div>
    </div>
  );
}

// Admin Dashboard Content
function AdminDashboardContent({ admin }: { admin: Admin }) {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalMentors: 0,
    totalFeedback: 0,
    activeProjects: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, mentors, feedback] = await Promise.all([
          projectService.getAll(),
          mentorService.getAll(),
          feedbackService.getAll()
        ]);

        setStats({
          totalProjects: projects.length,
          totalMentors: mentors.length,
          totalFeedback: feedback.length,
          activeProjects: projects.filter(p => p.status === 'in-progress').length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-black dark:text-white mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-[#00bcd4] dark:text-[#14b8a6]">{stats.totalProjects}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-black dark:text-white mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-green-500">{stats.activeProjects}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-black dark:text-white mb-2">Total Mentors</h3>
          <p className="text-3xl font-bold text-blue-500">{stats.totalMentors}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-black dark:text-white mb-2">Feedback Messages</h3>
          <p className="text-3xl font-bold text-purple-500">{stats.totalFeedback}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="font-space-grotesk text-xl font-semibold text-black dark:text-white mb-4">
          Admin Dashboard Overview
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Welcome to the Ground Zero Coders Admin Portal. Here you can manage all aspects of the organization including projects, mentors, feedback, and more.
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-black dark:text-white mb-2">Available Features:</h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Feedback Panel - View mentor feedback</li>
              <li>• Project Manager - Add new projects</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-black dark:text-white mb-2">Coming Soon:</h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Team Manager</li>
              <li>• Meeting Scheduler</li>
              <li>• Mentor Assignment</li>
              <li>• Advanced Settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feedback Panel Content
function FeedbackPanelContent() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await feedbackService.getAll();
        setFeedback(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Loading feedback...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-space-grotesk text-xl font-semibold text-black dark:text-white">
          Mentor Feedback Messages
        </h3>
        <span className="bg-[#00bcd4]/10 dark:bg-[#14b8a6]/10 text-[#00bcd4] dark:text-[#14b8a6] px-3 py-1 rounded-full text-sm font-medium">
          {feedback.length} Messages
        </span>
      </div>

      {feedback.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No feedback messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {feedback.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-space-grotesk font-semibold text-black dark:text-white">
                    {item.mentor_name}
                  </h4>
                  <p className="text-sm text-gray-500">ID: {item.mentor_id}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Week of {new Date(item.week_of).toLocaleDateString()}</p>
                  <p>{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Project Manager Content
function ProjectManagerContent() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    github: '',
    mentee: '',
    mentor: '',
    mentor_id: '',
    date: '',
    group: '',
    description: '',
    image: '',
    occasion: '',
    status: 'completed'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorsData, projectsData] = await Promise.all([
          mentorService.getAll(),
          projectService.getAll()
        ]);
        setMentors(mentorsData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProject = await projectService.create(formData);
      if (newProject) {
        setProjects([newProject, ...projects]);
        setFormData({
          name: '',
          github: '',
          mentee: '',
          mentor: '',
          mentor_id: '',
          date: '',
          group: '',
          description: '',
          image: '',
          occasion: '',
          status: 'completed'
        });
        setShowForm(false);
        alert('Project created successfully!');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    }
  };

  const handleMentorChange = (mentorId: string) => {
    const selectedMentor = mentors.find(m => m.id === mentorId);
    if (selectedMentor) {
      setFormData({
        ...formData,
        mentor_id: mentorId,
        mentor: selectedMentor.name
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-space-grotesk text-xl font-semibold text-black dark:text-white">
          Project Management
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#00bcd4] dark:bg-[#14b8a6] text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="font-space-grotesk text-lg font-semibold text-black dark:text-white mb-4">
            Add New Project
          </h4>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                GitHub Repository
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Mentee(s) *
              </label>
              <input
                type="text"
                value={formData.mentee}
                onChange={(e) => setFormData({ ...formData, mentee: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
                placeholder="John Doe, Jane Smith"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Mentor *
              </label>
              <select
                value={formData.mentor_id}
                onChange={(e) => handleMentorChange(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
                required
              >
                <option value="">Select a mentor</option>
                {mentors.map((mentor) => (
                  <option key={mentor.id} value={mentor.id}>
                    {mentor.name} ({mentor.department})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Project Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Category *
              </label>
              <select
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
                required
              >
                <option value="">Select category</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Data Science">Data Science</option>
                <option value="Blockchain">Blockchain</option>
                <option value="IoT">IoT</option>
                <option value="Data Visualization">Data Visualization</option>
                <option value="AR/VR">AR/VR</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors resize-none text-black dark:text-white"
                placeholder="Brief description of the project..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
                placeholder="https://images.pexels.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Occasion
              </label>
              <input
                type="text"
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
                placeholder="Hackathon 2024, Workshop, etc."
              />
            </div>

            <div className="md:col-span-2 flex space-x-4">
              <button
                type="submit"
                className="bg-[#00bcd4] dark:bg-[#14b8a6] text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 font-medium"
              >
                Create Project
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="font-space-grotesk text-lg font-semibold text-black dark:text-white mb-4">
          Recent Projects ({projects.length})
        </h4>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {projects.slice(0, 10).map((project) => (
            <div key={project.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <img
                src={project.image || 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                alt={project.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h5 className="font-semibold text-black dark:text-white">{project.name}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {project.mentor} • {project.group}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(project.date).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.status === 'completed' ? 'bg-green-100 text-green-800' :
                project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Coming Soon Content
function ComingSoonContent({ feature }: { feature: string }) {
  return (
    <div className="text-center py-16">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
        <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="font-space-grotesk text-xl font-semibold text-black dark:text-white mb-2">
          {feature} Coming Soon
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          This feature is currently under development and will be available in a future update.
        </p>
      </div>
    </div>
  );
}