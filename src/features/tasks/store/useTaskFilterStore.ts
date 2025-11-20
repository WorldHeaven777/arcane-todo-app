"use client";

import { create } from "zustand";

// Task 상태 필터 타입
export type TaskStatusFilterOption = "all" | "todo" | "doing" | "done";

// Task 정렬 옵션 타입
export type TaskSortOption =
  | "createdNewest"
  | "createdOldest"
  | "dueDateAscending"
  | "dueDateDescending";

// Zustand 스토어 타입 정의
interface TaskFilterStoreState {
  // 현재 검색 키워드
  searchKeyword: string;

  // 상태 필터(todo/doing/done/all)
  statusFilter: TaskStatusFilterOption;

  // 정렬 옵션
  sortOption: TaskSortOption;

  // Setter 함수들
  setSearchKeyword: (keyword: string) => void;
  setStatusFilter: (filter: TaskStatusFilterOption) => void;
  setSortOption: (option: TaskSortOption) => void;

  // 전체 필터/정렬/검색 초기화
  resetAllFilters: () => void;
}

// Zustand 스토어 생성
export const useTaskFilterStore = create<TaskFilterStoreState>((set) => ({
  // 초기값
  searchKeyword: "",
  statusFilter: "all",
  sortOption: "createdNewest",

  // 검색어 설정 담당 로직
  setSearchKeyword: (keyword) =>
    set(() => ({
      searchKeyword: keyword,
    })),

  // 상태 필터 설정 담당 로직
  setStatusFilter: (filter) =>
    set(() => ({
      statusFilter: filter,
    })),

  // 정렬 옵션 설정 담당 로직
  setSortOption: (option) =>
    set(() => ({
      sortOption: option,
    })),

  // 전체 필터 및 정렬 초기화 담당 로직
  resetAllFilters: () =>
    set(() => ({
      searchKeyword: "",
      statusFilter: "all",
      sortOption: "createdNewest",
    })),
}));
