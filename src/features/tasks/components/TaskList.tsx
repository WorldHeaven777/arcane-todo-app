"use client";

import { useMemo } from "react";
import { useTaskListQuery } from "../hooks/useTaskListQuery";
import { useTaskFilterStore } from "../store/useTaskFilterStore";
import TaskListItem from "./TaskListItem";

export default function TaskList() {
  const { taskList, isTaskListLoading, taskListError } = useTaskListQuery();
  const { searchKeyword, statusFilter, sortOption, resetAllFilters } =
    useTaskFilterStore();

  const filteredTasks = useMemo(() => {
    let list = [...taskList];

    // 검색
    if (searchKeyword.trim() !== "") {
      const keyword = searchKeyword.toLowerCase();
      list = list.filter((task) => {
        const titleText = task.title.toLowerCase();
        const descriptionText = (task.description ?? "").toLowerCase();

        return titleText.includes(keyword) || descriptionText.includes(keyword);
      });
    }

    // 상태 필터
    if (statusFilter !== "all") {
      list = list.filter((task) => task.status === statusFilter);
    }

    // 정렬
    list.sort((a, b) => {
      switch (sortOption) {
        case "createdNewest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        case "createdOldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        case "dueDateAscending": {
          const aDue = a.dueDate ?? "9999-12-31";
          const bDue = b.dueDate ?? "9999-12-31";
          return aDue.localeCompare(bDue);
        }

        case "dueDateDescending": {
          const aDue = a.dueDate ?? "0000-01-01";
          const bDue = b.dueDate ?? "0000-01-01";
          return bDue.localeCompare(aDue);
        }

        default:
          return 0;
      }
    });

    return list;
  }, [taskList, searchKeyword, statusFilter, sortOption]);

  // 로딩 상태
  if (isTaskListLoading) {
    return (
      <div className="flex flex-col gap-4 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-full h-[80px] bg-gray-100 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  // 에러 상태
  if (taskListError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 mt-10">
        <p className="text-red-500 text-sm">
          작업 목록 로딩 중 오류가 발생했습니다.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="
            px-4 py-2 rounded-lg
            border border-gray-300
            text-sm
            hover:bg-gray-100
          "
        >
          새로고침
        </button>
      </div>
    );
  }

  // 빈 상태
  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 mt-12">
        <p className="text-gray-500 text-sm">조건에 맞는 작업이 없습니다.</p>
        <button
          onClick={resetAllFilters}
          className="
            px-4 py-2 rounded-lg
            text-sm
            border border-gray-300
            hover:bg-gray-100
          "
        >
          필터 초기화
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-6 pb-20 lg:pb-24">
      {filteredTasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
}
