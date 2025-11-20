"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import type { Task } from "@/types/task";
import { useUpdateTaskMutation } from "../hooks/useUpdateTaskMutation";

interface TitleInlineEditorProps {
  task: Task;
}

export default function TitleInlineEditor({ task }: TitleInlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: updateTaskMutation } = useUpdateTaskMutation();

  const handleEnableEdit = () => {
    setIsEditing(true);
    setDraftTitle(task.title);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDraftTitle(task.title);
  };

  const handleSaveEdit = useCallback(() => {
    const cleanedTitle = draftTitle.trim();

    if (!cleanedTitle || cleanedTitle === task.title) {
      setIsEditing(false);
      return;
    }

    updateTaskMutation({
      id: task.id,
      title: cleanedTitle,
    });

    setIsEditing(false);
  }, [draftTitle, task.id, task.title, updateTaskMutation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSaveEdit();
    if (e.key === "Escape") handleCancelEdit();
  };

  const handleBlur = () => {
    handleSaveEdit();
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div
      className="
        w-full 
        pr-10 
        sm:pr-12 
        md:pr-16
      "
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          value={draftTitle}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="
            font-semibold
            text-[15px]
            sm:text-[16px]
            md:text-[17px]
            px-3
            py-[6px]
            leading-[22px]
          "
        />
      ) : (
        <h3
          onClick={handleEnableEdit}
          className="
            font-semibold 
            text-[16px]
            sm:text-[18px]
            md:text-[19px]
            text-foreground
            break-words 
            cursor-pointer 
            transition
            hover:opacity-80
          "
        >
          {task.title}
        </h3>
      )}
    </div>
  );
}
