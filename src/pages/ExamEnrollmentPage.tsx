import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEnrollFace, useVerifyFace, useEnrollmentStatus, useEnrollKeystrokeUser, type KeystrokeEvent } from "../services/biometric";

const TYPING_TEXT = "The quick brown fox jumps over the lazy dog.";
const REQUIRED_TYPING_ROUNDS = 8;

// KeystrokeEvent type comes from biometric service

const ExamEnrollmentPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();

  // Steps: 1=FaceEnroll, 2=FaceVerify, 3=KeystrokeEnroll, 4=Complete
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Face enrollment
  const [faceEnrolled, setFaceEnrolled] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [verifyAttempts, setVerifyAttempts] = useState(0);

  // Keystroke enrollment
  const [typingRound, setTypingRound] = useState(0);
  const [typingInput, setTypingInput] = useState("");
  const [keystrokeBuffer, setKeystrokeBuffer] = useState<KeystrokeEvent[]>([]);
  const [keystrokeEnrolled, setKeystrokeEnrolled] = useState(false);

  // Enrollment status via service hook
  const { data: enrollStatus } = useEnrollmentStatus(attemptId || "", !!attemptId);

  useEffect(() => {
    if (!enrollStatus) return;
    if (enrollStatus.canStartExam) {
      navigate(`/exam/${attemptId}/start`);
    } else {
      if (enrollStatus.faceEnrolled) {
        setFaceEnrolled(true);
        setCurrentStep(2);
      }
      if (enrollStatus.keystrokeEnrolled) {
        setKeystrokeEnrolled(true);
      }
    }
  }, [enrollStatus, attemptId, navigate]);

  const enrollFaceMutation = useEnrollFace();
  const getErrMsg = (e: unknown, fallback: string) => {
    if (e && typeof e === "object" && "response" in e) {
      const resp = (e as { response?: { data?: { message?: string } } }).response;
      const msg = resp?.data?.message;
      if (typeof msg === "string" && msg) return msg;
    }
    return fallback;
  };
  const enrollFace = () => {
    setLoading(true);
    setError("");
    setSuccess("");
    if (!attemptId) return;
    enrollFaceMutation.mutate(attemptId, {
      onSuccess: (data) => {
        setFaceEnrolled(true);
        setSuccess(data.message);
        setTimeout(() => setCurrentStep(2), 2000);
      },
      onError: (err: unknown) => {
        setError(getErrMsg(err, "Face enrollment failed"));
      },
      onSettled: () => setLoading(false),
    });
  };

  const verifyFaceMutation = useVerifyFace();
  const verifyFace = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const frame = captureFrame();
      if (!frame) {
        setError("Failed to capture frame");
        setLoading(false);
        return;
      }
      if (!attemptId) return;
      const data = await verifyFaceMutation.mutateAsync({ attemptId, frame });
      if (data.verified) {
        setFaceVerified(true);
        setSuccess(
          `Face verified! Confidence: ${(data.confidence * 100).toFixed(
            1
          )}%`
        );
        stopCamera();
        setTimeout(() => setCurrentStep(3), 2000);
      } else {
        setVerifyAttempts((prev) => prev + 1);
        setError(
          `Verification failed: ${data.message}. Please try again.`
        );
      }
    } catch (err: unknown) {
      console.error("Face verification failed", err);
      setError(getErrMsg(err, "Face verification failed"));
    } finally {
      setLoading(false);
    }
  };

  const enrollKeystrokeMutation = useEnrollKeystrokeUser();
  const enrollKeystrokePattern = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await enrollKeystrokeMutation.mutateAsync(keystrokeBuffer);
      if (data.success) {
        setKeystrokeEnrolled(true);
        setSuccess("Keystroke pattern enrolled successfully!");
        setTimeout(() => setCurrentStep(4), 2000);
      } else {
        setError("Keystroke enrollment failed. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Keystroke enrollment failed", err);
      setError(getErrMsg(err, "Keystroke enrollment failed"));
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: unknown) {
      console.error("Failed to access camera", err);
      setError("Failed to access camera. Please grant camera permissions.");
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const captureFrame = (): string | null => {
    if (!videoRef.current) return null;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(videoRef.current, 0, 0);
    return canvas.toDataURL("image/jpeg");
  };

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

  const submitTypingRound = () => {
    if (typingInput.trim() === "") {
      setError("Please type something before submitting");
      return;
    }

    setTypingInput("");
    setTypingRound((prev) => prev + 1);
    setError("");

    if (typingRound + 1 >= REQUIRED_TYPING_ROUNDS) {
      enrollKeystrokePattern();
    }
  };

  const proceedToExam = () => {
    navigate(`/exam/${attemptId}/start`);
  };

  useEffect(() => {
    if (currentStep === 2 && !stream) {
      startCamera();
    }

    return () => {
      if (stream) {
        stopCamera();
      }
    };
  }, [currentStep, stream, stopCamera]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Biometric Enrollment
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Complete these steps to verify your identity before starting the exam
        </p>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    currentStep > step ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {/* Step 1: Face Enrollment */}
        {currentStep === 1 && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Step 1: Face Enrollment
            </h2>
            <p className="text-gray-700 mb-6">
              We will use your registration video to create a face profile. Click
              the button below to start enrollment.
            </p>
            <button
              onClick={enrollFace}
              disabled={loading || faceEnrolled}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded disabled:bg-gray-400"
            >
              {loading ? "Enrolling..." : "Enroll Face"}
            </button>
          </div>
        )}

        {/* Step 2: Face Verification */}
        {currentStep === 2 && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Step 2: Face Verification
            </h2>
            <p className="text-gray-700 mb-4">
              Look at the camera and click "Verify Face" to confirm your identity.
            </p>

            <div className="mb-6">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full max-w-md mx-auto rounded-lg border-4 border-blue-500"
              />
            </div>

            <button
              onClick={verifyFace}
              disabled={loading || faceVerified}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded disabled:bg-gray-400"
            >
              {loading ? "Verifying..." : "Verify Face"}
            </button>

            {verifyAttempts > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Attempts: {verifyAttempts}
              </p>
            )}
          </div>
        )}

        {/* Step 3: Keystroke Enrollment */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Step 3: Keystroke Pattern Enrollment
            </h2>
            <p className="text-gray-700 mb-4 text-center">
              Type the text below {REQUIRED_TYPING_ROUNDS} times. This helps us
              recognize your typing pattern.
            </p>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-center font-mono text-lg">{TYPING_TEXT}</p>
            </div>

            <p className="text-center mb-2 font-semibold">
              Round {typingRound + 1} of {REQUIRED_TYPING_ROUNDS}
            </p>

            <textarea
              value={typingInput}
              onChange={(e) => setTypingInput(e.target.value)}
              onKeyDown={handleKeystrokeDown}
              onKeyUp={handleKeystrokeUp}
              placeholder="Type the text above here..."
              className="w-full border-2 border-gray-300 rounded-lg p-4 font-mono mb-4 focus:border-blue-500 focus:outline-none"
              rows={3}
              disabled={loading || keystrokeEnrolled}
            />

            <div className="text-center">
              <button
                onClick={submitTypingRound}
                disabled={loading || keystrokeEnrolled}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded disabled:bg-gray-400"
              >
                {typingRound + 1 < REQUIRED_TYPING_ROUNDS
                  ? "Next Round"
                  : loading
                  ? "Enrolling..."
                  : "Complete Enrollment"}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Complete */}
        {currentStep === 4 && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              ✓ Enrollment Complete!
            </h2>
            <p className="text-gray-700 mb-6">
              Your biometric profile has been successfully created. You can now
              start the exam.
            </p>
            <button
              onClick={proceedToExam}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded"
            >
              Start Exam
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamEnrollmentPage;
