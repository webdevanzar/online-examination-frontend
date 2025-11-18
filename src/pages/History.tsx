import { useNavigate } from "react-router-dom";

const History = () => {
  const historyData = [
    { id: 1, examName: "Mathematics Exam", date: "2025-01-15", score: "85%", status: "Passed" },
    { id: 2, examName: "Computer Science Exam", date: "2025-02-03", score: "72%", status: "Passed" },
    { id: 3, examName: "English Exam", date: "2025-03-10", score: "48%", status: "Failed" },
  ];
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      
      {/* Page Header */}
      <div className="bg-white flex justify-between p-4 rounded-xl shadow mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Exam History</h1>
    <button
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  onClick={() => navigate("/user")}
>
  Back
</button>

        
      </div>

      {/* Responsive Table Wrapper */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Your Previous Exams</h2>

        {/* Horizontal scroll on small screens */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[600px]">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 font-medium text-gray-600">ID</th>
                <th className="p-3 font-medium text-gray-600">Exam Name</th>
                <th className="p-3 font-medium text-gray-600">Date</th>
                <th className="p-3 font-medium text-gray-600">Score</th>
                <th className="p-3 font-medium text-gray-600">Result</th>
              </tr>
            </thead>

            <tbody>
              {historyData.map((exam) => (
                <tr key={exam.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{exam.id}</td>
                  <td className="p-3">{exam.examName}</td>
                  <td className="p-3">{exam.date}</td>
                  <td className="p-3">{exam.score}</td>

                  <td
                    className={`p-3 font-semibold ${
                      exam.status === "Passed" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {exam.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default History;
