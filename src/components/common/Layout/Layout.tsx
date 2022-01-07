import TopAppBar from "@/components/common/TopAppBar";
import NavigationDrawer from "@/components/common/NavigationDrawer";
import s from "./Layout.module.css";

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props): JSX.Element => (
  <div className={s.background}>
    <TopAppBar />
    <div className={s.flexInDesktop}>
      <NavigationDrawer />
      <div className={s.mainLayoutInDesktop}>{children}</div>
    </div>
  </div>
);

export default Layout;
