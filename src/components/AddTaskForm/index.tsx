import { SubmitHandler, useForm } from "react-hook-form";

import AddIcon from "components/icons/AddIcon";
import TimerIcon from "components/icons/TimerIcon";
import s from "./styles.module.scss";
import { isTaskResponse, newTask, useTasksActions } from "models/task";
import { formatDate } from "lib/format";
import { postData } from "lib/fetch";
import { useUser } from "lib/auth";

type Inputs = {
  title: string;
  expectedPomodoroNum: number;
  dueOn: string;
};

const AddTaskFormContainer = (): JSX.Element => {
  const user = useUser();
  const { addTask } = useTasksActions();

  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      dueOn: formatDate(new Date()),
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const reqBody = {
      title: data.title,
      expectedPomodoroNum: data.expectedPomodoroNum,
      dueOn: data.dueOn === "" ? null : new Date(data.dueOn),
    };
    postData("/tasks", reqBody, user)
      .then((data) => {
        if (isTaskResponse(data)) {
          addTask(newTask(data));
        }
      })
      .catch((error) => console.error(error));

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <AddIcon fill="#212121" />
      <input
        title="タスク名"
        placeholder="タスクを追加"
        {...register("title", { required: true })}
        className={s.title}
      />
      <div className={s.hideInXS}>
        <TimerIcon fill="#666666" />
      </div>
      <input
        type="number"
        title="予想ポモドーロ数"
        defaultValue={0}
        {...register("expectedPomodoroNum", {
          min: 0,
          max: 6,
          valueAsNumber: true,
        })}
        className={s.expectedNum}
      />
      <input
        type="date"
        title="期日"
        {...register("dueOn")}
        className={s.dueOn}
      />
      <button type="submit" hidden />
    </form>
  );
};

export default AddTaskFormContainer;
