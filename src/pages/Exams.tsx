import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePublishedExams, type Exam } from "../services/exam";
import {
  getExamStatus,
  canStartExam,
  formatExamDate,
  type ExamStatus,
} from "../utils/dateUtils";

export default function Exams() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "ongoing" | "upcoming" | "completed"
  >("ongoing");

  // Fetch published exams from API
  const { data: exams, isLoading, error } = usePublishedExams();

  // Categorize exams by status
  const categorizedExams = useMemo(() => {
    if (!exams)
      return { ongoing: [], upcoming: [], completed: [] } as Record<
        ExamStatus,
        Exam[]
      >;

    return exams.reduce(
      (acc, exam) => {
        const status = getExamStatus(exam.startTime, exam.endTime);
        acc[status].push(exam);
        return acc;
      },
      { ongoing: [], upcoming: [], completed: [] } as Record<ExamStatus, Exam[]>
    );
  }, [exams]);

  // Get exams for active tab
  const displayedExams = categorizedExams[activeTab];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exams...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Failed to load exams</p>
          <p className="text-gray-500">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-10 mt-20 mb-20">
      {/* Soft Background */}
      <div className="absolute -top-20 -left-32 w-72 h-72 bg-green-100 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-32 w-72 h-72 bg-green-100 rounded-full opacity-40 blur-3xl"></div>

      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          {activeTab === "ongoing" && "🟢 Active Exams"}
          {activeTab === "upcoming" && "🔵 Upcoming Exams"}
          {activeTab === "completed" && "⚪ Previous Exams"}
        </span>

        <h2 className="text-4xl font-extrabold mt-4 text-gray-800">
          {activeTab === "ongoing" && "Take Your Exams Now"}
          {activeTab === "upcoming" && "Prepare for Upcoming Tests"}
          {activeTab === "completed" && "Review Past Performance"}
        </h2>

        <p className="text-gray-500 mt-2 text-lg">
          {activeTab === "ongoing" && "Start your active exams below"}
          {activeTab === "upcoming" && "Get ready for scheduled exams"}
          {activeTab === "completed" && "View your exam history and results"}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white rounded-2xl p-2 shadow-md border border-gray-200">
          {/* Ongoing Tab */}
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "ongoing"
                ? "bg-green-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Ongoing ({categorizedExams.ongoing.length})
          </button>

          {/* Upcoming Tab */}
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "upcoming"
                ? "bg-green-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Upcoming ({categorizedExams.upcoming.length})
          </button>

          {/* Previous Tab */}
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "completed"
                ? "bg-green-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Previous ({categorizedExams.completed.length})
          </button>
        </div>
      </div>

      {/* Empty State */}
      {displayedExams.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            {activeTab === "ongoing" && "No ongoing exams at the moment"}
            {activeTab === "upcoming" && "No upcoming exams scheduled"}
            {activeTab === "completed" && "No previous exams to display"}
          </p>
        </div>
      )}

      {/* Exams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 z-10 relative">
        {displayedExams.map((exam) => {
          const status = getExamStatus(exam.startTime, exam.endTime);
          const canStart = canStartExam(exam.startTime, exam.endTime);

          return (
            <div
              key={exam.id}
              className="bg-white rounded-3xl border shadow-lg hover:shadow-2xl transition-all p-8 hover:-translate-y-2"
            >
              {/* Status Badge */}
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`px-4 py-1 text-sm rounded-full font-medium ${
                    status === "ongoing"
                      ? "bg-green-100 text-green-700"
                      : status === "upcoming"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {status === "ongoing" && "🟢 Active Now"}
                  {status === "upcoming" && "🔵 Coming Soon"}
                  {status === "completed" && "⚪ Completed"}
                </span>

                <span className="text-gray-400 text-sm font-medium">
                  ID: {exam.id.substring(0, 8)}
                </span>
              </div>

              {/* Exam Title */}
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {exam.title}
              </h3>

              {/* Description (truncated) */}
              {exam.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {exam.description}
                </p>
              )}

              {/* Exam Info */}
              <div className="text-gray-600 space-y-2 mb-6">
                <p className="flex items-center gap-2">
                  📅 <span>Start: {formatExamDate(exam.startTime)}</span>
                </p>
                <p className="flex items-center gap-2">
                  ⏳ <span>Duration: {exam.duration} mins</span>
                </p>
                <p className="flex items-center gap-2">
                  📚 <span>Subject: {exam.subject}</span>
                </p>
                <p className="flex items-center gap-2">
                  📝 <span>Questions: {exam.questionCount}</span>
                </p>
                <p className="flex items-center gap-2">
                  ⭐ <span>Total Marks: {exam.totalMarks}</span>
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (canStart) {
                    navigate("/instructions", { state: { exam } });
                  }
                }}
                disabled={!canStart}
                className={`w-full py-3 rounded-xl mt-2 font-semibold transition-all ${
                  canStart
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {status === "ongoing" && canStart && "Start Exam"}
                {status === "upcoming" && "Not Yet Started"}
                {status === "completed" && "Exam Ended"}
                {status === "ongoing" && !canStart && "Exam Ended"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
