import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAttemptSummary } from "../services/auth";

const colors = {
  lightGreenBg: "#EAFCEF",
  green: "#2A7F3F",
  lightGray: "#F7F9F7",
  borderGray: "#DDE6D8",
  darkText: "#333333",
  softText: "#6C7A6A",
};

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const attemptId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("attemptId") || "";
  }, [location.search]);

  const { data, isLoading, isError } = useAttemptSummary(attemptId, !!attemptId);

  const navigateToExams = () => {
    navigate("/exams");
  };

  if (!attemptId) {
    return (
      <div
        className="min-h-screen p-6"
        style={{ backgroundColor: colors.lightGreenBg }}
      >
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow border" style={{ borderColor: colors.borderGray }}>
          <h1 className="text-2xl font-bold" style={{ color: colors.darkText }}>
            Result
          </h1>
          <p className="mt-2" style={{ color: colors.softText }}>
            Missing attemptId.
          </p>
          <button
            className="mt-4 px-4 py-2 rounded-xl text-white font-semibold"
            style={{ backgroundColor: colors.green }}
            onClick={navigateToExams}
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className="min-h-screen p-6 flex items-center justify-center"
        style={{ backgroundColor: colors.lightGreenBg }}
      >
        <div className="text-lg font-semibold" style={{ color: colors.darkText }}>
          Loading result...
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div
        className="min-h-screen p-6"
        style={{ backgroundColor: colors.lightGreenBg }}
      >
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow border" style={{ borderColor: colors.borderGray }}>
          <h1 className="text-2xl font-bold" style={{ color: colors.darkText }}>
            Failed to load result
          </h1>
          <p className="mt-2" style={{ color: colors.softText }}>
            Please try again.
          </p>
          <button
            className="mt-4 px-4 py-2 rounded-xl text-white font-semibold"
            style={{ backgroundColor: colors.green }}
            onClick={navigateToExams}
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  const passingScore = data.exam.passingMarks ?? data.exam.totalMarks * 0.5;
  const status = data.score >= passingScore ? "Pass" : "Fail";

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: colors.lightGreenBg }}
    >
      <div className="max-w-5xl mx-auto">
        <h1
          className="text-4xl font-bold mb-8 text-center"
          style={{ color: colors.green }}
        >
          Exam Result
        </h1>

        <div
          className="rounded-2xl shadow-md p-6 mb-6"
          style={{ backgroundColor: "white", border: `1px solid ${colors.borderGray}` }}
        >
          <h2 className="text-xl font-semibold" style={{ color: colors.darkText }}>
            {data.exam.title}
          </h2>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: colors.lightGray }}>
              <p className="text-sm" style={{ color: colors.softText }}>
                Score
              </p>
              <p className="text-2xl font-bold" style={{ color: colors.darkText }}>
                {data.score}/{data.exam.totalMarks}
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: colors.lightGray }}>
              <p className="text-sm" style={{ color: colors.softText }}>
                Status
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: status === "Pass" ? colors.green : "red" }}
              >
                {status}
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: colors.lightGray }}>
              <p className="text-sm" style={{ color: colors.softText }}>
                Submitted
              </p>
              <p className="text-sm font-semibold" style={{ color: colors.darkText }}>
                {data.submittedAt ? new Date(data.submittedAt).toLocaleString() : "-"}
              </p>
            </div>
          </div>

          <button
            className="mt-5 px-4 py-2 rounded-xl text-white font-semibold"
            style={{ backgroundColor: colors.green }}
            onClick={navigateToExams}
          >
            Back to Exams
          </button>
        </div>

        <div className="space-y-4">
          {data.answers
            .slice()
            .sort((a, b) => a.question.questionText.localeCompare(b.question.questionText))
            .map((ans, idx) => {
              const q = ans.question;
              const correctOptions = q.options.filter((o) => o.isCorrect);
              const selected = ans.selectedOption?.id || null;

              return (
                <div
                  key={ans.id}
                  className="rounded-2xl shadow-sm p-6"
                  style={{ backgroundColor: "white", border: `1px solid ${colors.borderGray}` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: colors.darkText }}>
                        Q{idx + 1}. {q.questionText}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: colors.softText }}>
                        Type: {q.type.toUpperCase()} • Max Marks: {q.marks}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm" style={{ color: colors.softText }}>
                        Marks Obtained
                      </p>
                      <p className="text-lg font-bold" style={{ color: colors.darkText }}>
                        {ans.marksObtained}/{q.marks}
                      </p>
                    </div>
                  </div>

                  {q.type === "typing" ? (
                    <div className="mt-4">
                      <p className="font-semibold" style={{ color: colors.darkText }}>
                        Your Answer
                      </p>
                      <div
                        className="mt-2 p-4 rounded-xl"
                        style={{ backgroundColor: colors.lightGray, color: colors.darkText }}
                      >
                        {ans.writtenAnswer || "(No answer)"}
                      </div>
                      <p className="mt-3 text-sm" style={{ color: colors.softText }}>
                        This question is graded manually.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <p className="font-semibold" style={{ color: colors.darkText }}>
                        Options
                      </p>
                      <div className="mt-2 space-y-2">
                        {q.options.map((opt) => {
                          const isCorrect = opt.isCorrect;
                          const isSelected = selected === opt.id;
                          return (
                            <div
                              key={opt.id}
                              className="p-3 rounded-xl flex items-center justify-between"
                              style={{
                                backgroundColor: isCorrect
                                  ? "#EAFCEF"
                                  : colors.lightGray,
                                border: `1px solid ${colors.borderGray}`,
                              }}
                            >
                              <span style={{ color: colors.darkText }}>{opt.optionText}</span>
                              <span className="text-sm font-semibold" style={{ color: colors.softText }}>
                                {isCorrect ? "Correct" : ""}
                                {isSelected ? " (Selected)" : ""}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <p className="mt-3 text-sm" style={{ color: colors.softText }}>
                        Correct: {correctOptions.map((o) => o.optionText).join(", ") || "-"}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
