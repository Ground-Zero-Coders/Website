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
    <footer id="contact" className="bg-secondary/30 border-t border-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Code className="h-8 w-8 text-accent" />
              <span className="font-space-grotesk font-bold text-xl text-primary">
                Ground Zero Coders
              </span>
            </Link>
            <p className="text-muted mb-6">
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
                    className="p-2 bg-card rounded-lg border border-custom hover:border-accent hover:scale-110 transition-all duration-300 group"
                  >
                    <Icon className="h-5 w-5 text-muted group-hover:text-accent transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-space-grotesk font-semibold text-lg text-primary mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-space-grotesk font-semibold text-lg text-primary mb-6">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-muted">Tech Campus, Innovation District</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-muted">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-muted">contact@groundzerocoders.org</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-space-grotesk font-semibold text-lg text-primary mb-6">
              Stay Updated
            </h3>
            <p className="text-muted mb-4">
              Subscribe to our newsletter for the latest updates and events.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-card border border-custom rounded-l-lg focus:outline-none focus:border-accent transition-colors"
              />
              <button className="bg-accent text-white px-6 py-2 rounded-r-lg hover:scale-105 transition-transform duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-custom flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm">
            © 2024 Ground Zero Coders. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-muted hover:text-accent transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted hover:text-accent transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}