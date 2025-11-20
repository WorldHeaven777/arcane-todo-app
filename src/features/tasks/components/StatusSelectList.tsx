"use client";

import { memo } from "react";
import type { TaskStatus } from "@/types/task";

interface StatusSelectListProps {
  currentStatus: TaskStatus;
  onSelect: (next: TaskStatus) => void;
}

function StatusSelectListComponent({
  currentStatus,
  onSelect,
}: StatusSelectListProps) {
  const STATUS_OPTIONS = [
    { value: "todo", label: "할 일" },
    { value: "doing", label: "진행 중" },
    { value: "done", label: "완료됨" },
  ] as const;

  return (
    <div className="flex flex-col w-full py-2">
      {STATUS_OPTIONS.map((opt) => {
        const isActive = opt.value === currentStatus;

        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`
              text-left w-full
              px-3 py-[8px]
              rounded-md text-sm
              transition
              ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export const StatusSelectList = memo(StatusSelectListComponent);
