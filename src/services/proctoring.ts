import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/interceptor";

// Using shared axiosInstance with baseURL /api and 401 interceptor

export type CheckFrameOk = {
  ok: true;
  faces?: unknown;
  objects?: unknown;
  direction?: unknown;
  warningCount: number;
  maxWarnings: number;
};

export type CheckFrameTerminated = {
  ok: false;
  terminated: true;
  reason?: string;
  message?: string;
};

export type CheckFrameResponse = CheckFrameOk | CheckFrameTerminated;

export type CheckFramePayload = { attemptId: string; frame: string };

const checkFrameApi = async ({ attemptId, frame }: CheckFramePayload) => {
  const res = await axiosInstance.post(`/proctoring/attempt/${attemptId}/check-frame`, { frame });
  return res.data as CheckFrameResponse;
};

export const useProctoringCheckFrame = () => {
  return useMutation<CheckFrameResponse, unknown, CheckFramePayload>({
    mutationFn: checkFrameApi,
  });
};

export type TerminateAttemptPayload = { attemptId: string; reason?: string };
export type TerminateAttemptResponse = { ok: true; message: string };

const terminateAttemptApi = async ({ attemptId, reason }: TerminateAttemptPayload) => {
  const res = await axiosInstance.post(`/proctoring/attempt/${attemptId}/terminate`, { reason });
  return res.data as TerminateAttemptResponse;
};

export const useTerminateAttempt = () => {
  return useMutation<TerminateAttemptResponse, unknown, TerminateAttemptPayload>({
    mutationFn: terminateAttemptApi,
  });
};

export const __proctoringInternals = { axiosInstance };
