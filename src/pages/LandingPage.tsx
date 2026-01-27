import CountUp from "react-countup";
import { colors } from "../utils/colortheme";
import { FiBarChart2, FiFileText, FiZap, FiClock, FiAward, FiUsers, FiCheckCircle, FiStar, FiBookOpen, FiTarget, FiTrendingUp, FiHelpCircle } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const exams = [
  {
    title: "Math Advanced Level",
    description:
      "Covers algebra, geometry, and calculus with 50 challenging questions.",
    duration: "120 mins",
    questions: "50",
    enrolled: "1250",
    level: "Advanced",
    icon: <FiBarChart2 size={28} color={colors.green} />,
  },
  {
    title: "Science Fundamentals",
    description:
      "Test your knowledge of basic scientific principles and theories.",
    duration: "90 mins",
    questions: "40",
    enrolled: "980",
    level: "Intermediate",
    icon: <FiZap size={28} color={colors.green} />,
  },
  {
    title: "English Proficiency",
    description: "Assess your grammar, vocabulary, and reading comprehension.",
    duration: "60 mins",
    questions: "30",
    enrolled: "1500",
    level: "Beginner",
    icon: <FiFileText size={28} color={colors.green} />,
  },
];

const features = [
  {
    icon: <FiClock size={32} color={colors.green} />,
    title: "Flexible Timing",
    description: "Take exams at your convenience with 24/7 availability and no time pressure."
  },
  {
    icon: <FiAward size={32} color={colors.green} />,
    title: "Instant Results",
    description: "Get immediate feedback and detailed performance analysis right after completion."
  },
  {
    icon: <FiUsers size={32} color={colors.green} />,
    title: "Expert Created",
    description: "All exams crafted by subject matter experts and experienced educators."
  },
  {
    icon: <FiCheckCircle size={32} color={colors.green} />,
    title: "Certified",
    description: "Earn recognized certificates upon successful completion of exams."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    content: "ExamHub helped me prepare for my final exams. The instant feedback feature is amazing!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Engineering Graduate",
    content: "The quality of questions and detailed explanations helped me improve my scores significantly.",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "Medical Student",
    content: "I love the flexibility and variety of subjects. It's become my go-to study platform.",
    rating: 5
  }
];

const howItWorks = [
  {
    step: "01",
    title: "Choose Your Exam",
    description: "Browse through our extensive collection of exams across various subjects.",
    icon: <FiBookOpen size={24} color={colors.green} />
  },
  {
    step: "02",
    title: "Take the Test",
    description: "Complete the exam at your own pace with our user-friendly interface.",
    icon: <FiTarget size={24} color={colors.green} />
  },
  {
    step: "03",
    title: "Get Results",
    description: "Receive instant results with detailed performance analysis and recommendations.",
    icon: <FiTrendingUp size={24} color={colors.green} />
  }
];

const achievements = [
  { title: "Fast Learner", count: "500+", description: "Students who completed 5+ exams" },
  { title: "Top Scorer", count: "200+", description: "Students with 90%+ average" },
  { title: "Perfect Score", count: "50+", description: "Students who scored 100%" },
  { title: "Consistent", count: "1000+", description: "Active monthly users" }
];

