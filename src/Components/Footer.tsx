import { colors } from "../utils/colortheme";

const Footer = () => {
  return (
    <footer className="bg-[#2E2E2E] text-white py-16 px-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              className="px-3 py-1 rounded-md font-bold"
              style={{ background: colors.green }}
            >
              EX
            </div>
            <span className="text-xl font-semibold">ExamHub</span>
          </div>
          <p>Your platform for success in every exam.</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Home</li>
            <li>Courses</li>
            <li>Exams</li>
            <li>About</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Blog</li>
            <li>Help Center</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
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
