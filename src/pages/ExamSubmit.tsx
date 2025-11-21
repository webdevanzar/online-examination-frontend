import React from "react";

const colors = {
  lightGreenBg: "#EAFCEF",
  green: "#2A7F3F",
  lightGray: "#F7F9F7",
  borderGray: "#DDE6D8",
  darkText: "#333333",
  softText: "#6C7A6A",
};

export default function ExamSubmitPage({ score, total, timeTaken }) {
  return (
    <div
      className="min-h-screen flex justify-center items-center p-6"
      style={{ backgroundColor: colors.lightGreenBg }}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8"
        style={{ border: `1px solid ${colors.borderGray}` }}
      >
        {/* Header */}
        <h1
          className="text-3xl font-bold text-center mb-4"
          style={{ color: colors.green }}
        >
          Exam Submitted ✔
        </h1>

        <p
          className="text-center mb-8"
          style={{ color: colors.softText }}
        >
          Your answers have been recorded successfully.
        </p>

        {/* Score Card */}
        <div
          className="rounded-xl p-6 mb-6"
          style={{ backgroundColor: colors.lightGray, border: `1px solid ${colors.borderGray}` }}
        >
          <h2
            className="text-xl font-semibold mb-4 text-center"
            style={{ color: colors.darkText }}
          >
            Your Performance
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-4">
            <div>
              <p className="text-2xl font-bold" style={{ color: colors.green }}>
                {score}/{total}
              </p>
              <p style={{ color: colors.softText }}>Marks</p>
            </div>

            <div>
              <p className="text-2xl font-bold" style={{ color: colors.green }}>
                {Math.round((score / total) * 100)}%
              </p>
              <p style={{ color: colors.softText }}>Percentage</p>
            </div>

            <div>
              <p className="text-2xl font-bold" style={{ color: colors.green }}>
                {timeTaken}
              </p>
              <p style={{ color: colors.softText }}>Time Taken</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="px-6 py-3 rounded-xl font-semibold shadow-md transition"
            style={{ backgroundColor: colors.green, color: "white" }}
          >
            Back to Dashboard
          </button>

          <button
            onClick={() => (window.location.href = "/review")}
            className="px-6 py-3 rounded-xl font-semibold shadow-md transition border"
            style={{ borderColor: colors.green, color: colors.green, backgroundColor: "white" }}
          >
            Review Answers
          </button>
        </div>

      </div>
    </div>
  );
}
