import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useVerifyFaceForExam } from "../services/biometric";
import { useStartExam } from "../services/auth";
import { toast } from "sonner";
import type { Exam } from "../services/exam";

const ExamEnrollmentPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const exam = (location.state as { exam?: Exam } | null)?.exam;

  // Steps: 1=FaceVerify, 2=Starting Exam
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Face verification
  const [faceVerified, setFaceVerified] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [verifyAttempts, setVerifyAttempts] = useState(0);

  // API hooks - NEW FLOW: verify face FIRST, then create attempt
  const verifyFaceForExamMutation = useVerifyFaceForExam();
  const startExamMutation = useStartExam();

  const getErrMsg = (e: unknown, fallback: string) => {
    if (e && typeof e === "object" && "response" in e) {
      const resp = (e as { response?: { data?: { message?: string } } }).response;
      const msg = resp?.data?.message;
      if (typeof msg === "string" && msg) return msg;
    }
    return fallback;
  };

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
      if (!examId) return;

      // Step 1: Verify face (NO exam attempt created yet)
      const data = await verifyFaceForExamMutation.mutateAsync({ examId, frame });

      if (data.verified) {
        setFaceVerified(true);
        setSuccess(
          `Face verified! Confidence: ${(data.confidence * 100).toFixed(1)}% | ` +
          `Distance: ${data.distance.toFixed(3)} | Video samples: ${data.video_samples}`
        );
        stopCamera();

        // Step 2: NOW create exam attempt
        toast.success("Face verified! Starting exam...");
        setCurrentStep(2);

        // Call startExam API to create attempt
        const examResponse = await startExamMutation.mutateAsync(examId);

        // Step 3: Navigate to exam with attemptId
        toast.success("Exam started successfully!");
        navigate(`/exam/${examResponse.attemptId}/start`, { state: { exam } });

      } else {
        setVerifyAttempts((prev) => prev + 1);
        setError(
          `Verification failed: ${data.message}. Please try again.`
        );
      }
    } catch (err: unknown) {
      console.error("Face verification failed", err);
      setError(getErrMsg(err, "Face verification or exam start failed"));
      stopCamera();
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


  useEffect(() => {
    if (currentStep === 1 && !stream) {
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
          Face Verification
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Verify your identity by comparing your live camera feed with your registration video
        </p>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2].map((step) => (
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
              {step < 2 && (
                <div
                  className={`w-32 h-1 mx-2 ${
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

        {/* Step 1: Face Verification */}
        {currentStep === 1 && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Step 1: Face Verification
            </h2>
            <p className="text-gray-700 mb-4">
              Look at the camera and click "Verify Face" to confirm your identity.
              We will compare your live feed with your registration video.
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

        {/* Step 2: Starting Exam */}
        {currentStep === 2 && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Starting Exam...
            </h2>
            <p className="text-gray-700">
              Face verified! Creating your exam session. Please wait...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamEnrollmentPage;
