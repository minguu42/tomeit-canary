import useSWR, { useSWRConfig } from "swr";

import { getIDToken } from "@/lib/auth";
import { formatDateStringToRFC3339 } from "@/lib/formatDate";
import { isTaskResponse, isTasksResponse, newTask, Task } from "@/types/task";

const TOMEIT_API_URL =
  process.env.NEXT_PUBLIC_TOMEIT_API_URL ?? "http://localhost:8080/v0";
const TOMEIT_API_TASKS_URL = `${TOMEIT_API_URL}/tasks`;

const fetcher = async (url: string) => {
  const idToken = await getIDToken(true);
  const res = await fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  const data: unknown = await res.json();
  if (isTasksResponse(data)) {
    return data.tasks.map((t) => newTask(t));
  } else {
    throw new Error("タスクの取得に失敗しました。");
  }
};

export const useTasks = () => {
  const { data, error } = useSWR<Task[], Error>(TOMEIT_API_TASKS_URL, fetcher);

  return {
    tasks: data ?? [],
    isLoading: error == undefined && data == undefined,
    isError: error != undefined,
  };
};

type TaskActions = {
  postTasks: (
    title: string,
    estimatedPomoNum: number,
    dueOn: string
  ) => Promise<void>;
  putCompleteTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};

export const useTaskActions = (): TaskActions => {
  const { mutate } = useSWRConfig();

  const postTasks = async (
    title: string,
    estimatedPomoNum: number,
    dueOn: string
  ): Promise<void> => {
    const idToken = await getIDToken(true);
    mutate<Task[]>(TOMEIT_API_TASKS_URL, async (tasks) => {
      const res = await fetch(TOMEIT_API_TASKS_URL, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          estimatedPomoNum: estimatedPomoNum,
          dueOn: formatDateStringToRFC3339(dueOn),
        }),
      });
      if (!res.ok) {
        throw new Error("タスクの作成に失敗しました。");
      }

      const data: unknown = await res.json();
      if (tasks && isTaskResponse(data)) {
        return [...tasks, newTask(data)];
      } else {
        throw new Error("タスクの作成に失敗しました。");
      }
    }).catch((error) => {
      throw error;
    });
  };

  const putCompleteTask = async (id: number): Promise<void> => {
    const idToken = await getIDToken(true);
    mutate<Task[]>(TOMEIT_API_TASKS_URL, async (tasks) => {
      const res = await fetch(`${TOMEIT_API_TASKS_URL}/${id}`, {
        method: "PATCH",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completedOn: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        throw new Error("タスクの完了に失敗しました。");
      }

      const data: unknown = await res.json();
      if (tasks && isTaskResponse(data)) {
        return tasks.filter((task) => task.id !== id);
      } else {
        throw new Error("タスクの完了に失敗しました。");
      }
    }).catch((error) => {
      throw error;
    });
  };

  const deleteTask = async (id: number): Promise<void> => {
    const idToken = await getIDToken(true);
    mutate<Task[]>(TOMEIT_API_TASKS_URL, async (tasks) => {
      const res = await fetch(`${TOMEIT_API_TASKS_URL}/${id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("タスクの削除に失敗しました。");
      }
      if (tasks) {
        return tasks.filter((task) => task.id !== id);
      } else {
        throw new Error("タスクの削除に失敗しました。");
      }
    }).catch((error) => {
      throw error;
    });
  };

  return {
    postTasks,
    putCompleteTask,
    deleteTask,
  };
};
