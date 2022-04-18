import { User } from "firebase/auth";

import {
  isTaskResponse,
  isTasksResponse,
  TaskResponse,
  TasksResponse,
} from "@/models/task";
import { formatDateStringToRFC3339 } from "@/lib/format";

const TOMEIT_API_URL = "http://localhost:8080/v0";

export const postTasks = async (
  user: User | null,
  title: string,
  estimatedPomoNum: number,
  dueOn: string
): Promise<TaskResponse> => {
  const errorResponse: TaskResponse = {
    id: 0,
    title: "",
    estimatedPomoNum: 0,
    completedPomoNum: 0,
    dueOn: "",
    completedOn: "",
    createdAt: "",
    updatedAt: "",
  };
  if (!user) {
    return errorResponse;
  }

  const idToken = await user.getIdToken(true);
  const response = await fetch(TOMEIT_API_URL + "/tasks", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + idToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      estimatedPomoNum: estimatedPomoNum,
      dueOn: dueOn == "" ? "" : formatDateStringToRFC3339(dueOn),
    }),
  });
  const data: unknown = await response.json();

  if (isTaskResponse(data)) {
    return data;
  }
  return errorResponse;
};

export const fetchTasks = async (user: User | null): Promise<TasksResponse> => {
  const errorResponse: TasksResponse = { tasks: [] };
  if (!user) {
    return errorResponse;
  }

  const idToken = await user.getIdToken(true);
  const response = await fetch(TOMEIT_API_URL + "/tasks", {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + idToken,
    },
  });
  const data: unknown = await response.json();

  if (isTasksResponse(data)) {
    return data;
  }
  return errorResponse;
};
