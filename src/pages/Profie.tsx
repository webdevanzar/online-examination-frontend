import { useState } from "react";
import { X } from "lucide-react";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    DateofBirth: "1990-01-01",
    Phone: "(320) 380-4539",
    gender: "Male",
  });

  const goodSubjects = [
    { name: "Mathematics", level: 90 },
    { name: "Science", level: 80 },
    { name: "English", level: 75 },
  ];

  const weakSubjects = [
    { name: "History", level: 40 },
    { name: "Geography", level: 35 },
    { name: "Economics", level: 25 },
  ];

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    setVideoPreview(null);
  };

  const removeProfilePic = () => {
    // Reset to default avatar
    setUser({ ...user, avatar: null });
  };

  return (
    <div className="p-6 md:p-10 bg-transparent flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* LEFT CARD — AVATAR + DELETE BUTTON */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center relative">

          {/* Delete Profile Photo Button */}
          <button
            onClick={removeProfilePic}
            className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={16} />
          </button>

          <img
            src={
              user.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="w-32 h-32 rounded-full border shadow"
          />

          {/* Upload New Profile Picture */}
     <label className="mt-4 cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
       Change Profile
     <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setUser({ ...user, avatar: URL.createObjectURL(file) });
      }
    }}
  />
</label>


          <h2 className="mt-4 text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">Student</p>
        </div>

        {/* MIDDLE — PROFILE INFORMATION */}
        <div className="md:col-span-3 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Profile Information
          </h3>

          {!editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <p><strong>Full Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Date of Birth:</strong> {user.DateofBirth}</p>
              <p><strong>Phone:</strong> {user.Phone}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Full Name"
              />

              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Email"
              />

              <input
                name="DateofBirth"
                type="date"
                value={user.DateofBirth}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />

              <input
                name="Phone"
                value={user.Phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Phone"
              />

              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          )}

          {/* EDIT BUTTON — MOVED UNDER PROFILE INFO */}
          <button
            onClick={() => setEditing(!editing)}
            className="mt-6 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            {editing ? "Save" : "Edit"}
          </button>
        </div>

        {/* CENTER — SELFIE VIDEO SECTION */}
        <div className="md:col-span-4 bg-white rounded-2xl shadow-md p-6 mt-4 mx-auto w-full">

          <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">
            Selfie Verification Video
          </h3>

          {/* Upload Button */}
          {!videoPreview && (
            <div className="flex justify-center">
              <label className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Upload Video
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </label>
            </div>
          )}

          {/* Preview */}
          {videoPreview && (
            <div className="relative flex justify-center mt-4">
              <video
                src={videoPreview}
                controls
                className="rounded-xl w-full max-w-xl shadow-lg"
              ></video>

              {/* Delete Video Button */}
              <button
                onClick={removeVideo}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* SUBJECT CARDS */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Good Subjects</h3>

          {goodSubjects.map((s) => (
            <div key={s.name} className="mb-4">
              <p className="font-medium">{s.name}</p>
              <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{ width: `${s.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Weak Subjects</h3>

          {weakSubjects.map((s) => (
            <div key={s.name} className="mb-4">
              <p className="font-medium">{s.name}</p>
              <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
                <div
                  className="bg-yellow-500 h-3 rounded-full"
                  style={{ width: `${s.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Profile;
