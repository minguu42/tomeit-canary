import TopAppBar from "@/components/common/TopAppBar";

type Props = {
  children: JSX.Element[];
};

export const Layout = ({ children }: Props): JSX.Element => (
  <div>
    <TopAppBar />
    {children.map((child) => child)}
  </div>
);

export default Layout;
