'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus(result.message || 'Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus(result.message || 'Failed to send message.');
      }
    } catch (error) {
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-300">
      <main className="pt-12 sm:pt-24 px-6 max-w-2xl mx-auto">
        {/* Heading with gradient text */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Contact Us
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[var(--color-section-bg)] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6 transition-colors duration-300"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-5 py-3 rounded-lg bg-[var(--color-light-bg)] text-[var(--color-text)] border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-5 py-3 rounded-lg bg-[var(--color-light-bg)] text-[var(--color-text)] border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
          />

          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={6}
            className="w-full px-5 py-3 rounded-lg bg-[var(--color-light-bg)] text-[var(--color-text)] border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600 transition resize-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold shadow-md hover:shadow-lg transition"
          >
            Send Message
          </button>

          {status && (
            <p
              className={`text-center text-sm mt-3 ${
                status.toLowerCase().includes('success')
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {status}
            </p>
          )}
        </form>

        <footer className="text-center text-[var(--color-footer-copyright-text)] text-sm mt-14 border-t border-gray-300 dark:border-gray-700 pt-5 pb-10 transition-colors duration-300">
          &copy; {new Date().getFullYear()} LawB. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
