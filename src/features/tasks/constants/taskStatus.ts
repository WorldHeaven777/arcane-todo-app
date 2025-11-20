// 작업 상태들

export const TASK_STATUS_OPTIONS = [
  { value: "todo", label: "할 일" },
  { value: "doing", label: "진행 중" },
  { value: "done", label: "완료됨" },
] as const;

export type TaskStatusValue = (typeof TASK_STATUS_OPTIONS)[number]["value"];
