import Link from "next/link";
import { useRecoilValue } from "recoil";
import cn from "classnames";

import TodayIcon from "components/icons/TodayIcon";
import TomorrowIcon from "components/icons/TomorrowIcon";
import DateRangeIcon from "components/icons/DateRangeIcon";
import s from "./styles.module.scss";
import { TasksFilter, tasksFilterState } from "models/task";
import { useIsDrawerOpen, useToggleDrawer } from "lib/state";

type Props = {
  tasksFilter: TasksFilter;
  toggleDrawer: () => void;
};

const Drawer = ({ tasksFilter, toggleDrawer }: Props): JSX.Element => (
  <div className={s.container}>
    <aside className={s.drawer}>
      <nav>
        <Link href="/tasks/today">
          <a
            className={cn(s.navItem, {
              [s.navItemActivated]: tasksFilter === "Today",
            })}
          >
            <TodayIcon fill="#212121" />
            今日
          </a>
        </Link>
        <Link href="/tasks/tomorrow">
          <a
            className={cn(s.navItem, {
              [s.navItemActivated]: tasksFilter === "Tomorrow",
            })}
          >
            <TomorrowIcon fill="#212121" />
            明日
          </a>
        </Link>
        <Link href="/tasks/someday">
          <a
            className={cn(s.navItem, {
              [s.navItemActivated]: tasksFilter === "Someday",
            })}
          >
            <DateRangeIcon fill="#212121" />
            いつか
          </a>
        </Link>
      </nav>
    </aside>
    <button onClick={toggleDrawer} className={s.background} />
  </div>
);

const DrawerContainer = (): JSX.Element => {
  const isDrawerOpen = useIsDrawerOpen();
  const toggleDrawer = useToggleDrawer();
  const tasksFilter = useRecoilValue(tasksFilterState);

  return isDrawerOpen ? (
    <Drawer tasksFilter={tasksFilter} toggleDrawer={toggleDrawer} />
  ) : (
    <></>
  );
};

export default DrawerContainer;
