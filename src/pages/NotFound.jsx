import React from 'react';
import { Link } from 'react-router';
import { useTheme } from '../hooks/useTheme';
import { FaSearch, FaHome, FaSadTear } from 'react-icons/fa';

export default function NotFound() {
  const { theme } = useTheme();

  const sectionBg = theme === "dark" 
    ? "bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" 
    : "bg-gradient-to-br from-purple-50 via-pink-50 to-red-50";
  
  const cardBg = theme === "dark" 
    ? "bg-gradient-to-br from-gray-800 to-gray-900" 
    : "bg-white";
  
  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  const mutedText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <section className={`min-h-screen ${sectionBg} relative overflow-hidden flex items-center justify-center`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-pink-500/10 rounded-full"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-red-500/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center ${textColor}`}>
          <div className="mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-100'} mx-auto mb-6`}>
              <FaSadTear className="text-5xl text-purple-500" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Oops! Page Not Found</h2>
            
            <p className={`text-lg md:text-xl ${mutedText} mb-8 max-w-2xl mx-auto`}>
              Looks like you've wandered off the beaten path. Don't worry, it happens to the best of us! 
              Let's get you back on track.
            </p>
          </div>

          <div className={`rounded-2xl p-8 ${cardBg} shadow-xl inline-block`}>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <FaSearch className="text-2xl text-purple-500" />
                  <h3 className="text-xl font-bold">Lost in the Contest Universe?</h3>
                </div>
                <p className={`text-sm ${mutedText}`}>
                  The page you're looking for might have been moved, deleted, or you just took a wrong turn. 
                  But don't worry, we've got plenty of exciting contests waiting for you!
                </p>
                <ul className={`text-sm ${mutedText} space-y-2`}>
                  <li>• Check the URL for typos</li>
                  <li>• Use the search bar to find what you need</li>
                  <li>• Browse our popular contests</li>
                  <li>• Or just head back home and start fresh!</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <Link 
                    to="/"
                    className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
                  >
                    <FaHome className="text-xl" />
                    <span>Go Back Home</span>
                  </Link>
                </div>
                
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
                  <p className={`text-sm ${mutedText} text-center`}>
                    Or explore our amazing contests and opportunities waiting for you!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fun 404 illustration */}
          <div className="mt-12 grid grid-cols-3 md:grid-cols-5 gap-4 max-w-md mx-auto">
            {['🎨', '🏆', '✨', '🎯', '🚀'].map((emoji, index) => (
              <div 
                key={index}
                className={`text-4xl md:text-5xl transform hover:scale-110 transition duration-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
