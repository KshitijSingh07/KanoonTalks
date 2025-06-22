'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="mt-auto w-full py-14 px-6 border-t transition-colors duration-300 bg-footer-bg text-footer-text">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-y-0 md:gap-x-30">
        {/* About */}
        <div className="text-center md:text-left space-y-4">
          <h3 className="text-xl font-semibold">KanoonTalks</h3>
          <p className="text-sm text-footer-link-text leading-relaxed">
            A dynamic legal platform where students, professionals, and researchers can publish articles, papers, and case laws — promoting legal awareness, academic collaboration, and access to valuable legal content and updates.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left space-y-4">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-3 text-sm text-footer-link-text">
            {[
              { href: '/about', label: 'About Us' },
              { href: '/contact', label: 'Contact Us' },
              { href: '/blogs', label: 'All Blogs' },
              { href: '/terms', label: 'Terms & Conditions' },
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/refund-policy', label: 'Refund Policy' },
            ].map((link) => (
              <motion.li
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  href={link.href}
                  className="hover:text-footer-link-hover-text transition-colors duration-200 ease-in-out inline-block"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left space-y-4">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-6 text-2xl text-footer-link-text">
            {[
              { href: 'https://x.com/KanoonTalks?t=apjfyeNhp8Wh-pyPxtAOVQ&s=08', icon: 'fab fa-x-twitter', label: 'Twitter' },
              { href: 'https://t.me/kanoontalks', icon: 'fab fa-telegram', label: 'LinkedIn' },
              { href: 'https://www.instagram.com/__kanoontalks?igsh=dzgzdTM5MDZrczJj', icon: 'fab fa-instagram', label: 'Instagram' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                whileHover={{ scale: 1.2, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="hover:text-footer-link-hover-text transition-colors duration-200"
              >
                <i className={social.icon}></i>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-14 text-footer-copyright-text">
        © {new Date().getFullYear()} KanoonTalks. All rights reserved.
      </div>
    </footer>
  );
}
