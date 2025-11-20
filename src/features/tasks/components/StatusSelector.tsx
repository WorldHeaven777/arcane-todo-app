"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { Task, TaskStatus } from "@/types/task";
import { Ellipsis } from "lucide-react";
import { memo, useCallback, useState } from "react";

import { StatusSelectList } from "./StatusSelectList";
import { useUpdateTaskMutation } from "../hooks/useUpdateTaskMutation";

interface StatusSelectorProps {
  task: Task;
}

function StatusSelector({ task }: StatusSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updateTask } = useUpdateTaskMutation();

  const handleSelect = useCallback(
    (nextStatus: TaskStatus) => {
      updateTask({ id: task.id, status: nextStatus });
      setIsOpen(false);
    },
    [task.id, updateTask]
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="
            w-8 h-8 md:w-8 md:h-8
            p-0
            flex items-center justify-center
            text-gray-600
            hover:bg-gray-200
            rounded-[8px]
          "
        >
          <Ellipsis size={18} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="
          w-[160px]
          p-[8px]
          rounded-[8px]
          shadow-lg
          border
          bg-white
        "
      >
        <StatusSelectList currentStatus={task.status} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}

export default memo(StatusSelector);
