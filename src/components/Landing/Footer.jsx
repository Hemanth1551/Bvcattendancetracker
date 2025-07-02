import React from 'react';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white text-sm" id="contact">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div>
          <a href="#" className="inline-block mb-4">
            <img src={logo} alt="Logo" className="w-10" />
          </a>
          <p className="mb-4 font-semibold">BVCITS</p>
          <p className="text-gray-400 mb-6">
            We build attendance systems that are simple, accurate, and efficient.
          </p>
          <div className="flex space-x-4 text-gray-400">
            {['facebook-fill', 'twitter-original', 'instagram-original', 'linkedin-original'].map(icon => (
              <a key={icon} href="#" className="hover:text-white text-lg">
                <i className={`lni lni-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="text-base font-semibold mb-6">Solutions</h4>
          <ul className="space-y-3 text-gray-400">
            {['Tracking', 'Reports', 'Analytics', 'Dashboard'].map(item => (
              <li key={item}>
                <a href="#" className="hover:text-white">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-base font-semibold mb-6">Support</h4>
          <ul className="space-y-3 text-gray-400">
            {['Help Center', 'Documentation', 'API Status', 'Contact'].map(item => (
              <li key={item}>
                <a href="#" className="hover:text-white">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="text-base font-semibold mb-6">Subscribe</h4>
          <p className="text-gray-400 mb-4">
            Get updates on attendance tips and features.
          </p>
          <form className="flex">
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-l-md bg-gray-800 border border-gray-600 placeholder-gray-400 text-white focus:outline-none"
              placeholder="Email address"
            />
            <button
              type="submit"
              className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md"
            >
              <i className="lni lni-envelope"></i>
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <div className="flex space-x-4 mb-4 md:mb-0">
          {['Privacy Policy', 'Legal Notice', 'Terms of Service'].map(link => (
            <a key={link} href="#" className="hover:text-white">
              {link}
            </a>
          ))}
        </div>
        <p>
          © 2025 Attendance System. All rights reserved. Distributed by{' '}
          <a
            href="https://bvcits.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            BVCITS
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
