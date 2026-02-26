import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import {
  useCheckFrame,
  useExamDetailsByAttempt,
  useAutoSaveAnswers,
  useSubmitExam,
} from "../services/auth";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const colors = {
  lightGreenBg: "#EAFCEF",
  green: "#2A7F3F",
  lightGray: "#F7F9F7",
  borderGray: "#DDE6D8",
  darkText: "#333333",
  softText: "#6C7A6A",
};

interface ExamOption {
  id: number | string;
  text: string;
}

export interface ExamQuestion {
  id: number | string;
  question: string;
  type: "MCQ" | "TYPING";
  hasMultipleCorrect?: boolean;
  options?: ExamOption[];
  answerMinLength?: number;
  answerMaxLength?: number;
}

const ExamStartPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();

  // Fetch exam details using attemptId
  const {
    data: examDetails,
    isLoading,
    isError,
    error,
  } = useExamDetailsByAttempt(attemptId || "", !!attemptId);

  const exam = examDetails?.exam;
  const questions = exam?.questions || [];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const checkFrame = useCheckFrame();
  const autoSaveMutation = useAutoSaveAnswers();
  const submitExamMutation = useSubmitExam();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [marked, setMarked] = useState<string[]>([]);
  const [endTimeMs, setEndTimeMs] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  // Proctoring state
  const [warningCount, setWarningCount] = useState(0);
  const [maxWarnings] = useState(3);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [terminated, setTerminated] = useState(false);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);
  const [, setStream] = useState<MediaStream | null>(null);
  const didAutoSubmitRef = useRef(false);
  const didLogNoVideoDimsRef = useRef(false);
  const didLogFrameTickRef = useRef(false);
  const captureAndSendFrameRef = useRef<() => void>(() => undefined);
  const cameraStartedRef = useRef(false);
  const lastCheckFrameErrorToastAtRef = useRef(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const lastWarningToastAtRef = useRef<Record<string, number>>({});

  // Voice monitoring - NOW HANDLED VIA HTTP BY VOICE ML WORKER
  // Warnings are received via Socket.IO "cheat:warning" events
  // const { voiceStatus, isMonitoring } = useVoiceMonitoring(
  //   attemptId,
  //   !terminated && !!attemptId,
  //   120000 // Check every 2 minutes (120000ms)
  // );

  const timeLeft = Math.max(
    0,
    Math.floor(((endTimeMs ?? nowMs) - nowMs) / 1000),
  );

  // Monitor fullscreen exit — re-enter prompt shown (requestFullscreen needs user gesture,
  // so we cannot call it directly here; instead show a blocking overlay with a click target)
  useEffect(() => {
    if (terminated) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !terminated) {
        setShowFullscreenPrompt(true);
        setWarningCount((prev) => prev + 1);
      } else {
        setShowFullscreenPrompt(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      // Exit fullscreen when component unmounts (exam submitted / terminated)
      if (document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {});
      }
    };
  }, [terminated]);

  // Block browser back button and shortcuts during exam
  useEffect(() => {
    if (terminated || !attemptId) return;

    // Clear route history to prevent back navigation
    window.history.replaceState(null, "", window.location.href);

    // Block back button
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
      alert(
        "Navigation blocked during active exam. Use 'End Exam' button to exit.",
      );
    };

    // Push state to enable popstate blocking
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    // Block page close/refresh
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure? Your exam progress may be lost.";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Block keyboard shortcuts (Ctrl+W, Alt+F4, F5, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block common navigation/new-tab shortcuts
      const blockedKeys = ["w", "t", "n", "l", "e", "k"];
      if (
        (e.ctrlKey || e.metaKey) &&
        blockedKeys.includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        setWarningCount((prev) => prev + 1);
        toast.error(
          `⚠️ Security Alert: The shortcut Ctrl+${e.key.toUpperCase()} is disabled during the exam.`,
          {
            position: "top-center",
          },
        );
      }

      // Block Developer Tools
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "i")
      ) {
        e.preventDefault();
        setWarningCount((prev) => prev + 1);
        toast.error("⚠️ Security Alert: Developer tools are disabled.", {
          position: "top-center",
        });
      }

      // Block F5 (refresh)
      if (
        e.key === "F5" ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r")
      ) {
        e.preventDefault();
        toast.warning("⚠️ Refresh is disabled during the exam.", {
          position: "top-center",
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [terminated, attemptId]);

  // Request fullscreen on exam start
  useEffect(() => {
    if (document.documentElement.requestFullscreen && !terminated) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("Fullscreen request failed:", err);
      });
    }

    // Monitor fullscreen exit
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !terminated) {
        setWarningCount((prev) => prev + 1);
        const msg = "⚠️ Please stay in fullscreen mode during the exam!";
        setWarningMessage(msg);
        setShowWarning(true);
        toast.error(msg, {
          duration: 6000,
          position: "top-center",
          style: {
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "#fff",
            fontWeight: "bold",
          },
        });

        // Re-request fullscreen
        setTimeout(() => {
          if (!document.fullscreenElement && !terminated) {
            document.documentElement.requestFullscreen?.().catch(console.error);
          }
        }, 1500);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Browser Lockdown Features: Visibility and Focus Monitoring
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !terminated) {
        setWarningCount((prev) => prev + 1);
        const msg =
          "⚠️ Browser minimized, tab changed, or new tab opened! This activity is being recorded.";
        setWarningMessage(msg);
        setShowWarning(true);
        toast.error(msg, {
          duration: 6000,
          position: "top-center",
          style: {
            background: "linear-gradient(135deg, #FF4B2B 0%, #FF416C 100%)",
            color: "#fff",
            fontWeight: "bold",
          },
        });
      }
    };

    const handleWindowBlur = () => {
      if (!terminated) {
        setWarningCount((prev) => prev + 1);
        const msg = "⚠️ Window lost focus! Please stay within the exam window.";
        setWarningMessage(msg);
        setShowWarning(true);
        toast.warning(msg, {
          duration: 5000,
          position: "top-center",
        });
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.info("Right-click is disabled during the exam.", {
        position: "bottom-center",
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("contextmenu", handleContextMenu);
      // Exit fullscreen on unmount
      if (document.fullscreenElement) {
        document.exitFullscreen?.();
      }
    };
  }, [terminated]);

  const submitProcess = useCallback(async () => {
    if (!examDetails || !attemptId) {
      toast.error("Unable to submit: Missing exam information");
      return;
    }

    const payloadAnswers = Object.entries(answers).map(
      ([questionId, value]) => {
        const q = questions.find((qq) => String(qq.id) === questionId);
        // Treat as a written/typing answer if the question type is TYPING
        // or has no options (options is undefined, null, or an empty array)
        const isTyping =
          q?.type === "TYPING" || !q?.options || q.options.length === 0;
        if (typeof value === "string" && isTyping) {
          return { questionId, writtenAnswer: value };
        }
        const isArr = Array.isArray(value);
        return {
          questionId,
          selectedOptionId: !isArr ? String(value || "") || null : null,
          selectedOptionIds: isArr ? (value as any[]).map(String) : null,
          writtenAnswer: null,
        };
      },
    );

    try {
      // 1) autosave current in-memory answers — await completion
      await autoSaveMutation.mutateAsync({
        examId: examDetails.exam.id,
        attemptId,
        answers: payloadAnswers,
      });

      // 2) submit exam (backend will grade saved answers) — await completion
      await submitExamMutation.mutateAsync({
        examId: examDetails.exam.id,
        attemptId: attemptId,
      });

      toast.success("Exam submitted successfully!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      navigate("/"); // Redirect to home
    } catch (error: unknown) {
      const errorMsg = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message || "Failed to submit exam."
        : "Failed to submit exam.";
      toast.error(errorMsg);
    }
  }, [
    answers,
    autoSaveMutation,
    examDetails,
    attemptId,
    submitExamMutation,
    navigate,
    questions,
  ]);

  const handleSubmit = useCallback(() => {
    if (!examDetails || !attemptId) {
      toast.error("Unable to submit: Missing exam information");
      return;
    }
    setShowConfirmModal(true);
  }, [examDetails, attemptId]);

  const captureAndSendFrame = useCallback(async () => {
    if (!videoRef.current || !attemptId) return;

    const vw = videoRef.current.videoWidth;
    const vh = videoRef.current.videoHeight;
    if (!vw || !vh) {
      if (!didLogNoVideoDimsRef.current) {
        didLogNoVideoDimsRef.current = true;
        console.warn(
          "[FACE-FRONTEND] Video not ready yet (videoWidth/videoHeight is 0). Waiting for metadata/playback...",
        );
      }
      return;
    }

    try {
      const canvas = document.createElement("canvas");

      // Downscale to reduce payload size (backend json limit and network reliability)
      const maxW = 640;
      const scale = Math.min(1, maxW / vw);
      canvas.width = Math.max(1, Math.floor(vw * scale));
      canvas.height = Math.max(1, Math.floor(vh * scale));

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(videoRef.current, 0, 0);

      // Use medium quality to keep under server payload limits
      const frameData = canvas.toDataURL("image/jpeg", 0.6);
      console.log(
        `[FACE-FRONTEND] Sending frame for attempt ${attemptId}, size: ${frameData.length} bytes (scaled ${canvas.width}x${canvas.height})`,
      );
      // delegate to API hook (handles baseURL/credentials)
      checkFrame.mutate(
        { attemptId, frame: frameData },
        {
          onError: (error: unknown) => {
            const msg = axios.isAxiosError<{ message?: string }>(error)
              ? error.response?.data?.message ||
                `Face monitoring failed (${error.response?.status ?? "unknown"})`
              : "Face monitoring failed";
            console.error("[FACE-FRONTEND] checkFrame error:", error);
            const now = Date.now();
            if (now - lastCheckFrameErrorToastAtRef.current > 30000) {
              lastCheckFrameErrorToastAtRef.current = now;
              toast.error(msg, { duration: 2500, position: "top-center" });
            }
          },
        },
      );
    } catch (err) {
      console.error("[FACE-FRONTEND] Failed to send frame:", err);
    }
  }, [attemptId, checkFrame]);

  useEffect(() => {
    captureAndSendFrameRef.current = () => {
      void captureAndSendFrame();
    };
  }, [captureAndSendFrame]);

  // TIMER
  useEffect(() => {
    if (terminated) return;
    if (!examDetails) return;

    const timer = setInterval(() => {
      setEndTimeMs(
        (prev) => prev ?? Date.now() + examDetails.exam.duration * 60 * 1000,
      );
      setNowMs(Date.now());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [examDetails, terminated]);

  useEffect(() => {
    if (terminated) return;
    if (endTimeMs === null) return;
    if (timeLeft > 0) return;
    if (didAutoSubmitRef.current) return;

    didAutoSubmitRef.current = true;
    toast.info("Time is up! Auto submitting...", { duration: 5000 });
    submitProcess();
  }, [endTimeMs, submitProcess, terminated, timeLeft]);

  // CAMERA PREVIEW
  useEffect(() => {
    let localStream: MediaStream | null = null;

    const startCam = async () => {
      try {
        if (cameraStartedRef.current) return;
        cameraStartedRef.current = true;

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        localStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          // Avoid re-assigning srcObject (causes blinking/black screen in some browsers)
          if (videoRef.current.srcObject !== mediaStream) {
            videoRef.current.srcObject = mediaStream;
          }

          videoRef.current.onloadedmetadata = () => {
            didLogNoVideoDimsRef.current = false;
            console.log(
              `[FACE-FRONTEND] Video metadata loaded (${videoRef.current?.videoWidth}x${videoRef.current?.videoHeight})`,
            );
            captureAndSendFrameRef.current();
          };

          // Some browsers require explicit play() even with autoPlay
          try {
            await videoRef.current.play();
          } catch (e) {
            console.warn("[FACE-FRONTEND] video.play() failed:", e);
          }
        }
      } catch (err) {
        cameraStartedRef.current = false;
        console.error("Camera access error:", err);
        toast.error("Camera access is required for this exam.", {
          description: "Please enable camera access in your browser settings.",
          duration: Infinity,
        });
      }
    };

    startCam();

    // Cleanup: stop camera when component unmounts
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // FRAME CAPTURE - Every 2.5 seconds
  useEffect(() => {
    if (!attemptId || terminated) return;

    const interval = setInterval(() => {
      if (!didLogFrameTickRef.current) {
        didLogFrameTickRef.current = true;
        console.log(
          "[FACE-FRONTEND] Frame capture interval started (every 3s)",
        );
      }
      if (videoRef.current && !terminated) captureAndSendFrameRef.current();
    }, 2500);

    return () => clearInterval(interval);
  }, [terminated, attemptId]);

  // WEBSOCKET CONNECTION
  useEffect(() => {
    if (!attemptId) return;

    const socket = io(BACKEND_URL);
    socketRef.current = socket;

    socket.emit("join", `attempt:${attemptId}`);
    console.log(
      `[EXAM] Joined room: attempt:${attemptId}, socket ID: ${socket.id}`,
    );

    socket.on(
      "cheat:warning",
      (data: {
        type: string;
        warningCount: number;
        message: string;
        faces?: any[];
        objects?: any[];
      }) => {
        console.log(`[CHEAT:WARNING] Received:`, data);
        setWarningCount(data.warningCount);

        const msg = (data.message || "").toLowerCase();
        const isVoiceWarning =
          data.type === "voice" ||
          msg.includes("voice") ||
          msg.includes("speech");

        // Enhanced detection logic
        const hasPersonObject =
          data.objects?.some(
            (obj: any) => obj.class === "person" && obj.confidence > 0.5,
          ) || false;
        const hasDetectedFaces = (data.faces && data.faces.length > 0) || false;

        const isSuspiciousObject =
          data.objects?.some(
            (obj: any) => obj.class !== "person" && obj.confidence > 0.4,
          ) || msg.includes("suspicious object");

        // Determine if this is a false positive "no face" warning
        const isFalsePositiveNoFace =
          msg.includes("no face") && hasPersonObject && !hasDetectedFaces;

        if (isFalsePositiveNoFace) {
          console.log(
            '[FACE-DETECTION] Suppressing "no face" warning - person detected as object',
          );
          return;
        }

        const warningKey = isVoiceWarning
          ? "voice"
          : isSuspiciousObject
            ? "suspicious_object"
            : msg.includes("multiple faces")
              ? "multiple_faces"
              : msg.includes("no face")
                ? "no_face"
                : "other";

        const cooldownMs = isVoiceWarning ? 20000 : 8000;
        const now = Date.now();
        const lastAt = lastWarningToastAtRef.current[warningKey] ?? 0;
        if (now - lastAt < cooldownMs) return;
        lastWarningToastAtRef.current[warningKey] = now;

        const allowedWarning =
          isVoiceWarning ||
          msg.includes("multiple faces") ||
          msg.includes("no face") ||
          isSuspiciousObject;

        if (!allowedWarning) return;

        // Message selection with priority
        let currentMessage = data.message;
        let displayedInToast = false;

        if (isVoiceWarning) {
          currentMessage =
            "🎤 Voice detected - Please remain silent during the exam";
          toast.error(currentMessage, {
            duration: 5000,
            position: "top-center",
            icon: "🎤",
            style: {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "12px",
            },
          });
          displayedInToast = true;
        } else if (isSuspiciousObject) {
          currentMessage = "⚠️ Spam object detected - Please remove it";
          toast.error(currentMessage, {
            duration: 6000,
            position: "top-center",
            icon: "🧾",
            style: {
              background: "linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)",
              color: "#fff",
              fontWeight: "700",
              borderRadius: "12px",
            },
          });
          displayedInToast = true;
        } else if (msg.includes("multiple faces")) {
          currentMessage = "⚠️ Multiple faces detected - Ensure you are alone";
          toast.error(currentMessage, {
            duration: 6000,
            position: "top-center",
            icon: "👥",
            style: {
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              color: "#fff",
              fontWeight: "700",
              borderRadius: "12px",
            },
          });
          displayedInToast = true;
        } else if (msg.includes("no face")) {
          currentMessage = "⚠️ Your face is not visible - Please stay in view";
          toast.error(currentMessage, {
            duration: 6000,
            position: "top-center",
            icon: "👤",
            style: {
              background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
              color: "#fff",
              fontWeight: "700",
              borderRadius: "12px",
            },
          });
          displayedInToast = true;
        }

        // Generic fallback toast if not already displayed
        if (!displayedInToast) {
          toast.warning(currentMessage, {
            duration: 5000,
            position: "top-center",
            style: {
              background: "linear-gradient(135deg, #f5af19 0%, #f12711 100%)",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "10px",
            },
          });
        }

        setWarningMessage(currentMessage);
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 5000);
      },
    );

    socket.on("attempt:terminated", (data: { reason: string }) => {
      setTerminated(true);
      toast.error(`Exam Terminated: ${data.reason}`, {
        duration: 10000,
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "700",
          padding: "20px 30px",
          borderRadius: "16px",
          boxShadow: "0 6px 30px rgba(245,87,108,0.4)",
        },
        icon: "🚫",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [attemptId, navigate]);

  // Handle loading and error states (after all hooks)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (isError || !examDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Failed to Load Exam
          </h2>
          <p className="text-gray-600 mb-4">
            {error?.message || "Unable to load exam details. Please try again."}
          </p>
          <button
            onClick={() => navigate("/exams")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];

  const toggleMark = () => {
    const qId = String(q.id);

    if (marked.includes(qId)) {
      setMarked(marked.filter((m) => m !== qId));
    } else {
      setMarked([...marked, qId]);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      <div
        className="h-screen flex relative overflow-hidden"
        style={{ backgroundColor: colors.lightGreenBg }}
      >
        {/* WARNING BANNER */}
        {showWarning && (
          <div className="fixed top-0 left-0 right-0 bg-linear -to-r from-yellow-500 to-orange-500 text-white p-4 z-50 flex items-center justify-between shadow-lg animate-pulse">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong className="block">
                  Warning {warningCount}/{maxWarnings}
                </strong>
                <span className="text-sm">{warningMessage}</span>
              </div>
            </div>
            <button
              onClick={() => setShowWarning(false)}
              className="text-white font-bold text-2xl hover:text-gray-200 transition"
            >
              ✕
            </button>
          </div>
        )}

        {/* ---------------- LEFT SIDE: QUESTION PANEL ---------------- */}
        <div className="flex-1 p-8 overflow-y-auto h-full">
          <div
            className="rounded-3xl p-8 shadow-lg"
            style={{
              backgroundColor: "white",
              border: `1px solid ${colors.borderGray}`,
            }}
          >
            <h1
              className="text-2xl font-bold mb-5"
              style={{ color: colors.green }}
            >
              Question {currentIndex + 1}
            </h1>

            <p
              className="text-lg mb-6 leading-relaxed"
              style={{ color: colors.darkText }}
            >
              {q.question}
            </p>

            {/* --------- MCQ --------- */}
            {q.type === "MCQ" && (
              <div className="grid grid-cols-1 gap-4">
                {q.options?.map((opt, index) => {
                  const isSelected = q.hasMultipleCorrect
                    ? (answers[String(q.id)] as any[])?.includes(opt.id)
                    : answers[String(q.id)] === opt.id;

                  const handleChange = () => {
                    if (q.hasMultipleCorrect) {
                      const current = (answers[String(q.id)] as any[]) || [];
                      const next = current.includes(opt.id)
                        ? current.filter((id) => id !== opt.id)
                        : [...current, opt.id];
                      setAnswers({ ...answers, [String(q.id)]: next });
                    } else {
                      setAnswers({ ...answers, [String(q.id)]: opt.id });
                    }
                  };

                  const optionLetters = ["A", "B", "C", "D", "E", "F"];

                  return (
                    <button
                      key={opt.id}
                      onClick={handleChange}
                      disabled={terminated}
                      className={`flex items-center text-left p-5 rounded-2xl transition-all duration-300 group relative border-2 ${
                        isSelected
                          ? "bg-emerald-50 border-emerald-500 shadow-md shadow-emerald-100"
                          : "bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black mr-4 border-2 transition-all duration-300 ${
                          isSelected
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : "bg-white text-slate-400 border-slate-200 group-hover:border-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        {optionLetters[index] || index + 1}
                      </div>
                      <span
                        className={`flex-1 text-base font-bold transition-all duration-300 ${
                          isSelected ? "text-emerald-900" : "text-slate-600"
                        }`}
                      >
                        {opt.text}
                      </span>
                      {isSelected && (
                        <div className="bg-emerald-500 rounded-full p-1 animate-in zoom-in duration-300">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* --------- TYPING QUESTION --------- */}
            {q.type === "TYPING" && (
              <textarea
                onChange={(e) =>
                  setAnswers({ ...answers, [String(q.id)]: e.target.value })
                }
                value={answers[String(q.id)] || ""}
                minLength={q.answerMinLength}
                maxLength={q.answerMaxLength}
                className="w-full h-40 p-4 rounded-xl mt-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
                style={{
                  backgroundColor: colors.lightGray,
                  border: `1px solid ${colors.borderGray}`,
                  color: colors.darkText,
                }}
                placeholder={`Write your answer here (Min: ${q.answerMinLength}, Max: ${q.answerMaxLength})`}
                disabled={terminated}
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
                className="px-5 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                style={{ backgroundColor: colors.green }}
                disabled={terminated}
              >
                Previous
              </button>

              <button
                onClick={toggleMark}
                className="px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                style={{
                  backgroundColor: marked.includes(String(q.id))
                    ? "#FFD966"
                    : colors.lightGray,
                }}
                disabled={terminated}
              >
                {marked.includes(String(q.id)) ? "Marked" : "Mark for Review"}
              </button>

              {/* Next Button - Only show if not on last question */}
              {currentIndex < questions.length - 1 && (
                <button
                  onClick={() =>
                    setCurrentIndex((i) =>
                      Math.min(i + 1, questions.length - 1),
                    )
                  }
                  className="px-5 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                  style={{ backgroundColor: colors.green }}
                  disabled={terminated}
                >
                  Next
                </button>
              )}
            </div>

            {/* Submit Button - Only show if on last question */}
            {currentIndex === questions.length - 1 && (
              <button
                onClick={handleSubmit}
                className="w-full py-5 rounded-[24px] mt-10 text-xl text-white font-black tracking-wider hover:opacity-90 transition-all shadow-xl shadow-emerald-200 active:scale-[0.98] disabled:opacity-50"
                style={{ backgroundColor: colors.green }}
                disabled={terminated}
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>

        {/* ---------------- RIGHT SIDE: TIMER / PALETTE / CAMERA ---------------- */}
        <div
          className="w-96 p-6 border-l overflow-y-auto h-full shrink-0"
          style={{ borderColor: colors.borderGray }}
        >
          {/* Timer */}
          <div
            className="p-5 rounded-2xl shadow mb-6 text-center"
            style={{ backgroundColor: "white" }}
          >
            <h2
              className="text-xl font-bold mb-1"
              style={{ color: colors.green }}
            >
              Time Left
            </h2>
            <p
              className="text-3xl font-bold"
              style={{ color: colors.darkText }}
            >
              {formatTime(timeLeft)}
            </p>
          </div>

          {/* Warning Counter */}
          {/* {warningCount > 0 && (
            <div
              className="p-4 rounded-2xl shadow mb-6 text-center"
              style={{
                backgroundColor: "#FFF3CD",
                border: "1px solid #FFD966",
              }}
            >
              <h3 className="font-bold text-yellow-800 mb-1">Warnings</h3>
              <p className="text-2xl font-bold text-yellow-900">
                {warningCount} / {maxWarnings}
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Warnings are shown for testing. Exam will not auto-terminate.
              </p>
            </div>
          )} */}

          {/* Voice Monitoring Indicator - REMOVED */}
          {/* Voice warnings now shown via Socket.IO cheat:warning events */}
          {/* {isMonitoring && (
          <div
            className="p-4 rounded-2xl shadow mb-6 text-center"
            style={{
              backgroundColor:
                voiceStatus?.speech_probability &&
                voiceStatus.speech_probability > 0.3
                  ? "#FEE2E2"
                  : "#E0F2FE",
              border: `1px solid ${
                voiceStatus?.speech_probability &&
                voiceStatus.speech_probability > 0.3
                  ? "#FCA5A5"
                  : "#BAE6FD"
              }`,
            }}
          >
            <h3 className="font-bold text-gray-800 mb-1">Voice Monitor</h3>
            <div className="text-sm text-gray-700">
              {voiceStatus?.speech_probability &&
              voiceStatus.speech_probability > 0.1 ? (
                <span className="text-red-600 font-semibold">
                  Speech Detected (
                  {(voiceStatus.speech_probability * 100).toFixed(0)}%)
                </span>
              ) : (
                <span className="text-blue-600">Monitoring Active</span>
              )}
            </div>
          </div>
        )} */}

          {/* Question Palette */}
          <div
            className="p-5 rounded-2xl shadow mb-6"
            style={{ backgroundColor: "white" }}
          >
            <h2
              className="text-xl font-black mb-4 flex items-center gap-2"
              style={{ color: colors.green }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              Assessment Grid
            </h2>

            <div className="grid grid-cols-5 gap-3">
              {questions.map((qq, i) => {
                const qqId = String(qq.id);
                const answered = answers[qqId];
                const isMarked = marked.includes(qqId);

                let bg = colors.lightGray;
                let textColor = colors.darkText;
                if (answered) {
                  bg = colors.green;
                  textColor = "white";
                }
                if (isMarked) {
                  bg = "#FFD966";
                  textColor = "#856404";
                }

                return (
                  <button
                    key={qqId}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-full aspect-square rounded-xl font-bold transition-all duration-200 ${
                      currentIndex === i
                        ? "ring-4 ring-green-100 scale-110"
                        : ""
                    }`}
                    style={{ backgroundColor: bg, color: textColor }}
                    disabled={terminated}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Camera Box */}
          <div
            className="p-5 rounded-2xl shadow"
            style={{ backgroundColor: "white" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold" style={{ color: colors.green }}>
                Camera Feed
              </h2>
              {!terminated && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-semibold">
                    Monitoring Active
                  </span>
                </div>
              )}
            </div>

            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full rounded-xl"
              style={{ backgroundColor: "#000" }}
            ></video>

            <div className="mt-3">
              <p className="text-sm" style={{ color: colors.softText }}>
                Keep your face visible. Moving away may trigger alerts.
              </p>
            </div>

            {terminated && (
              <div className="mt-3 p-3 bg-red-100 border border-red-400 rounded-lg">
                <p className="text-sm text-red-700 font-semibold text-center">
                  Exam Terminated
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setShowConfirmModal(false)}
          ></div>
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-100 animate-in zoom-in slide-in-from-bottom-12 duration-500">
            <div className="w-20 h-20 bg-emerald-50 rounded-[24px] flex items-center justify-center text-emerald-500 mb-6 mx-auto">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2 className="text-4xl font-black text-slate-800 text-center mb-4 tracking-tight">
              Finalize Submission?
            </h2>
            <p className="text-slate-500 text-center mb-10 font-medium leading-relaxed">
              You are about to submit your assessment. This action is final and
              your answers will be locked immediately.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="py-4 rounded-2xl font-black text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  submitProcess();
                }}
                className="py-4 rounded-2xl font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN RE-ENTER OVERLAY */}
      {showFullscreenPrompt && !terminated && (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-10 max-w-sm w-full text-center shadow-2xl mx-4">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-5 mx-auto text-3xl">
              ⛶
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-3">
              Fullscreen Required
            </h2>
            <p className="text-slate-500 mb-6 leading-relaxed">
              The exam must run in fullscreen mode. Exiting fullscreen has been
              recorded as a warning. Please return to fullscreen to continue.
            </p>
            <button
              onClick={() => {
                document.documentElement
                  .requestFullscreen()
                  .catch((e) => console.warn("Fullscreen re-enter failed:", e));
              }}
              className="w-full py-4 rounded-2xl font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] text-lg"
            >
              Return to Fullscreen
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExamStartPage;
