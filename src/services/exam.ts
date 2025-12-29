import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/interceptor";

// Using shared axiosInstance with baseURL /api and 401 interceptor

export interface Exam {
  id: string;
  title: string;
  description: string;
  subject: string;
  startTime: string | Date;
  endTime: string | Date;
  duration: number; // minutes
  totalMarks: number;
  passingMarks: number;
  questionCount: number;
  microphoneRequired: boolean;
  faceDetectionRequired: boolean;
}

type GetPublishedExamsResponse = { exams: Exam[] };

const getPublishedExamsApi = async () => {
  const res = await axiosInstance.get("/student/exams");
  return res.data as GetPublishedExamsResponse;
};

export const usePublishedExams = (enabled = true) => {
  return useQuery({
    queryKey: ["published-exams"],
    queryFn: getPublishedExamsApi,
    enabled,
    select: (d) => d.exams,
  });
};

export const __examInternals = { axiosInstance };
