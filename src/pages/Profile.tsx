import React, { useEffect, useState } from "react";
import {
  X,
  Upload,
  Trash2,
  Pencil,
  Check,
  Play,
  User2,
  Keyboard,
  RefreshCw,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  useStudentMe,
  useStudentProfileImageUpdate,
  useStudentProfileUpdate,
  useStudentSelfieVideoUpdate,
  useStudentProfileImageDelete,
  useStudentSelfieVideoDelete,
} from "../services/auth";

type User = {
  name: string;
  email: string;
  DateofBirth: string;
  Phone: string;
  gender: "Male" | "Female" | "Other";
  avatar?: string | null; // local object URL or remote URL
};

const initialUser: User = {
  name: "",
  email: "",
  DateofBirth: "",
  Phone: "",
  gender: "Other",
  avatar: null,
};

// subjects UI removed per request

const Profile: React.FC = () => {
  // trigger fetching current user and syncing Redux auth state
  const { data } = useStudentMe();
  const profileUpdate = useStudentProfileUpdate();
  const profileImageUpdate = useStudentProfileImageUpdate();
  const selfieVideoUpdate = useStudentSelfieVideoUpdate();
  const profileImageDelete = useStudentProfileImageDelete();
  const selfieVideoDelete = useStudentSelfieVideoDelete();
  const auth = useSelector((state: RootState) => state.auth);
  const hasTypingProfile = auth.hasTypingProfile || false;
  const [editing, setEditing] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null
  );
  const [user, setUser] = useState<User>(initialUser);

  // removed subjects state per request

  // Local temp state for edits so "Save" can be applied or canceled
  const [draft, setDraft] = useState<User>(user);

  // Quick Stats integrated with Redux auth
  const stats = [
    { label: "Notifications", value: auth.unreadNotificationCount },
    { label: "Account", value: auth.isActive ? "Active" : "Inactive" },
    {
      label: "Member Since",
      value: new Date(auth.createdAt).toLocaleDateString(),
    },
    { label: "Gender", value: auth.gender ? auth.gender : "-" },
  ];

  useEffect(() => {
    // Map Redux auth -> local user shape
    const genderDisplay = auth.gender
      ? ((auth.gender.charAt(0).toUpperCase() +
          auth.gender.slice(1)) as User["gender"])
      : ("Other" as User["gender"]);
    const mapped: User = {
      name: auth.fullName || "",
      email: auth.email || "",
      DateofBirth: auth.dob || "",
      Phone: auth.phoneNumber || "",
      gender: genderDisplay,
      avatar: auth.profileImage || null,
    };
    setUser(mapped);
    setDraft(mapped);
  }, [
    auth.fullName,
    auth.email,
    auth.dob,
    auth.phoneNumber,
    auth.gender,
    auth.profileImage,
  ]);

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
    navigate("/typing-profile-setup");
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
    // Persist profile to backend
    profileUpdate.mutate({
      fullName: draft.name,
      phoneNumber: draft.Phone,
      gender: draft.gender.toLowerCase() as "male" | "female" | "other",
      dob: draft.DateofBirth,
    });
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
    setSelectedAvatarFile(file);
  };

  const clearAvatarPreview = () => {
    if (draft.avatar && draft.avatar.startsWith("blob:")) {
      URL.revokeObjectURL(draft.avatar);
    }
    setDraft((prev) => ({ ...prev, avatar: auth.profileImage || null }));
    setSelectedAvatarFile(null);
  };

  const uploadProfileImage = () => {
    if (!selectedAvatarFile) return;
    const form = new FormData();
    form.append("profileImage", selectedAvatarFile);
    profileImageUpdate.mutate(form, {
      onSuccess: () => {
        setSelectedAvatarFile(null);
      },
    });
  };

  const deleteProfileImage = () => {
    profileImageDelete.mutate(undefined, {
      onSuccess: () => {
        if (draft.avatar && draft.avatar.startsWith("blob:")) {
          URL.revokeObjectURL(draft.avatar);
        }
        setDraft((prev) => ({ ...prev, avatar: null }));
        setSelectedAvatarFile(null);
      },
    });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (videoPreview && videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }
    const objUrl = URL.createObjectURL(file);
    setVideoPreview(objUrl);
    // filename not displayed anymore
    setSelectedVideoFile(file);
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
    setSelectedVideoFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeVideo = () => {
    if (videoPreview && videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    // filename not displayed anymore
    setSelectedVideoFile(null);
  };

  const uploadVideo = () => {
    if (!selectedVideoFile) return;
    const form = new FormData();
    form.append("selfieVideo", selectedVideoFile);
    selfieVideoUpdate.mutate(form, {
      onSuccess: () => {
        setSelectedVideoFile(null);
      },
    });
  };

  const deleteSelfieVideo = () => {
    selfieVideoDelete.mutate(undefined, {
      onSuccess: () => {
        if (videoPreview && videoPreview.startsWith("blob:")) {
          URL.revokeObjectURL(videoPreview);
        }
        setVideoPreview(null);
        setSelectedVideoFile(null);
      },
    });
  };

  return (
    <div className="p-4 md:p-8 bg-transparent flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* LEFT SIDEBAR (avatar + quick actions + stats) */}
        <aside className="md:col-span-4 col-span-1 space-y-6">
          {/* Avatar Card */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center relative">
            <div className="relative">
              {/* Clickable avatar circle */}
              <label htmlFor="avatarInput" className="block cursor-pointer">
                <div className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 hover:ring-2 hover:ring-green-500 transition">
                  {draft.avatar ? (
                    <img
                      src={draft.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : auth.profileImage ? (
                    <img
                      src={auth.profileImage}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400">
                      <User2 size={48} />
                    </div>
                  )}
                </div>
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>

              {/* Clear preview X (only clears preview, not existing image) */}
              {selectedAvatarFile && draft.avatar && (
                <button
                  onClick={clearAvatarPreview}
                  aria-label="Clear preview"
                  className="absolute -top-2 -right-2 bg-white border shadow-sm rounded-full p-1.5 hover:bg-red-50"
                >
                  <X size={14} className="text-red-600" />
                </button>
              )}
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              {user.name || auth.fullName}
            </h2>
            <p className="text-sm text-gray-500">Student</p>

            <div className="mt-4 w-full flex flex-col gap-2">
              {selectedAvatarFile && (
                <button
                  onClick={uploadProfileImage}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700"
                >
                  <Upload size={14} /> Upload
                </button>
              )}

              {(auth.profileImage || draft.avatar) && !selectedAvatarFile && (
                <button
                  onClick={deleteProfileImage}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Trash2 size={14} /> Remove
                </button>
              )}
            </div>
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
                  <span className="mt-2 text-lg font-semibold text-gray-800">
                    {String(s.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Typing Profile Button */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Typing Profile
            </h3>
            <button
              onClick={handleRetakeTypingTest}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-[#1e6b32] transition-colors"
            >
              <Keyboard size={18} />
              {data?.hasTypingProfile
                ? "Update Typing Profile"
                : "Setup Typing Profile"}
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {hasTypingProfile
                ? "Update your typing pattern for enhanced security"
                : "Set up your typing pattern for identity verification"}
            </p>
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

          {/* Selfie Verification Video Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Selfie Verification
                  </h3>
                  <p className="text-sm text-gray-500">
                    Upload a short video for identity verification
                  </p>
                </div>

                {videoPreview && (
                  <button
                    onClick={removeVideo}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Remove Video
                  </button>
                )}
                {!videoPreview && auth.selfieVideo && (
                  <button
                    onClick={deleteSelfieVideo}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Delete Saved Video
                  </button>
                )}
              </div>

              {/* Video Upload Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Instructions */}
                <div className="lg:col-span-1">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <h4 className="font-medium text-blue-800 text-sm mb-2">
                      📹 Recording Tips
                    </h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Record 5-15 seconds</li>
                      <li>• Use natural lighting</li>
                      <li>• Face the camera directly</li>
                      <li>• Speak your name clearly</li>
                      <li>• No filters or accessories</li>
                    </ul>

                    <button
                      onClick={() => {
                        alert(
                          "Instruction: Record a short video (5-15s) with your face visible and good lighting."
                        );
                      }}
                      className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-xs text-blue-700 hover:bg-blue-100"
                    >
                      <Play size={12} /> Watch Demo
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                    <span>Accepted: mp4, mov, webm (max 20MB)</span>
                  </div>
                </div>

                {/* Video Preview & Upload */}
                <div className="lg:col-span-2">
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-green-400 transition-colors"
                  >
                    {!(videoPreview || auth.selfieVideo) ? (
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                          <Upload size={24} className="text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Drag & drop your selfie video here
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          Or click the button below to browse files
                        </p>
                        <label
                          htmlFor="videoUpload"
                          className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 text-sm cursor-pointer hover:bg-green-700"
                        >
                          <Upload size={14} /> Choose Video File
                          <input
                            id="videoUpload"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleVideoUpload}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="relative w-full max-w-md">
                          <video
                            src={(videoPreview || auth.selfieVideo) as string}
                            controls
                            className="w-full h-64 rounded-lg object-cover shadow-lg"
                          />
                          <button
                            onClick={
                              videoPreview ? removeVideo : deleteSelfieVideo
                            }
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>

                        <div className="mt-4 flex gap-3">
                          <label
                            htmlFor="videoUpload"
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50"
                          >
                            <RefreshCw size={14} /> Change Video
                            <input
                              id="videoUpload"
                              type="file"
                              accept="video/*"
                              className="hidden"
                              onChange={handleVideoUpload}
                            />
                          </label>

                          {selectedVideoFile && (
                            <button
                              onClick={uploadVideo}
                              className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700"
                            >
                              <Upload size={14} /> Upload to Server
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status Message */}
                  {selectedVideoFile && (
                    <div className="mt-3 text-center">
                      <p className="text-sm text-green-600">
                        ✓ Video ready to upload: {selectedVideoFile.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
