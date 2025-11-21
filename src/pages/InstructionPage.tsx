import React, { useState, useEffect } from "react";

const colors = {
  lightGreenBg: "#EAFCEF",
  green: "#2A7F3F",
  lightGray: "#F7F9F7",
  borderGray: "#DDE6D8",
  darkText: "#333333",
  softText: "#6C7A6A",
};

const InstructionPage = () => {
  const exam = {
    examTitle: "Sample Exam",
    subject: "Computer Science",
    duration: "60 mins",
    totalQuestions: 50,
    totalMarks: 100,
    passingMarks: 40,
    instructions: [
      "Do not refresh or close the browser.",
      "Webcam and mic may be monitored.",
      "No switching tabs.",
      "Stable internet required.",
      "Submit before time ends.",
    ],
    requirements: {
      cameraRequired: true,
      microphoneRequired: true,
      fullScreenRequired: true,
    },
    startTime: "2025-11-21T12:00:00Z",
  };

  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    const now = new Date();
    const start = new Date(exam.startTime);
    setCanStart(now >= start);
  }, []);

  return (
    <div
      className="min-h-screen w-full p-10"
      style={{ backgroundColor: colors.lightGreenBg }}
    >
      {/* MAIN CONTAINER */}
      <div
        className="mx-auto w-full max-w-6xl p-10 rounded-3xl shadow-lg"
        style={{
          backgroundColor: "white",
          border: `1px solid ${colors.borderGray}`,
        }}
      >
        {/* HEADER */}
        <h1
          className="text-center text-4xl font-extrabold mb-8"
          style={{ color: colors.green }}
        >
          {exam.examTitle}
        </h1>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: colors.lightGray,
              border: `1px solid ${colors.borderGray}`,
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: colors.darkText }}
            >
              Exam Details
            </h2>
            <p><strong>Subject:</strong> {exam.subject}</p>
            <p><strong>Duration:</strong> {exam.duration}</p>
            <p><strong>Total Questions:</strong> {exam.totalQuestions}</p>
          </div>

          <div
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: colors.lightGray,
              border: `1px solid ${colors.borderGray}`,
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: colors.darkText }}
            >
              Marks Information
            </h2>
            <p><strong>Total Marks:</strong> {exam.totalMarks}</p>
            <p><strong>Passing Marks:</strong> {exam.passingMarks}</p>
          </div>
        </div>

        {/* INSTRUCTIONS */}
        <div
          className="p-8 rounded-2xl mb-10"
          style={{
            backgroundColor: colors.lightGray,
            border: `1px solid ${colors.borderGray}`,
          }}
        >
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: colors.green }}
          >
            Instructions
          </h2>

          <ul className="space-y-3" style={{ color: colors.softText }}>
            {exam.instructions.map((ins, i) => (
              <li key={i} className="text-lg">• {ins}</li>
            ))}
          </ul>
        </div>

        {/* REQUIREMENTS */}
        <div
          className="p-8 rounded-2xl mb-10"
          style={{
            backgroundColor: colors.lightGray,
            border: `1px solid ${colors.borderGray}`,
          }}
        >
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: colors.green }}
          >
            Requirements
          </h2>

          <ul className="space-y-3" style={{ color: colors.softText }}>
            <li>Camera needed: {exam.requirements.cameraRequired ? "Yes ✔" : "No"}</li>
            <li>Microphone needed: {exam.requirements.microphoneRequired ? "Yes ✔" : "No"}</li>
            <li>Full screen required: {exam.requirements.fullScreenRequired ? "Yes ✔" : "No"}</li>
          </ul>
        </div>

        {/* BUTTON */}
        <div className="flex justify-center">
          <button
            disabled={!canStart}
            className="px-10 py-4 text-lg font-semibold rounded-xl shadow-md transition-all"
            style={{
              backgroundColor: canStart ? colors.green : "#98D6A5",
              color: "white",
              cursor: canStart ? "pointer" : "not-allowed",
            }}
          >
            {canStart ? "Start Exam" : "Exam Not Started"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;
