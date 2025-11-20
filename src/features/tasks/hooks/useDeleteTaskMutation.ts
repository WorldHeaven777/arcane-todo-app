// 삭제 담당 로직

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/apis/taskApi";
import { TASK_LIST_QUERY_KEY } from "./useTaskListQuery";
import type { Task } from "@/types/task";

type RollbackContext = {
  previousTaskList: Task[] | undefined;
};

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, RollbackContext>({
    mutationFn: deleteTask,

    onMutate: async (taskIdToDelete) => {
      await queryClient.cancelQueries({ queryKey: TASK_LIST_QUERY_KEY });

      const previousTaskList =
        queryClient.getQueryData<Task[]>(TASK_LIST_QUERY_KEY);

      queryClient.setQueryData<Task[]>(
        TASK_LIST_QUERY_KEY,
        (previousTaskListData) => {
          if (!previousTaskListData) return [];
          return previousTaskListData.filter(
            (taskItem) => taskItem.id !== taskIdToDelete
          );
        }
      );

      return { previousTaskList };
    },

    onError: (_errorObject, _requestData, rollbackContext) => {
      if (rollbackContext?.previousTaskList) {
        queryClient.setQueryData(
          TASK_LIST_QUERY_KEY,
          rollbackContext.previousTaskList
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASK_LIST_QUERY_KEY });
    },
  });
}
