// 에러 상황 시뮬레이션 담당 로직
"use client";

import { useMutation } from "@tanstack/react-query";
import { simulateTaskError } from "@/apis/taskApi";

export function useSimulateErrorMutation() {
  return useMutation<never, Error>({
    mutationFn: simulateTaskError,
  });
}
