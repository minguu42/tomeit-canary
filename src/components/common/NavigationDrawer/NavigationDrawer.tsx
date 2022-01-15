import type { VFC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  WbSunnyIcon,
  WbTwilightIcon,
  EventIcon,
} from "@/components/common/icons";
import s from "./NavigationDrawer.module.css";
import {
  useIsNavigationDrawerOpen,
  useToggleNavigationDrawer,
} from "@/lib/states";

const NavigationDrawer: VFC = () => {
  const isOpen = useIsNavigationDrawerOpen();
  const toggleDrawer = useToggleNavigationDrawer();
  const router = useRouter();

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
                <p className={s.labelText}>Today</p>
                <div className={s.spacer} />
                <p className={s.badgeLabelText}>24</p>
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
                <p className={s.labelText}>Tomorrow</p>
                <div className={s.spacer} />
                <p className={s.badgeLabelText}>100+</p>
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
                <p className={s.labelText}>Tomorrow</p>
                <div className={s.spacer} />
                <p className={s.badgeLabelText}>100+</p>
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
