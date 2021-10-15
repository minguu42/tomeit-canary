import Link from "next/link";
import cn from "classnames";

import TodayIcon from "components/icons/TodayIcon";
import TomorrowIcon from "components/icons/TomorrowIcon";
import DateRangeIcon from "components/icons/DateRangeIcon";
import s from "./styles.module.scss";
import { TasksFilter, useTasksFilter } from "models/task";
import { useIsDrawerOpen, useIsDrawerOpenActions } from "lib/states";

type Props = {
  tasksFilter: TasksFilter;
  closeDrawer: () => void;
};

const Drawer = ({ tasksFilter, closeDrawer }: Props): JSX.Element => (
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
    <button onClick={closeDrawer} className={s.background} />
  </div>
);

const DrawerContainer = (): JSX.Element => {
  const isDrawerOpen = useIsDrawerOpen();
  const { closeDrawer } = useIsDrawerOpenActions();
  const tasksFilter = useTasksFilter();

  return isDrawerOpen ? (
    <Drawer tasksFilter={tasksFilter} closeDrawer={closeDrawer} />
  ) : (
    <></>
  );
};

export default DrawerContainer;
