import { useNavigate } from "react-router-dom";
import {
  FiAward,
  FiUsers,
  FiShield,
  FiUser,
  FiMic,
  FiArrowRight,
} from "react-icons/fi";
import { motion, type Variants } from "framer-motion";
import { colors } from "../utils/colortheme";
// import MouseParticles from "../Components/MouseParticles";

const About = () => {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-sans selection:bg-green-100 selection:text-green-900">
      {/* <MouseParticles /> */}
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
          style={{ backgroundColor: colors.green }}
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
          style={{ backgroundColor: "#DFF8E6" }}
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* HERO SECTION */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-green-100 bg-green-50/50 text-green-600 uppercase tracking-widest shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            Our Journey & Passion
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black mb-8 leading-tight"
            style={{ color: colors.darkText }}
          >
            Redefining the{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-green-400">
              Future
            </span>{" "}
            <br />
            of Assessments
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed"
          >
            At ExamHub, we believe that testing shouldn't just be an
            evaluation—it should be a gateway to growth. We build technologies
            that empower learners to achieve their full potential.
          </motion.p>
        </motion.div>

        {/* MISSION & VISION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-32"
        >
          <div className="relative group">
            <div className="aspect-4/3 rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Team working"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-green-900/40 to-transparent opacity-60"></div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 max-w-[200px]"
            >
              <div className="text-3xl font-black text-green-600 mb-1">
                10k+
              </div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Success Stories
              </div>
            </motion.div>
          </div>

          <div className="lg:pl-8">
            <h2
              className="text-4xl font-bold mb-8"
              style={{ color: colors.darkText }}
            >
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're committed to providing a seamless, secure, and efficient
              examination experience. Our platform is designed to make online
              assessments more accessible, reliable, and truly reflective of a
              student's knowledge.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Academic Excellence",
                  color: "bg-blue-50 text-blue-600",
                  icon: <FiAward />,
                },
                {
                  title: "Global Accessibility",
                  color: "bg-purple-50 text-purple-600",
                  icon: <FiUsers />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-green-200 transition-colors"
                >
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-500">
                      Empowering millions through accessible and fair testing
                      environments.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FEATURES GRID */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-5xl font-black mb-6"
              style={{ color: colors.darkText }}
            >
              Built for Integrity
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Our multi-layered security suite ensures that every certificate
              earned on our platform holds genuine value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiUser className="text-indigo-500" />,
                title: "Face Recognition",
                description:
                  "Continuous AI-driven identity verification to ensure exam integrity.",
                color: "indigo",
              },
              {
                icon: <FiMic className="text-rose-500" />,
                title: "Voice Analysis",
                description:
                  "Sophisticated audio monitoring to identify and prevent unauthorized assistance.",
                color: "rose",
              },
              {
                icon: <FiShield className="text-emerald-500" />,
                title: "Encryption",
                description:
                  "Military-grade data protection for all exam content and student results.",
                color: "emerald",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-${feature.color}-50 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: colors.darkText }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] p-12 md:p-20 overflow-hidden shadow-2xl shadow-green-200 text-center"
          style={{ backgroundColor: colors.green }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              Ready to Start?
            </h2>
            <p className="text-xl text-green-50 mb-12 max-w-2xl mx-auto opacity-90">
              Transform your learning journey today. Join a community of
              excellence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/exams")}
                className="px-10 py-5 bg-white text-green-700 rounded-2xl font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Get Started <FiArrowRight />
              </button>
              <a
                href="https://wa.me/919961057130?text=Hello%20I%20need%20support"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-10 py-5 bg-green-600 text-white rounded-2xl font-black text-xl border border-white/20 transition-all hover:bg-green-500 active:scale-95">
                  Talk to Us
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
