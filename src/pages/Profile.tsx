import React, { useEffect, useState } from "react";
import {
  X,
  Camera,
  Upload,
  Trash2,
  Pencil,
  Check,
  Play,
  User2,
  Keyboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Subject = { name: string; level: number };
type User = {
  name: string;
  email: string;
  DateofBirth: string;
  Phone: string;
  gender: "Male" | "Female" | "Other";
  avatar?: string | null; // local object URL or remote URL
};

const initialUser: User = {
  name: "John Doe",
  email: "john@example.com",
  DateofBirth: "1990-01-01",
  Phone: "(320) 380-4539",
  gender: "Male",
  avatar: null,
};

const initialGoodSubjects: Subject[] = [
  { name: "Mathematics", level: 90 },
  { name: "Science", level: 80 },
  { name: "English", level: 75 },
];

const initialWeakSubjects: Subject[] = [
  { name: "History", level: 40 },
  { name: "Geography", level: 35 },
  { name: "Economics", level: 25 },
];

const Profile: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  const [user, setUser] = useState<User>(initialUser);

  const [goodSubjects] = useState<Subject[]>(initialGoodSubjects);
  const [weakSubjects] = useState<Subject[]>(initialWeakSubjects);

  // Local temp state for edits so "Save" can be applied or canceled
  const [draft, setDraft] = useState<User>(user);

  // Stats example (can be wired to real data)
  const stats = [
    { label: "Courses", value: 12 },
    { label: "Exams Taken", value: 8 },
    { label: "Completion", value: 82 }, // percent
    { label: "Accuracy", value: 76 }, // percent
  ];

  useEffect(() => {
    // keep draft in sync when user updates outside edit mode
    setDraft(user);
  }, [user]);

  const navigate = useNavigate();

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (user.avatar && user.avatar.startsWith("blob:")) {
        URL.revokeObjectURL(user.avatar);
      }
      if (videoPreview && videoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(videoPreview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRetakeTypingTest = () => {
    navigate('/RetakeTypingProfile');
  };

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser((prev) => {
      // revoke previous avatar object URL if replacing
      if (
        prev.avatar &&
        prev.avatar.startsWith("blob:") &&
        draft.avatar !== prev.avatar
      ) {
        URL.revokeObjectURL(prev.avatar);
      }
      return { ...draft };
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(user);
    setEditing(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // revoke previous draft avatar if blob
    if (draft.avatar && draft.avatar.startsWith("blob:")) {
      URL.revokeObjectURL(draft.avatar);
    }
    const objUrl = URL.createObjectURL(file);
    setDraft((prev) => ({ ...prev, avatar: objUrl }));
  };

  const removeAvatar = () => {
    // revoke both draft and user avatar if blob
    if (draft.avatar && draft.avatar.startsWith("blob:")) {
      URL.revokeObjectURL(draft.avatar);
    }
    if (user.avatar && user.avatar.startsWith("blob:")) {
      URL.revokeObjectURL(user.avatar);
    }
    setDraft((prev) => ({ ...prev, avatar: null }));
    setUser((prev) => ({ ...prev, avatar: null }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (videoPreview && videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }
    const objUrl = URL.createObjectURL(file);
    setVideoPreview(objUrl);
    setVideoFileName(file.name);
  };

  // support drag & drop for video
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) return;
    if (videoPreview && videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }
    const objUrl = URL.createObjectURL(file);
    setVideoPreview(objUrl);
    setVideoFileName(file.name);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeVideo = () => {
    if (videoPreview && videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    setVideoFileName(null);
  };

  return (
    <div className="p-4 md:p-8 bg-transparent flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* LEFT SIDEBAR (avatar + quick actions + stats) */}
        <aside className="md:col-span-4 col-span-1 space-y-6">
          {/* Avatar Card */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center relative">
            <div className="relative">
              {/* Avatar preview: if draft.avatar exists show it, else fallback icon */}
              <div className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                {draft.avatar ? (
                  // show image preview
                  <img
                    src={draft.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">
                    <User2 size={48} />
                  </div>
                )}
              </div>

              {/* Show close icon only if a preview exists (draft.avatar) */}
              {draft.avatar && (
                <button
                  onClick={removeAvatar}
                  aria-label="Remove avatar"
                  className="absolute -top-2 -right-2 bg-white border shadow-sm rounded-full p-1.5 hover:bg-red-50"
                >
                  <X size={14} className="text-red-600" />
                </button>
              )}
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500">Student</p>

            <div className="mt-4 w-full flex flex-col gap-2">
              <label
                htmlFor="avatarInput"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium cursor-pointer hover:bg-green-700"
              >
                <Camera size={16} /> Change Profile
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>

              <button
                onClick={() => {
                  // simple remove action also when no preview; revoke user avatar too
                  removeAvatar();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>

          {/* Retake Typing Test Button */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Typing Profile
            </h3>
            <button
              onClick={handleRetakeTypingTest}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-[#1e6b32] transition-colors"
            >
              <Keyboard size={18} />
              Retake Typing Test
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Update your typing pattern for enhanced security
            </p>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Quick Stats
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-gray-50 rounded-lg p-3 flex flex-col items-start"
                >
                  <span className="text-xs text-gray-500">{s.label}</span>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-lg font-semibold text-gray-800">
                      {s.label === "Courses" || s.label === "Exams Taken"
                        ? s.value
                        : `${s.value}%`}
                    </span>
                    {/* small progress for percent stats */}
                    {(s.label === "Completion" || s.label === "Accuracy") && (
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${s.value}%`,
                            backgroundColor: "#10B981", // green-500
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subjects Summary (compact) */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Subject Snapshot
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Top Subjects</p>
                {goodSubjects.slice(0, 2).map((s) => (
                  <div key={s.name} className="mt-2">
                    <div className="flex justify-between text-sm">
                      <span>{s.name}</span>
                      <span className="font-medium">{s.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${s.level}%`,
                          backgroundColor: "#10B981",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs text-gray-500">Needs Improvement</p>
                {weakSubjects.slice(0, 2).map((s) => (
                  <div key={s.name} className="mt-2">
                    <div className="flex justify-between text-sm">
                      <span>{s.name}</span>
                      <span className="font-medium">{s.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${s.level}%`,
                          backgroundColor: "#F59E0B",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="md:col-span-8 col-span-1 space-y-6">
          {/* Profile Info Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Profile Information
                </h3>
                <p className="text-sm text-gray-500">
                  Keep your profile up to date
                </p>
              </div>

              <div className="flex items-center gap-2">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
                    >
                      <Check size={16} /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              {!editing ? (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-800">{user.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{user.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium text-gray-800">
                      {user.DateofBirth}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-800">{user.Phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium text-gray-800">{user.gender}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs text-gray-500">Full Name</label>
                    <input
                      name="name"
                      value={draft.name}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-lg p-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Email</label>
                    <input
                      name="email"
                      value={draft.email}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-lg p-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">
                      Date of Birth
                    </label>
                    <input
                      name="DateofBirth"
                      type="date"
                      value={draft.DateofBirth}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-lg p-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Phone</label>
                    <input
                      name="Phone"
                      value={draft.Phone}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-lg p-2 text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-500">Gender</label>
                    <select
                      name="gender"
                      value={draft.gender}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-lg p-2 text-sm"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Selfie Verification Video Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Selfie Verification Video
                </h3>
                <p className="text-sm text-gray-500">
                  Upload a short selfie video (5-15 seconds) — use natural
                  lighting and face the camera.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  Accepted: mp4, mov, webm
                </span>
                <label
                  htmlFor="videoUpload"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-3 py-2 text-sm cursor-pointer hover:bg-green-700"
                >
                  <Upload size={14} /> Upload
                  <input
                    id="videoUpload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                </label>
              </div>
            </div>

            {/* Upload / Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="mt-6 rounded-xl border-2 border-dashed border-gray-200 p-4 flex flex-col md:flex-row items-center gap-4"
            >
              {/* Left: preview or placeholder */}
              <div className="w-full md:w-2/5 flex flex-col items-center">
                {!videoPreview ? (
                  <div className="w-full h-40 rounded-lg bg-gray-50 flex flex-col items-center justify-center text-center p-4">
                    <Play size={28} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Drag & drop a short selfie video here or use the Upload
                      button.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Tip: Keep it 5–15s, face centered, good lighting.
                    </p>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="relative rounded-lg overflow-hidden shadow">
                      <video
                        src={videoPreview}
                        controls
                        className="w-full h-40 object-cover"
                      />
                      {/* show remove X only when preview exists */}
                      <button
                        onClick={removeVideo}
                        aria-label="Remove video"
                        className="absolute top-2 right-2 bg-white/90 p-1 rounded-full hover:bg-red-50"
                      >
                        <X size={16} className="text-red-600" />
                      </button>
                    </div>

                    {videoFileName && (
                      <p className="mt-2 text-xs text-gray-500">
                        {videoFileName}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Right: Explanation + Actions */}
              <div className="w-full md:w-3/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Video Guidelines
                    </p>
                    <ul className="text-xs text-gray-500 mt-2 space-y-1 list-disc list-inside">
                      <li>Use a neutral background and good lighting.</li>
                      <li>Keep your face visible and centered.</li>
                      <li>Speak your name or state the exam ID (optional).</li>
                    </ul>
                  </div>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="videoUpload2"
                      className="inline-flex items-center gap-2 rounded-lg bg-white border px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      <Upload size={14} /> Choose file
                      <input
                        id="videoUpload2"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleVideoUpload}
                      />
                    </label>

                    <button
                      onClick={() => {
                        // Play quick instructions — for demo we just simulate
                        alert(
                          "Instruction: Record a short video (5-15s) with your face visible and good lighting."
                        );
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      <Play size={14} /> Preview Tips
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alert("Submitting verification... (demo)")}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
                  >
                    Submit Verification
                  </button>

                  <button
                    onClick={removeVideo}
                    className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    aria-disabled={!videoPreview}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects Full Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Good Subjects
                </h3>
                <p className="text-sm text-gray-500">Keep it up</p>
              </div>

              <div className="mt-4 space-y-4">
                {goodSubjects.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-800">
                        {s.name}
                      </span>
                      <span className="text-sm text-gray-600">{s.level}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full">
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: `${s.level}%`,
                          backgroundColor: "#10B981",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Weak Subjects
                </h3>
                <p className="text-sm text-gray-500">Focus these</p>
              </div>

              <div className="mt-4 space-y-4">
                {weakSubjects.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-800">
                        {s.name}
                      </span>
                      <span className="text-sm text-gray-600">{s.level}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full">
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: `${s.level}%`,
                          backgroundColor: "#F59E0B",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
