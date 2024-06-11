import { FC, ReactNode } from "react";
import Header from "./Header";
import "./Styles.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <div className="main-wrapper">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
