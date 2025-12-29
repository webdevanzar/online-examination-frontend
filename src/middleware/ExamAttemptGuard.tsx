import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { axiosInstance } from "../utils/interceptor";
import { toast } from "sonner";

export const ExamAttemptGuard = ({ children }: { children: React.ReactNode }) => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const [validating, setValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateAttempt = async () => {
      if (!attemptId) {
        setIsValid(false);
        setValidating(false);
        return;
      }

      try {
        const res = await axiosInstance.get(`/student/attempt/${attemptId}/status`);
        const { isSubmitted } = res.data;

        // Only allow if not submitted
        if (isSubmitted) {
          toast.error("This exam has already been submitted.");
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      } catch (err) {
        console.log(err);
        toast.error("Invalid exam attempt.");
        setIsValid(false);
      } finally {
        setValidating(false);
      }
    };

    validateAttempt();
  }, [attemptId]);

  if (validating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Validating exam attempt...</div>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/exams" replace />;
  }

  return <>{children}</>;
};
