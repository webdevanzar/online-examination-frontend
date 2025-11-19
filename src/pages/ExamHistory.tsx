import { Link } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";
import { FaCheckDouble } from "react-icons/fa6";
import { CgCloseR } from "react-icons/cg";

export const ExamHistory = () => {
  const summary = {
    totalExams: 6,
    passed: 5,
    avgScore: 85,
  };

  const items = [
    {
      title: "Math Advanced Level",
      status: "Passed",
      date: "15/01/2024",
      duration: "120 mins",
      level: "Advanced",
      score: 92,
      correct: 46,
      total: 50,
    },
    {
      title: "Science Fundamentals",
      status: "Passed",
      date: "10/01/2024",
      duration: "90 mins",
      level: "Intermediate",
      score: 85,
      correct: 34,
      total: 40,
    },
    {
      title: "English Proficiency",
      status: "Passed",
      date: "08/01/2024",
      duration: "75 mins",
      level: "Beginner",
      score: 78,
      correct: 27,
      total: 35,
    },
    {
      title: "History & Social Studies",
      status: "Passed",
      date: "05/01/2024",
      duration: "100 mins",
      level: "Intermediate",
      score: 88,
      correct: 40,
      total: 45,
    },
    {
      title: "Computer Science Pro",
      status: "Passed",
      date: "28/12/2023",
      duration: "150 mins",
      level: "Advanced",
      score: 95,
      correct: 57,
      total: 60,
    },
    {
      title: "Logic & Reasoning",
      status: "Failed",
      date: "25/12/2023",
      duration: "80 mins",
      level: "Intermediate",
      score: 72,
      correct: 29,
      total: 40,
    },
  ];

  return (
    <div className="bg-[#F6FBF7] min-h-screen p-6 md:p-10">
      {/* Back Link */}
      <Link
        to="/"
        className="flex items-center gap-2 text-green-700 font-medium mb-6"
      >
        <FiArrowLeft /> Back to Home
      </Link>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800">Your Exam History</h1>
      <p className="text-gray-500 mt-2">
        Track your progress and review all your exam attempts.
      </p>

      {/* Summary */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

  {/* Total Exams */}
  <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
      <IoIosStats size={26} className="text-green-700" />
    </div>
    <div>
      <p className="text-gray-600">Total Exams</p>
      <p className="text-2xl font-bold text-gray-800">{summary.totalExams}</p>
    </div>
  </div>

  {/* Passed */}
  <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
      <FaCheckDouble size={24} className="text-emerald-700" />
    </div>
    <div>
      <p className="text-gray-600">Passed</p>
      <p className="text-2xl font-bold text-gray-800">{summary.passed}</p>
    </div>
  </div>

  {/* Avg Score */}
  <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
      <CgCloseR size={24} className="text-teal-700" />
    </div>
    <div>
      <p className="text-gray-600">Average Score</p>
      <p className="text-2xl font-bold text-green-700">{summary.avgScore}%</p>
    </div>
  </div>

</div>


      {/* Attempts */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
        Exam Attempts
      </h2>

      <div className="space-y-4">
        {items.map((exam, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {exam.title}
              </h3>

              <span
                className={`mt-1 inline-block px-3 py-1 rounded-full text-sm ${
                  exam.status === "Passed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {exam.status === "Passed" ? "✓ Passed" : "✗ Failed"}
              </span>

              {/* Info */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <FiCalendar /> {exam.date}
                </div>
                <div className="flex items-center gap-1">
                  <FiClock /> {exam.duration}
                </div>

                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">
                  {exam.level}
                </span>
              </div>
            </div>

            {/* Score */}
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-lg font-semibold text-green-700">
                Score {exam.score}%
              </p>
              <p className="text-gray-700 font-medium">
                Questions {exam.correct}/{exam.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
