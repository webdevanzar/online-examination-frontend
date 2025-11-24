import { Link } from "react-router-dom";
import { FiAward, FiUsers, FiBook, FiShield, FiUser, FiMic, FiType } from "react-icons/fi";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About ExamHub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering students and professionals to achieve their academic and career goals through innovative online examination solutions.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At ExamHub, we're committed to providing a seamless, secure, and efficient examination experience for both students and educators. 
            Our platform is designed to make online assessments more accessible, reliable, and effective.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="flex items-start">
              <div className="shrink-0 bg-green-100 p-3 rounded-lg mr-4">
                <FiAward className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Proven Success</h3>
                <p className="text-gray-600">Thousands of students have successfully taken exams through our platform, achieving their academic goals.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
                <FiUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Dedicated Support</h3>
                <p className="text-gray-600">Our support team is available 24/7 to assist with any questions or technical issues.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Why Choose ExamHub?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiShield className="h-6 w-6 text-green-500" />,
                title: "Secure Platform",
                description: "Advanced security measures to ensure the integrity of every exam."
              },
              {
                icon: <FiBook className="h-6 w-6 text-blue-500" />,
                title: "Wide Range of Subjects",
                description: "Comprehensive coverage of subjects and courses for all levels."
              },
              {
                icon: <FiUsers className="h-6 w-6 text-purple-500" />,
                title: "User-Friendly Interface",
                description: "Intuitive design that makes taking exams simple and straightforward."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Security Features */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Advanced Security Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiUser className="h-6 w-6 text-indigo-500" />,
                title: "Face Detection",
                description: "Real-time face recognition ensures the right student is taking the exam by continuously verifying identity."
              },
              {
                icon: <FiMic className="h-6 w-6 text-red-500" />,
                title: "Voice Detection",
                description: "Voice analysis to detect and prevent suspicious activities during the examination."
              },
              {
                icon: <FiType className="h-6 w-6 text-amber-500" />,
                title: "Keystroke Dynamics",
                description: "Analyzes typing patterns to verify student identity based on unique typing behavior."
              }
            ].map((feature, index) => (
              <div key={`security-${index}`} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have already experienced the ExamHub difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Sign Up Now
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
