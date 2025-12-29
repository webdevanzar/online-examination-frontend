import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useStartExam } from "../services/auth";
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
  const startExam = useStartExam();

  const exam = (location.state as { exam?: Exam } | null)?.exam;

  const fallbackInstructions = [
    "Do not refresh or close the browser.",
    "Webcam and mic may be monitored.",
    "No switching tabs.",
    "Stable internet required.",
    "Submit before time ends.",
  ];

  const canStart = exam ? new Date() >= new Date(exam.startTime) : false;

  const handleStart = () => {
    if (!exam) {
      toast.error("Missing exam details. Please select an exam again.");
      navigate("/exams");
      return;
    }

    startExam.mutate(exam.id, {
      onSuccess: (data) => {
        toast.success("Exam started");
        navigate(`/exam/${data.attemptId}/enroll`, { state: { exam } });
      },
      onError: () => {
        toast.error("Failed to start exam. Please try again.");
      },
    });
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
            className="text-2xl font-semibold mb-4"
            style={{ color: colors.green }}
          >
            Instructions
          </h2>

          <ul className="space-y-3" style={{ color: colors.softText }}>
            {fallbackInstructions.map((ins, i) => (
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
            <li>Camera / Face detection: {exam.faceDetectionRequired ? "Yes ✔" : "No"}</li>
            <li>Microphone needed: {exam.microphoneRequired ? "Yes ✔" : "No"}</li>
            <li>Full screen required: Yes ✔</li>
          </ul>
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
            {startExam.isPending ? "Starting..." : canStart ? "Start Exam" : "Exam Not Started"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;
