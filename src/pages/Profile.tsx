import React, { useEffect, useState } from "react";
import {
  X,
  Upload,
  Trash2,
  Pencil,
  Check,
  User2,
  Keyboard,
  RefreshCw,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, type Variants } from "framer-motion";
import type { RootState } from "../store";
import { colors } from "../utils/colortheme";
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
  avatar?: string | null;
};

const initialUser: User = {
  name: "",
  email: "",
  DateofBirth: "",
  Phone: "",
  gender: "Other",
  avatar: null,
};

const Profile: React.FC = () => {
  const { data } = useStudentMe();
  const profileUpdate = useStudentProfileUpdate();
  const profileImageUpdate = useStudentProfileImageUpdate();
  const selfieVideoUpdate = useStudentSelfieVideoUpdate();
  const profileImageDelete = useStudentProfileImageDelete();
  const selfieVideoDelete = useStudentSelfieVideoDelete();
  const auth = useSelector((state: RootState) => state.auth);
  const [editing, setEditing] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [user, setUser] = useState<User>(initialUser);
  const [draft, setDraft] = useState<User>(user);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const stats = [
    { label: "Notifications", value: auth.unreadNotificationCount, icon: "🔔" },
    { label: "Account", value: auth.isActive ? "Active" : "Inactive", icon: "🛡️" },
    {
      label: "Member Since",
      value: new Date(auth.createdAt).toLocaleDateString(),
      icon: "📅"
    },
    { label: "Gender", value: auth.gender ? auth.gender : "-", icon: "👤" },
  ];

  useEffect(() => {
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
    setDraft(user);
  }, [user]);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (user.avatar && user.avatar.startsWith("blob:")) {
        URL.revokeObjectURL(user.avatar);
      }
      if (videoPreview && videoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [user.avatar, videoPreview]);

  const handleRetakeTypingTest = () => {
    navigate("/typing-profile-setup");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser((prev) => {
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
    setSelectedVideoFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("video/")) return;
    if (videoPreview && videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }
    const objUrl = URL.createObjectURL(file);
    setVideoPreview(objUrl);
    setSelectedVideoFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const removeVideo = () => {
    if (videoPreview && videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
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
    <div className="relative min-h-screen bg-white overflow-hidden font-sans selection:bg-green-100 selection:text-green-900 py-12 px-4 md:px-8">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
          style={{ backgroundColor: colors.green }}
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
          style={{ backgroundColor: "#DFF8E6" }}
        ></motion.div>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT SIDEBAR */}
          <motion.aside variants={itemVariants} className="lg:col-span-4 space-y-6">
            {/* Avatar Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-xl p-8 flex flex-col items-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-b from-green-50/30 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10">
                <label htmlFor="avatarInput" className="block cursor-pointer">
                  <div className="w-40 h-40 rounded-full p-1 border-4 border-green-100/50 bg-white shadow-inner overflow-hidden flex items-center justify-center hover:border-green-400 transition-all duration-300 transform group-hover:scale-105">
                    {draft.avatar || auth.profileImage ? (
                      <img
                        src={(draft.avatar || auth.profileImage) as string}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="text-green-200">
                        <User2 size={80} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2 p-2 bg-green-500 text-white rounded-full shadow-lg transform translate-x-2 translate-y-2 hover:scale-110 transition-transform">
                    <Pencil size={18} />
                  </div>
                  <input
                    id="avatarInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </label>

                {selectedAvatarFile && draft.avatar && (
                  <button
                    onClick={clearAvatarPreview}
                    className="absolute -top-4 -right-4 bg-white border border-gray-100 shadow-xl rounded-full p-2 hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="mt-8 text-center relative z-10">
                <h2 className="text-2xl font-black" style={{ color: colors.darkText }}>
                  {user.name || auth.fullName}
                </h2>
                <div className="inline-block mt-2 px-4 py-1 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest">
                  Verified Student
                </div>
              </div>

              <div className="mt-8 w-full flex flex-col gap-3 relative z-10">
                {selectedAvatarFile && (
                  <button
                    onClick={uploadProfileImage}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-green-600 text-white px-6 py-3 font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95"
                  >
                    <Upload size={18} />
                    {profileImageUpdate.isPending ? "Uploading..." : "Save Photo"}
                  </button>
                )}

                {(auth.profileImage || draft.avatar) && !selectedAvatarFile && (
                  <button
                    onClick={deleteProfileImage}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white/50 text-gray-500 px-6 py-3 font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-95"
                  >
                    <Trash2 size={18} /> 
                    {profileImageDelete.isPending ? "Removing..." : "Remove Photo"}
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-xl p-8">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Quick Outlook</h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-gray-50/50 rounded-3xl p-4 border border-gray-100/50 hover:border-green-200 transition-colors"
                  >
                    <div className="text-xl mb-2">{s.icon}</div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{s.label}</span>
                    <div className="mt-1 text-sm font-bold text-gray-700 truncate">
                      {String(s.value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typing Profile */}
            <div className="bg-green-600 rounded-[2.5rem] shadow-xl p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-black mb-4">Typing Identity</h3>
                <p className="text-sm text-green-50/80 mb-6 leading-relaxed">
                  Enhance your account security by maintaining a unique behavioral typing profile.
                </p>
                <button
                  onClick={handleRetakeTypingTest}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-700 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  <Keyboard size={18} />
                  {data?.hasTypingProfile ? "Update Profile" : "Setup Now"}
                </button>
              </div>
            </div>
          </motion.aside>

          {/* MAIN CONTENT */}
          <motion.main variants={itemVariants} className="lg:col-span-8 space-y-8">
            {/* Profile Info Form */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-xl p-8 md:p-10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-2xl font-black" style={{ color: colors.darkText }}>
                    Personal Details
                  </h3>
                  <p className="text-gray-400 text-sm font-medium mt-1">Manage your basic identification info</p>
                </div>

                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-green-50 hover:text-green-600 transition-all border border-gray-100"
                  >
                    <Pencil size={16} /> Edit Details
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg"
                    >
                      <Check size={16} /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all border border-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {[
                  { label: "Full Name", name: "name", value: draft.name, type: "text", placeholder: "e.g. John Doe" },
                  { label: "Email Address", name: "email", value: draft.email, type: "email", placeholder: "john@example.com", disabled: true },
                  { label: "Date of Birth", name: "DateofBirth", value: draft.DateofBirth, type: "date" },
                  { label: "Phone Number", name: "Phone", value: draft.Phone, type: "tel", placeholder: "+1234567890" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-2 block">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        name={field.name}
                        type={field.type}
                        value={field.value}
                        onChange={handleChange}
                        disabled={!editing || field.disabled}
                        placeholder={field.placeholder}
                        className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-bold ${
                          editing && !field.disabled
                            ? "bg-white border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-hidden"
                            : "bg-gray-50/50 border-gray-100 text-gray-500 cursor-not-allowed"
                        }`}
                      />
                      {!editing && <div className="absolute inset-0 z-10"></div>}
                    </div>
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-2 block">
                    Gender Identity
                  </label>
                  <div className="flex gap-4">
                    {["Male", "Female", "Other"].map((option) => (
                      <button
                        key={option}
                        disabled={!editing}
                        onClick={() => setDraft(prev => ({ ...prev, gender: option as User["gender"] }))}
                        className={`flex-1 py-4 rounded-2xl border font-bold transition-all ${
                          draft.gender === option
                            ? "bg-green-50 border-green-500 text-green-700"
                            : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                        } ${!editing && "opacity-60 cursor-not-allowed"}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Verification Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                  <h3 className="text-2xl font-black" style={{ color: colors.darkText }}>
                    Biometric Verification
                  </h3>
                  <p className="text-gray-400 text-sm font-medium mt-1">Video-based self-identification</p>
                </div>

                <div className="flex gap-3">
                  {videoPreview && (
                    <button
                      onClick={removeVideo}
                      className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-all border border-rose-100"
                    >
                      <Trash2 size={16} /> Discard Preview
                    </button>
                  )}
                  {!videoPreview && auth.selfieVideo && (
                    <button
                      onClick={deleteSelfieVideo}
                      className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-all border border-rose-100"
                    >
                      <Trash2 size={16} /> 
                      {selfieVideoDelete.isPending ? "Removing..." : "Delete Video"}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                {/* Visual Guidelines */}
                <div className="xl:col-span-2 space-y-4">
                  <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-[2rem]">
                    <h4 className="font-black text-blue-900 text-sm mb-4 flex items-center gap-2">
                       Guidance for Recording
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Maintain a neutral expression",
                        "Ensure your full face is visible",
                        "Speak your full name clearly",
                        "Avoid using background filters",
                        "Video length: 5 to 10 seconds"
                      ].map((tip, i) => (
                        <li key={i} className="flex gap-3 text-xs font-bold text-blue-700/70">
                          <FiCheckCircle className="shrink-0 text-blue-500 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Dropzone/Preview */}
                <div className="xl:col-span-3">
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className={`relative min-h-[300px] border-2 border-dashed rounded-[2.5rem] transition-all duration-300 flex items-center justify-center overflow-hidden ${
                      selectedVideoFile || auth.selfieVideo 
                        ? "border-green-200 bg-gray-50/30" 
                        : "border-gray-200 bg-gray-50/50 hover:border-green-400"
                    }`}
                  >
                    {!(videoPreview || auth.selfieVideo) ? (
                      <div className="text-center p-8">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white shadow-xl flex items-center justify-center text-green-500 scale-110">
                          <Upload size={32} />
                        </div>
                        <h4 className="text-lg font-black text-gray-700 mb-2">Drop your video here</h4>
                        <p className="text-xs font-bold text-gray-400 mb-8 uppercase tracking-widest">or browse from device</p>
                        
                        <label className="inline-flex items-center gap-2 rounded-2xl bg-green-600 text-white px-8 py-4 font-black text-sm cursor-pointer hover:bg-green-700 shadow-xl shadow-green-100 active:scale-95 transition-all">
                          <Upload size={18} /> Choice Source
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleVideoUpload}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="w-full h-full p-4 flex flex-col items-center">
                        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                          <video
                            src={(videoPreview || auth.selfieVideo) as string}
                            controls
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                          <label className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-2xl font-bold border border-gray-200 cursor-pointer hover:bg-gray-50 transition-all">
                            <RefreshCw size={18} /> Retake Video
                            <input
                              type="file"
                              accept="video/*"
                              className="hidden"
                              onChange={handleVideoUpload}
                            />
                          </label>

                          {selectedVideoFile && (
                            <button
                              onClick={uploadVideo}
                              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-2xl font-black shadow-xl shadow-green-100 hover:scale-105 active:scale-95 transition-all"
                            >
                              <Upload size={18} />
                              {selfieVideoUpdate.isPending ? "Sharing..." : "Upload Final"}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {selectedVideoFile && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-center"
                    >
                      <p className="text-xs font-black text-green-600 uppercase tracking-widest">
                        Ready to process: {selectedVideoFile.name}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.main>
        </div>
      </motion.div>

      {/* FOOTER MINI */}
      <footer className="py-12 mt-12 text-center text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
        <p>&copy; {new Date().getFullYear()} ExamHub &bull; Secured Identity Environment</p>
      </footer>
    </div>
  );
};

export default Profile;

// Internal dependencies for consistent icons
const FiCheckCircle = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    width="14" 
    height="14"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

