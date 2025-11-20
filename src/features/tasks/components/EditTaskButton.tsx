"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import type { Task } from "@/types/task";
import EditTaskDialog from "./EditTaskDialog";

interface EditTaskButtonProps {
  task: Task;
}

export default function EditTaskButton({ task }: EditTaskButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleChangeDialogOpenState = (nextOpen: boolean) =>
    setIsDialogOpen(nextOpen);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleOpenDialog}
        className="
          p-0
          text-muted-foreground
          hover:bg-muted
          rounded-md
        "
      >
        <Pencil className="w-4 h-4" />
      </Button>

      <EditTaskDialog
        task={task}
        open={isDialogOpen}
        onOpenChange={handleChangeDialogOpenState}
      />
    </>
  );
}
