import React, { useState } from "react";

const SignUp: React.FC = () => {
  const [video, setVideo] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-5">

        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {/* Full Name */}
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            placeholder="Enter phone number"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            placeholder="Enter password"
          />
        </div>

        {/* Drag & Drop Selfie Video */}
        {/* Drag & Drop Selfie Video */}
<div>
  <label className="text-sm font-medium">Upload Selfie Video</label>

  <div
    className="w-full mt-2 border-2 border-dashed rounded-lg p-5 text-center cursor-pointer hover:bg-gray-50 relative"
    onDragOver={(e) => e.preventDefault()}
    onDrop={handleDrop}
    onClick={() => document.getElementById("videoInput")?.click()}
  >
    <p className="text-gray-500">Drag & drop video or click to upload</p>

    <input
      type="file"
      accept="video/*"
      id="videoInput"
      onChange={handleVideoChange}
      hidden
    />

    {/* Preview Section with Close Button */}
    {video && (
      <div className="mt-4 relative">
        {/* Close Button */}
        <button
          type="button"
          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-600"
          onClick={(e) => {
            e.stopPropagation(); // prevent re-triggering upload click
            setVideo(null);
          }}
        >
          ✖
        </button>

        <video
          src={video}
          controls
          className="w-full h-48 rounded-lg object-cover"
        />
      </div>
    )}
  </div>
</div>

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Sign Up
        </button>

      </div>
    </div>
  );
};

export default SignUp;

