
import { useParams } from "react-router-dom";

const colors = {
  lightGreenBg: "#EAFCEF",
  green: "#2A7F3F",
  lightGray: "#F7F9F7",
  borderGray: "#DDE6D8",
  darkText: "#333333",
  softText: "#6C7A6A",
};

export default function ReviewPage() {
  const { id } = useParams();

  // SAMPLE DATA – Replace with backend later
  const reviewData = {
    examName: "Computer Networks",
    questions: [
      {
        qid: 1,
        question: "Which layer in OSI handles routing?",
        userAnswer: "Network Layer",
        correctAnswer: "Network Layer",
      },
      {
        qid: 2,
        question: "What does TCP stand for?",
        userAnswer: "Transfer Control Protocol",
        correctAnswer: "Transmission Control Protocol",
      },
      {
        qid: 3,
        question: "How many bits are in IPv4?",
        userAnswer: null,
        correctAnswer: "32 bits",
      },
    ],
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: colors.lightGreenBg }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1
          className="text-4xl font-bold text-center mb-8"
          style={{ color: colors.green }}
        >
          Review Answers
        </h1>

        {/* Exam Name */}
        <div
          className="rounded-2xl shadow-md p-5 mb-8 text-center"
          style={{
            backgroundColor: "white",
            border: `1px solid ${colors.borderGray}`,
          }}
        >
          <h2
            className="text-2xl font-semibold"
            style={{ color: colors.darkText }}
          >
            {reviewData.examName}
          </h2>
          <p className="mt-1" style={{ color: colors.softText }}>
            Exam ID: {id}
          </p>
        </div>

        {/* Questions Review */}
        <div className="space-y-6">
          {reviewData.questions.map((q) => {
            const isCorrect = q.userAnswer === q.correctAnswer;

            return (
              <div
                key={q.qid}
                className="p-6 rounded-2xl shadow-md"
                style={{
                  backgroundColor: "white",
                  border: `1px solid ${colors.borderGray}`,
                }}
              >
                {/* Question Number */}
                <p
                  className="font-bold mb-2"
                  style={{ color: colors.green }}
                >
                  Question {q.qid}
                </p>

                {/* Question Text */}
                <p
                  className="mb-4 font-medium"
                  style={{ color: colors.darkText }}
                >
                  {q.question}
                </p>

                {/* Answers */}
                <div className="space-y-2">

                  {/* User Answer */}
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      backgroundColor: colors.lightGray,
                      border: `1px solid ${colors.borderGray}`,
                    }}
                  >
                    <p className="font-medium" style={{ color: colors.darkText }}>
                      Your Answer:
                    </p>
                    <p
                      style={{
                        color: q.userAnswer
                          ? isCorrect
                            ? colors.green
                            : "red"
                          : colors.softText,
                      }}
                    >
                      {q.userAnswer ? q.userAnswer : "Not Answered"}
                    </p>
                  </div>

                  {/* Correct Answer */}
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      backgroundColor: "#fff",
                      border: `1px solid ${colors.borderGray}`,
                    }}
                  >
                    <p className="font-medium" style={{ color: colors.darkText }}>
                      Correct Answer:
                    </p>
                    <p style={{ color: colors.green }}>{q.correctAnswer}</p>
                  </div>
                </div>

                {/* Status */}
                <p
                  className="mt-4 font-bold"
                  style={{
                    color: isCorrect ? colors.green : "red",
                  }}
                >
                  {isCorrect ? "Correct ✓" : q.userAnswer ? "Wrong ✗" : "Not Attempted"}
                </p>
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-10">
          <button
            className="px-8 py-3 rounded-xl font-semibold shadow-md"
            style={{ backgroundColor: colors.green, color: "white" }}
            onClick={() => (window.location.href = "/results")}
          >
            Back to Results
          </button>
        </div>
      </div>
    </div>
  );
}

