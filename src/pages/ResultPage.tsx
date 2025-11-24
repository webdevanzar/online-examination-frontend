const colors = {
  lightGreenBg: "#EAFCEF",
  green: "#2A7F3F",
  lightGray: "#F7F9F7",
  borderGray: "#DDE6D8",
  darkText: "#333333",
  softText: "#6C7A6A",
};

export default function ResultPage() {
  // SAMPLE RESULT DATA — replace with backend later
  const results = [
    {
      id: 1,
      examName: "Computer Networks",
      date: "2025-01-22",
      score: 78,
      total: 100,
      status: "Pass",
    },
    {
      id: 2,
      examName: "Data Structures",
      date: "2025-02-10",
      score: 52,
      total: 100,
      status: "Pass",
    },
    {
      id: 3,
      examName: "Operating Systems",
      date: "2025-03-05",
      score: 34,
      total: 100,
      status: "Fail",
    },
    {
      id: 4,
      examName: "Java Programming",
      date: "2025-04-01",
      score: 89,
      total: 100,
      status: "Pass",
    },
    {
      id: 5,
      examName: "E-Commerce",
      date: "2025-05-16",
      score: 71,
      total: 100,
      status: "Pass",
    },
  ];

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: colors.lightGreenBg }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <h1
          className="text-4xl font-bold mb-8 text-center"
          style={{ color: colors.green }}
        >
          Exam Results
        </h1>

        {/* Results List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((exam) => (
            <div
              key={exam.id}
              className="rounded-2xl shadow-md p-6 transition-all hover:shadow-lg"
              style={{
                backgroundColor: "white",
                border: `1px solid ${colors.borderGray}`,
              }}
            >
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: colors.darkText }}
              >
                {exam.examName}
              </h2>

              <p style={{ color: colors.softText }}>
                <span className="font-medium">Date: </span>
                {exam.date}
              </p>

              <p style={{ color: colors.softText }}>
                <span className="font-medium">Score: </span>
                {exam.score}/{exam.total}
              </p>

              <p
                className="mt-3 font-bold"
                style={{
                  color: exam.status === "Pass" ? colors.green : "red",
                }}
              >
                {exam.status}
              </p>

              {/* View Button */}
              <button
                className="mt-4 w-full py-2 font-semibold rounded-xl"
                style={{
                  backgroundColor: colors.green,
                  color: "white",
                }}
                onClick={() => (window.location.href = `/review/${exam.id}`)}
              >
                Review Answers
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
