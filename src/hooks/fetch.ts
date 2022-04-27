import useSWR from "swr";

import { getIDToken } from "@/lib/auth";
import { isTasksResponse, newTask, Task } from "@/types/task";

const TOMEIT_API_URL = process.env.NEXT_PUBLIC_TOMEIT_API_URL ?? "";

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
    throw new Error("Response is wrong.");
  }
};

export const useTasks = () => {
  const { data, error } = useSWR<Task[], Error>(
    `${TOMEIT_API_URL}/tasks`,
    fetcher
  );

  return {
    tasks: data ?? [],
    isLoading: error == undefined && data == undefined,
    isError: error != undefined,
  };
};
