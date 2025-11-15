import React from 'react';

const SECTIONS = {
  accessibility: {
    title: 'Accessibility Options',
    body: [
      'Adjust text size, contrast, and animation settings to make Game Shell easier on your eyes.',
      'You can combine browser‑level zoom with in‑game accessibility presets for the best experience.'
    ]
  },
  suggestions: {
    title: 'Suggestions',
    body: [
      'Tell us what features, modes, or quality‑of‑life improvements you want to see next.',
      'High‑impact suggestions may be invited to closed beta tests or early feature previews.'
    ]
  },
  about: {
    title: 'About Us',
    body: [
      'Game Shell is a unified launcher for your favourite card, board, sports, and fantasy games.',
      'Our goal is to make it effortless to jump between games, compare stats, and play with friends.'
    ]
  },
  press: {
    title: 'Press Kit',
    body: [
      'Here you would normally find logos, colour palettes, screenshots, and brand guidelines.',
      'Until the real kit is uploaded, please contact us directly before using Game Shell assets.'
    ]
  },
  newsletter: {
    title: 'Newsletter',
    body: [
      'Opt‑in updates covering new game modes, tournaments, and seasonal cosmetic drops.',
      'You can unsubscribe at any time; we only send a few high‑signal emails per month.'
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    body: [
      'We minimise the data we collect and use it only to run the platform, improve gameplay, and keep accounts secure.',
      'Full legal text should live on a dedicated /privacy page once your lawyer has reviewed it.'
    ]
  },
  cookies: {
    title: 'Cookies Policy',
    body: [
      'Essential cookies keep you logged in and remember your basic preferences.',
      'Analytics and marketing cookies should always be optional and clearly explained to the user.'
    ]
  },
  community: {
    title: 'Community Guidelines',
    body: [
      'Be respectful, play fair, and keep chat and usernames appropriate for all ages.',
      'Cheating, targeted harassment, hate speech, or attempts to exploit minors result in permanent bans.'
    ]
  },
  contact: {
    title: 'Contact Us',
    body: [
      'For support, business inquiries, or partnership requests, your future contact form or email would appear here.',
      'You can route tickets by category (account, payments, bugs, suggestions, tournaments, and more).'
    ]
  },
  help: {
    title: 'Help Center',
    body: [
      'Browse articles that cover installation, account creation, matchmaking, and troubleshooting common issues.',
      'Over time, your help center should be informed by real questions players ask the most.'
    ]
  },
  faqs: {
    title: 'Frequently Asked Questions',
    body: [
      'How do rankings work? How are tokens earned? How does cross‑device syncing behave?',
      'Use this space for short, punchy answers that link to deeper Help Center articles.'
    ]
  },
  reportBug: {
    title: 'Report a Bug',
    body: [
      'Describe what happened, what you expected to happen, and steps to reproduce the issue.',
      'Attach screenshots or short clips when possible; they make it much easier to fix problems quickly.'
    ]
  },
  playerOfMonth: {
    title: 'Player of the Month Wall',
    body: [
      'Imagine a digital wall of framed portraits like SpongeBob’s Employee of the Month.',
      'Each month you can feature a new player with their main game, favourite achievement, and a short quote.'
    ]
  },
  visualSettings: {
    title: 'Visual & Accessibility Settings',
    body: [
      'Switch between light/dark themes, adjust colour‑blind presets, toggle reduced‑motion mode, and fine‑tune UI scale.',
      'In future you can allow per‑game visual presets so competitive players can lock in their favourite layout.'
    ]
  }
};

export default function FooterModal({ section, onClose }) {
  if (!section) return null;

  const data = SECTIONS[section];

  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 text-white max-w-lg w-full mx-4 rounded-2xl shadow-2xl border border-gray-700">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700">
          <h2 className="font-bold text-lg">{data.title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-xl"
            aria-label="Close footer modal"
          >
            ×
          </button>
        </div>
        <div className="px-5 py-4 space-y-3 text-sm leading-relaxed">
          {data.body.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
        <div className="px-5 pb-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
