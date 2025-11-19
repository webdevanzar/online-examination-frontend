import React, { useState } from "react";

const SignUp = () => {
  const [profile, setProfile] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);

  // Profile upload
  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProfile(URL.createObjectURL(file));
    }
  };

  // Video upload
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#EAFCEF] flex flex-col md:flex-row">

      {/* LEFT ILLUSTRATION AREA */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <img
          src="/illustrations/exam-illustration.png"
          alt="Illustration"
          className="w-80 md:w-[70%]"
        />

        <h1 className="text-3xl font-bold text-gray-800 text-center mt-6">
          Join Mastery Hub
        </h1>
        <p className="text-gray-600 text-center max-w-sm mt-3">
          Create your account and start your secure proctored exams journey.
        </p>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:px-16">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-8 space-y-6">
          
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <img
              src="/logo/masteryhub-logo.png"
              alt="Mastery Hub Logo"
              className="h-14"
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h2>

          {/* FORM GRID */}
          <div className="grid md:grid-cols-2 gap-5 mt-4">

            {/* Full Name */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
                placeholder="example@email.com"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
                placeholder="+91 9876543210"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 outline-none"
                placeholder="********"
              />
            </div>

          </div>

          {/* UPLOAD SECTIONS (Profile + Video) */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* Profile Picture Upload */}
            <div>
              <label className="font-medium text-gray-700">Profile Photo</label>
              <div
                className="border-2 border-dashed p-4 rounded-lg mt-2 cursor-pointer hover:bg-gray-50 text-center"
                onClick={() => document.getElementById("profileInput")?.click()}
              >
                <p className="text-gray-500 text-sm">Click to upload</p>

                <input
                  type="file"
                  id="profileInput"
                  hidden
                  accept="image/*"
                  onChange={handleProfileUpload}
                />

                {profile && (
                  <div className="mt-3 relative w-28 mx-auto">
                    <button
                      className="absolute -top-3 -right-3 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProfile(null);
                      }}
                    >
                      ✖
                    </button>

                    <img
                      src={profile}
                      className="w-28 h-28 rounded-full border object-cover shadow"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Selfie Video Upload */}
            <div>
              <label className="font-medium text-gray-700">Selfie Video</label>
              <div
                className="border-2 border-dashed p-4 rounded-lg mt-2 cursor-pointer hover:bg-gray-50 text-center"
                onClick={() => document.getElementById("videoInput")?.click()}
              >
                <p className="text-gray-500 text-sm">Click to upload video</p>

                <input
                  type="file"
                  id="videoInput"
                  hidden
                  accept="video/*"
                  onChange={handleVideoUpload}
                />

                {video && (
                  <div className="mt-3 relative">
                    <button
                      className="absolute -top-3 -right-3 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideo(null);
                      }}
                    >
                      ✖
                    </button>

                    <video
                      src={video}
                      controls
                      className="w-full h-40 rounded-lg border object-cover shadow"
                    />
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* SIGN UP BUTTON */}
          <button className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition shadow">
            Sign Up
          </button>

          {/* OR DIVIDER */}
          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-gray-500">or</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* GOOGLE SIGNUP */}
          <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Logo"
              className="h-5"
            />
            <span className="text-gray-700 font-medium">
              Sign Up with Google
            </span>
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 font-semibold hover:underline">
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
