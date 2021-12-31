import { LightModeIcon } from "@/components/common/icons";
import s from "./Drawer.module.css";

const Drawer = () => (
  <aside className={s.container}>
    <nav className={s.nav}>
      <li className={s.item}>
        <LightModeIcon />
        <p className={s.labelText}>Inbox</p>
      </li>
    </nav>
  </aside>
);

export default Drawer;
