import { FC, useEffect, useState } from "react";

import * as s from "./PomodoroPlayer.css";
import StandardIconButton from "@/components/common/StandardIconButton";
import {
  PauseCircleIcon,
  PlayCircleIcon,
  StopCircleIcon,
} from "@/components/icons";
import { formatSecondsToMinutesSeconds } from "@/lib/formatDate";
import { usePlayingTask } from "@/globalStates/playingTask";

const PomodoroPlayer: FC = () => {
  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const playingTask = usePlayingTask();

  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isActive]);

  const startPomodoro = () => {
    setIsActive(true);
  };

  const pausePomodoro = () => {
    setIsActive(false);
  };

  const stopPomodoro = () => {
    setTime(1500);
    setIsActive(false);
  };

  if (playingTask === null) {
    return <></>;
  }

  return (
    <div className={s.container}>
      {!isActive && time === 1500 && (
        <StandardIconButton
          icon={<PlayCircleIcon />}
          label="ポモドーロの開始"
          onClick={startPomodoro}
        />
      )}
      {!isActive && time !== 1500 && (
        <>
          <StandardIconButton
            icon={<PlayCircleIcon />}
            label="ポモドーロの開始"
            onClick={startPomodoro}
          />
          <StandardIconButton
            icon={<StopCircleIcon />}
            label="ポモドーロの中止"
            onClick={stopPomodoro}
          />
        </>
      )}
      {isActive && (
        <StandardIconButton
          icon={<PauseCircleIcon />}
          label="ポモドーロの停止"
          onClick={pausePomodoro}
        />
      )}
      <h3 className={s.mgr16}>{formatSecondsToMinutesSeconds(time)}</h3>
      <p>{playingTask.title}</p>
    </div>
  );
};

export default PomodoroPlayer;
