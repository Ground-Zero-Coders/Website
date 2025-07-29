'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Lock, Eye, EyeOff, Plus, MessageSquare, FolderPlus, Users, Calendar, Settings, LogOut, Menu, X } from 'lucide-react';
import { feedbackService, projectService, mentorService, menteeService, type Feedback, type Project, type Mentor, type Mentee } from '@/lib/supabase';
import { adminService, type Admin } from '@/lib/supabase';



import Navbar from '@/components/navbar'; 

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

  // Check for existing login on component mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminSession');
    if (savedAdmin) {
      try {
        const adminData = JSON.parse(savedAdmin);
        setCurrentAdmin(adminData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved admin session:', error);
        localStorage.removeItem('adminSession');
      }
    }
  }, []);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      // Check for hardcoded test admin first
      if (loginData.adminId === 'Harsimran7765' && loginData.password === 'Hr626264') {
        const testAdmin = {
          id: 'Harsimran7765',
          name: 'Harsimran Singh',
          email: 'HarsimranSingh7765@gmail.com',
          role: 'admin',
          created_at: new Date().toISOString(),
          password: 'Hr626264'
        };
        setCurrentAdmin(testAdmin);
        setIsLoggedIn(true);
        localStorage.setItem('adminSession', JSON.stringify(testAdmin));
        return;
      }

      const admin = await adminService.authenticate(loginData.adminId, loginData.password);

      if (admin) {
        setCurrentAdmin(admin);
        setIsLoggedIn(true);
        // Save admin session to localStorage
        localStorage.setItem('adminSession', JSON.stringify(admin));
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
    // Remove admin session from localStorage
    localStorage.removeItem('adminSession');
  };

  if (!isLoggedIn) {
    return (
      <>
      <Navbar/>
      <main className="bg-black min-h-screen flex items-center justify-center relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-md w-full mx-4"
        >
          <div className="glass-effect rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Shield className="h-10 w-10 text-red-400" />
                <h1 className="font-space-grotesk text-2xl font-bold text-white">
                  Admin Portal
                </h1>
              </div>
              <p className="text-gray-400">
                Please login to access the admin dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Admin ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={loginData.adminId}
                    onChange={(e) => setLoginData({ ...loginData, adminId: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:border-red-400 transition-colors text-white"
                    placeholder="Enter your admin ID"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:border-red-400 transition-colors text-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-lg border border-red-800">
                  {loginError}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Login to Admin Portal'}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      </>
    );
  }

  return (
    <main className="bg-black min-h-screen">
      {currentAdmin && <AdminDashboard admin={currentAdmin} onLogout={handleLogout} />}
    </main>
  );
}

// Admin Dashboard Component
function AdminDashboard({ admin, onLogout }: { admin: Admin; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 flex flex-col relative`}>
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-6 bg-gray-800 border border-gray-700 rounded-full p-1.5 hover:bg-gray-700 transition-colors z-10"
        >
          {sidebarOpen ? <X className="h-4 w-4 text-white" /> : <Menu className="h-4 w-4 text-white" />}
        </button>

        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-red-400" />
            {sidebarOpen && (
              <div>
                <h2 className="font-space-grotesk font-bold text-white">Admin Portal</h2>
                <p className="text-sm text-gray-400">{admin.name}</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '' },
            { id: 'feedback', label: 'Feedback Panel', icon: '' },
            { id: 'projects', label: 'Project Manager', icon: '' },
            { id: 'mentees', label: 'Mentee Manager', icon: '' },
            { id: 'meetings', label: 'Meeting Scheduler', icon: '', disabled: true },
            { id: 'mentors', label: 'Mentor Assignment', icon: '', disabled: true },
            { id: 'settings', label: 'Settings', icon: '', disabled: true },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => !item.disabled && setActiveTab(item.id)}
              disabled={item.disabled}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : item.disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
              }`}
              title={!sidebarOpen ? item.label : ''}
            >
              <span>{item.icon}</span>
              {sidebarOpen && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {item.disabled && <span className="text-xs">(Soon)</span>}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button at bottom of sidebar */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={onLogout}
            className={`w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center ${sidebarOpen ? 'justify-center space-x-2' : 'justify-center'}`}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto min-w-0">
        {/* Header */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 p-4 md:p-6">
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/5 p-4 rounded-lg mb-4">
            <h1 className="font-space-grotesk text-lg md:text-xl font-bold text-red-400">
              Welcome, {admin.name}! 🛡️
            </h1>
            <p className="text-gray-400 text-xs md:text-sm">
              Manage Ground Zero Coders with full administrative control
            </p>
          </div>
          <h2 className="font-space-grotesk text-xl md:text-2xl font-bold text-white">
            {activeTab === 'dashboard' && 'Admin Dashboard'}
            {activeTab === 'feedback' && 'Feedback Panel'}
            {activeTab === 'projects' && 'Project Manager'}
            {activeTab === 'mentees' && 'Mentee Manager'}
            {activeTab === 'meetings' && 'Meeting Scheduler'}
            {activeTab === 'mentors' && 'Mentor Assignment'}
            {activeTab === 'settings' && 'Settings'}
          </h2>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {activeTab === 'dashboard' && <AdminDashboardContent admin={admin} />}
          {activeTab === 'feedback' && <FeedbackPanelContent />}
          {activeTab === 'projects' && <ProjectManagerContent />}
          {activeTab === 'mentees' && <MenteeManagerContent />}
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
    totalMentees: 0,
    totalFeedback: 0,
    activeProjects: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, mentors, mentees, feedback] = await Promise.all([
          projectService.getAll(),
          mentorService.getAll(),
          menteeService.getAll(),
          feedbackService.getAll()
        ]);

        setStats({
          totalProjects: projects.length,
          totalMentors: mentors.length,
          totalMentees: mentees.length,
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
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold text-white mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-cyan-400">{stats.totalProjects}</p>
        </div>
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold text-white mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-green-500">{stats.activeProjects}</p>
        </div>
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold text-white mb-2">Total Mentors</h3>
          <p className="text-3xl font-bold text-blue-500">{stats.totalMentors}</p>
        </div>
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold text-white mb-2">Total Mentees</h3>
          <p className="text-3xl font-bold text-purple-500">{stats.totalMentees}</p>
        </div>
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold text-white mb-2">Feedback Messages</h3>
          <p className="text-3xl font-bold text-orange-500">{stats.totalFeedback}</p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <h3 className="font-space-grotesk text-xl font-semibold text-white mb-4">
          Admin Dashboard Overview
        </h3>
        <p className="text-gray-400 mb-4">
          Welcome to the Ground Zero Coders Admin Portal. Here you can manage all aspects of the organization including projects, mentors, feedback, and more.
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-2">Available Features:</h4>
            <ul className="space-y-1 text-gray-400">
              <li>• Feedback Panel - View mentor feedback</li>
              <li>• Project Manager - Add new projects</li>
              <li>• Mentee Manager - Manage mentees and assignments</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Coming Soon:</h4>
            <ul className="space-y-1 text-gray-400">
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

    // Set up real-time polling every 5 seconds
    const interval = setInterval(fetchFeedback, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading feedback...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-space-grotesk text-xl font-semibold text-white">
          Mentor Feedback Messages
        </h3>
        <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
          {feedback.length} Messages
        </span>
      </div>

      {feedback.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No feedback messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {feedback.map((item) => (
            <div key={item.id} className="glass-card p-6 rounded-xl">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-space-grotesk font-semibold text-white">
                    {item.mentor_name}
                  </h4>
                  <p className="text-sm text-gray-500">ID: {item.mentor_id}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Week of {new Date(item.week_of).toLocaleDateString()}</p>
                  <p>{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="space-y-3 text-gray-400 text-sm">
                <div>
                  <span className="font-semibold text-white">Progress:</span> {item.team_progress}
                </div>
                {item.challenges && (
                  <div>
                    <span className="font-semibold text-white">Challenges:</span> {item.challenges}
                  </div>
                )}
                {item.achievements && (
                  <div>
                    <span className="font-semibold text-white">Achievements:</span> {item.achievements}
                  </div>
                )}
                {item.next_week_plans && (
                  <div>
                    <span className="font-semibold text-white">Next Week:</span> {item.next_week_plans}
                  </div>
                )}
                {item.additional_notes && (
                  <div>
                    <span className="font-semibold text-white">Notes:</span> {item.additional_notes}
                  </div>
                )}
              </div>
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
        <h3 className="font-space-grotesk text-xl font-semibold text-white">
          Project Management
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 rounded-xl">
          <h4 className="font-space-grotesk text-lg font-semibold text-white mb-4">
            Add New Project
          </h4>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                GitHub Repository
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
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
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 font-medium"
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

      <div className="glass-card p-6 rounded-xl">
        <h4 className="font-space-grotesk text-lg font-semibold text-white mb-4">
          Recent Projects ({projects.length})
        </h4>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {projects.slice(0, 10).map((project) => (
            <div key={project.id} className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg">
              <img
                src={project.image || 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                alt={project.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h5 className="font-semibold text-white">{project.name}</h5>
                <p className="text-sm text-gray-400">
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

// Mentee Manager Content
function MenteeManagerContent() {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [groupedMentees, setGroupedMentees] = useState<{[key: string]: Mentee[]}>({});
  const [expandedGroups, setExpandedGroups] = useState<{[key: string]: boolean}>({});
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMentee, setEditingMentee] = useState<Mentee | null>(null);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  group_name: '',
  mentor_id: '',
  mentor_name: '',
  domain: '',
  github_id: '',
  status: 'active',
  join_date: new Date().toISOString().split("T")[0], // 👈 This adds today's date in YYYY-MM-DD
});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menteesData, mentorsData] = await Promise.all([
          menteeService.getAll(),
          mentorService.getAll()
        ]);
        setMentees(menteesData);
        setMentors(mentorsData);
        
        // Group mentees by group_name
        const grouped = menteesData.reduce((acc, mentee) => {
          const groupName = mentee.group_name || 'Unassigned';
          if (!acc[groupName]) {
            acc[groupName] = [];
          }
          acc[groupName].push(mentee);
          return acc;
        }, {} as {[key: string]: Mentee[]});
        
        setGroupedMentees(grouped);
        
        // Initialize all groups as expanded
        const initialExpanded = Object.keys(grouped).reduce((acc, groupName) => {
          acc[groupName] = false;
          return acc;
        }, {} as {[key: string]: boolean});
        setExpandedGroups(initialExpanded);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMentee) {
        const updatedMentee = await menteeService.update(editingMentee.id, formData);
        if (updatedMentee) {
          setMentees(mentees.map(m => m.id === editingMentee.id ? updatedMentee : m));
          alert('Mentee updated successfully!');
          resetForm();
        }
      } else {
        const newMentee = await menteeService.create(formData);
        if (newMentee) {
          setMentees([newMentee, ...mentees]);
          alert('Mentee created successfully!');
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error saving mentee:', error);
      alert('Failed to save mentee. Please try again.');
    }
  };

const handleEdit = (mentee: Mentee) => {
  setEditingMentee(mentee);
  setFormData({
    name: mentee.name,
    email: mentee.email,
    group_name: mentee.group_name || '',
    mentor_id: mentee.mentor_id || '',
    mentor_name: mentee.mentor_name || '',
    domain: mentee.domain || '',
    github_id: mentee.github_id || '',
    status: mentee.status,
    join_date: mentee.join_date || new Date().toISOString().split("T")[0]
  });
  setShowForm(true);
};


  const handleDelete = async (mentee: Mentee) => {
    if (confirm(`Are you sure you want to delete ${mentee.name}?`)) {
      const success = await menteeService.delete(mentee.id);
      if (success) {
        setMentees(mentees.filter(m => m.id !== mentee.id));
        alert('Mentee deleted successfully!');
      } else {
        alert('Failed to delete mentee.');
      }
    }
  };

  const handleMentorChange = (mentorId: string) => {
    const selectedMentor = mentors.find(m => m.id === mentorId);
    setFormData({
      ...formData,
      mentor_id: mentorId,
      mentor_name: selectedMentor?.name || ''
    });
  };

const resetForm = () => {
  setFormData({
    name: '',
    email: '',
    group_name: '',
    mentor_id: '',
    mentor_name: '',
    domain: '',
    github_id: '',
    status: 'active',
    join_date: new Date().toISOString().split("T")[0]
  });
  setEditingMentee(null);
  setShowForm(false);
};


  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading mentees...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-space-grotesk text-xl font-semibold text-white">
          Mentee Management
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Mentee</span>
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 rounded-xl">
          <h4 className="font-space-grotesk text-lg font-semibold text-white mb-4">
            {editingMentee ? 'Edit Mentee' : 'Add New Mentee'}
          </h4>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Group/Team Name
              </label>
              <input
                type="text"
                value={formData.group_name}
                onChange={(e) => setFormData({ ...formData, group_name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                placeholder="Web Warriors, AI Pioneers, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Assign Mentor
              </label>
              <select
                value={formData.mentor_id}
                onChange={(e) => handleMentorChange(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
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
              <label className="block text-sm font-medium text-white mb-2">
                Domain/Specialization
              </label>
              <input
                type="text"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                placeholder="Frontend Development, AI/ML, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                GitHub Username
              </label>
              <input
                type="text"
                value={formData.github_id}
                onChange={(e) => setFormData({ ...formData, github_id: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                placeholder="github-username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
              </select>
            </div>

            <div className="md:col-span-2 flex space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 font-medium"
              >
                {editingMentee ? 'Update Mentee' : 'Create Mentee'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card p-6 rounded-xl">
        <h4 className="font-space-grotesk text-lg font-semibold text-white mb-4">
          All Mentees ({mentees.length})
        </h4>
        
        {Object.keys(groupedMentees).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No mentees found.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {Object.entries(groupedMentees)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([groupName, groupMentees]) => (

              <div key={groupName} className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(groupName)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-semibold">
                        {groupName.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <h5 className="font-space-grotesk font-semibold text-white text-lg">
                        {groupName}
                      </h5>
                      <p className="text-sm text-gray-400">
                        {groupMentees.length} member{groupMentees.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {expandedGroups[groupName] ? '▼' : '▶'}
                  </div>
                </button>

                {/* Group Members */}
                {expandedGroups[groupName] && (
                  <div className="border-t border-gray-700">
                    <div className="space-y-2 p-4">
                      {groupMentees.map((mentee) => (
                        <div key={mentee.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                              <span className="text-cyan-400 font-semibold text-sm">
                                {mentee.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h6 className="font-semibold text-white text-sm">{mentee.name}</h6>
                              <p className="text-xs text-gray-400">
                                {mentee.domain || 'No domain'} • {mentee.mentor_name || 'No mentor assigned'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(mentee.join_date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              mentee.status === 'active' ? 'bg-green-500/10 text-green-300' :
                              mentee.status === 'inactive' ? 'bg-red-500/10 text-red-300' :
                              'bg-blue-500/10 text-blue-300'
                            }`}>
                              {mentee.status}
                            </span>
                            <button
                              onClick={() => handleEdit(mentee)}
                              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(mentee)}
                              className="text-red-400 hover:text-red-300 transition-colors text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Coming Soon Content
function ComingSoonContent({ feature }: { feature: string }) {
  return (
    <div className="text-center py-16">
      <div className="glass-card p-8 rounded-xl max-w-md mx-auto">
        <Settings className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <h3 className="font-space-grotesk text-xl font-semibold text-white mb-2">
          {feature} Coming Soon
        </h3>
        <p className="text-gray-400">
          This feature is currently under development and will be available in a future update.
        </p>
      </div>
    </div>
  );
}