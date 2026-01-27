import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiSearch,
  FiFilter,
  FiX,
  FiAlertTriangle,
} from "react-icons/fi";
import { IoIosStats } from "react-icons/io";
import { FaCheckDouble } from "react-icons/fa6";
import { CgCloseR } from "react-icons/cg";
import { BiTrophy } from "react-icons/bi";
import { useExamHistory, type ExamHistoryItem } from "../services/exam";

type StatusFilter = "all" | "passed" | "failed";
type SortOption = "date-desc" | "date-asc" | "score-desc" | "score-asc";

export const ExamHistory = () => {
  const { data, isLoading, error } = useExamHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [showFilters, setShowFilters] = useState(false);

  const summary = data?.summary || {
    totalExams: 0,
    passed: 0,
    failed: 0,
    avgScore: 0,
  };

  const filteredAndSortedItems = (() => {
    if (!data?.history) return [];

    let items = [...data.history];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.subject.toLowerCase().includes(query),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      items = items.filter(
        (item) => item.status.toLowerCase() === statusFilter,
      );
    }

    // Sort
    items.sort((a, b) => {
      switch (sortOption) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "score-desc":
          return b.score - a.score;
        case "score-asc":
          return a.score - b.score;
        default:
          return 0;
      }
    });

    return items;
  })();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortOption("date-desc");
  };

  const hasActiveFilters =
    searchQuery || statusFilter !== "all" || sortOption !== "date-desc";

  if (isLoading) {
    return (
      <div className="bg-linear-to-br from-[#F6FBF7] to-[#E8F5E9] min-h-screen p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-12 bg-gray-200 rounded w-96"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="space-y-4 mt-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-linear-to-br from-[#F6FBF7] to-[#E8F5E9] min-h-screen p-6 md:p-10 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertTriangle size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Failed to Load History
          </h2>
          <p className="text-gray-500 mb-4">
            We couldn't load your exam history. Please try again later.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-[#F6FBF7] to-[#E8F5E9] min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-green-700 font-medium mb-6 hover:text-green-800 transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your Exam History
          </h1>
          <p className="text-gray-500">
            Track your progress and review all your exam attempts.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Total Exams */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-linear-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                <IoIosStats size={28} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Exams</p>
                <p className="text-3xl font-bold text-gray-800">
                  {summary.totalExams}
                </p>
              </div>
            </div>
          </div>

          {/* Passed */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-linear-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center">
                <FaCheckDouble size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Passed</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {summary.passed}
                </p>
              </div>
            </div>
          </div>

          {/* Failed */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-linear-to-br from-red-50 to-rose-100 rounded-xl flex items-center justify-center">
                <CgCloseR size={24} className="text-red-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Failed</p>
                <p className="text-3xl font-bold text-red-500">
                  {summary.failed}
                </p>
              </div>
            </div>
          </div>

          {/* Avg Score */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-linear-to-br from-amber-100 to-yellow-100 rounded-xl flex items-center justify-center">
                <BiTrophy size={26} className="text-amber-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Avg Score</p>
                <p className="text-3xl font-bold text-amber-600">
                  {summary.avgScore}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-10 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by exam name or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>

            {/* Filter Toggle & Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                  showFilters || hasActiveFilters
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <FiFilter size={18} />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 flex flex-wrap gap-6">
              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Status
                </label>
                <div className="flex gap-2">
                  {(["all", "passed", "failed"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        statusFilter === status
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Sort by
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="date-desc">Date (Newest first)</option>
                  <option value="date-asc">Date (Oldest first)</option>
                  <option value="score-desc">Score (Highest first)</option>
                  <option value="score-asc">Score (Lowest first)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Exam Attempts
          </h2>
          <span className="text-gray-500 text-sm">
            {filteredAndSortedItems.length}{" "}
            {filteredAndSortedItems.length === 1 ? "result" : "results"}
          </span>
        </div>

        {/* Exam List */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoIosStats size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {data?.history?.length === 0
                ? "No Exam History Yet"
                : "No Results Found"}
            </h3>
            <p className="text-gray-500">
              {data?.history?.length === 0
                ? "You haven't completed any exams yet. Start an exam to see your history here."
                : "Try adjusting your search or filters to find what you're looking for."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 text-green-600 hover:text-green-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedItems.map((exam: ExamHistoryItem) => (
              <ExamCard key={exam.id} exam={exam} formatDate={formatDate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ExamCardProps {
  exam: ExamHistoryItem;
  formatDate: (date: string) => string;
}

const ExamCard = ({ exam, formatDate }: ExamCardProps) => {
  const isPassed = exam.status === "Passed";
  const scoreColor =
    exam.score >= 80
      ? "text-emerald-600"
      : exam.score >= 60
        ? "text-green-600"
        : exam.score >= 40
          ? "text-amber-600"
          : "text-red-500";

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
              {exam.title}
            </h3>
            <span
              className={`shrink-0 px-3 py-1 rounded-full text-sm font-medium ${
                isPassed
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {isPassed ? "Passed" : "Failed"}
            </span>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm">
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
              <FiCalendar size={14} />
              <span>{formatDate(exam.date)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
              <FiClock size={14} />
              <span>{exam.duration} mins</span>
            </div>
            <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium">
              {exam.subject}
            </span>
          </div>

          {/* Terminated Warning */}
          {exam.isTerminated && (
            <div className="mt-3 flex items-center gap-2 text-amber-600 text-sm">
              <FiAlertTriangle size={14} />
              <span>
                Terminated: {exam.terminationReason || "Multiple warnings"}
              </span>
            </div>
          )}
        </div>

        {/* Right Section - Score */}
        <div className="flex items-center gap-6 lg:text-right">
          {/* Score Circle */}
          <div className="relative">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#E5E7EB"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke={isPassed ? "#10B981" : "#EF4444"}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(exam.score / 100) * 226} 226`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xl font-bold ${scoreColor}`}>
                {exam.score}%
              </span>
            </div>
          </div>

          {/* Score Details */}
          <div className="text-left">
            <p className="text-gray-600 text-sm mb-1">Score</p>
            <p className="text-lg font-semibold text-gray-800">
              {exam.marksObtained}/{exam.totalMarks}
            </p>
            <p className="text-gray-500 text-sm">
              {exam.correct}/{exam.total} correct
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
