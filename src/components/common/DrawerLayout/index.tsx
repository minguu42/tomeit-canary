import TopAppBar from "components/common/TopAppBar";
import Drawer from "components/common/Drawer";
import s from "./styles.module.scss";

const DrawerLayout = (): JSX.Element => (
  <>
    <TopAppBar />
    <div className={s.body}>
      <Drawer />
      <main className={s.main}>
        Hello, 世界!
        absoluteだと親要素を基準に、絶対的な位置を指定することになります。たとえば「親要素の左上から下に10px、右に10pxの位置に配置する」というようなことができます。
      </main>
    </div>
  </>
);

export default DrawerLayout;
