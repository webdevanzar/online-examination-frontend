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
  checkInterval: number = 120000 // Check every 2 minutes (120000ms)
) => {
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const speechDetectionCountRef = useRef<number>(0);
  const lastViolationTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled || !attemptId) {
      return;
    }

    // Check voice status periodically (every 2 minutes)
    const checkVoiceStatus = async () => {
      try {
        // Collect multiple samples over a short period to get accurate reading
        const samples: VoiceStatus[] = [];
        const sampleCount = 10; // Take 10 samples
        const sampleInterval = 1000; // 1 second between samples

        for (let i = 0; i < sampleCount; i++) {
          try {
            const response = await axios.get<VoiceStatus>(
              `${VOICE_ML_URL}/voice-status`,
              { timeout: 180000 }
            );
            samples.push(response.data);

            // Wait between samples
            if (i < sampleCount - 1) {
              await new Promise(resolve => setTimeout(resolve, sampleInterval));
            }
          } catch (err) {
            console.error("Voice sample error:", err);
          }
        }

        if (samples.length === 0) {
          console.warn("No voice samples collected");
          return;
        }

        // Calculate average speech probability from samples
        const avgSpeechProbability = samples.reduce(
          (sum, s) => sum + (s.speech_probability || 0),
          0
        ) / samples.length;

        // Count how many samples detected speech above threshold
        const speechDetectedCount = samples.filter(
          s => (s.speech_probability || 0) > 0.3
        ).length;

        // Update status with average
        const latestStatus = samples[samples.length - 1];
        setVoiceStatus({
          ...latestStatus,
          speech_probability: avgSpeechProbability,
        });

        // Speech detection threshold: if more than 40% of samples detected speech
        const speechDetectionThreshold = sampleCount * 0.4;

        if (speechDetectedCount >= speechDetectionThreshold) {
          speechDetectionCountRef.current += 1;

          // Only report violation if:
          // 1. Speech detected in multiple checks
          // 2. At least 30 seconds since last violation (prevent spam)
          const now = Date.now();
          const timeSinceLastViolation = now - lastViolationTimeRef.current;

          if (timeSinceLastViolation > 30000) { // 30 seconds cooldown
            lastViolationTimeRef.current = now;

            await axiosInstance.post(
              `/proctoring/attempt/${attemptId}/voice-violation`,
              {
                issues: [`Speech detected (${speechDetectedCount}/${sampleCount} samples)`],
                speech_probability: avgSpeechProbability,
                risk_score: Math.min(1.0, avgSpeechProbability * 1.5),
                detection_count: speechDetectionCountRef.current,
              }
            );

            console.log(
              `Voice violation reported: ${avgSpeechProbability.toFixed(2)} probability, ` +
              `${speechDetectedCount}/${sampleCount} samples with speech`
            );
          }
        } else {
          // Reset detection count if no speech detected
          if (avgSpeechProbability < 0.1) {
            speechDetectionCountRef.current = 0;
          }
        }
      } catch (err) {
        console.error("Voice monitoring check error:", err);
      }
    };

    // Start periodic checks (every 2 minutes)
    intervalRef.current = setInterval(checkVoiceStatus, checkInterval);

    // Initial check after 10 seconds (give time for exam to start)
    setTimeout(checkVoiceStatus, 10000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [attemptId, enabled, checkInterval]);

  return {
    voiceStatus,
    isMonitoring: enabled && !!attemptId,
  };
};
