import { VFC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  WbSunnyIcon,
  WbTwilightIcon,
  EventIcon,
} from "@/components/common/icons";
import s from "./NavigationDrawer.module.css";
import {
  useNavigationDrawerAtom,
  useToggleNavigationDrawer,
} from "@/globalStates/navigationDrawerAtom";
import { useTasksAtom } from "@/globalStates/tasksAtom";
import { formatDate } from "@/lib/format";

const NavigationDrawer: VFC = () => {
  const isOpen = useNavigationDrawerAtom();
  const toggleDrawer = useToggleNavigationDrawer();
  const router = useRouter();

  const tasks = useTasksAtom();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const todayTaskNum = tasks.filter(
    (task) =>
      !task.isCompleted &&
      task.dueOn &&
      formatDate(task.dueOn) === formatDate(today)
  ).length;
  const tomorrowTaskNum = tasks.filter(
    (task) =>
      !task.isCompleted &&
      task.dueOn &&
      formatDate(task.dueOn) === formatDate(tomorrow)
  ).length;
  const somedayTaskNum = tasks.filter((task) => !task.isCompleted).length;

  if (!isOpen) return <></>;

  return (
    <>
      <nav className={s.container}>
        <ul role="tablist">
          <li>
            <Link href="/tasks/today">
              <a
                role="tab"
                aria-selected={router.pathname === "/tasks/today"}
                className={s.indicator}
              >
                <div className={s.indicatorLayer} />
                <WbSunnyIcon />
                <p className={s.labelText}>今日</p>
                <div className={s.spacer} />
                <p className={s.badgeLabelText}>{todayTaskNum}</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/tomorrow">
              <a
                role="tab"
                aria-selected={router.pathname === "/tasks/tomorrow"}
                className={s.indicator}
              >
                <div className={s.indicatorLayer} />
                <WbTwilightIcon />
                <p className={s.labelText}>明日</p>
                <div className={s.spacer} />
                <p className={s.badgeLabelText}>{tomorrowTaskNum}</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/someday">
              <a
                role="tab"
                aria-selected={router.pathname === "/tasks/someday"}
                className={s.indicator}
              >
                <div className={s.indicatorLayer} />
                <EventIcon />
                <p className={s.labelText}>いつか</p>
                <div className={s.spacer} />
                <p className={s.badgeLabelText}>{somedayTaskNum}</p>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <button onClick={toggleDrawer} className={s.scrim} />
    </>
  );
};

export default NavigationDrawer;
