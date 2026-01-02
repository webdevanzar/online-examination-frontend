import { type AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../store";
import {
  loginSuccess,
  logoutSuccess,
  updateProfile,
} from "../store/slice/authSlice";
import { axiosInstance } from "../utils/interceptor";
import { useGoogleLogin } from "@react-oauth/google";

// Using shared axiosInstance with baseURL /api and 401 interceptor

export interface StudentUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  dob: string;
  gender: string;
  selfieVideo: string;
  hasTypingProfile?:boolean; 
  createdAt: string | Date;
  updatedAt: string | Date;
  unreadNotificationCount: number;
}

export interface StudentLoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: StudentUser;
}

type LoginPayload = { email: string; password: string; rememberMe?: boolean };
type RegisterPayload = {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  gender: string;
  dob: string;
};

// =================== GOOGLE Auth ===================
const googleStudentAuthApi = async (data: { accessToken: string }) => {
  const res = await axiosInstance.post("/student/auth/google", data);
  return res.data as StudentLoginResponse;
};
export const useStudentGoogleAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const mutation = useMutation({
    mutationFn: googleStudentAuthApi,
    onSuccess: (data) => {
      dispatch(
        loginSuccess({
          isAuthenticated: true,
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          profileImage: data.user.profileImage,
          dob: data.user.dob,
          gender: data.user.gender,
          selfieVideo: data.user.selfieVideo,
          isActive: true,
          createdAt: new Date(data.user.createdAt),
          updatedAt: new Date(data.user.updatedAt),
          unreadNotificationCount: data.user.unreadNotificationCount,
        })
      );
      toast.success("Logged in with Google");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message: string }>;
      const msg =
        error.response?.data?.message ||
        "Something went wrong with Google login";

      toast.error(msg, {
        duration: 1500,
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    },
  });

  //  Google popup logic stays in hook (not API)
  const googleLogin = useGoogleLogin({
    scope: "openid profile email",
    onSuccess: (tokenResponse) => {
      mutation.mutate({
        accessToken: tokenResponse.access_token,
      });
    },
    onError: () => {
      toast.error("Google login cancelled");
    },
  });

  return {
    googleLogin,
    isPending: mutation.isPending,
  };
};

const loginStudentApi = async (data: LoginPayload) => {
  const res = await axiosInstance.post("/student/login", data);
  return res.data as StudentLoginResponse;
};

export const useStudentLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: loginStudentApi,
    onSuccess: (data) => {
      dispatch(
        loginSuccess({
          isAuthenticated: true,
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          profileImage: data.user.profileImage,
          dob: data.user.dob,
          gender: data.user.gender,
          selfieVideo: data.user.selfieVideo,
          isActive: true,
          createdAt: new Date(data.user.createdAt),
          updatedAt: new Date(data.user.updatedAt),
          unreadNotificationCount: data.user.unreadNotificationCount,
        })
      );
      toast.success("Logged in successfully");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg, {
        duration: 1500,
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    },
  });
};

// Delete profile image
const deleteProfileImageApi = async () => {
  const res = await axiosInstance.delete("/student/profile-image");
  return res.data as { message: string; user: StudentUser };
};

export const useStudentProfileImageDelete = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: deleteProfileImageApi,
    onSuccess: (data) => {
      dispatch(
        updateProfile({
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          profileImage: data.user.profileImage,
          dob: data.user.dob,
          gender: data.user.gender,
          selfieVideo: data.user.selfieVideo,
          createdAt: new Date(data.user.createdAt),
          updatedAt: new Date(data.user.updatedAt),
          unreadNotificationCount: data.user.unreadNotificationCount,
        })
      );
      toast.success("Profile image deleted");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg, {
        duration: 1500,
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    },
  });
};

// Delete selfie video
const deleteSelfieVideoApi = async () => {
  const res = await axiosInstance.delete("/student/selfie-video");
  return res.data as { message: string; user: StudentUser };
};

export const useStudentSelfieVideoDelete = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: deleteSelfieVideoApi,
    onSuccess: (data) => {
      dispatch(
        updateProfile({
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          profileImage: data.user.profileImage,
          dob: data.user.dob,
          gender: data.user.gender,
          selfieVideo: data.user.selfieVideo,
          createdAt: new Date(data.user.createdAt),
          updatedAt: new Date(data.user.updatedAt),
          unreadNotificationCount: data.user.unreadNotificationCount,
        })
      );
      toast.success("Selfie video deleted");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg, {
        duration: 1500,
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    },
  });
};

const logoutStudentApi = async () => {
  const res = await axiosInstance.post("/student/logout");
  return res.data as { message: string };
};

export const useStudentLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: logoutStudentApi,
    onSuccess: () => {
      dispatch(logoutSuccess());
      toast.success("Logged out");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg, {
        duration: 1500,
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    },
  });
};

