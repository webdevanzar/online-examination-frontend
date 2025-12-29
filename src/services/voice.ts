import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../utils/interceptor";

const VOICE_ML_URL =
  import.meta.env.VITE_VOICE_ML_URL || "http://localhost:8002";

export interface VoiceStatus {
  speech_probability: number;
  issues: string[];
  timestamp: number;
  status: string;
  risk_score?: number;
  flags?: Record<string, boolean>;
}

export const useVoiceMonitoring = (
  attemptId: string | undefined,
  enabled: boolean = true,
  pollingInterval: number = 400 // ms
) => {
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastReportedIssuesRef = useRef<string>("");

  useEffect(() => {
    if (!enabled || !attemptId) {
      return;
    }

    // Poll Voice ML Worker for status
    const pollVoiceStatus = async () => {
      try {
        const response = await axios.get<VoiceStatus>(
          `${VOICE_ML_URL}/voice-status`
        );
        const status = response.data;
        setVoiceStatus(status);

        // If there are issues, report to backend
        if (status.issues && status.issues.length > 0) {
          const issuesKey = status.issues.sort().join(",");

          // Only report if issues changed (prevent duplicate reports)
          if (issuesKey !== lastReportedIssuesRef.current) {
            lastReportedIssuesRef.current = issuesKey;

            await axiosInstance.post(
              `/proctoring/attempt/${attemptId}/voice-violation`,
              {
                issues: status.issues,
                speech_probability: status.speech_probability,
                risk_score: status.risk_score || 0,
              }
            );
          }
        } else {
          lastReportedIssuesRef.current = "";
        }
      } catch (err) {
        console.error("Voice monitoring error:", err);
      }
    };

    // Start polling
    intervalRef.current = setInterval(pollVoiceStatus, pollingInterval);

    // Initial poll
    pollVoiceStatus();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [attemptId, enabled, pollingInterval]);

  return {
    voiceStatus,
    isMonitoring: enabled && !!attemptId,
  };
};
