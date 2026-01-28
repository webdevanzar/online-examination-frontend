import CountUp from "react-countup";
import { colors } from "../utils/colortheme";
import {
  FiBarChart2,
  FiFileText,
  FiZap,
  FiClock,
  FiAward,
  FiUsers,
  FiCheckCircle,
  FiStar,
  FiBookOpen,
  FiTarget,
  FiTrendingUp,
  FiArrowRight,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";
// import MouseParticles from "../Components/MouseParticles";

const exams = [
  {
    title: "Math Advanced Level",
    description:
      "Master complex mathematical concepts including calculus, linear algebra, and advanced geometry.",
    duration: "120 mins",
    questions: "50",
    enrolled: "1.2k+",
    level: "Advanced",
    icon: <FiBarChart2 size={24} />,
    popular: true,
  },
  {
    title: "Science Fundamentals",
    description:
      "Explore the core principles of physics, chemistry, and biology in this comprehensive foundation course.",
    duration: "90 mins",
    questions: "40",
    enrolled: "980",
    level: "Intermediate",
    icon: <FiZap size={24} />,
    popular: false,
  },
  {
    title: "English Proficiency",
    description:
      "Perfect your command of the English language through grammar, comprehension, and creative writing.",
    duration: "60 mins",
    questions: "30",
    enrolled: "1.5k+",
    level: "Beginner",
    icon: <FiFileText size={24} />,
    popular: false,
  },
];

const features = [
  {
    icon: <FiClock size={28} />,
    title: "Flexible Timing",
    description:
      "Take exams at your convenience with 24/7 availability. No stress, just your own pace.",
  },
  {
    icon: <FiAward size={28} />,
    title: "Instant Results",
    description:
      "Get immediate feedback and a detailed performance breakdown right after submission.",
  },
  {
    icon: <FiUsers size={28} />,
    title: "Expert Created",
    description:
      "Curated by top-tier educators to ensure the highest quality and relevancy of content.",
  },
  {
    icon: <FiCheckCircle size={28} />,
    title: "Accredited",
    description:
      "Earn certificates recognized by industry leaders and academic institutions globally.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    content:
      "ExamHub transformed my preparation. The instant feedback allowed me to focus on my weak points effectively.",
    initials: "SJ",
    color: "#4ADE80",
  },
  {
    name: "Michael Chen",
    role: "Engineering Graduate",
    content:
      "The variety of exams and the depth of questions are unmatched. It feels like a real hall experience.",
    initials: "MC",
    color: "#60A5FA",
  },
  {
    name: "Emily Davis",
    role: "Medical Student",
    content:
      "I love how clean the interface is. It makes studying less of a chore and more of an interactive journey.",
    initials: "ED",
    color: "#F472B6",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose Path",
    description:
      "Select from hundreds of curated exams across various disciplines.",
    icon: <FiBookOpen size={24} />,
  },
  {
    step: "02",
    title: "Testing Phase",
    description: "Take the exam in a focused, distraction-free environment.",
    icon: <FiTarget size={24} />,
  },
  {
    step: "03",
    title: "Get Analytics",
    description: "Receive a comprehensive report on your performance metrics.",
    icon: <FiTrendingUp size={24} />,
  },
];

const faqs = [
  {
    question: "How do I start taking exams?",
    answer:
      "Simply create an account, browse our extensive exam library, and click 'Take Exam' on any subject that interests you.",
  },
  {
    question: "Is there a mandatory system check?",
    answer:
      "Yes, before every exam, our automated system checks your camera, microphone, and internet connection to ensure a smooth and fair testing experience.",
  },
  {
    question: "What happens if my browser closes during an exam?",
    answer:
      "Don't worry! Our platform features real-time auto-saving. If your session is interrupted, you can simply log back in and resume exactly where you left off.",
  },
  {
    question: "How does the AI proctoring work?",
    answer:
      "Our advanced AI monitors for suspicious activity, including multi-face detection, voice activity, and restricted objects to maintain the integrity of every assessment.",
  },
  {
    question: "Can I review my answers before submission?",
    answer:
      "Absolutely. You can navigate through questions, mark them for review, and double-check all your responses before final submission.",
  },
  {
    question: "When will I see my results and analysis?",
    answer:
      "Results are available immediately after submission, providing you with a comprehensive performance breakdown and correct answer analysis.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
    <div className="relative min-h-screen font-sans bg-white selection:bg-green-100 selection:text-green-900">
      {/* <MouseParticles /> */}
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: colors.green }}
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-15"
          style={{ backgroundColor: "#DFF8E6" }}
        ></motion.div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 md:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-green-100 shadow-sm transition-colors hover:bg-green-50"
            style={{ backgroundColor: "#DFF8E6", color: colors.green }}
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            The Future of Online Testing
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
            style={{ color: colors.darkText }}
          >
            Elevate Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-green-400">
              Knowledge
            </span>{" "}
            <br />
            with Precision Testing
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg md:text-xl mb-12"
            style={{ color: colors.softText }}
          >
            Join 10,000+ students worldwide mastering their skills through our
            advanced, expert-certified examination platform.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-20"
          >
            <button
              onClick={() => navigate("/exams")}
              className="group relative px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-green-200 transition-all hover:scale-105 active:scale-95 overflow-hidden"
              style={{ backgroundColor: colors.green }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                Start Free Exam{" "}
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            {/* <button
              onClick={() => navigate("/exams")}
              className="px-8 py-4 rounded-2xl font-bold text-lg border-2 transition-all hover:bg-gray-50 active:scale-95"
              style={{ borderColor: colors.borderGray, color: colors.darkText }}
            >
              Browse Exams
            </button> */}
          </motion.div>

          {/* FLOATING STATS */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto p-4 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl"
          >
            {[
              {
                label: "Active Students",
                value: 12000,
                suffix: "+",
                color: "text-blue-600",
              },
              {
                label: "Total Exams",
                value: 850,
                suffix: "+",
                color: "text-green-600",
              },
              {
                label: "Success Rate",
                value: 98,
                suffix: "%",
                color: "text-emerald-600",
              },
              {
                label: "Expert Tutors",
                value: 240,
                suffix: "+",
                color: "text-indigo-600",
              },
            ].map((stat, i) => (
              <div key={i} className="p-4 text-center">
                <div
                  className={`text-2xl md:text-3xl font-black mb-1 ${stat.color}`}
                >
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    separator=","
                  />
                </div>
                <div className="text-xs md:text-sm font-semibold uppercase tracking-wider opacity-60">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURED EXAMS */}
      <section className="py-24 px-4 bg-linear-to-b from-transparent to-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2
                className="text-3xl md:text-5xl font-bold mb-4"
                style={{ color: colors.darkText }}
              >
                Curated for Success
              </h2>
              <p className="text-lg" style={{ color: colors.softText }}>
                Our most popular examinations, designed to challenge and grow
                your expertise in key industries.
              </p>
            </div>
            <button
              onClick={() => navigate("/exams")}
              className="flex items-center gap-2 font-bold transition-all hover:gap-3"
              style={{ color: colors.green }}
            >
              View All Exams <FiArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exams.map((exam, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-4xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200"
              >
                {exam.popular && (
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest shadow-xs">
                    Popular
                  </div>
                )}

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: "#EAFCEF", color: colors.green }}
                >
                  {exam.icon}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 px-2 py-0.5 rounded-md bg-green-50">
                    {exam.level}
                  </span>
                </div>

                <h3
                  className="text-2xl font-bold mb-4 group-hover:text-green-700 transition-colors"
                  style={{ color: colors.darkText }}
                >
                  {exam.title}
                </h3>

                <p className="text-gray-500 mb-8 leading-relaxed">
                  {exam.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                    <FiClock className="text-gray-400" />
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                        Time
                      </div>
                      <div className="text-sm font-bold text-gray-700">
                        {exam.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                    <FiFileText className="text-gray-400" />
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                        Items
                      </div>
                      <div className="text-sm font-bold text-gray-700">
                        {exam.questions} Qs
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/exams")}
                  className="w-full py-4 rounded-xl font-bold text-white transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-green-100"
                  style={{ backgroundColor: colors.green }}
                >
                  Take This Exam
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              How It Works
            </h2>
            <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="relative group">
            {/* Connector Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden md:block">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-linear-to-r from-green-500 to-emerald-300"
              ></motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10 }}
                  className="relative flex flex-col items-center bg-white p-6"
                >
                  <div className="w-20 h-20 rounded-3xl bg-white border-2 border-green-100 flex items-center justify-center text-green-600 mb-8 shadow-xl group-hover:border-green-400 transition-colors z-10 relative">
                    {step.icon}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-green-600 text-white text-[10px] font-black flex items-center justify-center border-4 border-white">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-center text-gray-500 leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - FEATURES */}
      <section
        className="py-24 px-4"
        style={{ backgroundColor: "#F9FAF9" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-4xl md:text-5xl font-black mb-10 leading-tight"
                style={{ color: colors.darkText }}
              >
                Built for the <br />
                <span className="text-green-600">Next Generation</span> of{" "}
                <br />
                Academics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-green-500 border border-green-50">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-lg">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Studying"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-green-900/40 to-transparent"></div>
              </div>
              {/* Floating Element */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 max-w-[240px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                    <FiCheckCircle size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-600">
                      100%
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">
                      Secure Platform
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  Your data and results are protected with enterprise-grade
                  encryption.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Loved by Students
            </h2>
            <p className="text-gray-400 tracking-widest uppercase text-sm font-bold">
              Real feedback from real users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-4xl bg-gray-50 border border-gray-100 relative overflow-hidden"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <FiStar
                      key={j}
                      className="text-amber-400 fill-amber-400"
                      size={16}
                    />
                  ))}
                </div>
                <p className="text-lg text-gray-700 italic mb-8 relative z-10">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-lg"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-4 bg-gray-50/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">FAQ</h2>
            <p className="text-gray-500">
              Everything you need to know about our exams.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-lg text-gray-800">
                    {faq.question}
                  </span>
                  <FiChevronDown
                    className={`transition-transform duration-300 text-green-500 ${activeFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-50"
                    >
                      <div className="p-6 text-gray-500 leading-relaxed bg-gray-50/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4">
        <div
          className="max-w-6xl mx-auto rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-green-200"
          style={{ backgroundColor: colors.green }}
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Ready to Push Your <br /> Limits Today?
            </h2>
            <p className="text-xl text-green-50 mb-12 max-w-2xl mx-auto opacity-90">
              Join thousands of high-achievers. Unlock your potential with our
              comprehensive examination suite.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/exams")}
                className="px-10 py-5 bg-white text-green-700 rounded-2xl font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Get Started for Free
              </button>
              <a
                href="https://wa.me/919961057130?text=Hello%20I%20need%20support"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-10 py-5 bg-green-600 text-white rounded-2xl font-black text-xl border border-white/20 transition-all hover:bg-green-500 active:scale-95">
                  Contact Support
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
