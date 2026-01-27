import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiShield, FiLock, FiDatabase, FiEye, FiUserCheck, FiMail } from "react-icons/fi";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <FiShield size={32} className="text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Privacy Matters
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At ExamHub, we are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains how we collect, use, protect, and share your information when you use 
              our online examination platform and services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By using ExamHub, you agree to the collection and use of information in accordance with this policy.
            </p>
          </motion.div>

          {/* Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-4">
              <FiDatabase className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Information We Collect
              </h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Full name, email address, and phone number</li>
                  <li>Date of birth and educational background</li>
                  <li>Profile information and preferences</li>
                  <li>Account credentials (encrypted)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Exam results and scores</li>
                  <li>Test completion history and timestamps</li>
                  <li>Learning progress and performance analytics</li>
                  <li>Certificates and achievements earned</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Usage patterns and platform interactions</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* How We Use Your Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-4">
              <FiEye className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                How We Use Your Information
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Service Provision</h4>
                    <p className="text-gray-600 text-sm">To provide and maintain our examination platform</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Personalization</h4>
                    <p className="text-gray-600 text-sm">To customize your learning experience</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Communication</h4>
                    <p className="text-gray-600 text-sm">To send important updates and notifications</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Analytics</h4>
                    <p className="text-gray-600 text-sm">To improve our services and user experience</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Security</h4>
                    <p className="text-gray-600 text-sm">To protect against fraud and ensure platform integrity</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Legal Compliance</h4>
                    <p className="text-gray-600 text-sm">To comply with legal obligations</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Data Protection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-4">
              <FiLock className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Data Protection & Security
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures to protect your information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Encryption</h4>
                  <p className="text-green-700 text-sm">All data is encrypted using AES-256 encryption</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Secure Servers</h4>
                  <p className="text-green-700 text-sm">Data stored in secure, SOC 2 compliant data centers</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Access Control</h4>
                  <p className="text-green-700 text-sm">Strict access controls and authentication systems</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Regular Audits</h4>
                  <p className="text-green-700 text-sm">Regular security audits and vulnerability assessments</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-4">
              <FiUserCheck className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Your Privacy Rights
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Access & Correction</h4>
                <p className="text-gray-600 text-sm">Request access to or correction of your personal information</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Data Deletion</h4>
                <p className="text-gray-600 text-sm">Request deletion of your personal information</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Portability</h4>
                <p className="text-gray-600 text-sm">Request a copy of your data in a portable format</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Opt-out</h4>
                <p className="text-gray-600 text-sm">Opt-out of marketing communications and data sharing</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-linear-to-r from-green-600 to-green-700 rounded-2xl shadow-lg p-8 text-white"
          >
            <div className="flex items-center mb-4">
              <FiMail className="mr-3" size={24} />
              <h2 className="text-2xl font-semibold">
                Contact Our Privacy Team
              </h2>
            </div>
            
            <div className="space-y-4">
              <p>
                If you have any questions about this Privacy Policy or want to exercise your privacy rights, 
                please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-green-100">privacy@examhub.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-green-100">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-green-100">123 Privacy Street, Security City, SC 12345</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Response Time</h4>
                  <p className="text-green-100">Within 30 business days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
