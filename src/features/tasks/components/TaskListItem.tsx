"use client";

import { motion } from "framer-motion";
import type { Task } from "@/types/task";

import StatusBadge from "./StatusBadge";
import TitleInlineEditor from "./TitleInlineEditor";
import DueDateEditorPopover from "./DueDateEditorPopover";
import DeleteTaskButton from "./DeleteTaskButton";
import StatusSelector from "./StatusSelector";
import EditTaskButton from "./EditTaskButton";

export default function TaskListItem({ task }: { task: Task }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.015,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="
        relative
        bg-[var(--bg-elevated)]
        border border-[var(--border)]
        rounded-xl
        p-5
        shadow-sm
        flex flex-col gap-4
      "
    >
      {/* 액션 버튼 */}
      <div
        className="
          absolute
          top-4
          right-4
          flex items-center
          gap-1
          sm:gap-2
          z-10
        "
      >
        <EditTaskButton task={task} />
        <StatusSelector task={task} />
        <DeleteTaskButton task={task} />
      </div>

      {/* 제목 영역 */}
      <div
        className="
          pr-20
          sm:pr-24
          md:pr-28
        "
      >
        <TitleInlineEditor task={task} />
        {task.description && (
          <p
            className="
        mt-1.5
        text-[13px] sm:text-[14px]
        text-[#6B7280]
        leading-[20px]
        line-clamp-2
        break-words
      "
          >
            {task.description}
          </p>
        )}
      </div>

      {/* 상태 + 날짜 */}
      <div className="flex items-center justify-between pt-1">
        <StatusBadge status={task.status} />
        <DueDateEditorPopover task={task} />
      </div>
    </motion.div>
  );
}
