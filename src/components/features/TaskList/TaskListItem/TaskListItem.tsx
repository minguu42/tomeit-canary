import { FC } from "react";

import IconButton from "@/components/common/IconButton";
import { CircleIcon, PlayCircleIcon } from "@/components/common/icons";
import * as s from "./TaskListItem.css";
import { usePlayingTaskMutators } from "@/globalStates/playingTask";
import { useRemarkedTask, useRemarkedTaskMutators } from "@/globalStates/remarkedTask";
import { Task } from "@/types/task";

type Props = {
  task: Task;
  isFocusPage?: boolean;
};

const TaskListItem: FC<Props> = ({ task, isFocusPage }) => {
  const remarkedTask = useRemarkedTask();
  const { setRemarkedTask, unsetRemarkedTask } = useRemarkedTaskMutators();
  const { setPlayingTask } = usePlayingTaskMutators();

  const handleClick = () => {
    if (remarkedTask === null) {
      setRemarkedTask(task);
      return;
    }

    if (task.id === remarkedTask.id) {
      unsetRemarkedTask();
    } else {
      setRemarkedTask(task);
    }
  };

  const handlePlayButtonClick = () => {
    setPlayingTask(task);
  };

  return (
    <li className={s.container}>
      <div className={s.zIndex1}>
        <IconButton
          icon={<CircleIcon />}
          label="タスクの完了"
          onClick={() => window.alert("タスクの完了")}
        />
      </div>
      <button onClick={handleClick} className={s.mainContainer}>
        <h3 className={s.heading}>{task.title}</h3>
      </button>
      {isFocusPage && (
        <div className={s.zIndex1}>
          <IconButton
            icon={<PlayCircleIcon />}
            label="ポモドーロの実行"
            onClick={handlePlayButtonClick}
          />
        </div>
      )}
      <div className={s.stateLayer} />
    </li>
  );
};

export default TaskListItem;
