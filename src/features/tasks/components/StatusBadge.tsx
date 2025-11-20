"use client";

import type { TaskStatus } from "@/types/task";

const STATUS_STYLE_MAP: Record<
  TaskStatus,
  { bg: string; text: string; label: string }
> = {
  todo: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "할 일",
  },
  doing: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    label: "진행 중",
  },
  done: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "완료",
  },
};

export default function StatusBadge({ status }: { status: TaskStatus }) {
  const style = STATUS_STYLE_MAP[status];

  return (
    <span
      className={`
        px-3 py-1
        rounded-full
        text-[12px] font-medium
        ${style.bg} ${style.text}
      `}
    >
      {style.label}
    </span>
  );
}
