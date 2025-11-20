"use client";

import { useState, useCallback } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { useDeleteTaskMutation } from "../hooks/useDeleteTaskMutation";
import type { Task } from "@/types/task";

interface DeleteTaskButtonProps {
  task: Task;
}

export default function DeleteTaskButton({ task }: DeleteTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteTask, isPending } = useDeleteTaskMutation();

  /** 삭제 실행 */
  const handleConfirmDelete = useCallback(() => {
    if (isPending) return;
    deleteTask(task.id, {
      onSuccess: () => setOpen(false),
    });
  }, [isPending, task.id, deleteTask]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="
            w-8 h-8 p-0
            rounded-lg
            text-muted-foreground
            hover:bg-accent hover:text-accent-foreground
            transition
          "
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-xl border bg-card shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>작업을 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제하면 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="rounded-lg">취소</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isPending}
              className="rounded-lg"
            >
              {isPending ? "삭제 중..." : "삭제하기"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