const registerStudentApi = async (data: RegisterPayload) => {
  const res = await axiosInstance.post("/student/register", data);
  return res.data as { message: string };
};

export const useStudentRegister = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: registerStudentApi,
    onSuccess: () => {
      toast.success("Registered successfully");
      qc.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg, {
        duration: 1500,
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    },
  });
};

export const __authInternals = { axiosInstance };

type MeResponse = { user: StudentUser };

const getMeApi = async () => {
  const res = await axiosInstance.get("/student/me");
  return res.data as MeResponse;
};

export const useStudentMe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
    retry: false,
    select: (d) => d.user,
  });

  useEffect(() => {
    const user = query.data;
    if (!user) return;
    dispatch(
      updateProfile({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        dob: user.dob,
        gender: user.gender,
        selfieVideo: user.selfieVideo,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
        isAuthenticated: true,
      })
    );
  }, [query.data, dispatch]);

  return query;
};

type ProfileUpdatePayload = {
  fullName: string;
  phoneNumber: string;
  gender: string;
  dob: string;
};

const updateProfileApi = async (data: ProfileUpdatePayload) => {
  const res = await axiosInstance.put("/student/profile", data);
  return res.data as { message: string; user: StudentUser };
};

export const useStudentProfileUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (data) => {
      dispatch(
        updateProfile({
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          profileImage: data.user.profileImage,
          dob: data.user.dob,
          gender: data.user.gender,
          selfieVideo: data.user.selfieVideo,
          createdAt: new Date(data.user.createdAt),
          updatedAt: new Date(data.user.updatedAt),
          unreadNotificationCount: data.user.unreadNotificationCount,
        })
      );
      toast.success("Profile updated");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg, {
        duration: 1500,
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    },
  });
};

const updateProfileImageApi = async (formData: FormData) => {
  const res = await axiosInstance.post("/student/profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data as { message: string; user: StudentUser };
};

export const useStudentProfileImageUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: updateProfileImageApi,
    onSuccess: (data) => {
      dispatch(
        updateProfile({
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          profileImage: data.user.profileImage,
          dob: data.user.dob,
          gender: data.user.gender,
          selfieVideo: data.user.selfieVideo,
          createdAt: new Date(data.user.createdAt),
          updatedAt: new Date(data.user.updatedAt),
          unreadNotificationCount: data.user.unreadNotificationCount,
        })
      );
      toast.success("Profile image updated");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg, {
        duration: 1500,
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    },
  });
};

const updateSelfieVideoApi = async (formData: FormData) => {
  const res = await axiosInstance.post("/student/selfie-video", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data as { message: string; user: StudentUser };
};

export const useStudentSelfieVideoUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: updateSelfieVideoApi,
    onSuccess: (data) => {
      dispatch(
        updateProfile({
          id: data.user.id,
          fullName: data.user.fullName,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          profileImage: data.user.profileImage,
          dob: data.user.dob,
          gender: data.user.gender,
          selfieVideo: data.user.selfieVideo,
          createdAt: new Date(data.user.createdAt),
          updatedAt: new Date(data.user.updatedAt),
          unreadNotificationCount: data.user.unreadNotificationCount,
        })
      );
      toast.success("Selfie video updated");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message?: string }>;
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg, {
        duration: 1500,
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    },
  });
};

type ExamQuestionOption = { id: string; text: string; isCorrect?: boolean };
type ExamQuestion = {
  id: string;
  text: string;
  type: "mcq" | "typing";
  marks: number;
  options?: ExamQuestionOption[];
};
type ExamQuestionsResponse = { questions: ExamQuestion[] };

const getExamQuestionsApi = async (examId: string) => {
  const res = await axiosInstance.get(`/student/exams/${examId}`);
  return res.data as ExamQuestionsResponse;
};

export const useExamQuestions = (examId: string, enabled = true) => {
  return useQuery({
    queryKey: ["exam-questions", examId],
    queryFn: () => getExamQuestionsApi(examId),
    enabled: !!examId && enabled,
    select: (d) => d.questions,
  });
};

export type ExamDetails = {
  exam: {
    id: string;
    title: string;
    description: string;
    duration: number;
    totalMarks: number;
    startTime: string;
    endTime: string;
    questions: Array<{
      id: number | string;
      question: string;
      type: "MCQ" | "TYPING";
      options?: Array<{ id: number | string; text: string }>;
      answerMinLength?: number;
      answerMaxLength?: number;
    }>;
  };
  attempt: {
    id: string;
    startedAt: string;
    warningCount: number;
    maxWarnings: number;
  };
};

const getExamDetailsByAttemptApi = async (attemptId: string) => {
  const res = await axiosInstance.get(`/student/attempt/${attemptId}/exam-details`);
  return res.data as ExamDetails;
};

