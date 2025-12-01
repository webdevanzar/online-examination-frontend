import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/interceptor";

// Using shared axiosInstance with baseURL /api and 401 interceptor

export type EnrollmentStatus = {
  faceEnrolled: boolean;
  keystrokeEnrolled: boolean;
  canStartExam: boolean;
};

export type EnrollFaceResponse = { success: true; message: string };
export type VerifyFaceResponse = { verified: boolean; confidence: number; message: string };

export type KeystrokeEvent = {
  key: string;
  event: "keydown" | "keyup";
  timestamp: number;
};

export type EnrollKeystrokeResponse = {
  success: true;
  message: string;
};

export type VerifyKeystrokeResponse = {
  verified: boolean;
  confidence: number;
  message: string;
};

// ===== API functions =====
const enrollFaceApi = async (attemptId: string) => {
  const res = await axiosInstance.post(`/biometric/attempt/${attemptId}/enroll-face`);
  return res.data as EnrollFaceResponse;
};

const verifyFaceApi = async (vars: { attemptId: string; frame: string }) => {
  const res = await axiosInstance.post(`/biometric/attempt/${vars.attemptId}/verify-face`, { frame: vars.frame });
  return res.data as VerifyFaceResponse;
};

// Attempt-scoped keystroke APIs were removed on backend; use user-centric variants below

// User-centric keystroke APIs (no attemptId required)
const enrollKeystrokeUserApi = async (keystrokes: KeystrokeEvent[]) => {
  const res = await axiosInstance.post(`/biometric/user/enroll-keystroke`, { keystrokes });
  return res.data as EnrollKeystrokeResponse;
};

const verifyKeystrokeUserApi = async (keystrokes: KeystrokeEvent[]) => {
  const res = await axiosInstance.post(`/biometric/user/verify-keystroke`, { keystrokes });
  return res.data as VerifyKeystrokeResponse;
};

const getEnrollmentStatusApi = async (attemptId: string) => {
  const res = await axiosInstance.get(`/biometric/attempt/${attemptId}/enrollment-status`);
  return res.data as EnrollmentStatus;
};

// ===== Hooks =====
export const useEnrollFace = () => {
  return useMutation<EnrollFaceResponse, unknown, string>({ mutationFn: enrollFaceApi });
};

export const useVerifyFace = () => {
  return useMutation<VerifyFaceResponse, unknown, { attemptId: string; frame: string }>({ mutationFn: verifyFaceApi });
};

// Removed attempt-scoped keystroke hooks; use user-centric variants instead

export const useEnrollKeystrokeUser = () => {
  return useMutation<EnrollKeystrokeResponse, unknown, KeystrokeEvent[]>({ mutationFn: enrollKeystrokeUserApi });
};

export const useVerifyKeystrokeUser = () => {
  return useMutation<VerifyKeystrokeResponse, unknown, KeystrokeEvent[]>({ mutationFn: verifyKeystrokeUserApi });
};

export const useEnrollmentStatus = (attemptId: string, enabled = true) => {
  return useQuery<EnrollmentStatus>({
    queryKey: ["enrollment-status", attemptId],
    queryFn: () => getEnrollmentStatusApi(attemptId),
    enabled: !!attemptId && enabled,
  });
};

export const __biometricInternals = { axiosInstance };
