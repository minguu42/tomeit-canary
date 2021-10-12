import TopAppBar from "components/DrawerLayout/TopAppBar";
import Drawer from "components/DrawerLayout/Drawer";
import s from "./styles.module.scss";

type Props = {
  children: JSX.Element;
};

const DrawerLayout = ({ children }: Props): JSX.Element => (
  <>
    <TopAppBar />
    <div className={s.body}>
      <Drawer />
      <main className={s.main}>{children}</main>
    </div>
  </>
);

export default DrawerLayout;
