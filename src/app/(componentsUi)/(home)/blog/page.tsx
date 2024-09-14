"use client"
import React, { useState } from 'react';
import { FiSearch, FiMenu, FiX, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';

const BlogTemplate = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('home');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const categories = ['Technology', 'Travel', 'Food', 'Lifestyle'];

  interface Post {
    id: number;
    title: string;
    category: string;
    image: string;
  }
  
  const featuredPosts: Post[] = [
    { id: 1, title: 'The Future of AI', category: 'Technology', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e' },
    { id: 2, title: 'Exploring Hidden Gems', category: 'Travel', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1' },
    { id: 3, title: 'Healthy Eating Habits', category: 'Food', image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af' },
    { id: 4, title: 'Mindfulness in Daily Life', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.category}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'post':
        return (
          <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">The Future of AI</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <span className="mr-4">By John Doe</span>
              <span>Published on May 15, 2023</span>
            </div>
            <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" alt="AI" className="w-full h-64 object-cover rounded-lg mb-6" />
            <p className="text-gray-800 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button className="text-blue-600 hover:text-blue-800"><FiFacebook size={24} /></button>
                <button className="text-blue-400 hover:text-blue-600"><FiTwitter size={24} /></button>
                <button className="text-pink-600 hover:text-pink-800"><FiInstagram size={24} /></button>
              </div>
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <FaRegComment className="mr-2" /> Comments (5)
              </button>
            </div>
          </div>
        );
      case 'category':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600">{post.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Team" className="w-full h-64 object-cover rounded-lg mb-6" />
            <p className="text-gray-800 mb-4">Welcome to our blog! We are a team of passionate writers and experts dedicated to bringing you the latest insights and stories from various fields.</p>
            <p className="text-gray-800 mb-4">Our mission is to inform, inspire, and entertain our readers with high-quality content that matters. Whether you're interested in technology, travel, food, or lifestyle, we've got something for everyone.</p>
            <p className="text-gray-800">Join us on this exciting journey of discovery and learning!</p>
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input type="text" id="subject" name="subject" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300">Send Message</button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-600">BlogTemplate</h1>
          <div className="hidden md:flex space-x-4">
            {['home', 'about', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-gray-600 hover:text-gray-900 ${activeTab === tab ? 'font-semibold' : ''}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-gray-900">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2 space-y-2">
            {['home', 'about', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-4 rounded ${activeTab === tab ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-2 flex items-center justify-center space-x-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab('category')}
              className="whitespace-nowrap px-3 py-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {category}
            </button>
          ))}
        </div>
      </nav>

      <main className="container mx-auto mt-6 mb-12">
        {renderContent()}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">BlogTemplate</h3>
              <p className="text-gray-400">Bringing you the best content from around the web.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Contact', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><FiFacebook size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><FiTwitter size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><FiInstagram size={24} /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2023 BlogTemplate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogTemplate;