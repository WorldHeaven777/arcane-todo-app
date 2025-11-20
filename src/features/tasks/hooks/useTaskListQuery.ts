// 전체 Task 목록 가져오기 담당 로직
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "@/apis/taskApi";
import type { Task } from "@/types/task";

// 공통 쿼리 키
export const TASK_LIST_QUERY_KEY = ["tasks"] as const;

export function useTaskListQuery() {
  const queryResult = useQuery<Task[], Error>({
    queryKey: TASK_LIST_QUERY_KEY,
    queryFn: fetchAllTasks,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
  });

  return {
    taskList: queryResult.data ?? [],
    isTaskListLoading: queryResult.isLoading,
    isTaskListFetching: queryResult.isFetching,
    taskListError: queryResult.error,
    queryResult,
  };
}
