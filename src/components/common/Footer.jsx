import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import logo from "./../../assets/logo.png";
import { Link } from "react-router";

export default function Footer() {
  const { theme } = useTheme();

  const sectionBg = theme === "dark" 
    ? "bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" 
    : "bg-gradient-to-br from-purple-50 via-pink-50 to-red-50";
  
  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  const mutedText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  return (
    <footer className={`${sectionBg} relative overflow-hidden`}>
      {/* Decorative background elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-pink-500/10 rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-red-500/10 rounded-full"></div>
      </div> */}

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + Website Name */}
          <div className="flex  items-center gap-4">
            <Link to="/" className="flex flex-col items-center gap-3">
              <img src={logo} alt="ContestHub Logo" className=" h-12" />
              <div>
                
                <p className={`text-sm ${mutedText}`}>Your Creative Competition Platform</p>
              </div>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className={`text-sm font-semibold ${mutedText} mr-2`}>Follow Us:</span>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white hover:shadow-lg transform hover:-translate-y-1 transition duration-300`}
                aria-label="Facebook"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white hover:shadow-lg transform hover:-translate-y-1 transition duration-300`}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} py-4`}>
        <div className="container mx-auto px-6">
          <p className={`text-center text-sm ${mutedText}`}>
            Copyright © 2025 ContestHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
