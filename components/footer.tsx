'use client';

import React from 'react';
import Link from 'next/link';
import { Code, Github, Mail } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: 'https://www.github.com/Ground-Zero-Coders', label: 'GitHub' },
    { icon: FaWhatsapp, href: 'https://chat.whatsapp.com/Ehvmi4sPlu12xGBQHusxHl', label: 'Whatsapp Community' },
    { icon: Mail, href: 'mailto:groundzerocoders@gmail.com', label: 'Email' },
    { icon: FaInstagram, href: 'https://www.instagram.com/groundzerocoders', label: 'Instagram' },
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
    <footer id="contact" className="relative bg-black text-white border-t border-gray-800 overflow-hidden">
      {/* === Background Effects === */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/10 to-transparent rounded-full"></div>
      </div>

      {/* === Grid Pattern === */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* === Main Footer Content === */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center md:text-left justify-items-center md:justify-items-start">
          {/* === Brand Section === */}
          <div>
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-2 mb-6">
              <Code className="h-8 w-8 text-cyan-400" />
              <span className="font-space-grotesk font-bold text-xl text-white">
                Ground Zero Coders
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Building the future of technology through innovation, collaboration, and continuous learning.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 bg-gray-900 rounded-lg border border-gray-700 hover:border-cyan-400 hover:scale-110 transition-all duration-300 group"
                    target="_blank" rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* === Quick Links Section === */}
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

          {/* === Contact Info Section === */}
          <div>
            <h3 className="font-space-grotesk font-semibold text-lg text-white mb-6">
              Contact Info
            </h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="h-5 w-5 text-cyan-400" />
                <span>groundzerocoders@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* === Footer Bottom === */}
        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2025 Ground Zero Coders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