const faqs = [
  {
    question: "How do I start taking exams?",
    answer: "Simply create an account, browse our exam collection, and click on any exam to begin."
  },
  {
    question: "Are the exams timed?",
    answer: "Most exams have suggested time limits, but you can take them at your own pace."
  },
  {
    question: "Can I retake an exam?",
    answer: "Yes, you can retake exams as many times as you want to improve your score."
  },
  {
    question: "Do I get a certificate?",
    answer: "Yes, you receive a downloadable certificate upon successful completion of each exam."
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Circles */}
      <div className="-z-10 absolute inset-0 overflow-hidden">
        {/* Left Circle (larger) */}
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full"
          initial={{ opacity: 0.6 }}
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundColor: "#DFF8E6",
            top: "100px",
            left: "-100px",
          }}
        />

        {/* Right Circle (smaller) */}
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
          initial={{ opacity: 0.6 }}
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            backgroundColor: "#DFF8E6",
          }}
        />
      </div>

      {/* HERO */}
      <section className="text-center py-20 px-4 bg-transparent">
        <div
          className="inline-block px-5 py-2 rounded-full text-sm mb-5"
          style={{
            background: "#DFF8E6",
            color: colors.green,
          }}
        >
          Welcome to ExamHub
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: colors.darkText }}
        >
          Ace Your Exams,{" "}
          <span style={{ color: colors.green }}>Master Your Skills</span>
        </h1>

        <p
          className="max-w-2xl mx-auto text-lg"
          style={{ color: colors.softText }}
        >
          Prepare for success with our comprehensive exam platform.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <NavLink
            to="/exams"
            className="px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-[1.05] hover:shadow-lg hover:brightness-110 inline-block"
            style={{ background: colors.green }}
            onClick={() => console.log("Navigating to /exams")}
          >
            Get Started →
          </NavLink>

          <NavLink
            to="/courses"
            className="px-6 py-3 rounded-lg font-semibold border transition-all duration-300 hover:bg-green-800 hover:text-white hover:scale-[1.05] inline-block"
            onClick={() => console.log("Navigating to /courses")}
          >
            Learn More
          </NavLink>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-14 text-center">
          {/* Students */}
          <div>
            <h2 className="text-3xl font-bold" style={{ color: colors.green }}>
              <CountUp end={1000} duration={2.2} separator="," suffix="+" />
            </h2>
            <p style={{ color: colors.softText }}>Students</p>
          </div>

          {/* Exams */}
          <div>
            <h2 className="text-3xl font-bold" style={{ color: colors.green }}>
              <CountUp end={500} duration={2.2} suffix="+" />
            </h2>
            <p style={{ color: colors.softText }}>Exams</p>
          </div>

          {/* Success Rate */}
          <div>
            <h2 className="text-3xl font-bold" style={{ color: colors.green }}>
              <CountUp end={95} duration={2.2} suffix="%" />
            </h2>
            <p style={{ color: colors.softText }}>Success Rate</p>
          </div>
        </div>
      </section>

      {/* EXAMS */}
      <section
        id="exams"
        className="py-20 px-4 backdrop-blur-xl rounded-xl mt-12"
      >
        <div className="text-center mb-12">
          <span
            className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: "#DFF8E6", color: colors.green }}
          >
            Featured Exams
          </span>

          <h2 className="text-4xl font-bold" style={{ color: colors.darkText }}>
            Test Your Knowledge
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition border"
              style={{ borderColor: colors.borderGray }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="p-3 rounded-xl bg-[#EAFCEF]">{exam.icon}</div>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium bg-[#EAFCEF]"
                  style={{ color: colors.green }}
                >
                  {exam.level}
                </span>
              </div>

              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: colors.darkText }}
              >
                {exam.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {exam.description}
              </p>

              <div
                className="h-px w-full mb-5"
                style={{ background: colors.borderGray }}
              />

              <div className="grid grid-cols-3 text-center text-sm text-gray-700 mb-6">
                <div>
                  <strong>{exam.duration}</strong>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
                <div>
                  <strong>{exam.questions}</strong>
                  <p className="text-xs text-gray-500">Questions</p>
                </div>
                <div>
                  <strong>{exam.enrolled}</strong>
                  <p className="text-xs text-gray-500">Enrolled</p>
                </div>
              </div>

              <button
                className="w-full py-2 rounded-lg text-white"
                style={{ background: colors.green }}
                onClick={() => navigate(`/exams`)}
              >
                Take Exam
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-4">
        <div className="text-center mb-12">
          <span
            className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: "#DFF8E6", color: colors.green }}
          >
            Why Choose Us
          </span>
          <h2 className="text-4xl font-bold" style={{ color: colors.darkText }}>
            Features That Make Learning Better
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border"
              style={{ borderColor: colors.borderGray }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-2xl bg-[#EAFCEF]">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3" style={{ color: colors.darkText }}>
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4" style={{ background: "rgb(248, 255, 252)" }}>
        <div className="text-center mb-12">
          <span
            className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: "#DFF8E6", color: colors.green }}
          >
            Simple Process
          </span>
          <h2 className="text-4xl font-bold" style={{ color: colors.darkText }}>
            How It Works
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howItWorks.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-white shadow-lg flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full text-white font-bold text-sm flex items-center justify-center" style={{ background: colors.green }}>
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: colors.darkText }}>
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-linear-to-r from-green-400 to-transparent" style={{ transform: 'translateX(50%)' }} />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 px-4">
        <div className="text-center mb-12">
          <span
            className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: "#DFF8E6", color: colors.green }}
          >
            Student Success
          </span>
          <h2 className="text-4xl font-bold" style={{ color: colors.darkText }}>
            What Our Students Say
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border"
              style={{ borderColor: colors.borderGray }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: colors.darkText }}>{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="py-20 px-4" style={{ background: "rgb(232, 255, 241)" }}>
        <div className="text-center mb-12">
          <span
            className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: "#DFF8E6", color: colors.green }}
          >
            Our Impact
          </span>
          <h2 className="text-4xl font-bold" style={{ color: colors.darkText }}>
            Achievements & Milestones
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md border"
              style={{ borderColor: colors.borderGray }}
            >
              <div className="text-4xl font-bold mb-2" style={{ color: colors.green }}>
                <CountUp end={parseInt(achievement.count)} duration={2} suffix={achievement.count.includes('+') ? '+' : ''} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.darkText }}>
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="text-center mb-12">
          <span
            className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: "#DFF8E6", color: colors.green }}
          >
            Got Questions?
          </span>
          <h2 className="text-4xl font-bold" style={{ color: colors.darkText }}>
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md mb-4 border"
              style={{ borderColor: colors.borderGray }}
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <FiHelpCircle size={20} color={colors.green} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: colors.darkText }}>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4 bg-linear-to-b from-[#E8FFF1] to-white"
        
      >
        <div
          className="max-w-5xl mx-auto text-center rounded-2xl p-10 md:p-16"
          style={{ background: colors.green }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Test Yourself?
          </h2>

          <p className="max-w-2xl mx-auto text-white/90 text-base md:text-lg mb-8">
            Take our exams and get instant feedback to identify your strengths
            and areas for improvement.
          </p>
          <NavLink to="/exams">
            <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.05]">
              Browse All Exams
            </button>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
