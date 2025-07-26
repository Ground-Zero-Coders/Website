'use client';

import React from 'react';
import Link from 'next/link';
import { Code, Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@groundzerocoders.org', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '#contact' },
    { name: 'Admin Portal', href: '/admin' },
  ];

  return (
<footer id="contact" className="bg-black text-white border-t border-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="grid md:grid-cols-4 gap-12">
      
      {/* Brand */}
      <div className="md:col-span-1">
        <Link href="/" className="flex items-center space-x-2 mb-6">
          <Code className="h-8 w-8 text-cyan-400" />
          <span className="font-space-grotesk font-bold text-xl text-white">
            Ground Zero Coders
          </span>
        </Link>
        <p className="text-gray-400 mb-6">
          Building the future of technology through innovation, collaboration, and continuous learning.
        </p>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="p-2 bg-gray-900 rounded-lg border border-gray-700 hover:border-cyan-400 hover:scale-110 transition-all duration-300 group"
              >
                <Icon className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-space-grotesk font-semibold text-lg text-white mb-6">
          Quick Links
        </h3>
        <ul className="space-y-3">
          {quickLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="font-space-grotesk font-semibold text-lg text-white mb-6">
          Contact Info
        </h3>
        <div className="space-y-3 text-gray-400">
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-cyan-400" />
            <span>Tech Campus, Innovation District</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-cyan-400" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-cyan-400" />
            <span>contact@groundzerocoders.org</span>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="font-space-grotesk font-semibold text-lg text-white mb-6">
          Stay Updated
        </h3>
        <p className="text-gray-400 mb-4">
          Subscribe to our newsletter for the latest updates and events.
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
          />
          <button className="bg-cyan-500 text-black px-6 py-2 rounded-r-lg hover:scale-105 transition-transform duration-300 font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </div>

    {/* Bottom */}
    <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500 text-sm">
        © 2024 Ground Zero Coders. All rights reserved.
      </p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
          Privacy Policy
        </Link>
        <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
          Terms of Service
        </Link>
      </div>
    </div>
  </div>
</footer>

  );
}