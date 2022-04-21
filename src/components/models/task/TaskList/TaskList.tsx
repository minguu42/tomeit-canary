import { FC, useEffect } from "react";

import TaskListItem from "@/components/models/task/TaskListItem";
import { useTasksAtom, useTasksMutators } from "@/globalStates/tasksAtom";
import { newTask, Task } from "@/models/task/task";
import { formatDate } from "@/lib/format";
import { fetchTasks } from "@/models/task/fetch";
import { useUserAtom } from "@/globalStates/userAtom";

type Props = {
  filter: "today" | "tomorrow" | "someday";
};

const TaskList: FC<Props> = ({ filter }) => {
  const tasks = useTasksAtom();
  const { initTasks } = useTasksMutators();
  const user = useUserAtom();

  useEffect(() => {
    fetchTasks(user)
      .then((tasksResponse) =>
        initTasks(tasksResponse.tasks.map((t) => newTask(t)))
      )
      .catch((error) => console.error(error));
  }, [initTasks, user]);

  const isNotTaskCompleted = (task: Task) => task.completedOn == null;
  const isTaskDueOn = (task: Task, date: Date) =>
    task.dueOn !== null && formatDate(task.dueOn) === formatDate(date);
  let filterConditions = isNotTaskCompleted;
  if (filter === "today") {
    const today = new Date();
    filterConditions = (task: Task) =>
      isNotTaskCompleted(task) && isTaskDueOn(task, today);
  } else if (filter === "tomorrow") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    filterConditions = (task: Task) =>
      isNotTaskCompleted(task) && isTaskDueOn(task, tomorrow);
  }

  return (
    <ul>
      {tasks.filter(filterConditions).map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
