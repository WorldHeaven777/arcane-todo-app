import { supabaseBrowser } from "@/lib/supabase/client";

import type {
  Task,
  TaskRow,
  TaskCreateInput,
  TaskUpdateInput,
} from "@/types/task";

const TABLE_NAME = "tasks";

// Supabase 에러
class TaskApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TaskApiError";
  }
}

function mapTaskRowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    priority: row.priority,
    dueDate: row.due_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// 전체 Task 목록 조회 담당 로직
export async function fetchAllTasks(): Promise<Task[]> {
  const { data, error } = await supabaseBrowser
    .from(TABLE_NAME)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("fetchAllTasks error:", error);
    throw new TaskApiError("작업 목록을 불러오는데 실패했습니다.");
  }

  const rows = (data ?? []) as TaskRow[];

  return rows.map(mapTaskRowToTask);
}

// 새로운 Task 생성 담당 로직
export async function createTask(input: TaskCreateInput): Promise<Task> {
  const { data, error } = await supabaseBrowser
    .from(TABLE_NAME)
    .insert({
      title: input.title,
      description: input.description ?? "",
      status: "todo",
      priority: input.priority ?? "medium",
      due_date: input.dueDate ?? null,
    })
    .select()
    .single();

  if (error) throw new TaskApiError("새 작업 추가 실패");
  return mapTaskRowToTask(data as TaskRow);
}

// Task 상태 변경 담당 로직
export async function updateTask(input: TaskUpdateInput): Promise<Task> {
  const updatePayload: any = {};

  if (input.title !== undefined) updatePayload.title = input.title;
  if (input.description !== undefined)
    updatePayload.description = input.description;
  if (input.status !== undefined) updatePayload.status = input.status;
  if (input.priority !== undefined) updatePayload.priority = input.priority;
  if (input.dueDate !== undefined) updatePayload.due_date = input.dueDate;

  const { data, error } = await supabaseBrowser
    .from(TABLE_NAME)
    .update(updatePayload)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw new TaskApiError("작업 정보 수정 실패");

  return mapTaskRowToTask(data as TaskRow);
}

// Task 삭제 담당 로직
export async function deleteTask(id: number): Promise<void> {
  const { error } = await supabaseBrowser
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("deleteTask error:", error);
    throw new TaskApiError("작업을 삭제하는데 실패했습니다.");
  }
}

// 에러 상황 시뮬레이션
export async function simulateTaskError(): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new TaskApiError("의도적으로 발생시킨 에러입니다."));
    }, 600);
  });
}
