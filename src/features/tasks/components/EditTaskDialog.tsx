"use client";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import type { Task } from "@/types/task";
import { useUpdateTaskMutation } from "../hooks/useUpdateTaskMutation";

interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditTaskDialog({
  task,
  open,
  onOpenChange,
}: EditTaskDialogProps) {
  const [titleInput, setTitleInput] = useState(task.title);
  const [descriptionInput, setDescriptionInput] = useState<string>(
    task.description ?? ""
  );
  const [priorityInput, setPriorityInput] = useState(task.priority);
  const [statusInput, setStatusInput] = useState(task.status);
  const [dueDateInput, setDueDateInput] = useState<Date | null>(
    task.dueDate ? new Date(task.dueDate) : null
  );

  const { mutate: updateTaskMutation, isPending } = useUpdateTaskMutation();

  // Dialog 열릴 때마다 최신 task값으로 초기화
  useEffect(() => {
    if (open) {
      setTitleInput(task.title);
      setDescriptionInput(task.description ?? "");
      setPriorityInput(task.priority);
      setStatusInput(task.status);
      setDueDateInput(task.dueDate ? new Date(task.dueDate) : null);
    }
  }, [open, task]);

  const handleSubmit = () => {
    if (!titleInput.trim()) return;

    updateTaskMutation(
      {
        id: task.id,
        title: titleInput.trim(),
        description: descriptionInput,
        priority: priorityInput,
        status: statusInput,
        dueDate: dueDateInput ? format(dueDateInput, "yyyy-MM-dd") : null,
      },
      {
        onSuccess: () => onOpenChange(false),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[430px] rounded-xl p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">작업 편집</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            작업의 세부 정보를 수정하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 제목 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">제목</label>
            <Input
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="h-10"
            />
          </div>

          {/* 설명 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">설명</label>
            <Textarea
              rows={4}
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              className="resize-none text-sm"
            />
          </div>

          {/* 우선순위 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">우선순위</label>
            <Select
              value={priorityInput}
              onValueChange={(value: Task["priority"]) =>
                setPriorityInput(value)
              }
            >
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">높음</SelectItem>
                <SelectItem value="medium">보통</SelectItem>
                <SelectItem value="low">낮음</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 상태 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">상태</label>
            <Select
              value={statusInput}
              onValueChange={(value: Task["status"]) => setStatusInput(value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">할 일</SelectItem>
                <SelectItem value="doing">진행 중</SelectItem>
                <SelectItem value="done">완료됨</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 마감일 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">마감일</label>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start h-10">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                  {dueDateInput
                    ? format(dueDateInput, "yyyy-MM-dd")
                    : "마감일 없음"}
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start" className="p-3 rounded-lg border">
                <Calendar
                  mode="single"
                  selected={dueDateInput ?? undefined}
                  onSelect={(date) => setDueDateInput(date ?? null)}
                />

                <Button
                  variant="ghost"
                  onClick={() => setDueDateInput(null)}
                  className="w-full mt-2 text-sm"
                >
                  마감일 제거
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
