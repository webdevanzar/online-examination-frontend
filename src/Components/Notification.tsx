import { CheckCircle, Clock, FileText, Bell } from "lucide-react";

const Notification = ({ sidebarOpen, toggleSidebar }) => {
  // Long list of notifications to force scrolling
  const notifications = [
    { id: 1, type: "new", message: "New Mathematics Exam is now available.", time: "2h ago" },
    { id: 2, type: "upcoming", message: "Computer Science Exam will start soon.", time: "1d ago" },
    { id: 3, type: "result", message: "English Exam results published.", time: "3d ago" },
    { id: 4, type: "new", message: "Physics Exam added for next week.", time: "4h ago" },
    { id: 5, type: "upcoming", message: "Chemistry Exam will start soon.", time: "6h ago" },
    { id: 6, type: "result", message: "Biology Exam results published.", time: "1d ago" },
    { id: 7, type: "new", message: "History Exam is now available.", time: "3h ago" },
    { id: 8, type: "upcoming", message: "Geography Exam will start tomorrow.", time: "5h ago" },
    { id: 9, type: "result", message: "Economics Exam results published.", time: "2d ago" },
    { id: 10, type: "new", message: "Computer Networks Exam added.", time: "1h ago" },
    { id: 11, type: "new", message: "Java Programming Exam available.", time: "30m ago" },
    { id: 12, type: "upcoming", message: "Data Structures Exam will start soon.", time: "3h ago" },
    { id: 13, type: "result", message: "Web Development Exam results published.", time: "1d ago" },
    { id: 14, type: "new", message: "Operating Systems Exam available.", time: "2h ago" },
    { id: 15, type: "upcoming", message: "Database Management Exam will start soon.", time: "4h ago" },
    { id: 16, type: "result", message: "AI Exam results published.", time: "2d ago" },
    { id: 17, type: "new", message: "Cybersecurity Exam is now available.", time: "1h ago" },
    { id: 18, type: "upcoming", message: "Software Engineering Exam tomorrow.", time: "5h ago" },
    { id: 19, type: "result", message: "Cloud Computing Exam results published.", time: "3d ago" },
    { id: 20, type: "new", message: "Machine Learning Exam added.", time: "45m ago" },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "new":
        return <CheckCircle className="w-5 h-5 text-green-500 mr-2" />;
      case "upcoming":
        return <Clock className="w-5 h-5 text-orange-500 mr-2" />;
      case "result":
        return <FileText className="w-5 h-5 text-blue-500 mr-2" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500 mr-2" />;
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {notifications.map((note) => (
            <div
              key={note.id}
              className="flex items-start p-3 bg-gray-100 rounded shadow-sm"
            >
              {getIcon(note.type)}
              <div>
                <p className="text-gray-800">{note.message}</p>
                <span className="text-gray-500 text-sm">{note.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Notification;
