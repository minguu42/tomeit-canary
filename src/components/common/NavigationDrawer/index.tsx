import Link from "next/link";
import cn from "classnames";

import TodayIcon from "components/common/icons/TodayIcon";
import TomorrowIcon from "components/common/icons/TomorrowIcon";
import DateRangeIcon from "components/common/icons/DateRangeIcon";
import s from "./styles.module.scss";
import { TasksFilter, tasksFilterState } from "models/task";
import { useRecoilValue } from "recoil";

type Props = {
  tasksFilter: TasksFilter;
};

const NavigationDrawer = ({ tasksFilter }: Props): JSX.Element => (
  <aside className={s.container}>
    <nav>
      <Link href="/tasks/today">
        <a
          className={cn(s.navItem, { [s.activated]: tasksFilter === "Today" })}
        >
          <TodayIcon fill="#212121" />
          今日
        </a>
      </Link>
      <Link href="/tasks/tomorrow">
        <a
          className={cn(s.navItem, {
            [s.activated]: tasksFilter === "Tomorrow",
          })}
        >
          <TomorrowIcon fill="#212121" />
          明日
        </a>
      </Link>
      <Link href="/tasks/someday">
        <a
          className={cn(s.navItem, {
            [s.activated]: tasksFilter === "Someday",
          })}
        >
          <DateRangeIcon fill="#212121" />
          いつか
        </a>
      </Link>
    </nav>
  </aside>
);

const NavigationDrawerContainer = (): JSX.Element => {
  const tasksFilter = useRecoilValue(tasksFilterState);

  return <NavigationDrawer tasksFilter={tasksFilter} />;
};

export default NavigationDrawerContainer;
