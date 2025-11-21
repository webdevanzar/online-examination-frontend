import React, { useEffect, useRef, useState } from "react";

const colors = {
  lightGreenBg: "#EAFCEF",
  green: "#2A7F3F",
  lightGray: "#F7F9F7",
  borderGray: "#DDE6D8",
  darkText: "#333333",
  softText: "#6C7A6A",
};

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  type: "MCQ" | "TYPING";
  question: string;
  options?: Option[];
  answerMinLength?: number;
  answerMaxLength?: number;
}

interface ExamProps {
  exam: {
    duration: number; // in minutes
    questions: any[];
  };
}

const ExamStartPage: React.FC<ExamProps> = ({ exam }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [marked, setMarked] = useState<number[]>([]);

  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);

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
  }, []);

  const handleSubmit = () => {
    console.log("Submitted Answers: ", answers);
    alert("Exam submitted!");
  };

  // CAMERA PREVIEW
  useEffect(() => {
    const startCam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.log("Camera Blocked");
      }
    };
    startCam();
  }, []);

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
      className="min-h-screen flex"
      style={{ backgroundColor: colors.lightGreenBg }}
    >
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
                  className="flex items-center p-4 rounded-xl cursor-pointer"
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
              value={answers[q.id] || ""}
              minLength={q.answerMinLength}
              maxLength={q.answerMaxLength}
              className="w-full h-40 p-4 rounded-xl mt-4"
              style={{
                backgroundColor: colors.lightGray,
                border: `1px solid ${colors.borderGray}`,
                color: colors.darkText,
              }}
              placeholder={`Write your answer here (Min: ${q.answerMinLength}, Max: ${q.answerMaxLength})`}
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              className="px-5 py-3 rounded-xl text-white font-semibold"
              style={{ backgroundColor: colors.green }}
            >
              Previous
            </button>

            <button
              onClick={toggleMark}
              className="px-5 py-3 rounded-xl font-semibold"
              style={{
                backgroundColor: marked.includes(q.id)
                  ? "#FFD966"
                  : colors.lightGray,
              }}
            >
              {marked.includes(q.id) ? "Marked" : "Mark for Review"}
            </button>

            <button
              onClick={() =>
                setCurrentIndex((i) =>
                  Math.min(i + 1, exam.questions.length - 1)
                )
              }
              className="px-5 py-3 rounded-xl text-white font-semibold"
              style={{ backgroundColor: colors.green }}
            >
              Next
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl mt-10 text-xl text-white font-bold"
            style={{ backgroundColor: colors.green }}
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
                  className="w-10 h-10 rounded-xl font-bold"
                  style={{ backgroundColor: bg, color: colors.darkText }}
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
            className="w-full rounded-xl"
            style={{ backgroundColor: "#000" }}
          ></video>

          <p className="text-sm mt-3" style={{ color: colors.softText }}>
            Keep your face visible. Moving away may trigger alerts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamStartPage;
