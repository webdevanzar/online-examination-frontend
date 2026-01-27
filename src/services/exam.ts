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
  instructions?: string; // API instructions field
}

export interface ExamHistoryItem {
  id: string;
  examId: string;
  title: string;
  subject: string;
  status: "Passed" | "Failed";
  date: string;
  startedAt: string;
  duration: number;
  score: number;
  marksObtained: number;
  totalMarks: number;
  passingMarks: number;
  correct: number;
  total: number;
  isTerminated: boolean;
  terminationReason: string | null;
  warningCount: number;
}

export interface ExamHistorySummary {
  totalExams: number;
  passed: number;
  failed: number;
  avgScore: number;
}

export interface ExamHistoryResponse {
  summary: ExamHistorySummary;
  history: ExamHistoryItem[];
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

const getExamHistoryApi = async () => {
  const res = await axiosInstance.get("/student/exam-history");
  return res.data as ExamHistoryResponse;
};

export const useExamHistory = (enabled = true) => {
  return useQuery({
    queryKey: ["exam-history"],
    queryFn: getExamHistoryApi,
    enabled,
  });
};

export const __examInternals = { axiosInstance };
