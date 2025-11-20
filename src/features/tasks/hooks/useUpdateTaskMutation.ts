import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASK_LIST_QUERY_KEY } from "./useTaskListQuery";
import { Task, TaskUpdateInput } from "@/types/task";
import { updateTask } from "@/apis/taskApi";

type RollbackContext = {
  previousTaskList: Task[] | undefined;
};

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, TaskUpdateInput, RollbackContext>({
    mutationFn: updateTask,

    onMutate: async (incoming) => {
      await queryClient.cancelQueries({ queryKey: TASK_LIST_QUERY_KEY });

      const previousTaskList =
        queryClient.getQueryData<Task[]>(TASK_LIST_QUERY_KEY);

      queryClient.setQueryData<Task[]>(TASK_LIST_QUERY_KEY, (currentList) => {
        if (!currentList) return [];

        return currentList.map((task) =>
          task.id === incoming.id ? { ...task, ...incoming } : task
        );
      });

      return { previousTaskList };
    },

    onError: (_, __, ctx) => {
      if (ctx?.previousTaskList) {
        queryClient.setQueryData(TASK_LIST_QUERY_KEY, ctx.previousTaskList);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASK_LIST_QUERY_KEY });
    },
  });
}
