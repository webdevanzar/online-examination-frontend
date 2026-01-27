import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Exam } from "../services/exam";

const colors = {
  lightGreenBg: "#EAFCEF",
  green: "#2A7F3F",
  lightGray: "#F7F9F7",
  borderGray: "#DDE6D8",
  darkText: "#333333",
  softText: "#6C7A6A",
};

const InstructionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const exam = (location.state as { exam?: Exam } | null)?.exam;

  const fallbackInstructions = [
    "Do not refresh or close the browser.",
    "Webcam and mic may be monitored.",
    "No switching tabs.",
    "Stable internet required.",
    "Submit before time ends.",
  ];

  // Parse API instructions if available and combine with fallback
  const getInstructions = () => {
    const apiInstructions: string[] = [];

    if (exam?.instructions) {
      try {
        const parsed = JSON.parse(exam.instructions);
        if (Array.isArray(parsed)) {
          apiInstructions.push(...parsed);
        }
      } catch {
        console.error("Failed to parse exam instructions");
        // If parsing fails, treat as single instruction string
        if (typeof exam.instructions === 'string' && exam.instructions.trim()) {
          apiInstructions.push(exam.instructions.trim());
        }
      }
    }

    // Combine API instructions first, then fallback instructions
    const allInstructions = [...apiInstructions, ...fallbackInstructions];

    // Deduplicate instructions (case-insensitive)
    const uniqueInstructions = allInstructions.filter(
      (instruction, index, self) =>
        self.findIndex(
          (i) => i.toLowerCase().trim() === instruction.toLowerCase().trim()
        ) === index
    );

    return uniqueInstructions;
  };

  // Get API description if available
  const getExamDescription = () => {
    if (exam?.description && exam.description.trim()) {
      return exam.description;
    }
    return null;
  };

  const instructions = getInstructions();
  const examDescription = getExamDescription();
  const hasApiInstructions = exam?.instructions && exam.instructions.trim();
  const hasApiDescription = examDescription !== null;

  const canStart = exam ? new Date() >= new Date(exam.startTime) : false;

  const handleStart = () => {
    if (!exam) {
      toast.error("Missing exam details. Please select an exam again.");
      navigate("/exams");
      return;
    }

    // Navigate directly to enrollment page (face verification happens FIRST)
    // Exam attempt will be created AFTER successful face verification
    navigate(`/exam/enroll/${exam.id}`, { state: { exam } });
  };

  if (!exam) {
    return (
      <div
        className="min-h-screen w-full p-10 flex items-center justify-center"
        style={{ backgroundColor: colors.lightGreenBg }}
      >
        <div
          className="w-full max-w-xl p-10 rounded-3xl shadow-lg text-center"
          style={{ backgroundColor: "white", border: `1px solid ${colors.borderGray}` }}
        >
          <h1 className="text-2xl font-bold mb-4" style={{ color: colors.darkText }}>
            Exam details not found
          </h1>
          <p className="mb-6" style={{ color: colors.softText }}>
            Please go back to Exams and click Start Exam again.
          </p>
          <button
            onClick={() => navigate("/exams")}
            className="px-8 py-3 text-lg font-semibold rounded-xl shadow-md transition-all"
            style={{ backgroundColor: colors.green, color: "white" }}
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

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
          {exam.title}
        </h1>

        {/* EXAM DESCRIPTION FROM API */}
        {hasApiDescription && (
          <div
            className="p-6 rounded-2xl mb-8"
            style={{
              backgroundColor: colors.lightGray,
              border: `1px solid ${colors.borderGray}`,
            }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: colors.darkText }}
            >
              About This Exam
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: colors.softText }}>
              {examDescription}
            </p>
          </div>
        )}

        {/* EXAM DETAILS */}
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
            <p><strong>Duration:</strong> {exam.duration} mins</p>
            <p><strong>Total Questions:</strong> {exam.questionCount}</p>
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
            className="text-2xl font-semibold mb-6"
            style={{ color: colors.green }}
          >
            Instructions
          </h2>

          {/* API Instructions Section */}
          {hasApiInstructions && (
            <div className="mb-6">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: colors.darkText }}
              >
                📋 Exam-Specific Instructions
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800 mb-2">
                  These instructions are specifically provided for this exam:
                </p>
                <ul className="space-y-2" style={{ color: colors.softText }}>
                  {(() => {
                    const apiInstructions: string[] = [];
                    if (exam?.instructions) {
                      try {
                        const parsed = JSON.parse(exam.instructions);
                        if (Array.isArray(parsed)) {
                          apiInstructions.push(...parsed);
                        }
                      } catch {
                        if (typeof exam.instructions === 'string' && exam.instructions.trim()) {
                          apiInstructions.push(exam.instructions.trim());
                        }
                      }
                    }
                    return apiInstructions.map((ins, i) => (
                      <li key={i} className="text-lg flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span>{ins}</span>
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            </div>
          )}

          {/* General Instructions Section */}
          <div>
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: colors.darkText }}
            >
              ⚠️ General Guidelines
            </h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800 mb-2">
                Please follow these general guidelines for all exams:
              </p>
              <ul className="space-y-2" style={{ color: colors.softText }}>
                {instructions.map((ins, i) => {
                  // Check if this is a fallback instruction
                  const isFallback = fallbackInstructions.includes(ins);
                  return (
                    <li key={i} className="text-lg flex items-start">
                      <span className={isFallback ? "text-yellow-600" : "text-blue-600"} style={{ marginRight: '8px', marginTop: '4px' }}>•</span>
                      <span>{ins}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>


        {/* BUTTON */}
        <div className="flex justify-center">
          <button
            disabled={!canStart}
            onClick={handleStart}
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
