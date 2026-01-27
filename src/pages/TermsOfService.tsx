import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiFileText, FiCheckCircle, FiAlertCircle, FiBook, FiUsers, FiClock } from "react-icons/fi";

const TermsOfService = () => {
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
              <FiFileText size={32} className="text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
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
              Agreement to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to ExamHub. These Terms of Service ("Terms") govern your access to and use of our 
              online examination platform, services, and website (collectively, the "Service").
            </p>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
              with any part of these terms, then you may not access the Service.
            </p>
          </motion.div>

          {/* User Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-4">
              <FiUsers className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                User Responsibilities
              </h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Requirements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 shrink-0" size={16} />
                    <span className="text-gray-600">You must be at least 13 years old to create an account</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 shrink-0" size={16} />
                    <span className="text-gray-600">Provide accurate, current, and complete information</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 shrink-0" size={16} />
                    <span className="text-gray-600">Maintain and update your account information</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 shrink-0" size={16} />
                    <span className="text-gray-600">Safeguard your account credentials</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Academic Integrity</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 shrink-0" size={16} />
                    <span className="text-gray-600">Complete exams independently without assistance</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 shrink-0" size={16} />
                    <span className="text-gray-600">Do not share exam questions or answers</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 shrink-0" size={16} />
                    <span className="text-gray-600">Respect intellectual property rights</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 shrink-0" size={16} />
                    <span className="text-gray-600">Report any suspicious activity</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Prohibited Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-4">
              <FiAlertCircle className="text-red-600 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Prohibited Activities
              </h2>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4 font-semibold">
                You are strictly prohibited from:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span className="text-gray-600">Using automated tools to access or scrape the platform</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span className="text-gray-600">Attempting to gain unauthorized access to our systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span className="text-gray-600">Distributing malware or harmful content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span className="text-gray-600">Impersonating others or providing false information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span className="text-gray-600">Violating any applicable laws or regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span className="text-gray-600">Interfering with or disrupting the Service</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Service Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-4">
              <FiBook className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Service Terms & Conditions
              </h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Exam Access & Completion</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Time Limits</h4>
                    <p className="text-gray-600 text-sm">Most exams have specified time limits that must be adhered to strictly.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Attempt Limits</h4>
                    <p className="text-gray-600 text-sm">Some exams may limit the number of attempts per user.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Certificate Validity</h4>
                    <p className="text-gray-600 text-sm">Certificates are valid for the period specified on the certificate.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment & Refunds</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Payment Terms</h4>
                    <p className="text-gray-600 text-sm">Payment is required before accessing premium exams and features.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Refund Policy</h4>
                    <p className="text-gray-600 text-sm">Refunds are available within 14 days of purchase if not accessed.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Subscription Renewal</h4>
                    <p className="text-gray-600 text-sm">Subscriptions auto-renew unless cancelled before renewal date.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Intellectual Property Rights
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  All exam content, questions, materials, and intellectual property on ExamHub are owned by 
                  us or our licensors and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">User Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  You retain ownership of any content you submit to our platform. By submitting content, you 
                  grant us a worldwide, non-exclusive, royalty-free license to use, modify, and display your 
                  content for the purpose of providing and improving our services.
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> You may not copy, modify, distribute, or create derivative works 
                  of our exam content without explicit written permission.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Termination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-4">
              <FiClock className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Termination
              </h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">By You</h3>
                <p className="text-gray-600 leading-relaxed">
                  You may terminate your account at any time by contacting our support team or using the 
                  account deletion feature in your settings. Upon termination, your right to use the Service 
                  will cease immediately.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">By Us</h3>
                <p className="text-gray-600 leading-relaxed">
                  We may suspend or terminate your account immediately for violations of these Terms, 
                  fraudulent activity, or any reason that, in our sole discretion, requires us to do so 
                  to protect the integrity of our platform.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Effect of Termination</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upon termination, all provisions of these Terms which by their nature should survive 
                  termination shall survive, including ownership provisions, warranty disclaimers, and 
                  limitations of liability.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-linear-to-r from-green-600 to-green-700 rounded-2xl shadow-lg p-8 text-white"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Questions About Our Terms?
            </h2>
            <p className="mb-6">
              If you have any questions about these Terms of Service, please contact our legal team:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <p className="text-green-100">legal@examhub.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Phone</h4>
                <p className="text-green-100">+1 (555) 123-4568</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Address</h4>
                <p className="text-green-100">123 Legal Avenue, Compliance City, CC 12345</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Response Time</h4>
                <p className="text-green-100">Within 15 business days</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
