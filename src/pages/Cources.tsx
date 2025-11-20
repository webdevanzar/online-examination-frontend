import { useNavigate } from "react-router-dom";

export default function Courses() {
  const navigate = useNavigate();

const courses = [
  {
    id: 101,
    name: "Full-Stack Web Development",
    instructor: "John Mathew",
    category: "Programming",
    difficulty: "Intermediate",
    duration: "40 Hours",
    video: "https://www.youtube.com/embed/ZxKM3DCV2kE",
    thumbnail: "https://img.youtube.com/vi/ZxKM3DCV2kE/maxresdefault.jpg",
    status: "Available",
  },
  {
    id: 102,
    name: "Cybersecurity Fundamentals",
    instructor: "Ayesha Rahman",
    category: "Security",
    difficulty: "Beginner",
    duration: "25 Hours",
    video: "https://www.youtube.com/embed/2_lswM1S264",
    thumbnail: "https://img.youtube.com/vi/2_lswM1S264/maxresdefault.jpg",
    status: "Available",
  },
  {
    id: 103,
    name: "Artificial Intelligence Basics",
    instructor: "David Joseph",
    category: "AI & ML",
    difficulty: "Beginner",
    duration: "30 Hours",
    video: "https://www.youtube.com/embed/aircAruvnKk",
    thumbnail: "https://img.youtube.com/vi/aircAruvnKk/maxresdefault.jpg",
    status: "Coming Soon",
  },

  // ------------------- NEW COURSES BELOW -------------------

  {
    id: 104,
    name: "Data Structures & Algorithms",
    instructor: "Sarah Khan",
    category: "Computer Science",
    difficulty: "Advanced",
    duration: "45 Hours",
    video: "https://www.youtube.com/embed/8hly31xKli0",
    thumbnail: "https://img.youtube.com/vi/8hly31xKli0/maxresdefault.jpg",
    status: "Available",
  },
  {
    id: 105,
    name: "Cloud Computing with AWS",
    instructor: "Michael Roberts",
    category: "Cloud Computing",
    difficulty: "Intermediate",
    duration: "35 Hours",
    video: "https://www.youtube.com/embed/ulprqHHWlng",
    thumbnail: "https://img.youtube.com/vi/ulprqHHWlng/maxresdefault.jpg",
    status: "Available",
  },
  {
    id: 106,
    name: "Mobile App Development",
    instructor: "Rebecca Thomas",
    category: "App Development",
    difficulty: "Beginner",
    duration: "28 Hours",
    video: "https://www.youtube.com/embed/VPvVD8t02U8",
    thumbnail: "https://img.youtube.com/vi/VPvVD8t02U8/maxresdefault.jpg",
    status: "Coming Soon",
  }
];


  return (
    <div className="relative px-10 mt-20 mb-20">

      {/* Soft Background */}
      <div className="absolute -top-20 -left-32 w-72 h-72 bg-green-100 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-32 w-72 h-72 bg-green-100 rounded-full opacity-40 blur-3xl"></div>

      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          📚 Explore Our Courses
        </span>

        <h2 className="text-4xl font-extrabold mt-4 text-gray-800">
          Learn New Skills With Expert-Led Courses
        </h2>

        <p className="text-gray-500 mt-2 text-lg">
          Choose a course to enhance your knowledge and career growth.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl border shadow-lg hover:shadow-2xl transition-all p-6 hover:-translate-y-2"
          >

            {/* Status + ID */}
            <div className="flex justify-between items-center mb-4">
              <span
                className={`px-4 py-1 text-sm rounded-full font-medium ${
                  course.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {course.status}
              </span>

              <span className="text-gray-400 text-sm font-medium">ID: {course.id}</span>
            </div>

            {/* Thumbnail */}
            <div className="mb-4">
              <img
                src={course.thumbnail}
                alt={course.name}
                className="rounded-xl w-full h-40 object-cover shadow-md"
              />
            </div>

            {/* Course Title */}
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {course.name}
            </h3>

            {/* Instructor */}
            <p className="text-gray-600 mb-3">
              👨‍🏫 Instructor: <span className="font-semibold">{course.instructor}</span>
            </p>

            {/* Tags */}
            <div className="flex gap-3 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {course.category}
              </span>

              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {course.difficulty}
              </span>
            </div>

            {/* More Course Info */}
            <div className="text-gray-600 space-y-2 mb-6">
              <p className="flex items-center gap-2">
                ⏳ <span>Duration: {course.duration}</span>
              </p>
              <p className="flex items-center gap-2">
                🎥 <span>Includes: Video Tutorials, Assignments</span>
              </p>
              <p className="flex items-center gap-2">
                ⭐ <span>Certificate Provided</span>
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => {
                if (course.status === "Available")
                  navigate(`/course/${course.id}`);
              }}
              disabled={course.status !== "Available"}
              className={`w-full py-3 rounded-xl mt-2 font-semibold transition-all ${
                course.status === "Available"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {course.status === "Available" ? "Start Learning" : "Coming Soon"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
