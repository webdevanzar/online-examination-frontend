
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2E2E2E] text-white py-16 px-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link to="/" className="flex items-center">
              <img 
                src="/src/assets/hub.png" 
                alt="ExamHub Logo" 
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <p>Your platform for success in every exam.</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/exams" className="text-gray-300 hover:text-white transition-colors">
                Exams
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/cookie-policy" className="text-gray-300 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-10">
        © 2025 ExamHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
