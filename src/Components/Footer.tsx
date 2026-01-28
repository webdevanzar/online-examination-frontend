
import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6 mt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 max-w-7xl mx-auto">

          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/" className="flex items-center group">
                <img 
                  src="/src/assets/hub.png" 
                  alt="ExamHub Logo" 
                  className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Your comprehensive platform for success in every exam. Learn, practice, and excel with our expert-designed assessments.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-600 transition-all duration-300 flex items-center justify-center group">
                <FiFacebook size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-600 transition-all duration-300 flex items-center justify-center group">
                <FiTwitter size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-600 transition-all duration-300 flex items-center justify-center group">
                <FiLinkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-600 transition-all duration-300 flex items-center justify-center group">
                <FiInstagram size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6 text-lg relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-green-400 to-green-600" />
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/exams" className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Exams
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Page Sections */}
          <div>
            <h3 className="font-semibold mb-6 text-lg relative inline-block">
              Explore
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-green-400 to-green-600" />
            </h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Testimonials
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('achievements')}
                  className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Achievements
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center group"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  FAQ
                </button>
              </li>
              <li>
                <Link to="/exams" className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  All Exams
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-6 text-lg relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-green-400 to-green-600" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMail size={18} className="text-green-400 mt-1 shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">support@examhub.com</p>
                  <p className="text-gray-400 text-xs">24/7 Support</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone size={18} className="text-green-400 mt-1 shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">+91 9961057130</p>
                  <p className="text-gray-400 text-xs">Mon-Fri, 9AM-6PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin size={18} className="text-green-400 mt-1 shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm"> Ponniakurussi</p>
                  <p className="text-gray-400 text-xs">Malappuram, Kerala</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 ExamHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-green-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
