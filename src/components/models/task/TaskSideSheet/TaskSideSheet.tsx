import { FC } from "react";

import {
  AlarmIcon,
  AlarmOnIcon,
  CircleIcon,
  DeleteIcon,
  EditIcon,
  EventIcon,
} from "@/components/common/icons";
import IconButton from "@/components/common/IconButton";
import s from "./TaskSideSheet.module.css";
import { useTaskSideSheet } from "./TaskSideSheet.hooks";
import { formatDateToJP } from "@/lib/formatDate";

const TaskSideSheet: FC = () => {
  const {
    featuredTaskExists,
    featuredTask,
    handleDeleteTaskButtonClick,
    handleCompleteTaskButtonClick,
  } = useTaskSideSheet();

  if (!featuredTaskExists) {
    return <></>;
  }

  return (
    <aside className={s.container}>
      <div className={s.top}>
        <IconButton
          icon={<CircleIcon />}
          onClick={() => {
            handleCompleteTaskButtonClick(featuredTask);
          }}
          label="タスクを完了する"
        />
        <h2 className={s.title}>{featuredTask.title}</h2>
      </div>
      <ul className={s.fieldList}>
        <li className={s.fieldListItem}>
          <AlarmOnIcon />
          <p className={s.fieldName}>実行ポモドーロ数</p>
          <p className={s.fieldValue}>{featuredTask.completedPomoNum}</p>
        </li>
        <li className={s.fieldListItem}>
          <AlarmIcon />
          <p className={s.fieldName}>期待ポモドーロ数</p>
          <p className={s.fieldValue}>{featuredTask.estimatedPomoNum}</p>
        </li>
        {featuredTask.dueOn && (
          <li className={s.fieldListItem}>
            <EventIcon />
            <p className={s.fieldName}>期限</p>
            <p className={s.fieldValue}>{formatDateToJP(featuredTask.dueOn)}</p>
          </li>
        )}
      </ul>
      <div className={s.spacer} />
      <ul>
        <li>
          <button className={s.actionListItem}>
            <div className={s.actionListItemLayer} />
            <EditIcon />
            <p className={s.actionName}>編集する</p>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleDeleteTaskButtonClick(featuredTask);
            }}
            className={s.actionListItem}
          >
            <div className={s.actionListItemLayer} />
            <DeleteIcon />
            <p className={s.actionName}>削除する</p>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default TaskSideSheet;
