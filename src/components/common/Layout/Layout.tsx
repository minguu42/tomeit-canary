import TopAppBar from "@/components/common/TopAppBar";
import Drawer from "@/components/common/Drawer/Drawer";

type Props = {
  children: JSX.Element[];
};

export const Layout = ({ children }: Props): JSX.Element => (
  <div>
    <TopAppBar />
    <Drawer />
    {children.map((child) => child)}
  </div>
);

export default Layout;
