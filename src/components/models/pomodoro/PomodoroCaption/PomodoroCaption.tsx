import type { VFC } from "react";
import cn from "classnames";

import { AlarmIcon, AlarmOnIcon } from "@/components/common/icons";
import s from "./PomodoroCaption.module.css";

type Props = {
  expectedPomodoroNum: number;
  actualPomodoroNum: number;
};

const PomodoroCaption: VFC<Props> = ({
  expectedPomodoroNum,
  actualPomodoroNum,
}) => {
  if (expectedPomodoroNum >= 1 && actualPomodoroNum >= 1) {
    return (
      <div className={s.container}>
        <AlarmOnIcon size={16} className={s.actualColor} />
        <p className={cn(s.labelText, s.actualColor)}>{actualPomodoroNum}</p>
        <p className={s.separator}>/</p>
        <AlarmIcon size={16} className={s.expectedColor} />
        <p className={cn(s.labelText, s.expectedColor)}>
          {expectedPomodoroNum}
        </p>
      </div>
    );
  } else if (expectedPomodoroNum >= 1 && actualPomodoroNum == 0) {
    return (
      <div className={s.container}>
        {expectedPomodoroNum >= 6 ? (
          <>
            <AlarmIcon size={16} className={s.expectedColor} />
            <p className={cn(s.labelText, s.expectedColor)}>
              {expectedPomodoroNum}
            </p>
          </>
        ) : (
          Array.from({ length: expectedPomodoroNum }, (_, i) => i).map((v) => (
            <AlarmIcon key={v} size={16} className={s.expectedColor} />
          ))
        )}
      </div>
    );
  } else if (expectedPomodoroNum === 0 && actualPomodoroNum >= 1) {
    return (
      <div className={s.container}>
        {actualPomodoroNum >= 6 ? (
          <>
            <AlarmOnIcon size={16} className={s.actualColor} />
            <p className={cn(s.labelText, s.actualColor)}>
              {actualPomodoroNum}
            </p>
          </>
        ) : (
          Array.from({ length: actualPomodoroNum }, (_, i) => i).map((v) => (
            <AlarmOnIcon key={v} size={16} className={s.actualColor} />
          ))
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default PomodoroCaption;
