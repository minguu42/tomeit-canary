import { FC } from "react";

import * as s from "./PomodoroPlayer.css";
import StandardIconButton from "@/components/common/StandardIconButton";
import {PlayCircleIcon} from "@/components/icons";

const PomodoroPlayer: FC = () => {
  return (
    <div className={s.container}>
      <StandardIconButton
        icon={<PlayCircleIcon />}
        label="ポモドーロの開始"
        onClick={() => window.alert("ポモドーロの開始")}
      />
      <h3 className={s.mgr16}>25:00</h3>
      <p>タスク名</p>
    </div>
  );
};

export default PomodoroPlayer;
