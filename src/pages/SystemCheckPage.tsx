import React, { useEffect, useRef, useState } from "react";

const colors = {
  lightGreenBg: "#EAFCEF",
  green: "#2A7F3F",
  lightGray: "#F7F9F7",
  borderGray: "#DDE6D8",
  darkText: "#333333",
  softText: "#6C7A6A",
};

const SystemCheckPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [cameraOk, setCameraOk] = useState(false);
  const [micOk, setMicOk] = useState(false);
  const [fullscreenOk, setFullscreenOk] = useState(false);
  const [internetOk, setInternetOk] = useState(false);

  const [faceDetected, setFaceDetected] = useState(false); // placeholder

  const allGood = cameraOk && micOk && fullscreenOk && internetOk;

  // ---------------------------- CAMERA TEST ----------------------------
  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setCameraOk(true);

        // Placeholder: after 2s assume "Face Detected"
        setTimeout(() => setFaceDetected(true), 2000);
      } catch {
        setCameraOk(false);
      }
    };

    enableCamera();
  }, []);

  // --------------------------- MICROPHONE TEST ---------------------------
  const testMic = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicOk(true);
    } catch {
      setMicOk(false);
    }
  };

  // --------------------------- FULLSCREEN TEST ---------------------------
  const enableFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

    setFullscreenOk(true);
  };

  // --------------------------- INTERNET SPEED ----------------------------
  const testInternet = async () => {
    const start = Date.now();

    try {
      await fetch("https://www.google.com/favicon.ico", { mode: "no-cors" });
      const ping = Date.now() - start;

      if (ping < 300) setInternetOk(true);
      else setInternetOk(false);
    } catch {
      setInternetOk(false);
    }
  };

  return (
    <div
      className="min-h-screen p-8 flex items-center justify-center"
      style={{ backgroundColor: colors.lightGreenBg }}
    >
      <div
        className="w-full max-w-4xl rounded-3xl p-10 shadow-lg"
        style={{
          backgroundColor: "white",
          border: `1px solid ${colors.borderGray}`,
        }}
      >
        <h1
          className="text-3xl font-bold text-center mb-10"
          style={{ color: colors.green }}
        >
          Camera & System Check
        </h1>

        {/* --------------------- CAMERA CHECK --------------------- */}
        <div className="mb-10">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: colors.darkText }}
          >
            📷 Camera Test
          </h2>

          <div
            className="p-4 rounded-xl mb-3"
            style={{
              backgroundColor: colors.lightGray,
              border: `1px solid ${colors.borderGray}`,
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              className="w-full rounded-xl"
              style={{ backgroundColor: "#000" }}
            ></video>
          </div>

          <p style={{ color: colors.softText }}>
            Status:{" "}
            <span
              style={{
                color: cameraOk ? colors.green : "red",
                fontWeight: "bold",
              }}
            >
              {cameraOk
                ? faceDetected
                  ? "Camera OK — Face Detected"
                  : "Camera OK — Detecting face..."
                : "Camera Access Required"}
            </span>
          </p>
        </div>

        {/* --------------------- MICROPHONE CHECK --------------------- */}
        <div className="mb-10">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: colors.darkText }}
          >
            🎤 Microphone Test
          </h2>

          <button
            onClick={testMic}
            className="px-6 py-3 rounded-xl font-semibold"
            style={{
              backgroundColor: colors.green,
              color: "white",
            }}
          >
            Test Microphone
          </button>

          <p className="mt-2" style={{ color: colors.softText }}>
            Status:{" "}
            <span
              style={{
                color: micOk ? colors.green : "red",
                fontWeight: "bold",
              }}
            >
              {micOk ? "Microphone Detected" : "Not Detected"}
            </span>
          </p>
        </div>

        {/* --------------------- FULLSCREEN CHECK --------------------- */}
        <div className="mb-10">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: colors.darkText }}
          >
            🖥 Fullscreen Mode
          </h2>

          <button
            onClick={enableFullscreen}
            className="px-6 py-3 rounded-xl font-semibold"
            style={{
              backgroundColor: colors.green,
              color: "white",
            }}
          >
            Enter Fullscreen
          </button>

          <p className="mt-2" style={{ color: colors.softText }}>
            Status:{" "}
            <span
              style={{
                color: fullscreenOk ? colors.green : "red",
                fontWeight: "bold",
              }}
            >
              {fullscreenOk ? "Fullscreen Enabled" : "Required"}
            </span>
          </p>
        </div>

        {/* --------------------- INTERNET SPEED CHECK --------------------- */}
        <div className="mb-10">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: colors.darkText }}
          >
            🌐 Internet Connection
          </h2>

          <button
            onClick={testInternet}
            className="px-6 py-3 rounded-xl font-semibold"
            style={{
              backgroundColor: colors.green,
              color: "white",
            }}
          >
            Test Connection
          </button>

          <p className="mt-2" style={{ color: colors.softText }}>
            Status:{" "}
            <span
              style={{
                color: internetOk ? colors.green : "red",
                fontWeight: "bold",
              }}
            >
              {internetOk ? "Good Connection" : "Weak / Failed"}
            </span>
          </p>
        </div>

        {/* --------------------- PROCEED BUTTON --------------------- */}
        <button
          disabled={!allGood}
          onClick={() => (window.location.href = "/exam/start")}
          className="w-full py-4 text-xl font-semibold rounded-2xl mt-6"
          style={{
            backgroundColor: allGood ? colors.green : "#9FBFA7",
            color: "white",
            cursor: allGood ? "pointer" : "not-allowed",
          }}
        >
          Proceed to Exam
        </button>
      </div>
    </div>
  );
};

export default SystemCheckPage;
