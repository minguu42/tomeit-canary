import { FC } from "react";

import { CircleIcon, TimerIcon } from "@/components/icons";
import StandardIconButton from "@/components/common/StandardIconButton";
import Content from "@/components/features/SideSheet/Content";
import * as s from "./SideSheet.css";

const SideSheet: FC = () => {
  return (
    <div className={s.container}>
      <div className={s.name}>
        <StandardIconButton
          icon={<CircleIcon />}
          label="完了"
          onClick={() => window.alert("完了")}
        />
        <h3>タスク1</h3>
      </div>
      <div className={s.divider} />
      <Content
        leadingIcon={<TimerIcon />}
        name="推定ポモドーロ数"
        value={String(4)}
      />
      <Content
        leadingIcon={<TimerIcon />}
        name="実ポモドーロ数"
        value={String(2)}
      />
      <Content leadingIcon={<TimerIcon />} name="期限" value="2022-07-21" />
    </div>
  );
};

export default SideSheet;
