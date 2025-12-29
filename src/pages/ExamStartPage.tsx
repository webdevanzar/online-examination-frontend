import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { useCheckFrame } from "../services/auth";
import { useVoiceMonitoring } from "../services/voice";

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
  id: number;
  question: string;
  type: "MCQ" | "TYPING";
  options?: ExamOption[];
  answerMinLength?: number;
  answerMaxLength?: number;
}

interface ExamProps {
  exam: {
    duration: number; // in minutes
    questions: ExamQuestion[];
  };
}

interface KeystrokeEvent {
  key: string;
  event: "keydown" | "keyup";
  timestamp: number;
}

const ExamStartPage: React.FC<ExamProps> = ({ exam }) => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const checkFrame = useCheckFrame();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [marked, setMarked] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);

  // Proctoring state
  const [warningCount, setWarningCount] = useState(0);
  const [maxWarnings] = useState(3);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [terminated, setTerminated] = useState(false);
  const [keystrokeBuffer, setKeystrokeBuffer] = useState<KeystrokeEvent[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Voice monitoring
  const { voiceStatus, isMonitoring } = useVoiceMonitoring(
    attemptId,
    !terminated && !!attemptId,
    400 // Poll every 400ms
  );

  const handleSubmit = useCallback(() => {
    console.log("Submitted Answers: ", answers);
    alert("Exam submitted!");
    // TODO: Call backend to submit exam
  }, [answers]);

  const captureAndSendFrame = useCallback(async () => {
    if (!videoRef.current || !attemptId) return;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(videoRef.current, 0, 0);
      const frameData = canvas.toDataURL("image/jpeg");
      // delegate to API hook (handles baseURL/credentials)
      checkFrame.mutate({ attemptId, frame: frameData });
    } catch (err) {
      console.error("Failed to send frame:", err);
    }
  }, [attemptId, checkFrame]);

  const verifyKeystrokePattern = useCallback(async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/biometric/user/verify-keystroke`,
        {
          keystrokes: keystrokeBuffer,
          attemptId: attemptId, // Pass attemptId for CheatEvent logging
        },
        { withCredentials: true }
      );
      // Return success to trigger buffer clear in effect
      return true;
    } catch (err) {
      console.error("Keystroke verification failed:", err);
      return false;
    }
  }, [keystrokeBuffer, attemptId]);

  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          alert("Time is up! Auto submitting...");
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmit]);

  // CAMERA PREVIEW
  useEffect(() => {
    const startCam = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      } catch {
        console.log("Camera Blocked");
        alert("Camera access is required for this exam. Please enable camera access.");
      }
    };
    startCam();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // FRAME CAPTURE - Every 5 seconds
  useEffect(() => {
    if (!attemptId || terminated) return;

    const interval = setInterval(() => {
      if (videoRef.current && !terminated) {
        captureAndSendFrame();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [terminated, attemptId, captureAndSendFrame]);

  // KEYSTROKE VERIFICATION - Every 60 seconds
  useEffect(() => {
    if (terminated) return;

    const interval = setInterval(() => {
      if (keystrokeBuffer.length >= 20 && !terminated) {
        verifyKeystrokePattern().then((success) => {
          if (success) {
            setKeystrokeBuffer([]);
          }
        });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [keystrokeBuffer, terminated, verifyKeystrokePattern]);

  // KEYSTROKE VERIFICATION - After typing questions
  useEffect(() => {
    const prevQ = currentIndex > 0 ? exam.questions[currentIndex - 1] : null;

    // If previous question was typing and we have keystroke data, verify
    if (prevQ && prevQ.type === "TYPING" && keystrokeBuffer.length >= 20) {
      verifyKeystrokePattern().then((success) => {
        if (success) {
          setKeystrokeBuffer([]);
        }
      });
    }
  }, [currentIndex, exam.questions, keystrokeBuffer.length, verifyKeystrokePattern]);

  // WEBSOCKET CONNECTION
  useEffect(() => {
    if (!attemptId) return;

    const socket = io(BACKEND_URL);
    socketRef.current = socket;

    socket.emit("join", `attempt:${attemptId}`);

    socket.on(
      "cheat:warning",
      (data: { type: string; warningCount: number; message: string }) => {
        setWarningCount(data.warningCount);
        setWarningMessage(`[${data.type.toUpperCase()}] ${data.message}`);
        setShowWarning(true);

        // Auto-hide warning after 5 seconds
        setTimeout(() => setShowWarning(false), 5000);
      }
    );

    socket.on("attempt:terminated", (data: { reason: string }) => {
      setTerminated(true);
      alert(`Exam terminated: ${data.reason}`);
      navigate("/exams");
    });

    return () => {
      socket.disconnect();
    };
  }, [attemptId, navigate]);

  

  const handleKeystrokeDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setKeystrokeBuffer((prev) => [
      ...prev,
      { key: e.key, event: "keydown", timestamp: Date.now() },
    ]);
  };

  const handleKeystrokeUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setKeystrokeBuffer((prev) => [
      ...prev,
      { key: e.key, event: "keyup", timestamp: Date.now() },
    ]);
  };

  const q = exam.questions[currentIndex];

  const toggleMark = () => {
    if (marked.includes(q.id)) {
      setMarked(marked.filter((m) => m !== q.id));
    } else {
      setMarked([...marked, q.id]);
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
    <div
      className="min-h-screen flex relative"
      style={{ backgroundColor: colors.lightGreenBg }}
    >
      {/* WARNING BANNER */}
      {showWarning && (
        <div className="fixed top-0 left-0 right-0 bg-linear -to-r from-yellow-500 to-orange-500 text-white p-4 z-50 flex items-center justify-between shadow-lg animate-pulse">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
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
      <div className="flex-1 p-8 overflow-y-auto">
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
            <div className="space-y-4">
              {q.options?.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center p-4 rounded-xl cursor-pointer hover:bg-gray-100 transition"
                  style={{
                    backgroundColor: colors.lightGray,
                    border: `1px solid ${colors.borderGray}`,
                  }}
                >
                  <input
                    type="radio"
                    name={`q_${q.id}`}
                    checked={answers[q.id] === opt.id}
                    onChange={() =>
                      setAnswers({ ...answers, [q.id]: opt.id })
                    }
                    className="mr-3"
                    disabled={terminated}
                  />
                  <span style={{ color: colors.darkText }}>{opt.text}</span>
                </label>
              ))}
            </div>
          )}

          {/* --------- TYPING QUESTION --------- */}
          {q.type === "TYPING" && (
            <textarea
              onChange={(e) =>
                setAnswers({ ...answers, [q.id]: e.target.value })
              }
              onKeyDown={handleKeystrokeDown}
              onKeyUp={handleKeystrokeUp}
              value={answers[q.id] || ""}
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
                backgroundColor: marked.includes(q.id)
                  ? "#FFD966"
                  : colors.lightGray,
              }}
              disabled={terminated}
            >
              {marked.includes(q.id) ? "Marked" : "Mark for Review"}
            </button>

            <button
              onClick={() =>
                setCurrentIndex((i) =>
                  Math.min(i + 1, exam.questions.length - 1)
                )
              }
              className="px-5 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
              style={{ backgroundColor: colors.green }}
              disabled={terminated}
            >
              Next
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl mt-10 text-xl text-white font-bold hover:opacity-90 transition disabled:opacity-50"
            style={{ backgroundColor: colors.green }}
            disabled={terminated}
          >
            Submit Exam
          </button>
        </div>
      </div>

      {/* ---------------- RIGHT SIDE: TIMER / PALETTE / CAMERA ---------------- */}
      <div
        className="w-96 p-6 border-l"
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
          <p className="text-3xl font-bold" style={{ color: colors.darkText }}>
            {formatTime(timeLeft)}
          </p>
        </div>

        {/* Warning Counter */}
        {warningCount > 0 && (
          <div
            className="p-4 rounded-2xl shadow mb-6 text-center"
            style={{ backgroundColor: "#FFF3CD", border: "1px solid #FFD966" }}
          >
            <h3 className="font-bold text-yellow-800 mb-1">Warnings</h3>
            <p className="text-2xl font-bold text-yellow-900">
              {warningCount} / {maxWarnings}
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Exam will auto-terminate after {maxWarnings} warnings
            </p>
          </div>
        )}

        {/* Voice Monitoring Indicator */}
        {isMonitoring && (
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
        )}

        {/* Question Palette */}
        <div
          className="p-5 rounded-2xl shadow mb-6"
          style={{ backgroundColor: "white" }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: colors.green }}
          >
            Question Palette
          </h2>

          <div className="grid grid-cols-5 gap-3">
            {exam.questions.map((qq, i) => {
              const answered = answers[qq.id];
              const isMarked = marked.includes(qq.id);

              let bg = colors.lightGray;
              if (answered) bg = colors.green;
              if (isMarked) bg = "#FFD966";

              return (
                <button
                  key={qq.id}
                  onClick={() => setCurrentIndex(i)}
                  className="w-10 h-10 rounded-xl font-bold hover:opacity-80 transition disabled:opacity-50"
                  style={{ backgroundColor: bg, color: colors.darkText }}
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
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: colors.green }}
          >
            Camera Feed
          </h2>

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full rounded-xl"
            style={{ backgroundColor: "#000" }}
          ></video>

          <p className="text-sm mt-3" style={{ color: colors.softText }}>
            Keep your face visible. Moving away may trigger alerts.
          </p>

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
  );
};

export default ExamStartPage;
