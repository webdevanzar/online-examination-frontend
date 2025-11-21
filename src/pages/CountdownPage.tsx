import React, { useEffect, useState } from "react";

const colors = {
  lightGreenBg: "#EAFCEF",
  green: "#2A7F3F",
  lightGray: "#F7F9F7",
  borderGray: "#DDE6D8",
  darkText: "#333333",
  softText: "#6C7A6A",
};

const CountdownPage = () => {
  // Example start time (replace with props or navigation state)
  const examStartTime = "2025-11-21T12:00:00Z";

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const start = new Date(examStartTime).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = Math.max(start - now, 0);
      setTimeLeft(difference);

      if (difference <= 0) {
        clearInterval(timer);
        window.location.href = "/exam"; // Auto redirect
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [examStartTime]);

  // Convert ms → HH:MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-10"
      style={{ backgroundColor: colors.lightGreenBg }}
    >
      <div
        className="w-full max-w-3xl p-12 rounded-3xl text-center shadow-xl"
        style={{
          backgroundColor: "white",
          border: `1px solid ${colors.borderGray}`,
        }}
      >
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: colors.green }}
        >
          Exam will start in
        </h1>

        <div
          className="text-6xl font-bold py-10 mb-6 rounded-2xl"
          style={{
            backgroundColor: colors.lightGray,
            border: `1px solid ${colors.borderGray}`,
            color: colors.darkText,
          }}
        >
          {formatTime(timeLeft)}
        </div>

        <p
          className="text-lg"
          style={{ color: colors.softText }}
        >
          Please wait… You will be redirected automatically.
        </p>
      </div>
    </div>
  );
};

export default CountdownPage;
