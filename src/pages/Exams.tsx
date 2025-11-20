import { useNavigate } from "react-router-dom";

export default function Exams() {
  const navigate = useNavigate();

  const exams = [
    {
      id: 1,
      name: "Data Communication",
      date: "Nov 25, 2025",
      status: "Available",
    },
    {
      id: 2,
      name: "Computer Networks",
      date: "Nov 28, 2025",
      status: "Coming Soon",
    },
    {
      id: 3,
      name: "Microprocessor",
      date: "Dec 5, 2025",
      status: "Available",
    },
    {
      id: 4,
      name: "Operating Systems",
      date: "Dec 10, 2025",
      status: "Available",
    },
    {
      id: 5,
      name: "Database Management Systems",
      date: "Dec 15, 2025",
      status: "Coming Soon",
    },
    {
      id: 6,
      name: "Software Engineering",
      date: "Dec 20, 2025",
      status: "Available",
    },
  ];

  return (
    <div className="relative px-10 mt-20 mb-20">
      {/* Soft Background */}
      <div className="absolute -top-20 -left-32 w-72 h-72 bg-green-100 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-32 w-72 h-72 bg-green-100 rounded-full opacity-40 blur-3xl"></div>

      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          🎓 Upcoming & Active Exams
        </span>

        <h2 className="text-4xl font-extrabold mt-4 text-gray-800">
          Ace Your Exams with Confidence
        </h2>

        <p className="text-gray-500 mt-2 text-lg">
          Choose an exam below and start your test journey.
        </p>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 z-10 relative">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-3xl border shadow-lg hover:shadow-2xl transition-all p-8 hover:-translate-y-2"
          >
            {/* Status Badge */}
            <div className="flex justify-between items-center mb-4">
              <span
                className={`px-4 py-1 text-sm rounded-full font-medium ${
                  exam.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {exam.status}
              </span>

              <span className="text-gray-400 text-sm font-medium">
                ID: {exam.id}
              </span>
            </div>

            {/* Exam Title */}
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {exam.name}
            </h3>

            {/* Extra Exam Info */}
            <div className="text-gray-600 space-y-2 mb-6">
              <p className="flex items-center gap-2">
                📅 <span>Date: {exam.date}</span>
              </p>
              <p className="flex items-center gap-2">
                ⏳ <span>Duration: 60 mins</span>
              </p>
              <p className="flex items-center gap-2">
                ⭐ <span>Category: General</span>
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => {
                if (exam.status === "Available") navigate(`/exam/${exam.id}`);
              }}
              disabled={exam.status !== "Available"}
              className={`w-full py-3 rounded-xl mt-2 font-semibold transition-all ${
                exam.status === "Available"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {exam.status === "Available" ? "Enter Exam" : "Coming Soon"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
