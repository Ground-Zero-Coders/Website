'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, User, Lock, Eye, EyeOff, ExternalLink, Menu, X } from 'lucide-react';
import { mentorService, projectService, menteeService, type Mentor, type Project, type Mentee } from '@/lib/supabase';
import { resourceService, type Resource } from '@/lib/supabase';


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

  // Check for existing login on component mount
  useEffect(() => {
    const savedMentor = localStorage.getItem('mentorSession');
    if (savedMentor) {
      try {
        const mentorData = JSON.parse(savedMentor);
        setCurrentMentor(mentorData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved mentor session:', error);
        localStorage.removeItem('mentorSession');
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const mentor = await mentorService.authenticate(loginData.mentorId, loginData.password);

      if (mentor) {
        setCurrentMentor(mentor);
        setIsLoggedIn(true);
        // Save mentor session to localStorage
        localStorage.setItem('mentorSession', JSON.stringify(mentor));
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
    // Remove mentor session from localStorage
    localStorage.removeItem('mentorSession');
  };

  if (!isLoggedIn) {
    return (
      <>
      <Navbar />
      <main className="bg-black min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Optional glowing background blur (can remove if too bright) */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl pointer-events-none"></div>

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
      {currentMentor && (
        <MentorDashboard mentor={currentMentor} onLogout={handleLogout} />
      )}
    </main>

  );
}

// Mentor Dashboard Component
function MentorDashboard({ mentor, onLogout }: { mentor: Mentor; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white dark:bg-[#0f172a] overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col relative`}>
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10 shadow-md"
        >
          {sidebarOpen ? <X className="h-4 w-4 text-gray-600 dark:text-gray-300" /> : <Menu className="h-4 w-4 text-gray-600 dark:text-gray-300" />}
        </button>

        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-[#00bcd4] dark:text-[#14b8a6]" />
            {sidebarOpen && (
              <div>
                <h2 className="font-space-grotesk font-bold text-black dark:text-white">Mentor Portal</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.name}</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '' },
            { id: 'teams', label: 'My Mentees', icon: '' },
            { id: 'projects', label: 'Projects', icon: '' },
            { id: 'add-project', label: 'Add Project', icon: '' },
            // { id: 'updates', label: 'Updates', icon: '' },
            { id: 'resources', label: 'Resources', icon: '' },
            { id: 'feedback', label: 'Feedback', icon: '' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-[#00bcd4] dark:bg-[#14b8a6] text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-[#00bcd4] dark:hover:text-[#14b8a6] hover:bg-[#00bcd4]/10 dark:hover:bg-[#14b8a6]/10'
              }`}
              title={!sidebarOpen ? item.label : ''}
            >
              <span>{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout Button at bottom of sidebar */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onLogout}
            className={`w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center ${sidebarOpen ? 'justify-center' : 'justify-center'}`}
            title={!sidebarOpen ? 'Logout' : ''}
          >
            {sidebarOpen ? 'Logout' : '🚪'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto min-w-0">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <div className="bg-gradient-to-r from-[#00bcd4]/10 to-[#00bcd4]/5 dark:from-[#14b8a6]/10 dark:to-[#14b8a6]/5 p-4 rounded-lg mb-4">
            <h1 className="font-space-grotesk text-lg md:text-xl font-bold text-[#00bcd4] dark:text-[#14b8a6]">
              Welcome, {mentor.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
              Ready to mentor and inspire the next generation of coders?
            </p>
          </div>
          <h2 className="font-space-grotesk text-xl md:text-2xl font-bold text-black dark:text-white">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'teams' && 'My Mentees'}
            {activeTab === 'projects' && 'My Projects'}
            {activeTab === 'add-project' && 'Add New Project'}
            {/* {activeTab === 'updates' && 'Updates & Meetings'} */}
            {activeTab === 'resources' && 'Resources'}
            {activeTab === 'feedback' && 'Weekly Feedback'}
          </h2>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {activeTab === 'dashboard' && <DashboardContent mentor={mentor} />}
          {activeTab === 'teams' && <TeamsContent mentor={mentor} />}
          {activeTab === 'projects' && <ProjectsContent mentor={mentor} />}
          {activeTab === 'add-project' && <AddProjectContent mentor={mentor} />}
          {/* {activeTab === 'updates' && <UpdatesContent />} */}
          {activeTab === 'resources' && <ResourcesContent />}
          {activeTab === 'feedback' && <FeedbackContent mentor={mentor} />}
        </div>
      </div>
    </div>
  );
}



function DashboardContent({ mentor }: { mentor: Mentor }) {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingMentees, setLoadingMentees] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch mentees
  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const data = await menteeService.getByMentorId(mentor.id);
        setMentees(data);
      } catch (error) {
        console.error('Failed to fetch mentees:', error);
      } finally {
        setLoadingMentees(false);
      }
    };

    fetchMentees();
  }, [mentor.id]);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getByMentorId(mentor.id);
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [mentor.id]);

  const activeProjects = projects.filter(p => p.status === 'in-progress');

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Total Teams', count: Math.ceil(mentees.length / 4) },

          { title: 'Active Projects', count: activeProjects.length },
          { title: 'Mentees', count: mentees.length }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-gray-900 p-6 rounded-xl border border-gray-700"
          >
            <h3 className="font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-3xl font-bold text-[#14b8a6]">
              {(item.title === 'Active Projects' && loadingProjects) ||
              (item.title === 'Mentees' && loadingMentees)
                ? '...'
                : item.count}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h3 className="font-space-grotesk text-xl font-semibold text-white mb-4">
          Welcome to Your Mentor Dashboard
        </h3>
        <p className="text-white/80 mb-4">
          Here you can manage your teams, track project progress, and stay updated with the latest announcements.
        </p>
        <div className="space-y-2 text-sm text-white">
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
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const data = await menteeService.getByMentorId(mentor.id);
        setMentees(data);
        
        // Initialize all groups as expanded
        const groups = data.reduce((acc, mentee) => {
          const groupName = mentee.group_name || 'Unassigned';
          acc[groupName] = false;
          return acc;
        }, {} as {[key: string]: boolean});
        setExpandedGroups(groups);
      } catch (error) {
        console.error('Error fetching mentees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, [mentor.id]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Group mentees by group_name
  const groupedMentees = mentees.reduce((acc, mentee) => {
    const groupName = mentee.group_name || 'Unassigned';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(mentee);
    return acc;
  }, {} as {[key: string]: Mentee[]});
  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Loading mentees...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-space-grotesk text-xl font-semibold text-white">
          My Mentees ({mentees.length})
        </h3>
        <div className="text-sm text-white/60">
          {Object.keys(groupedMentees).length} Group{Object.keys(groupedMentees).length !== 1 ? 's' : ''}
        </div>
      </div>

      {mentees.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/70">No mentees assigned yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedMentees)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([groupName, groupMentees]) => (

            <div key={groupName} className="bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(groupName)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#14b8a6]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#14b8a6] font-semibold text-lg">
                      {groupName.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-space-grotesk font-semibold text-white text-lg">
                      {groupName}
                    </h4>
                    <p className="text-sm text-white/60">
                      {groupMentees.length} member{groupMentees.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="text-white/60">
                  {expandedGroups[groupName] ? (
                    <svg className="w-5 h-5 transform rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Group Members */}
              {expandedGroups[groupName] && (
                <div className="border-t border-gray-700 p-6">
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {groupMentees.map((mentee) => (
                      <div
                        key={mentee.id}
                        className="bg-gray-800/50 p-4 rounded-lg border border-gray-600 hover:border-[#14b8a6]/30 transition-colors"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-[#14b8a6]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#14b8a6] font-semibold">
                              {mentee.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h5 className="font-space-grotesk font-semibold text-white text-sm">
                              {mentee.name}
                            </h5>
                            <p className="text-xs text-white/60">{mentee.domain || 'No domain'}</p>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs text-white/80">
                          <p className="truncate"><strong>Email:</strong> {mentee.email}</p>
                          <p><strong>GitHub:</strong> {mentee.github_id || 'Not provided'}</p>
                          <p><strong>Joined:</strong> {new Date(mentee.join_date).toLocaleDateString()}</p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs font-medium text-white/70">Status:</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                mentee.status === 'active'
                                  ? 'bg-green-500/20 text-green-300'
                                  : mentee.status === 'inactive'
                                  ? 'bg-red-500/20 text-red-300'
                                  : 'bg-blue-500/20 text-blue-300'
                              }`}
                            >
                              {mentee.status}
                            </span>
                          </div>
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
        <p className="text-white/70">No projects assigned yet.</p>
      </div>
    ) : (
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project: any) => (
          <div
            key={project.id}
            className="bg-gray-900 p-6 rounded-xl border border-gray-700 text-white"
          >
            <img
              src={
                project.image ||
                'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
              }
              alt={project.name}
              className="w-full h-32 object-cover rounded-lg mb-4 border border-gray-700"
            />

            <h3 className="font-space-grotesk text-lg font-semibold text-white mb-2">
              {project.name}
            </h3>

            <p className="text-white/70 text-sm mb-3">
              {project.description || 'No description available'}
            </p>

            <div className="space-y-1 text-sm text-white/90">
              <p><strong>Occasion:</strong> {project.occasion}</p>
              <p><strong>Date:</strong> {new Date(project.date).toLocaleDateString()}</p>
              <p><strong>Mentees:</strong> {project.mentee}</p>
              <p className="flex items-center">
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'completed'
                      ? 'bg-green-500/10 text-green-300'
                      : project.status === 'in-progress'
                      ? 'bg-yellow-500/10 text-yellow-300'
                      : 'bg-blue-500/10 text-blue-300'
                  }`}
                >
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

// Add Project Content
function AddProjectContent({ mentor }: { mentor: Mentor }) {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [selectedMentees, setSelectedMentees] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    github: '',
    mentee: '',
    mentor: mentor.name,
    mentor_id: mentor.id,
    date: '',
    group: '',
    description: '',
    image: '',
    occasion: '',
    status: 'completed'
  });

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const data = await menteeService.getByMentorId(mentor.id);
        setMentees(data);
      } catch (error) {
        console.error('Error fetching mentees:', error);
      }
    };

    fetchMentees();
  }, [mentor.id]);

  const handleMenteeSelection = (menteeId: string, menteeName: string) => {
    if (selectedMentees.includes(menteeId)) {
      // Remove mentee
      const updatedMentees = selectedMentees.filter(id => id !== menteeId);
      setSelectedMentees(updatedMentees);
      
      // Update form data
      const menteeNames = updatedMentees.map(id => {
        const mentee = mentees.find(m => m.id === id);
        return mentee ? mentee.name : '';
      }).filter(name => name);
      
      setFormData({ ...formData, mentee: menteeNames.join(', ') });
    } else {
      // Add mentee
      const updatedMentees = [...selectedMentees, menteeId];
      setSelectedMentees(updatedMentees);
      
      // Update form data
      const menteeNames = updatedMentees.map(id => {
        const mentee = mentees.find(m => m.id === id);
        return mentee ? mentee.name : '';
      }).filter(name => name);
      
      setFormData({ ...formData, mentee: menteeNames.join(', ') });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newProject = await projectService.create(formData);
      if (newProject) {
        alert('Project created successfully!');
        setFormData({
          name: '',
          github: '',
          mentee: '',
          mentor: mentor.name,
          mentor_id: mentor.id,
          date: '',
          group: '',
          description: '',
          image: '',
          occasion: '',
          status: 'completed'
        });
        setSelectedMentees([]);
      } else {
        alert('Failed to create project. Please try again.');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="font-space-grotesk text-xl font-semibold text-black dark:text-white mb-6">
          Add New Project
        </h3>
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
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
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-white dark:text-white"
              placeholder="https://github.com/..."
            />
          </div>
<div>
  <label className="block text-sm font-medium text-black dark:text-white mb-2">
    Select Mentee(s) *
  </label>

  <div className="relative">
    <button
      type="button"
      onClick={() => setShowDropdown(!showDropdown)}
      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-left flex justify-between items-center focus:outline-none text-white"
    >
      {selectedMentees.length > 0 ? `${selectedMentees.length} selected` : 'Select Mentees'}
      <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 14l-6-6h12l-6 6z" />
      </svg>
    </button>

    {showDropdown && (
      <div className="absolute z-50 w-full mt-1 max-h-64 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-3">
        {mentees.length === 0 ? (
          <p className="text-sm text-muted">No mentees available</p>
        ) : (
          mentees.map((mentee) => (
            <label
              key={mentee.id}
              className="flex items-center space-x-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedMentees.includes(mentee.id)}
                onChange={() => handleMenteeSelection(mentee.id, mentee.name)}
                className="w-4 h-4 text-accent border-gray-300 rounded"
              />
              <span className="text-sm text-black dark:text-white">
                {mentee.name} ({mentee.domain || 'No domain'})
              </span>
            </label>
          ))
        )}
      </div>
    )}
  </div>
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

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#00bcd4] dark:focus:border-[#14b8a6] transition-colors text-black dark:text-white"
              required
            >
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="planned">Planned</option>
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

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00bcd4] dark:bg-[#14b8a6] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Creating Project...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// // Updates Content
// function UpdatesContent() {
//   // For now, show placeholder updates since we don't have updates table yet
//   const updates = [
//     {
//       id: 'update-001',
//       title: 'Weekly Mentor-Core Team Sync',
//       date: '2024-02-28',
//       time: '10:00 AM',
//       description: 'Regular sync meeting to discuss mentee progress and upcoming projects',
//       priority: 'high',
//       location: 'Conference Room A',
//       participants: ['Core Team', 'All Mentors']
//     },
//     {
//       id: 'update-002',
//       title: 'Project Submission Deadline',
//       date: '2024-03-05',
//       time: '11:59 PM',
//       description: 'Final submission deadline for Q1 2024 projects',
//       priority: 'high'
//     }
//   ];

//   return (
//     <div className="space-y-4">
//       {updates.map((update: any) => (
//         <div key={update.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
//           <div className="flex items-start justify-between mb-3">
//             <h3 className="font-space-grotesk text-lg font-semibold text-black dark:text-white">
//               {update.title}
//             </h3>
//             <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//               update.priority === 'high' ? 'bg-red-100 text-red-800' :
//               update.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
//               'bg-green-100 text-green-800'
//             }`}>
//               {update.priority}
//             </span>
//           </div>
//           <p className="text-gray-600 dark:text-gray-400 mb-3">{update.description}</p>
//           <div className="flex items-center space-x-4 text-sm text-gray-500">
//             <span> {new Date(update.date).toLocaleDateString()}</span>
//             <span> {update.time}</span>
//             {update.location && <span>📍 {update.location}</span>}
//           </div>
//           {update.participants && (
//             <div className="mt-2 text-sm text-gray-500">
//               <strong>Participants:</strong> {update.participants.join(', ')}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// Resources Content
function ResourcesContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await resourceService.getAll();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);
  
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
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-white/70">Loading resources...</p>
      </div>
    );
  }
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
              ? 'bg-[#14b8a6] text-white shadow-lg'
              : 'bg-gray-800 text-white/70 hover:text-[#14b8a6] hover:bg-cyan-500/10 border border-gray-600'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>

    {/* Resources Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredResources.map((resource) => (
        <div
          key={resource.id}
          className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-space-grotesk text-lg font-semibold text-white mb-2 line-clamp-2">
              {resource.title}
            </h3>
            <span className="text-xs text-cyan-400 font-medium bg-cyan-500/10 px-2 py-1 rounded-full whitespace-nowrap ml-2">
              {resource.type}
            </span>
          </div>

          <p className="text-white/70 mb-4 text-sm line-clamp-3 leading-relaxed">
            {resource.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-white/60 capitalize bg-white/10 px-2 py-1 rounded">
              {resource.category.replace('-', ' ')}
            </span>
            <a
              href={resource.link}
              target={resource.is_external ? "_blank" : "_self"}
              rel={resource.is_external ? "noopener noreferrer" : ""}
              className="bg-[#14b8a6] text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 text-sm font-medium shadow-sm hover:shadow-md"
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
        <p className="text-white/60">No resources found in this category.</p>
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const feedbackData = {
        mentor_id: mentor.id,
        mentor_name: mentor.name,
        week_of: feedback.weekOf,
        team_progress: feedback.teamProgress,
        challenges: feedback.challenges,
        achievements: feedback.achievements,
        next_week_plans: feedback.nextWeekPlans,
        additional_notes: feedback.additionalNotes
      };

      const { feedbackService } = await import('@/lib/supabase');
      const result = await feedbackService.create(feedbackData);
      
      if (result) {
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
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className="w-full bg-[#00bcd4] dark:bg-[#14b8a6] text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Weekly Feedback'}
          </motion.button>
        </form>
      </div>
    </div>
  );
}