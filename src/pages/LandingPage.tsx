import CountUp from "react-countup";
import { colors } from "../utils/colortheme";
import {
  FiBarChart2,
  FiFileText,
  FiZap,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";


// const courses = [
//   {
//     title: "Mathematics",
//     duration: "8 weeks",
//     students: "2.5K",
//     level: "Beginner",
//   },
//   {
//     title: "Science Excellence",
//     duration: "10 weeks",
//     students: "3.1K",
//     level: "Intermediate",
//   },
//   {
//     title: "English Mastery",
//     duration: "6 weeks",
//     students: "1.8K",
//     level: "Beginner",
//   },
//   {
//     title: "History & Culture",
//     duration: "9 weeks",
//     students: "2.2K",
//     level: "Intermediate",
//   },
// ];

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
    description: "Test your knowledge of basic scientific principles and theories.",
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

const LandingPage = () => {
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
            delay: 1
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
            onClick={() => console.log('Navigating to /exams')}
          >
            Get Started →
          </NavLink>

          <NavLink
            to="/courses"
            className="px-6 py-3 rounded-lg font-semibold border transition-all duration-300 hover:bg-green-800 hover:text-white hover:scale-[1.05] inline-block"
            onClick={() => console.log('Navigating to /courses')}
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

              <h3 className="text-xl font-semibold mb-3" style={{ color: colors.darkText }}>
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
              >
                Take Exam
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4"
        style={{ background: "rgb(232, 255, 241)" }}
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