import Link from "next/link";
import {atom, useRecoilState, useRecoilValue} from "recoil";
import cn from "classnames";

import TodayIcon from "components/common/icons/TodayIcon";
import TomorrowIcon from "components/common/icons/TomorrowIcon";
import DateRangeIcon from "components/common/icons/DateRangeIcon";
import s from "./styles.module.scss";
import { TasksFilter, tasksFilterState } from "models/task";

type Props = {
  tasksFilter: TasksFilter;
  onBackgroundClick: () => void;
};

const Drawer = ({ tasksFilter, onBackgroundClick }: Props): JSX.Element => (
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
    <button onClick={onBackgroundClick} className={s.background} />
  </div>
);

export const drawerExistsState = atom({
  key: "drawerExists",
  default: true,
});

const DrawerContainer = (): JSX.Element => {
  const [drawerExists, setDrawerExists] = useRecoilState(drawerExistsState);
  const tasksFilter = useRecoilValue(tasksFilterState);

  const onBackgroundClick = (): void => {
    setDrawerExists((prev) => !prev)
  }

  return drawerExists ? <Drawer tasksFilter={tasksFilter} onBackgroundClick={onBackgroundClick} /> : <></>;
};

export default DrawerContainer;
