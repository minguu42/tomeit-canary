import { FC } from "react";
import { useRouter } from "next/router";

import { FireIcon, TaskIcon } from "@/components/common/icons";
import { Indicator } from "@/components/layouts/Drawer/Indicator";
import * as s from "./Drawer.css";

type Props = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

export const Drawer: FC<Props> = ({ isOpen, toggleDrawer }) => {
  const router = useRouter();

  if (!isOpen) {
    return <></>;
  }

  return (
    <>
      <button className={s.scrim} onClick={toggleDrawer} />
      <ul className={s.container}>
        <Indicator
          url="/focus"
          isActive={router.pathname === "/focus"}
          icon={<FireIcon />}
          labelText="今日やること"
        />
        <Indicator
          url="/"
          isActive={router.pathname === "/"}
          icon={<TaskIcon />}
          labelText="タスク"
        />
      </ul>
    </>
  );
};
