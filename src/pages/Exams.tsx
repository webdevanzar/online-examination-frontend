import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePublishedExams, type Exam } from "../services/exam";
import { useExamAttemptStatus } from "../services/auth";
import {
  getExamStatus,
  canStartExam,
  formatExamDate,
  type ExamStatus,
} from "../utils/dateUtils";

// ExamCard Component with attempt status checking
function ExamCard({ exam }: { exam: Exam }) {
  const navigate = useNavigate();
  const status = getExamStatus(exam.startTime, exam.endTime);
  const canStart = canStartExam(exam.startTime, exam.endTime);

  // Fetch attempt status for this exam
  const { data: attemptStatus, isLoading: statusLoading } =
    useExamAttemptStatus(exam.id);

  const renderActionButton = () => {
    if (statusLoading) {
      return (
        <button
          disabled
          className="w-full py-4 rounded-2xl mt-2 font-bold bg-slate-50 text-slate-400 cursor-wait flex items-center justify-center gap-2 border border-slate-100"
        >
          <div className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
          Checking status...
        </button>
      );
    }

    if (status === "completed") {
      if (attemptStatus?.status === "submitted") {
        return (
          <button
            disabled
            className="w-full py-4 rounded-2xl mt-2 font-bold bg-slate-50 text-emerald-600 cursor-not-allowed border border-emerald-100 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Submitted
          </button>
        );
      }

      if (attemptStatus?.status === "terminated") {
        return (
          <button
            onClick={() => navigate("/instructions", { state: { exam } })}
            className="w-full py-4 rounded-2xl mt-2 font-bold bg-orange-600 text-white hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Restart Exam
          </button>
        );
      }

      return (
        <button
          disabled
          className="w-full py-4 rounded-2xl mt-2 font-bold bg-slate-100 text-slate-400 cursor-not-allowed"
        >
          Exam Ended
        </button>
      );
    }

    if (status === "upcoming") {
      return (
        <button
          disabled
          className="w-full py-4 rounded-2xl mt-2 font-bold bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100"
        >
          Not Yet Started
        </button>
      );
    }

    if (status === "ongoing") {
      if (attemptStatus?.status === "submitted") {
        return (
          <button
            disabled
            className="w-full py-4 rounded-2xl mt-2 font-bold bg-slate-50 text-emerald-600 cursor-not-allowed border border-emerald-100 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Submitted
          </button>
        );
      }

      if (attemptStatus?.status === "terminated") {
        return (
          <button
            onClick={() => navigate("/instructions", { state: { exam } })}
            className="w-full py-4 rounded-2xl mt-2 font-bold bg-orange-600 text-white hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Restart Exam
          </button>
        );
      }

      if (attemptStatus?.status === "in_progress" && attemptStatus?.attemptId) {
        return (
          <button
            onClick={() =>
              navigate(`/exam/${attemptStatus.attemptId}/start`, {
                state: { exam },
              })
            }
            className="w-full py-4 rounded-2xl mt-2 font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Resume Exam
          </button>
        );
      }

      if (canStart) {
        return (
          <button
            onClick={() => navigate("/instructions", { state: { exam } })}
            className="w-full py-4 rounded-2xl mt-2 font-bold bg-green-600 text-white hover:bg-green-700 transition-all shadow-lg shadow-green-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Exam
          </button>
        );
      }

      return (
        <button
          disabled
          className="w-full py-4 rounded-2xl mt-2 font-bold bg-slate-100 text-slate-400 cursor-not-allowed"
        >
          Exam Ended
        </button>
      );
    }

    return null;
  };

  return (
    <div
      key={exam.id}
      className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-green-900/10 transition-all p-8 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 opacity-50"></div>

      <div className="flex justify-between items-start mb-6 relative">
        <span
          className={`px-4 py-1.5 text-xs rounded-xl font-black tracking-widest uppercase ${
            status === "ongoing"
              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
              : status === "upcoming"
                ? "bg-blue-50 text-blue-600 border border-blue-100"
                : "bg-slate-50 text-slate-500 border border-slate-100"
          }`}
        >
          {status === "ongoing" && "● Active"}
          {status === "upcoming" && "Coming Soon"}
          {status === "completed" && "Completed"}
        </span>

        <span className="text-slate-300 text-[10px] font-black tracking-widest uppercase">
          {exam.id.substring(0, 8)}
        </span>
      </div>

      <h3 className="text-2xl font-black text-slate-800 mb-4 leading-tight group-hover:text-green-700 transition-colors">
        {exam.title}
      </h3>

      {exam.description && (
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
          {exam.description}
        </p>
      )}

      <div className="space-y-4 mb-8 bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
        <div className="flex items-center gap-3 text-slate-600">
          <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-green-600">
            📅
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Date & Time
            </span>
            <span className="text-sm font-bold">
              {formatExamDate(exam.startTime)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-blue-600">
            ⏳
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Duration
            </span>
            <span className="text-sm font-bold">{exam.duration} Minutes</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Subject:
            </span>
            <span className="text-xs font-black text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
              {exam.subject}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Total:
            </span>
            <span className="text-xs font-black text-green-600">
              {exam.totalMarks} Marks
            </span>
          </div>
        </div>
      </div>

      <div className="relative">{renderActionButton()}</div>
    </div>
  );
}

export default function Exams() {
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
      { ongoing: [], upcoming: [], completed: [] } as Record<
        ExamStatus,
        Exam[]
      >,
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
      <div className="text-center mb-16 relative">
        <span className="px-6 py-2 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-black tracking-[0.2em] uppercase border border-emerald-100 shadow-sm inline-block mb-4">
          {activeTab === "ongoing" && "🟢 Online Assessment"}
          {activeTab === "upcoming" && "🔵 Scheduled Tasks"}
          {activeTab === "completed" && "⚪ Historical Data"}
        </span>

        <h2 className="text-5xl font-black text-slate-800 tracking-tight leading-none">
          {activeTab === "ongoing" && "Active Exams"}
          {activeTab === "upcoming" && "Upcoming Tests"}
          {activeTab === "completed" && "Exam History"}
        </h2>

        <p className="text-gray-500 mt-2 text-lg">
          {activeTab === "ongoing" && "Start your active exams below"}
          {activeTab === "upcoming" && "Get ready for scheduled exams"}
          {activeTab === "completed" && "View your exam history and results"}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex bg-white/60 backdrop-blur-xl rounded-[24px] p-2 shadow-xl shadow-slate-200/50 border border-white/40">
          {/* Ongoing Tab */}
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`px-8 py-3.5 rounded-[20px] font-black tracking-wide transition-all duration-300 flex items-center gap-2 ${
              activeTab === "ongoing"
                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105"
                : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Active ({categorizedExams.ongoing.length})
          </button>

          {/* Upcoming Tab */}
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-8 py-3.5 rounded-[20px] font-black tracking-wide transition-all duration-300 ${
              activeTab === "upcoming"
                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105"
                : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
            }`}
          >
            Upcoming ({categorizedExams.upcoming.length})
          </button>

          {/* Previous Tab */}
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-8 py-3.5 rounded-[20px] font-black tracking-wide transition-all duration-300 ${
              activeTab === "completed"
                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105"
                : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
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
        {displayedExams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </div>
  );
}
