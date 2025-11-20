"use client";

import { useState } from "react";

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

import { useCreateTaskMutation } from "../hooks/useCreateTaskMutation";

export default function CreateTaskDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [status, setStatus] = useState<"todo" | "doing" | "done">("todo");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const { mutate: createTask, isPending } = useCreateTaskMutation();

  const handleSubmit = () => {
    if (!title.trim() || isPending) return;

    createTask(
      {
        title: title.trim(),
        description,
        priority,
        status,
        dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : null,
      },
      {
        onSuccess: () => onOpenChange(false),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[430px] rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            새 작업 만들기
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            제목, 설명, 우선순위, 상태, 마감일을 설정하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 제목 */}
          <div className="space-y-1">
            <label className="text-sm font-medium">제목</label>
            <Input
              placeholder="예: 디자인 리뷰 준비"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11"
            />
          </div>

          {/* 설명 */}
          <div className="space-y-1">
            <label className="text-sm font-medium">설명</label>
            <Textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="작업 설명을 입력하세요."
              className="resize-none text-sm"
            />
          </div>

          {/* 우선순위 + 상태 */}
          <div className="grid grid-cols-2 gap-4">
            {/* 우선순위 */}
            <div className="space-y-1">
              <label className="text-sm font-medium">우선순위</label>

              <Select
                value={priority}
                onValueChange={(v) => setPriority(v as any)}
              >
                <SelectTrigger className="h-11">
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
            <div className="space-y-1">
              <label className="text-sm font-medium">상태</label>

              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">할 일</SelectItem>
                  <SelectItem value="doing">진행 중</SelectItem>
                  <SelectItem value="done">완료됨</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 마감일 */}
          <div className="space-y-1">
            <label className="text-sm font-medium">마감일</label>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full h-11 justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                  {dueDate
                    ? format(dueDate, "yyyy-MM-dd")
                    : "마감일을 선택하세요"}
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start" className="p-3 border rounded-lg">
                <Calendar
                  mode="single"
                  selected={dueDate ?? undefined}
                  onSelect={(date) => setDueDate(date ?? null)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            취소
          </Button>

          <Button onClick={handleSubmit} disabled={isPending || !title.trim()}>
            작업 추가
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
