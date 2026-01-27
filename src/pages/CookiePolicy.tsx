import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiSettings, FiShield, FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";

const CookiePolicy = () => {
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
              <FiSettings size={32} className="text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Cookie Policy
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
              What Are Cookies?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
              when you visit a website. They help us provide you with a better experience by remembering 
              your preferences and tracking usage patterns.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This Cookie Policy explains how ExamHub uses cookies and similar technologies to enhance 
              your experience on our platform.
            </p>
          </motion.div>

          {/* Types of Cookies We Use */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-6">
              <FiSettings className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Types of Cookies We Use
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FiCheckCircle className="text-green-600 mr-2" size={18} />
                    <h3 className="font-semibold text-gray-900">Essential Cookies</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    Required for the website to function properly
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• User authentication</li>
                    <li>• Security tokens</li>
                    <li>• Shopping cart contents</li>
                  </ul>
                </div>

                <div className="border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FiInfo className="text-blue-600 mr-2" size={18} />
                    <h3 className="font-semibold text-gray-900">Performance Cookies</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    Help us understand how visitors interact with our website
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Page load times</li>
                    <li>• Error tracking</li>
                    <li>• Usage analytics</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FiSettings className="text-purple-600 mr-2" size={18} />
                    <h3 className="font-semibold text-gray-900">Functional Cookies</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    Enable enhanced functionality and personalization
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Language preferences</li>
                    <li>• Theme settings</li>
                    <li>• Remembered choices</li>
                  </ul>
                </div>

                <div className="border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FiInfo className="text-orange-600 mr-2" size={18} />
                    <h3 className="font-semibold text-gray-900">Marketing Cookies</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    Used to deliver relevant advertisements and content
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Ad personalization</li>
                    <li>• Campaign tracking</li>
                    <li>• Social media integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Specific Cookies We Use */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Specific Cookies We Use
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Cookie Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Purpose</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Duration</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 px-4 font-mono text-xs">session_id</td>
                    <td className="py-3 px-4 text-gray-600">Maintains user session</td>
                    <td className="py-3 px-4 text-gray-600">Session</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Essential</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-xs">auth_token</td>
                    <td className="py-3 px-4 text-gray-600">Authentication token</td>
                    <td className="py-3 px-4 text-gray-600">30 days</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Essential</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-xs">preferences</td>
                    <td className="py-3 px-4 text-gray-600">User preferences</td>
                    <td className="py-3 px-4 text-gray-600">1 year</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Functional</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-xs">analytics_id</td>
                    <td className="py-3 px-4 text-gray-600">Analytics tracking</td>
                    <td className="py-3 px-4 text-gray-600">2 years</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Performance</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-xs">marketing_consent</td>
                    <td className="py-3 px-4 text-gray-600">Marketing preferences</td>
                    <td className="py-3 px-4 text-gray-600">5 years</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">Marketing</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Managing Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center mb-6">
              <FiShield className="text-green-600 mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-gray-900">
                Managing Your Cookie Preferences
              </h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Consent Banner</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When you first visit ExamHub, you'll see a cookie consent banner where you can:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 shrink-0" size={16} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Accept All</h4>
                      <p className="text-gray-600 text-sm">Enable all cookies for the best experience</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiSettings className="text-blue-600 mr-2 mt-1 shrink-0" size={16} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Customize</h4>
                      <p className="text-gray-600 text-sm">Choose which types of cookies to accept</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiXCircle className="text-red-600 mr-2 mt-1 shrink-0" size={16} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Reject Non-Essential</h4>
                      <p className="text-gray-600 text-sm">Only accept essential cookies</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiInfo className="text-purple-600 mr-2 mt-1 shrink-0" size={16} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Learn More</h4>
                      <p className="text-gray-600 text-sm">Read detailed information about cookies</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Browser Settings</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can also manage cookies through your browser settings:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-gray-700"><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
                  <p className="text-gray-700"><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</p>
                  <p className="text-gray-700"><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</p>
                  <p className="text-gray-700"><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Third-Party Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Third-Party Cookies
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                We use third-party services that may set their own cookies on your device. These include:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics Services</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Google Analytics</li>
                    <li>• Mixpanel</li>
                    <li>• Hotjar</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Processors</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Stripe</li>
                    <li>• PayPal</li>
                    <li>• Square</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Social Media</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Facebook</li>
                    <li>• Twitter</li>
                    <li>• LinkedIn</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Advertising</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Google Ads</li>
                    <li>• Facebook Ads</li>
                    <li>• LinkedIn Ads</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> These third-party services have their own privacy policies and cookie policies. 
                  We recommend reviewing them for more information about how they use cookies.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cookie Policy Updates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Updates to This Cookie Policy
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices, 
                technology, or legal requirements.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">How We Notify You</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Email notification for significant changes</li>
                  <li>• Website banner announcement</li>
                  <li>• Updated "Last modified" date at the top of this policy</li>
                </ul>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Your continued use of our Services after any changes to this Cookie Policy constitutes 
                your acceptance of such changes.
              </p>
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
              Questions About Cookies?
            </h2>
            <p className="mb-6">
              If you have any questions about this Cookie Policy or how we use cookies, please contact us:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <p className="text-green-100">cookies@examhub.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Phone</h4>
                <p className="text-green-100">+1 (555) 123-4569</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Address</h4>
                <p className="text-green-100">123 Cookie Lane, Digital City, DC 12345</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Response Time</h4>
                <p className="text-green-100">Within 7 business days</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;