export const useExamDetailsByAttempt = (attemptId: string, enabled = true) => {
  return useQuery<ExamDetails>({
    queryKey: ["exam-details", attemptId],
    queryFn: () => getExamDetailsByAttemptApi(attemptId),
    enabled: !!attemptId && enabled,
    staleTime: Infinity, // Exam data shouldn't change during exam
    retry: 2,
  });
};

type StartExamResponse = {
  message: string;
  attemptId: string;
  startedAt: string;
};

const startExamApi = async (examId: string) => {
  const res = await axiosInstance.post(`/student/exams/${examId}/start`);
  return res.data as StartExamResponse;
};

export const useStartExam = () => {
  return useMutation({
    mutationFn: startExamApi,
  });
};

// NEW: Get exam attempt status
type ExamAttemptStatus = {
  status: "not_attempted" | "submitted" | "terminated" | "in_progress" | "unknown";
  canStart: boolean;
  score?: number;
  submittedAt?: string;
  totalMarks?: number;
  terminationReason?: string;
  warningCount?: number;
  attemptId?: string;
  startedAt?: string;
  message?: string;
};

const getExamAttemptStatusApi = async (examId: string) => {
  const res = await axiosInstance.get(`/student/exams/${examId}/attempt-status`);
  return res.data as ExamAttemptStatus;
};

export const useExamAttemptStatus = (examId: string, enabled = true) => {
  return useQuery<ExamAttemptStatus>({
    queryKey: ["exam-attempt-status", examId],
    queryFn: () => getExamAttemptStatusApi(examId),
    enabled: !!examId && enabled,
  });
};

type SaveAnswerPayload = {
  examId: string;
  attemptId: string;
  questionId: string;
  selectedOptionId?: string | null;
  writtenAnswer?: string | null;
};

const saveAnswerApi = async ({
  examId,
  attemptId,
  ...body
}: SaveAnswerPayload) => {
  const res = await axiosInstance.post(
    `/student/exams/${examId}/attempt/${attemptId}/answer`,
    body
  );
  return res.data as { message: string };
};

export const useSaveAnswer = () => {
  return useMutation({
    mutationFn: saveAnswerApi,
  });
};

type AutoSavePayload = {
  examId: string;
  attemptId: string;
  answers: Array<{
    questionId: string;
    selectedOptionId?: string | null;
    writtenAnswer?: string | null;
  }>;
};

const autoSaveApi = async ({ examId, attemptId, answers }: AutoSavePayload) => {
  const res = await axiosInstance.post(
    `/student/exams/${examId}/attempt/${attemptId}/autosave`,
    { answers }
  );
  return res.data as { message: string };
};

export const useAutoSaveAnswers = () => {
  return useMutation({
    mutationFn: autoSaveApi,
  });
};

type SubmitExamPayload = { examId: string; attemptId: string };
type SubmitExamResponse = { message: string; score: number };

const submitExamApi = async ({ examId, attemptId }: SubmitExamPayload) => {
  const res = await axiosInstance.post(
    `/student/exams/${examId}/attempt/${attemptId}/submit`
  );
  return res.data as SubmitExamResponse;
};

export const useSubmitExam = () => {
  return useMutation({
    mutationFn: submitExamApi,
  });
};

type AttemptStatus = { isSubmitted: boolean; status: "submitted" | "active" };

const getAttemptStatusApi = async (attemptId: string) => {
  const res = await axiosInstance.get(`/student/attempt/${attemptId}/status`);
  return res.data as AttemptStatus;
};

export const useAttemptStatus = (attemptId: string, enabled = true) => {
  return useQuery({
    queryKey: ["attempt-status", attemptId],
    queryFn: () => getAttemptStatusApi(attemptId),
    enabled: !!attemptId && enabled,
  });
};

type CheckFramePayload = { attemptId: string; frame: string };
type FraudItem = { type: string; confidence: number; isMajor?: boolean };
type CheckFrameResponse = { fraud: FraudItem[] } & Record<string, unknown>;

const checkFrameApi = async ({ attemptId, frame }: CheckFramePayload) => {
  const res = await axiosInstance.post(
    `/proctoring/attempt/${attemptId}/check-frame`,
    { frame }
  );
  return res.data as CheckFrameResponse;
};

export const useCheckFrame = () => {
  return useMutation<CheckFrameResponse, unknown, CheckFramePayload>({
    mutationFn: checkFrameApi,
  });
};

const getAttemptSummaryApi = async (attemptId: string) => {
  const res = await axiosInstance.get(`/student/attempt/${attemptId}/summary`);
  return res.data as unknown;
};

export const useAttemptSummary = (attemptId: string, enabled = true) => {
  return useQuery<unknown>({
    queryKey: ["attempt-summary", attemptId],
    queryFn: () => getAttemptSummaryApi(attemptId),
    enabled: !!attemptId && enabled,
  });
};
