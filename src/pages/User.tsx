import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Notification from "../Components/Notification";

const User = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const exams = [
    { id: 1, name: "Mathematics Exam", date: "2025-01-15", status: "Available" },
    { id: 2, name: "Computer Science Exam", date: "2025-02-03", status: "Coming Soon" },
    { id: 3, name: "English Exam", date: "2025-03-10", status: "Available" },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Navbar */}
      <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
        <h1 className="text-xl font-bold">Online Examination</h1>
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => navigate("/history")}
          >
            History
          </button>

          <button onClick={toggleSidebar}>
            <Bell className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Exams Table */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Available Exams</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3 font-medium text-gray-600">ID</th>
              <th className="p-3 font-medium text-gray-600">Exam Name</th>
              <th className="p-3 font-medium text-gray-600">Date</th>
              <th className="p-3 font-medium text-gray-600">Status</th>
              <th className="p-3 font-medium text-gray-600">Action</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{exam.id}</td>
                <td className="p-3">{exam.name}</td>
                <td className="p-3">{exam.date}</td>
                <td
                  className={`p-3 font-semibold ${
                    exam.status === "Available" ? "text-green-600" : "text-orange-500"
                  }`}
                >
                  {exam.status}
                </td>
                <td className="p-3">
                  {exam.status === "Available" ? (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => alert(`Entering exam: ${exam.name}`)}
                    >
                      Enter Exam
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
                    >
                      Not Available
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notification Sidebar */}
      <Notification sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default User;

