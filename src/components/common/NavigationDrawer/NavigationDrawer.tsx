import { VFC, useState } from "react";
import Link from "next/link";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

import { DarkModeIcon, LightModeIcon } from "@/components/common/icons";
import s from "./NavigationDrawer.module.css";

const isNavigationOpen = atom({
  key: "isNavigationOpen",
  default: false,
});

export const useOpenNavigation = () => {
  const setIsNavigationOpen = useSetRecoilState(isNavigationOpen);
  return () => {
    setIsNavigationOpen(true);
  };
};

const NavigationDrawer: VFC = () => {
  const [isOpen, setIsOpen] = useRecoilState(isNavigationOpen);

  return isOpen ? (
    <div className={s.hideInDesktop}>
      <nav className={s.container}>
        <ul role="tablist">
          <li>
            <Link href="#">
              <a role="tab" className={s.indicator}>
                <div className={s.indicatorLayer} />
                <LightModeIcon />
                <p className={s.labelText}>Today</p>
                <div className={s.spacer} />
                <p className={s.badgeLabelText}>24</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a role="tab" aria-selected="true" className={s.indicator}>
                <div className={s.indicatorLayer} />
                <DarkModeIcon />
                <p className={s.labelText}>Tomorrow</p>
                <div className={s.spacer} />
                <p className={s.badgeLabelText}>100+</p>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
        className={s.scrim}
      />
    </div>
  ) : (
    <></>
  );
};

export default NavigationDrawer;
